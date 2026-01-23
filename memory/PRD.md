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
- **Blockchain**: Smart contract CollateralManager sur Ethereum Mainnet

## Smart Contract
- Adresse: `0x178e6faf3812f5ba753d38541a16c401f2ade7e1`
- Owner: `0x98e8Ff93F323aaaf98B13accA607D9CA912b73A5`
- USDT Token: `0xdAC17F958D2ee523a2206206994597C13D831ec7`

## Credentials
- Mot de passe validation: `SEC-m5y7Tvc12`
- Admin page: `/admin/1224`

---

## Completed Features (Jan 23, 2026)

### Phase 1 - Project Merge & Setup ✅
- Fusion des projets Homepage et KYC
- Configuration du nouveau smart contract
- Résolution des problèmes WalletConnect

### Phase 2 - Admin Dashboard ✅
- Connexion wallet admin (MetaMask)
- Bouton "Scanner Blockchain" pour trouver les clients
- Liste des clients avec solde USDT
- Recherche manuelle de clients
- **Auto-refresh toutes les 30 secondes**
- **Bouton "Retirer" pour chaque client avec formulaire intégré**

### Phase 3 - Client Page ✅
- Connexion wallet via WalletConnect/MetaMask
- Approbation USDT illimitée pour le smart contract
- Protection par mot de passe

---

## Prioritized Backlog

### P1 - Upcoming
- [ ] Test complet du flux utilisateur (client → admin → retrait)
- [ ] Préparation déploiement production (bitcoin-suisse.fr)

### P2 - Future
- [ ] Amélioration QR code sur Android (workaround: ouvrir lien dans wallet browser)
- [ ] Notifications email lors des retraits
- [ ] Historique des transactions

---

## Key Files
- `/app/frontend/src/pages/AdminDashboard.js` - Dashboard admin
- `/app/frontend/src/pages/kyc/Landing.js` - Page validation client
- `/app/frontend/src/config/web3.js` - Configuration Web3
- `/app/backend/server.py` - API backend

## API Endpoints
- `GET /api/clients` - Liste des clients
- `POST /api/clients` - Ajouter un client
- `DELETE /api/clients/{address}` - Supprimer un client
- `POST /api/contact/submit` - Soumission formulaire contact
