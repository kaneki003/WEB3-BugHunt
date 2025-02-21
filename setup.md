# 🕷️ Bughunt Event - Day 4: Web3 Edition 🚀  

Welcome to **Day 4 of the Bughunt Event**, where we dive into the world of **Web3 and Smart Contracts!** Your mission is to **hunt down bugs** hidden within the **controller functions** responsible for interacting with the blockchain. Every bug you uncover and fix will earn you points! 🎯  

---

## 🔍 What’s the Challenge?  
We've intentionally introduced **bugs** in various **controller functions** that interact with a **smart contract deployed on the blockchain**. These bugs could involve:  
- Incorrect **contract function calls**  
- Mishandling of **transaction responses**  
- **Security vulnerabilities**  
- **Logic errors** in how data is retrieved or stored  

Your job is to **find and fix** these bugs to ensure smooth interaction with the blockchain! 🛠️  

---

## ⚡ How to Test Your Fixes  
Follow these steps to set up your environment and test your changes effectively:  

### 1️⃣ Install Dependencies  
```bash
npm i
```

### 2️⃣ Start a Local Blockchain (Using Hardhat) 
```bash
npx hardhat node
```
This will launch a local blockchain, simulating a real Ethereum network.

### 3️⃣ Use the Predefined Signer for Testing
- A signer with 1000 ETH is available for testing.
- Check blockchain.js to find the private key.
- You can use this signer to send transactions and debug contract interactions.
- Understand contract functioning to better understand the logic behind each function. 
- Deploy contract on local blockchain and interact with it to ensure the functions are working as they supposed to be.

### 4️⃣ Test Your Fixes
- Look at testing.js under the test/ directory for example tests.
- Run your tests and validate if the controller functions now work correctly.

Let’s see who the ultimate **Web3 bug hunter** is! 🔥 Happy debugging! 🐞🔨
