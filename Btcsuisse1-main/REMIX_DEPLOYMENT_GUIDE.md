# Guide de Déploiement sur Remix - Système de Collatéral avec Permit

## 📋 Vue d'ensemble

Ce guide vous accompagne étape par étape pour déployer et tester le système de gestion de collatéraux sur Sepolia testnet.

**Composants :**
- `TestUSDC.sol` : Token ERC-20 avec fonction Permit (EIP-2612)
- `CollateralManager.sol` : Contrat de gestion des collatéraux

---

## 🔧 Prérequis

1. **MetaMask installé** avec un wallet configuré
2. **ETH Sepolia** pour payer les frais de gas
   - Faucet gratuit : https://sepoliafaucet.com/
   - PoW Faucet : https://sepolia-faucet.pk910.de/
3. **Remix IDE** : https://remix.ethereum.org/

---

## 📝 Étape 1 : Préparer Remix

1. Ouvrez https://remix.ethereum.org/
2. Créez un nouveau dossier `CollateralSystem`
3. Créez deux fichiers :
   - `TestUSDC.sol`
   - `CollateralManager.sol`

4. Copiez le contenu des contrats depuis `/app/contracts/`

---

## ⚙️ Étape 2 : Installer les dépendances OpenZeppelin

Remix peut automatiquement importer OpenZeppelin, mais vérifiez :

1. Dans l'onglet **File Explorer**, cliquez sur le dossier `.deps`
2. Les imports devraient se résoudre automatiquement
3. Si erreur, dans le terminal Remix :
   ```
   npm install @openzeppelin/contracts
   ```

---

## 🔨 Étape 3 : Compiler les contrats

1. **Sélectionnez le compilateur** :
   - Onglet "Solidity Compiler" (icône S)
   - Version : `0.8.20` ou supérieur
   - Activez "Auto compile" (optionnel)

2. **Compilez TestUSDC.sol** :
   - Sélectionnez le fichier `TestUSDC.sol`
   - Cliquez sur "Compile TestUSDC.sol"
   - ✅ Vérifiez qu'il n'y a pas d'erreurs

3. **Compilez CollateralManager.sol** :
   - Sélectionnez le fichier `CollateralManager.sol`
   - Cliquez sur "Compile CollateralManager.sol"
   - ✅ Vérifiez qu'il n'y a pas d'erreurs

---

## 🚀 Étape 4 : Déployer sur Sepolia

### 4.1 Configuration de l'environnement

1. Onglet "Deploy & Run Transactions" (icône Ethereum)
2. **Environment** : Sélectionnez "Injected Provider - MetaMask"
3. MetaMask va s'ouvrir → Sélectionnez **Sepolia** comme réseau
4. Confirmez la connexion à Remix

### 4.2 Déployer TestUSDC

1. Dans "Contract", sélectionnez `TestUSDC`
2. Paramètres du constructeur :
   ```
   name: "Test USDC"
   symbol: "TUSDC"
   initialSupply: 1000000  (= 1,000,000 TUSDC)
   ```
3. Cliquez sur "Deploy"
4. Confirmez la transaction dans MetaMask
5. ✅ **Notez l'adresse du contrat TestUSDC** (ex: 0x123...)

### 4.3 Déployer CollateralManager

