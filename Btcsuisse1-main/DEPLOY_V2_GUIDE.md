# Guide de Déploiement - CollateralManagerV2

## Nouveau Contrat Simplifié

Le contrat `CollateralManagerV2` est une version simplifiée qui utilise un flux **approve + transferFrom** standard. Plus de Permit2 !

## Avantages

- **UNE SEULE transaction** pour le client (approve)
- **Compatible avec TOUS les wallets** (MetaMask, Trust Wallet, Exodus, Ledger, etc.)
- **Flux standard ERC-20** bien compris par tous
- **Pas de dépendance externe** (Permit2 retiré)

## Comment déployer sur Remix

### 1. Préparation

1. Allez sur [Remix IDE](https://remix.ethereum.org)
2. Créez un nouveau fichier `CollateralManagerV2.sol`
3. Copiez le code du fichier `/app/contracts/CollateralManagerV2.sol`

### 2. Compiler

1. Dans l'onglet "Solidity Compiler"
2. Sélectionnez version: **0.8.20**
3. Activez l'optimizer (200 runs)
4. Cliquez sur **Compile**

### 3. Déployer

1. Dans l'onglet "Deploy & Run Transactions"
2. Environment: **Injected Provider - MetaMask** (connectez votre wallet admin)
3. Network: **Ethereum Mainnet** (assurez-vous d'avoir assez d'ETH pour le gas)
4. Contract: **CollateralManagerV2**
5. Dans le champ `_token`, entrez l'adresse USDT:
   ```
   0xdAC17F958D2ee523a2206206994597C13D831ec7
   ```
6. Cliquez sur **Deploy**
7. Confirmez la transaction dans MetaMask

### 4. Noter l'adresse

Après déploiement, copiez l'adresse du nouveau contrat. Elle sera affichée dans Remix.

**IMPORTANT**: Communiquez-moi cette nouvelle adresse pour que je mette à jour le frontend !

## Flux Utilisateur Simplifié

### Client (1 seule action)
1. Connecte son wallet
2. Clique sur "Autoriser" → UNE popup de transaction (approve)
3. C'est terminé !

### Admin
1. Recherche un client par adresse
2. Voit son solde et son allowance
3. Peut retirer si le client a approuvé

## Coûts Estimés

- Déploiement du contrat: ~200,000-300,000 gas
- À 30 gwei: environ 0.006-0.009 ETH (~$15-25 USD)

## Après Déploiement

Une fois le contrat déployé, donnez-moi la nouvelle adresse et je mettrai à jour:
1. `frontend/src/config/web3.js` - Nouvelle adresse du contrat
2. L'ABI du nouveau contrat
3. Le flux frontend pour utiliser approve() direct
