const { ethers } = require("hardhat");

async function mintMockToken(tokenAddress, amount, recipientAddress, signer) {
  const token = await ethers.getContractAt("MockToken", tokenAddress);
  const tx = await token
    .connect(signer)
    .getTokens(ethers.parseEther(amount.toString()), recipientAddress);
  // await tx.wait(); //error in  not waiting for tx to comlete
  return tx;
}

module.exports = {
  mintMockToken,
};