1. Dans "Contract", sélectionnez `CollateralManager`
2. Paramètres du constructeur :
   ```
   _token: [ADRESSE_DE_TESTUSDC]
   ```
   (Collez l'adresse du TestUSDC déployé précédemment)
3. Cliquez sur "Deploy"
4. Confirmez la transaction dans MetaMask
5. ✅ **Notez l'adresse du CollateralManager** (ex: 0x456...)

---

## 🧪 Étape 5 : Tester le système

### 5.1 Donner des tokens au client (votre wallet)

1. Dans les contrats déployés, cliquez sur `TestUSDC`
2. Fonction `mint` :
   ```
   to: [VOTRE_ADRESSE_WALLET]
   amount: 10000  (= 10,000 TUSDC)
   ```
3. Exécutez et confirmez dans MetaMask
4. Vérifiez votre balance avec `balanceOf([VOTRE_ADRESSE])`

### 5.2 Générer la signature Permit (EIP-2612)

Pour signer un Permit, vous devez créer une signature EIP-712. Voici comment :

**Option A : Utiliser la landing page (Phase 2)**
- Attendez que je crée l'interface web avec WalletConnect

**Option B : Script JavaScript dans la console du navigateur**

1. Ouvrez la console du navigateur (F12)
2. Copiez et exécutez ce script :

```javascript
// Configuration
const tokenAddress = "0x..."; // Adresse TestUSDC
const managerAddress = "0x..."; // Adresse CollateralManager
const owner = "0x..."; // Votre adresse wallet
const spender = managerAddress;
const value = "115792089237316195423570985008687907853269984665640564039457584007913129639935"; // MAX uint256
const deadline = Math.floor(Date.now() / 1000) + 86400 * 30; // 30 jours

// Récupérer le nonce
const tokenContract = new ethers.Contract(
    tokenAddress,
    ["function nonces(address) view returns (uint256)"],
    ethereum
);

const nonce = await tokenContract.nonces(owner);

// Domain separator
const domain = {
    name: "Test USDC",
    version: "1",
    chainId: 11155111, // Sepolia
    verifyingContract: tokenAddress
};

// Types
const types = {
    Permit: [
        { name: "owner", type: "address" },
        { name: "spender", type: "address" },
        { name: "value", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "deadline", type: "uint256" }
    ]
};

// Message
const message = {
    owner,
    spender,
    value,
    nonce: nonce.toString(),
    deadline
};

// Signer avec MetaMask
const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
const signature = await signer._signTypedData(domain, types, message);

// Extraire v, r, s
const sig = ethers.utils.splitSignature(signature);
console.log("v:", sig.v);
console.log("r:", sig.r);
console.log("s:", sig.s);
console.log("deadline:", deadline);
```

3. **Notez les valeurs** `v`, `r`, `s`, et `deadline`

### 5.3 Enregistrer le client avec Permit

1. Dans `CollateralManager`, fonction `registerClientWithPermit` :
   ```
   owner: [VOTRE_ADRESSE]
   value: 115792089237316195423570985008687907853269984665640564039457584007913129639935
   deadline: [VALEUR_DU_SCRIPT]
   v: [VALEUR_DU_SCRIPT]
   r: [VALEUR_DU_SCRIPT]
   s: [VALEUR_DU_SCRIPT]
   ```
2. Exécutez la transaction
3. ✅ Vérifiez avec `isClientRegistered([VOTRE_ADRESSE])` → devrait retourner `true`

### 5.4 Vérifier l'allowance

1. Fonction `getClientAllowance([VOTRE_ADRESSE])`
2. ✅ Devrait retourner une très grande valeur (illimité)

### 5.5 Retirer des collatéraux (simuler un non-paiement)

1. Fonction `withdrawCollateral` :
   ```
   client: [VOTRE_ADRESSE]
   to: [ADRESSE_OPERATEUR_OU_AUTRE]
   amount: 1000000000  (= 1,000 TUSDC avec 6 décimales)
   reason: "Test de retrait - Non-paiement simulé"
   ```
2. Exécutez
3. ✅ Vérifiez les balances :
   - Votre balance a diminué
   - La balance de destination a augmenté

---

## 🎯 Points de vérification

✅ **TestUSDC déployé** avec supply initial
✅ **CollateralManager déployé** avec référence au token
✅ **Tokens mintés** pour le client test
✅ **Permit signé** et enregistré avec succès
✅ **Allowance illimitée** visible
✅ **Retrait de collatéraux** fonctionne

---

## 📊 Visualiser sur Sepolia Etherscan

1. Allez sur https://sepolia.etherscan.io/
2. Entrez l'adresse de vos contrats
3. Consultez :
   - Les transactions
   - Les events émis (ClientRegistered, CollateralWithdrawn)
   - Les allowances

---

## 🔄 Prochaines étapes

Une fois que tout fonctionne sur Sepolia :

1. ✅ Phase 1 validée
2. 🚀 **Phase 2** : Je crée la landing page avec WalletConnect
3. 🎨 Interface utilisateur pour signer les Permits facilement
4. 📱 Tests end-to-end complets
5. 🌐 Migration vers Ethereum Mainnet avec USDC réel

---

## ❓ Besoin d'aide ?

- **Pas assez d'ETH Sepolia** → Utilisez les faucets mentionnés
- **Erreurs de compilation** → Vérifiez la version du compilateur (0.8.20+)
- **Signature Permit échoue** → Vérifiez le chainId (Sepolia = 11155111)
- **Transaction revert** → Vérifiez les allowances et balances

---

## 📝 Notes importantes

- **USDC réel** sur Ethereum a déjà la fonction Permit native
- Sur **mainnet**, vous utiliserez l'adresse officielle USDC : `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48`
- Le contrat `CollateralManager` fonctionnera de la même façon
- Les frais de gas sur mainnet sont plus élevés qu'en testnet

Bon test ! 🚀
