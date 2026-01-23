# Plan — Collateral Manager V2 (Simplifié)

## Résumé du Problème
L'ancien système avec Permit2 échouait systématiquement à cause de :
- 2 transactions requises (approve Permit2 + registerClient)
- Incompatibilité avec certains wallets externes (Trust, Exodus)
- Flux complexe difficile à comprendre pour les utilisateurs

## Solution V2 : Flux Simplifié

### Architecture
- **Une seule transaction** pour le client : `approve(CollateralManagerV2, MAX_UINT256)` sur USDT
- **Pas de Permit2** - utilisation du flux standard ERC-20
- **Compatible tous wallets** - MetaMask, Trust Wallet, Exodus, Ledger, etc.

---

## Phase 1: Contrat V2 + Frontend (Status: COMPLETED ✓)

### Travail effectué
1. ✓ Création du nouveau contrat `CollateralManagerV2.sol` (sans Permit2)
2. ✓ Mise à jour des hooks frontend (`useCollateral.js`)
3. ✓ Mise à jour de la page Landing avec le nouveau flux
4. ✓ Mise à jour de la page Admin avec le nouveau système d'allowance
5. ✓ Guide de déploiement créé (`DEPLOY_V2_GUIDE.md`)

### Fichiers modifiés
- `/app/contracts/CollateralManagerV2.sol` - Nouveau contrat simplifié
- `/app/frontend/src/config/web3.js` - Configuration et ABI mis à jour
- `/app/frontend/src/hooks/useCollateral.js` - Hooks simplifiés
- `/app/frontend/src/pages/Landing.js` - UI client mise à jour
- `/app/frontend/src/pages/AdminDashboard.js` - UI admin mise à jour

---

## Phase 2: Déploiement du Contrat (Status: EN ATTENTE - ACTION UTILISATEUR)

### Étapes pour l'utilisateur

1. **Ouvrir Remix IDE** : https://remix.ethereum.org

2. **Créer le fichier** : Nouveau fichier `CollateralManagerV2.sol` et copier le code de `/app/contracts/CollateralManagerV2.sol`

3. **Compiler** :
   - Solidity version: 0.8.20
   - Optimizer: ON (200 runs)

4. **Déployer** :
   - Environment: Injected Provider (MetaMask)
   - Network: Ethereum Mainnet
   - Constructor arg `_token`: `0xdAC17F958D2ee523a2206206994597C13D831ec7` (USDT)

5. **Noter l'adresse** : Copier l'adresse du contrat déployé

6. **Me communiquer l'adresse** : Je mettrai à jour `web3.js` avec la nouvelle adresse

### Coût estimé
- ~200,000-300,000 gas
- À ~30 gwei : ~0.006-0.009 ETH (~$15-25 USD)

---

## Phase 3: Finalisation (Status: EN ATTENTE)

### Une fois l'adresse communiquée
1. [ ] Mettre à jour `CONTRACT_ADDRESSES.COLLATERAL_MANAGER` dans web3.js
2. [ ] Tester le flux client complet (connexion → approve → vérification)
3. [ ] Tester le flux admin (recherche client → withdrawal)
4. [ ] Valider le fonctionnement sur différents wallets

---

## Configuration Actuelle

### Adresses
- **USDT (Mainnet)**: `0xdAC17F958D2ee523a2206206994597C13D831ec7`
- **Ancien contrat (Permit2)**: `0x7b2b8f74484d8c2bb8f0c30d1b758031054bdbe1` (obsolète)
- **Nouveau contrat V2**: `PENDING_DEPLOYMENT` ← À mettre à jour

### Admin
- **Adresse admin**: `0xE2D574613e88b4c72A6e1b56b4369F830EE1C28C`

### WalletConnect
- **Project ID**: `762758307ff6761e3e2a1340348775f1`

---

## Flux Utilisateur Final

### Client
1. Connecte son wallet (MetaMask, Trust, etc.)
2. Clique sur "Autoriser USDT"
3. **UNE SEULE popup** s'ouvre dans le wallet
4. Confirme → Terminé !

### Admin
1. Connecte son wallet admin
2. Recherche un client par adresse
3. Voit le statut d'autorisation (Autorisé/Non autorisé)
4. Peut retirer si le client a autorisé

---

## Prochaines Actions Immédiates

**Pour l'utilisateur :**
1. Déployer le contrat sur Remix (voir Phase 2)
2. Communiquer la nouvelle adresse du contrat

**Pour moi :**
1. Attendre l'adresse du contrat
2. Mettre à jour la configuration frontend
3. Tester le flux complet
