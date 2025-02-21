// SPDX-License-Identifier: UNLICENSED

// Factory Contract
pragma solidity ^0.8.27;

import "./LiquidityPool.sol";

contract PoolFactory {
    // Track all pools by token pair
    mapping(address => mapping(address => address)) public getPool;
    address[] public allPools;

    event PoolCreated(
        address indexed tokenA,
        address indexed tokenB,
        address pool
    );

    function createPool(
        address tokenA,
        address tokenB
    ) external returns (address pool) {
        require(tokenA != tokenB, "Tokens must be different");
        require(getPool[tokenA][tokenB] == address(0), "Pool already exists!");

        // Deploy a new liquidity pool contract
        LiquidityPool newPool = new LiquidityPool(tokenA, tokenB);

        // Save the pool in mappings
        getPool[tokenA][tokenB] = address(newPool);
        getPool[tokenB][tokenA] = address(newPool); // for both directions
        allPools.push(address(newPool));

        emit PoolCreated(tokenA, tokenB, address(newPool));
        return address(newPool);
    }

    // Optional: Fetch number of pools created
    function allPoolsLength() external view returns (uint256) {
        return allPools.length;
    }
}
