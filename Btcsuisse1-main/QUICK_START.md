# 🎯 Guide Rapide - Déployer sur Remix (Sepolia)

## ⚡ Démarrage Rapide

### Étape 1 : Préparer votre wallet
1. ✅ Installez MetaMask : https://metamask.io/
2. ✅ Obtenez de l'ETH Sepolia GRATUIT :
   - https://sepoliafaucet.com/
   - https://sepolia-faucet.pk910.de/
3. ✅ Changez le réseau MetaMask vers "Sepolia"

### Étape 2 : Ouvrir Remix
1. Allez sur : https://remix.ethereum.org/
2. Créez un nouveau fichier `TestUSDC.sol`
3. Copiez le contrat depuis `/app/contracts/TestUSDC.sol`
4. Créez un autre fichier `CollateralManager.sol`  
5. Copiez le contrat depuis `/app/contracts/CollateralManager.sol`

### Étape 3 : Compiler
1. Cliquez sur l'icône "Solidity Compiler" (à gauche)
2. Version : **0.8.20** ou supérieur
3. Compilez `TestUSDC.sol` → ✅ OK
4. Compilez `CollateralManager.sol` → ✅ OK

### Étape 4 : Déployer TestUSDC
1. Cliquez sur "Deploy & Run Transactions"
2. Environment : **Injected Provider - MetaMask**
3. Connectez MetaMask (choisissez Sepolia)
4. Contract : Sélectionnez `TestUSDC`
5. Constructor parameters :
   ```
   name: "Test USDC"
   symbol: "TUSDC"
   initialSupply: 1000000
   ```
6. Cliquez **Deploy**
7. Confirmez dans MetaMask
8. ✅ **NOTEZ L'ADRESSE** du contrat déployé (ex: 0x123...)

### Étape 5 : Déployer CollateralManager
1. Contract : Sélectionnez `CollateralManager`
2. Constructor parameters :
   ```
   _token: [COLLEZ_ADRESSE_TESTUSDC]
   ```
3. Cliquez **Deploy**
4. Confirmez dans MetaMask
5. ✅ **NOTEZ L'ADRESSE** du CollateralManager (ex: 0x456...)

### Étape 6 : Donner des tokens à votre wallet
1. Dans les contrats déployés, développez `TestUSDC`
2. Fonction `mint` :
   ```
   to: [VOTRE_ADRESSE_WALLET]
   amount: 10000
   ```
3. Exécutez → Confirmez dans MetaMask
4. Vérifiez votre balance avec `balanceOf([VOTRE_ADRESSE])`

---

## 🔐 Signer un Permit (2 options)

### Option A : Attendez la Phase 2 (Recommandé)
Je vais créer une interface web qui fait tout automatiquement :
- Bouton "Connect Wallet"
- Bouton "Valider le smart contract" (signe le Permit)
- Affichage de l'allowance

### Option B : Manuel (pour tester maintenant)

Ouvrez la console du navigateur (F12) et exécutez :

```javascript
// Configuration
const tokenAddress = "0x..."; // Votre adresse TestUSDC
const managerAddress = "0x..."; // Votre adresse CollateralManager
const owner = "0x..."; // Votre adresse wallet

// Connecter ethers
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// Récupérer le nonce
const tokenABI = ["function nonces(address) view returns (uint256)"];
const tokenContract = new ethers.Contract(tokenAddress, tokenABI, provider);
const nonce = await tokenContract.nonces(owner);

// Préparer la signature Permit
const deadline = Math.floor(Date.now() / 1000) + 86400 * 30; // 30 jours
const value = ethers.constants.MaxUint256; // Illimité

const domain = {
    name: "Test USDC",
    version: "1",
    chainId: 11155111, // Sepolia
    verifyingContract: tokenAddress
};

const types = {
    Permit: [
        { name: "owner", type: "address" },
        { name: "spender", type: "address" },
        { name: "value", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "deadline", type: "uint256" }
    ]
};

const message = {
    owner,
    spender: managerAddress,
    value: value.toString(),
    nonce: nonce.toString(),
    deadline
};

// Signer
const signature = await signer._signTypedData(domain, types, message);
const sig = ethers.utils.splitSignature(signature);

console.log("v:", sig.v);
console.log("r:", sig.r);
console.log("s:", sig.s);
console.log("deadline:", deadline);
```

### Étape 7 : Enregistrer le client avec Permit
Dans Remix, fonction `registerClientWithPermit` :
```
owner: [VOTRE_ADRESSE]
value: 115792089237316195423570985008687907853269984665640564039457584007913129639935
deadline: [VALEUR_DU_SCRIPT]
v: [VALEUR_DU_SCRIPT]
r: [VALEUR_DU_SCRIPT]
s: [VALEUR_DU_SCRIPT]
```

Exécutez → Confirmez → ✅ Vous êtes enregistré !

### Étape 8 : Vérifier l'allowance
Fonction `getClientAllowance([VOTRE_ADRESSE])` → Devrait retourner MAX

### Étape 9 : Retirer des collatéraux (TEST)
Fonction `withdrawCollateral` :
```
client: [VOTRE_ADRESSE]
to: [UNE_AUTRE_ADRESSE]
amount: 1000000000
reason: "Test de retrait - POC"
```

Exécutez → ✅ Les fonds sont transférés !

---

## ✅ Résultat attendu

- ✅ Token déployé sur Sepolia
- ✅ CollateralManager déployé
- ✅ Permit signé et allowance illimitée
- ✅ Retrait de collatéraux fonctionne

---

## 🚀 Prochaine étape

Une fois que vous confirmez que ça marche, je crée :
- **Phase 2** : Landing page avec WalletConnect
- Interface graphique pour signer les Permits facilement
- Dashboard pour voir les clients et leurs allowances

**Testez avec votre wallet et dites-moi quand c'est OK !** 🎉
