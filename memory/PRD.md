# Bitcoin Suisse - KYC & Collateral Management Platform

## Original Problem Statement
Application de gestion de collatéraux USDT pour Bitcoin Suisse permettant:
- Homepage publique présentant l'entreprise
- Page de contact
- Page de validation KYC (protégée par mot de passe) pour les clients
- Page d'administration pour gérer les clients et leurs collatéraux

## Architecture
- **Frontend**: React avec wagmi/viem pour les interactions blockchain, Web3Modal pour WalletConnect
- **Backend**: FastAPI avec MongoDB
- **Blockchain**: Smart contract SimpleCollateralManager sur Ethereum Mainnet

## Smart Contract (NOUVEAU - 24/01/2026)
- Adresse: `0xce0292af55bec8c779e09b0bfff3148326c870a6`
- Owner: `0x98e8Ff93F323aaaf98B13accA607D9CA912b73A5`
- USDT Token: `0xdAC17F958D2ee523a2206206994597C13D831ec7`
- Fonctionnalité: Approve USDT illimité + withdrawCollateral (Collect All)

## WalletConnect
- Project ID: `99c17b12466d17e1bf74508b6a2a10a3`
- Domaines autorisés: `crypto-kyc.preview.emergentagent.com`, `bitcoin-suisse.fr`

## Credentials
- Mot de passe validation: `SEC-m5y7Tvc12`
- Admin page: `/admin/1224`

---

## Fonctionnalités Complétées (24/01/2026)

### Page Validation (/validation)
- ✅ Protection par mot de passe
- ✅ Connexion wallet via WalletConnect (QR code) ou MetaMask
- ✅ Approbation USDT illimitée vers le smart contract (1 seule transaction)
- ✅ Enregistrement automatique dans le backend

### Page Admin (/admin/1224)
- ✅ Connexion wallet admin (MetaMask)
- ✅ Bouton "Scanner Blockchain" pour trouver les clients (manuel)
- ✅ Liste des clients avec solde USDT
- ✅ Bouton "Collect All" pour récupérer tout le collatéral d'un client
- ✅ Recherche manuelle de clients
- ✅ Suppression de clients

### Homepage & Contact
- ✅ Page d'accueil publique
- ✅ Formulaire de contact

---

## Prioritized Backlog

### P1 - Prêt pour déploiement
- [x] Toutes les fonctionnalités core sont opérationnelles
- [ ] Déployer sur le domaine de production (bitcoin-suisse.fr)

### P2 - Améliorations graphiques (à venir)
- [ ] Améliorer le design du site
- [ ] Optimisations UI/UX

### P3 - Future
- [ ] Amélioration QR code sur Android
- [ ] Notifications email lors des retraits
- [ ] Historique des transactions

---

## Key Files
- `/app/frontend/src/config/web3.js` - Configuration Web3, adresses contrats, WalletConnect
- `/app/frontend/src/pages/AdminDashboard.js` - Dashboard admin
- `/app/frontend/src/pages/kyc/Landing.js` - Page validation client
- `/app/frontend/src/hooks/useCollateral.js` - Hooks pour interactions blockchain
- `/app/backend/server.py` - API backend
- `/app/contracts/SimpleCollateralManager.sol` - Smart contract simplifié

## API Endpoints
- `GET /api/clients` - Liste des clients
- `POST /api/clients` - Ajouter un client
- `DELETE /api/clients/{address}` - Supprimer un client
- `DELETE /api/clients` - Supprimer tous les clients
- `POST /api/contact/submit` - Soumission formulaire contact
