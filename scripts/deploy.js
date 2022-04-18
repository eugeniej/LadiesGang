// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const tokens = require("../tokens.json");

async function main() {
  // Merkle tree
  let tab = [];
  tokens.map((token) => {
    tab.push(token.address);
  });
  const leaves = tab.map((address) => keccak256(address));
  const tree = new MerkleTree(leaves, keccak256, { sort: true });
  const root = tree.getHexRoot();

  // CID of the json on Pinata
  const baseURI = "ipfs://QmPHuCvZiYCdGjGPsBQzTQXybf6zELxoFET27HrUj9KWqb/";

  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Contract = await hre.ethers.getContractFactory("LadiesGangERC721A");
  const contract = await Contract.deploy(root, baseURI);

  await contract.deployed();

  console.log(
    "Contract deployed to:",
    contract.address + ` - root ${root} baseURI ${baseURI}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
