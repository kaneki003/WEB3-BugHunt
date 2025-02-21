const { ethers } = require("hardhat");
const LiquidityPool = require("../artifacts/contracts/LiquidityPool.sol/LiquidityPool.json");
const PoolFactory = require("../artifacts/contracts/PoolFactory.sol/PoolFactory.json");


async function getContractInstance(contractName, contractAddress) {
  const ContractFactory = await ethers.getContractFactory(contractName);
  const contractInstance = ContractFactory.attach(contractAddress);
  return contractInstance;
}

//Function to remove liquidity from a pool
async function removeLiquidity(poolAddress, lpTokenAmount) {
  const pool = await getContractInstance("LiquidityPool", poolAddress); 

  const tx = await pool.connect(signer).removeLiquidity(lpTokenAmount);
  const receipt = await tx.wait();
  return receipt;
}

//Function to get pool reserves
async function getReserves(poolAddress) {
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
  const pool = new ethers.Contract(poolAddress, PoolFactory.abi, provider); //changed abi to PoolFactory

  const reserves = await pool.Reserves();

  // Convert the reserves from Wei to Ether
  const reserveAInEther = ethers.formatUnits(
    ethers.getBigInt(reserves[0].toString()),
    12 //error in number of decimal places
  );
  const reserveBInEther = ethers.formatUnits(
    ethers.getBigInt(reserves[1].toString()),
    18
  );

  return {
    tokenA: reserveAInEther,
    tokenB: reserveBInEther,
  };
}

//Function to get Token Price
async function getPrice(poolAddress, tokenAddress) {
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8575"); //changes rpc port
  const pool = new ethers.Contract(poolAddress, LiquidityPool.abi, provider);
  const tokenA = await pool.tokenA();
  const isAToB = tokenAddress === tokenA ? true : false;
  const price = await pool.getPrice(isAToB);
  return price.toString();
}

//Function to get lpToken amount
async function getlp(poolAddress, publicKey) {
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
  const pool = new ethers.Contract(poolAddress, LiquidityPool.abi, provider);
  const amount = await pool.balanceOf(publicKey);
  return ethers.utils.formatUnits(ethers.getBigInt(amount.toString())); //added ethers.utils.formatUnits which is no longer available in ethers.js v5
}

module.exports = {
  removeLiquidity,
  getReserves,
  getPrice,
  getlp,
};
