// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

// @author Eugenie Journee

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./ERC721A.sol";

contract LadiesGangERC721A is Ownable, ERC721A, PaymentSplitter {
    // use a library
    using Strings for uint256;

    // know at what stage we are in the smart contract
    enum Step {
        Before,
        WhitelistSale,
        PublicSale,
        SoldOut,
        Reveal
    }

    Step public sellingStep;

    // number of elements
    uint256 private constant MAX_SUPPLY = 10000;

    // max number of given nft
    uint256 private constant MAX_GIFT = 100;

    // max number of whitelisted
    uint256 private constant MAX_WHITELIST = 2000;

    // number of nft for public sale
    uint256 private constant MAX_PUBLIC = 3455;

    // number of nft that users will be able to buy
    uint256 private constant MAX_SUPPLY_MINUS_GIFT = MAX_SUPPLY - MAX_GIFT;

    // the price of the whitelist sale
    uint256 public wlSalePrice = 0.001 ether;

    // price of public sale
    uint256 public publicSalePrice = 0.0015 ether;

    // whitelist sale start date convert to timestamp
    uint256 public saleStartTime = 1649491206;

    // store in the smart contract the root of the merkle tree
    bytes32 public merkleRoot;

    // it will allow us to do the reveal, address of the server on which the metadata of the NFTs are stored
    string public baseURI;

    // mapping which will allow us to know how many NFTs an address has minted during the Whitelist sales
    mapping(address => uint256) amountNFTperWalletWhitelistSale;

    // mapping which will allow us to know how many NFTs an address has minted during the public sales
    mapping(address => uint256) amountNFTperWalletPublicSale;

    // the number of NFTs a user can mint during the whitelist
    uint256 private constant maxPerAddressDuringWhitelistMint = 1;

    // the number of NFTs a user can mint during the public sale
    uint256 private constant maxPerAddressDuringPublicMint = 3;

    // manage the pause mode of our smart contract ex: the site is down
    bool public isPaused;

    // how many addresses of team members have been passed to make the payment
    uint256 private teamLength;

    // table of team addresses
    address[] private _team = [
        0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097,
        0xcd3B766CCDd6AE721141F452C550Ca635964ce71
    ];

    // earnings of the team members
    uint256[] private _teamShares = [700, 295];

    //Constructor
    constructor(bytes32 _merkleRoot, string memory _baseURI)
        ERC721A("Ladies Gang", "LG")
        PaymentSplitter(_team, _teamShares)
    {
        merkleRoot = _merkleRoot;
        baseURI = _baseURI;
        teamLength = _team.length;
    }

    /**
     * @notice This contract can't be called by other contract
     */
    modifier callerIsUser() {
        require(tx.origin == msg.sender, "The caller is another contract");
        _;
    }

    /**
     * @notice Mint function for the Whitelist Sale
     * @param _account Account which will receive the NFT
     * @param _quantity Amount of NFTs the user wants to mint
     * @param _proof The Merkle Proof
     */
    function whitelistMint(
        address _account,
        uint256 _quantity,
        bytes32[] calldata _proof
    ) external payable callerIsUser {
        require(!isPaused, "Contract is paused");
        require(currentTime() >= saleStartTime, "Sale has not started yet");
        require(currentTime() < saleStartTime + 12 hours, "Sale is finished");
        uint256 price = wlSalePrice;
        require(price != 0, "Price is 0");
        require(
            sellingStep == Step.WhitelistSale,
            "Whitelist sale is not activated"
        );
        require(isWhitelisted(_account, _proof), "Not whitelisted");
        require(
            amountNFTperWalletWhitelistSale[msg.sender] + _quantity <=
                maxPerAddressDuringWhitelistMint,
            "You can only get 1 NFT on the Whitelist Sale"
        );
        require(
            totalSupply() + _quantity <= MAX_WHITELIST,
            "Max supply exceeded"
        );
        require(msg.value >= price * _quantity, "Not enought funds");
        amountNFTperWalletWhitelistSale[msg.sender] += _quantity;
        _safeMint(_account, _quantity);
    }

    /**
     * @notice Mint function for the Public Sale
     * @param _account Account which will receive the NFT
     * @param _quantity Amount of NFTs the user wants to mint
     */
    function publicMint(address _account, uint256 _quantity)
        external
        payable
        callerIsUser
    {
        require(!isPaused, "Contract is paused");
        require(
            currentTime() >= saleStartTime + 24 hours,
            "Public sale has not started yet"
        );
        require(
            currentTime() < saleStartTime + 48 hours,
            "Public sale is finished"
        );
        uint256 price = publicSalePrice;
        require(price != 0, "Price is 0");
        require(sellingStep == Step.PublicSale, "Public sale is not activated");
        require(
            amountNFTperWalletPublicSale[msg.sender] + _quantity <=
                maxPerAddressDuringPublicMint,
            "You can only get 3 NFT on the Public Sale"
        );
        require(
            totalSupply() + _quantity <= MAX_SUPPLY_MINUS_GIFT,
            "Max supply exceeded"
        );
        require(msg.value >= price * _quantity, "Not enought funds");
        amountNFTperWalletPublicSale[msg.sender] += _quantity;
        _safeMint(_account, _quantity);
    }

    /**
     * @notice Allows the owner to gift NFTs
     * @param _to The address of the receiver
     * @param _quantity Amount of NFTs the user wants to gift
     */
    function gift(address _to, uint256 _quantity) external onlyOwner {
        require(sellingStep > Step.PublicSale, "Gift is after the public Sale");
        require(totalSupply() + _quantity <= MAX_SUPPLY, "Reached max supply");
        _safeMint(_to, _quantity);
    }

    /**
     * @notice Get the token URI of an NFT by his ID
     * @param _tokenId The ID of the NFT you want to have to have the URI of the metadatas
     * @return the token URI of an NFT by his ID
     */
    function tokenURI(uint256 _tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(_exists(_tokenId), "URI query for nonexistent token");
        return string(abi.encodePacked(baseURI, _tokenId.toString(), ".json"));
    }

    /**
     * @notice Allows to modify the whitelist sale price
     * @param _wlSalePrice The new price of one NFT during the whitelist sale
     */
    function setWlSalePrice(uint256 _wlSalePrice) external onlyOwner {
        wlSalePrice = _wlSalePrice;
    }

    /**
     * @notice Allows to modify the public sale price
     * @param _publicSalePrice The new price of one NFT during the public sale
     */
    function setPublicSalePrice(uint256 _publicSalePrice) external onlyOwner {
        publicSalePrice = _publicSalePrice;
    }

    /**
     * @notice Change the starting time (timestamp) of the whitelist sale
     * @param _saleStartTime The new starting timestamp of the whitelist sale
     */
    function setSaleStartTime(uint256 _saleStartTime) external onlyOwner {
        saleStartTime = _saleStartTime;
    }

    /**
     * @notice Get the current timestamp
     * @return the current timestamp
     */
    function currentTime() internal view returns (uint256) {
        return block.timestamp;
    }

    /**
     * @notice Change the step of the sale
     * @param _step The new step of the sale
     */
    function setStep(uint256 _step) external onlyOwner {
        sellingStep = Step(_step);
    }

    /**
     * @notice Pause or unpause the smart contract
     * @param _isPaused true or false if we want to pause or unpause the contract
     */
    function setPaused(bool _isPaused) external onlyOwner {
        isPaused = _isPaused;
    }

    /**
     * @notice Change the base URI of the NFTs
     * @param _baseURI the new base URI of the NFTs
     */
    function setBaseURI(string memory _baseURI) external onlyOwner {
        baseURI = _baseURI;
    }

    /**
     * @notice Change the merkle root
     * @param _merkleRoot the new MerkleRoot
     */
    function setMerkleRoot(bytes32 _merkleRoot) external onlyOwner {
        merkleRoot = _merkleRoot;
    }

    /**
     * @notice Hash an address
     * @param _account The address to be hashed
     * @return bytes32 The hashed address
     */
    function leaf(address _account) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(_account));
    }

    /**
     * @notice Returns true is a leaf can be proved to be part of a merkle tree defined by root
     * @param _leaf The leaf
     * @param _proof The Merkle Proof
     * @return True if a leaf can be proved to be a part of a merkle tree defined by root
     */
    function _verify(bytes32 _leaf, bytes32[] memory _proof)
        internal
        view
        returns (bool)
    {
        return MerkleProof.verify(_proof, merkleRoot, _leaf);
    }

    /**
     * @notice Check if an address is whitelisted or not
     * @param _account The account checked
     * @param _proof The Merkle Proof
     * @return bool return true if the address is whitelisted, false otherwise
     */
    function isWhitelisted(address _account, bytes32[] calldata _proof)
        internal
        view
        returns (bool)
    {
        return _verify(leaf(_account), _proof);
    }

    /**
     * @notice Release the gains on every account. We have just to call it and it release the gains
     */
    function releaseAll() external {
        for (uint256 i = 0; i < teamLength; i++) {
            release(payable(payee(i)));
        }
    }

    // Not allowing receiving ethers outside minting functions
    receive() external payable override {
        revert("Only if you mint");
    }
}
