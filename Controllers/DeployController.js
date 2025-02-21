const { ethers } = require("hardhat");

// Returns the address to deployed contract
async function deployPoolFactory(signer) {
  const Contract = await ethers.getContractFactory("PoolFactory", signer);
  const contract = await Contract.deploy();
  return contract;
}

// Returns the address to deployed contract
async function deployMockToken(tokenName, tokenSymbol, signer) {
  const MockToken = await ethers.getContractFactory("MockToken", signer);
  const token = await MockToken.deploy(
    tokenSymbol, //error in parameter order
    tokenName,
    ethers.parseEther("1000")
  );
  return token;
}

module.exports = {
  deployPoolFactory,
  deployMockToken,
};
