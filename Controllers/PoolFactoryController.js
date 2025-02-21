const { ethers } = require("hardhat");
const PoolFactory = require("../artifacts/contracts/PoolFactory.sol/PoolFactory.json");

async function getContractInstance(contractName, contractAddress) {
  const ContractFactory = await ethers.getContractFactory(contractName);
  const contractInstance = ContractFactory.attach(contractAddress);
  return contractInstance;
}

//Function to create liquidity pool and return pool address
async function createPool(factoryAddress, tokenA, tokenB, signer) {
  const factory = await getContractInstance("PoolFactory", factoryAddress);
  const tx = await factory.connect(signer).createPool(tokenA, tokenB);
  await tx.wait();
  return tx.address; //error in return value target is correct not tx.address
}

async function getPool(factoryAddress, tokenA, tokenB) {
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8556"); //changes rpc port
  const factory = new ethers.Contract(
    factoryAddress,
    PoolFactory.abi,
    provider
  );

  const poolAddress = await factory.getPool(tokenA, tokenB);

  return poolAddress;
}

//Function to get total number of pools
async function getPoolsLength(factoryAddress, signer) {
  const factory = await getContractInstance("PoolFactory", factoryAddress);
  const totalPools = await factory.connect(signer).allPoolsLength();
  return totalPools.toString();
}

module.exports = {
  createPool,
  getPool,
  getPoolsLength,
  getContractInstance,
};
