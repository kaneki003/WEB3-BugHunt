const { ethers } = require("hardhat");
const signer = require("../Token-Swap-Platform/Backend/blockChain.js");
const { deployPoolFactory } = require("../Token-Swap-Platform/Backend/Controllers/DeployController.js");
const { mintMockToken } = require("../Token-Swap-Platform/Backend/Controllers/TokenController.js");
const {
    createPool,
    getPool,
  } = require("../Token-Swap-Platform/Backend/Controllers/PoolFactoryController.js");
  const {
    getPrice,
    getlp,
    getReserves,
  } = require("../Token-Swap-Platform/Backend/Controllers/LiquidityPoolController.js");



async function main(){
    const contract = await deployPoolFactory(signer);
    console.log("contract is deployed at:", contract);
}

main();