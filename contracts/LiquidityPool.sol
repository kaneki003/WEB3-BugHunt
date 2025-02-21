// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract LiquidityPool {
    address public tokenA;
    address public tokenB;

    uint256 public reserveA;
    uint256 public reserveB;
    uint256 public totalSupplyLPTokens; // Total supply of LP tokens
    uint256 public feePercentage = 30; //0.3% fee
    mapping(address => uint256) public balanceOf; // Mapping of provider's LP token balance

    constructor(address _tokenA, address _tokenB) {
        tokenA = _tokenA;
        tokenB = _tokenB;
    }

    function transferFrom(
        address token,
        address from,
        address to,
        uint256 amount
    ) private {
        require(
            IERC20(token).transferFrom(from, to, amount),
            "Transfer failed"
        );
    }

    function Reserves() external view returns (uint256, uint256) {
        return (reserveA, reserveB);
    }

    function addLiquidity(uint256 amountA, uint256 amountB) external {
        require(amountA > 0 && amountB > 0, "Amount must be greater than zero");

        if (reserveA == 0 && reserveB == 0) {
            reserveA = amountA;
            reserveB = amountB;

            totalSupplyLPTokens = amountA; //assuming 1:1 issuance of LP tokens
            balanceOf[msg.sender] = amountA;
        } else {
            uint256 currentRatio = reserveB / reserveA;

            require(
                amountA * currentRatio == amountB,
                "Invalid liquidity, pool ratio is not maintained"
            ); //Product must remain constant

            uint256 liquidity = (amountA * totalSupplyLPTokens) / reserveA;
            totalSupplyLPTokens += liquidity;
            balanceOf[msg.sender] += liquidity;

            reserveA += amountA;
            reserveB += amountB;
        }

        transferFrom(tokenA, msg.sender, address(this), amountA);
        transferFrom(tokenB, msg.sender, address(this), amountB);
    }

    function removeLiquidity(uint256 lpTokenAmount) external {
        require(lpTokenAmount > 0, "Amount must be greater than zero");
        require(balanceOf[msg.sender] >= lpTokenAmount, "Insufficient balance");

        uint256 amountA = (lpTokenAmount * reserveA) / totalSupplyLPTokens;
        uint256 amountB = (lpTokenAmount * reserveB) / totalSupplyLPTokens;

        reserveA -= amountA;
        reserveB -= amountB;

        totalSupplyLPTokens -= lpTokenAmount;
        balanceOf[msg.sender] -= lpTokenAmount;

        IERC20(tokenA).transfer(msg.sender, amountA);
        IERC20(tokenB).transfer(msg.sender, amountB);
    }

    function swap(address inputToken, uint256 amountIn) external {
        require(amountIn > 0, "Amount must be greater than zero");
        require(inputToken == tokenA || inputToken == tokenB, "Invalid token");

        if (inputToken == address(tokenA)) {
            uint256 amountOut = getAmountOut(amountIn, reserveA, reserveB);

            uint256 fee = (amountOut * feePercentage) / 10000;
            amountOut -= fee;

            require(amountOut <= reserveB, "Insufficient liquidity");

            transferFrom(inputToken, msg.sender, address(this), amountIn);

            IERC20(tokenB).transfer(msg.sender, amountOut);

            reserveA += amountIn;
            reserveB -= amountOut;
        } else {
            uint256 amountOut = getAmountOut(amountIn, reserveB, reserveA);

            uint256 fee = (amountOut * feePercentage) / 10000;
            amountOut -= fee;

            require(amountOut <= reserveA, "Insufficient liquidity");

            transferFrom(inputToken, msg.sender, address(this), amountIn);

            IERC20(tokenA).transfer(msg.sender, amountOut);

            reserveB += amountIn;
            reserveA -= amountOut;
        }
    }

    function getPrice(bool isAToB) external view returns (uint256) {
        require(reserveA > 0 && reserveB > 0, "Insufficient reserves");

        if (isAToB) {
            return (reserveB * 10 ** 18) / reserveA;
        } else {
            return (reserveA * 10 ** 18) / reserveB;
        }
    }

    function getAmountOut(
        uint256 amountIn,
        uint256 reserveIn,
        uint256 reserveOut
    ) private pure returns (uint256) {
        require(amountIn > 0, "Amount in must be greater than 0");
        require(reserveIn > 0 && reserveOut > 0, "Insufficient reserves");

        // Calculate output amount using the constant product formula
        uint256 numerator = amountIn * reserveOut;
        uint256 denominator = reserveIn + amountIn; // Prevent division by zero
        return numerator / denominator;
    }
}
