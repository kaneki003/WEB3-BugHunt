const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const privateKey =
  "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e";

function wallet(privateKey) {
  const PRIVATE_KEY = privateKey;
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  return wallet;
}

const signer = wallet(privateKey);

module.exports = { signer };
