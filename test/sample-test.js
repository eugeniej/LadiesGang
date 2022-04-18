const { ethers } = require("hardhat");
const { MerkleTree} = require('merkletreejs');
const keccak256 = require('keccak256');
let chai = require('chai');
const { expect } = require("chai");
const tokens = require('../tokens.json');

describe("Tests Ladies Gang ERC721A", function () {
  before(async function() {
    [this.owner, this.addr1, this.addr2, this.addr3, ... this.addrs] = await ethers.getSigners();
    console.log('this.addr1.address', this.addr1.address);
    console.log('this.addr2.address', this.addr2.address);

    let tab = [];
    tokens.map((token) => {
      tab.push(token.address);
    });
    const leaves = tab.map((address) => keccak256(address));
    this.tree = new MerkleTree(leaves, keccak256, {sort: true});
    const root = this.tree.getHexRoot();
    this.merkleTreeRoot = root;
  })

  it("Should deploy the smart contract", async function () {
    this.baseURI = "ipfs://CID/";
    this.contract = await hre.ethers.getContractFactory("LadiesGangERC721A");
    this.deployedContract = await this.contract.deploy(this.merkleTreeRoot, this.baseURI);
  });

  it("sellingStep should equal 0 after deploying the smart contract", async function () {
    expect(await this.deployedContract.sellingStep()).to.equal(0);
  });

  it("merkleRoot should be defined and have a length of 66", async function () {
    expect(await this.deployedContract.merkleRoot()).to.have.lengthOf(66);
  });

  it("Should not change the sellingStep if NOT THE OWNER", async function () {
    await expect(this.deployedContract.connect(this.addr1).setStep(1)).to.be.revertedWith('Ownable: caller is not the owner');
  });

  it("Should set the saleStartTime", async function () {
    let saleStartTime = 1649492706;
    await this.deployedContract.setSaleStartTime(saleStartTime);
    expect(await this.deployedContract.saleStartTime()).to.equal(saleStartTime);
  });

  it("Should change the step to 1 (Whitelist Sale)", async function () {
    await this.deployedContract.setStep(1)
    expect(await this.deployedContract.sellingStep()).to.equal(1);
  });

  it("Should mint one NFT on the whitelist sale if the user is whitelisted", async function () {
    const leaf = keccak256(this.addr1.address);
    const proof = this.tree.getHexProof(leaf);

    let price = await this.deployedContract.wlSalePrice();

    const overrides = {
      value: price
    }

    await this.deployedContract.connect(this.addr1).whitelistMint(this.addr1.address, 1, proof, overrides)
  });

  it("Should not mint more than one NFT on the whitelist sale if the user is whitelisted", async function () {
    const leaf = keccak256(this.addr1.address);
    const proof = this.tree.getHexProof(leaf);

    let price = await this.deployedContract.wlSalePrice();
    let finalPrice = price.mul(2);

    const overrides = {
      value: finalPrice
    }

    await expect(this.deployedContract.connect(this.addr1).whitelistMint(this.addr1.address, 2, proof, overrides)).to.be.revertedWith('You can only get 1 NFT on the Whitelist Sale');
  });

  it("Should not mint one NFT on the whitelist sale if the user is not whitelisted", async function () {
    const leaf = keccak256(this.addr3.address);
    const proof = this.tree.getHexProof(leaf);

    let price = await this.deployedContract.wlSalePrice();

    const overrides = {
      value: price
    }

    await expect(this.deployedContract.connect(this.addr3).whitelistMint(this.addr3.address, 1, proof, overrides)).to.be.revertedWith('Not whitelisted');
  });

  it("Should get the totalSupply and the totalSupply should be equal to 1", async function () {
    expect( await this.deployedContract.totalSupply()).to.equal(1);
  });

  it("Should change the step to 2 (Public Sale)", async function () {
    await this.deployedContract.setStep(2)
    expect(await this.deployedContract.sellingStep()).to.equal(2);
  });

  it("Should set the saleStartTime", async function () {
    let saleStartTime = 1649492706 - 30 * 60 * 60;
    await this.deployedContract.setSaleStartTime(saleStartTime);
    expect(await this.deployedContract.saleStartTime()).to.equal(saleStartTime);
  });

  it("Should mint three NFT during the public sale", async function () {
    let price = await this.deployedContract.publicSalePrice();
    let finalPrice = price.mul(3);

    const overrides = {
      value: finalPrice
    }

    await this.deployedContract.connect(this.addr1).publicMint(this.addr1.address, 3, overrides)
  });
  
  it("Should not mint more than three NFT during the public sale", async function () {
    let price = await this.deployedContract.publicSalePrice();
    let finalPrice = price.mul(4);
    
    const overrides = {
      value: finalPrice
    }
    
    await expect(this.deployedContract.connect(this.addr1).publicMint(this.addr1.address, 4, overrides)).to.be.revertedWith('You can only get 3 NFT on the Public Sale');
  });
  
  it("Should not mint NFT during the public sale if you dont have enough funds", async function () {
    let price = await this.deployedContract.publicSalePrice();
    
    const overrides = {
      value: price
    }
    await expect(this.deployedContract.connect(this.addr3).publicMint(this.addr3.address, 3, overrides)).to.be.revertedWith('Not enought funds');
  });
});
