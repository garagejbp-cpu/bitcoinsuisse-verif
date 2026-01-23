// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title TestUSDC
 * @dev Token ERC-20 avec fonction Permit (EIP-2612) pour tests sur Sepolia
 * Simule USDC avec la fonctionnalité Permit native
 */
contract TestUSDC is ERC20, ERC20Permit, Ownable {
    uint8 private _decimals;

    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) ERC20(name, symbol) ERC20Permit(name) Ownable(msg.sender) {
        _decimals = 6; // USDC utilise 6 décimales
        _mint(msg.sender, initialSupply * 10**_decimals);
    }

    /**
     * @dev Permet au owner de créer des tokens supplémentaires
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount * 10**_decimals);
    }

    /**
     * @dev Override pour utiliser 6 décimales comme USDC
     */
    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }
}
