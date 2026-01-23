# \ud83d\udcbc Collateral Manager - Application Web

Application web compl\u00e8te de gestion de collat\u00e9raux crypto avec Permit2.

## \ud83c\udfaf Fonctionnalit\u00e9s

### Page Client (Landing Page)
- \u2705 Connexion wallet (MetaMask, Trust, Exodus, Ledger, Coinbase Wallet, etc.)
- \u2705 Signature du Permit ill imit\u00e9 pour USDT via Permit2
- \u2705 Interface moderne et professionnelle
- \u2705 Affichage du statut de connexion et d'enregistrement

### Page Admin (Dashboard)
- \u2705 Acc\u00e8s restreint \u00e0 l'adresse admin uniquement
- \u2705 Recherche de clients par adresse Ethereum
- \u2705 Affichage des informations client :
  - Statut d'enregistrement
  - Solde USDT
  - Montant autoris\u00e9
  - Allowance Permit2
- \u2705 Formulaire de retrait de collat\u00e9raux
- \u2705 Historique et tra\u00e7abilit\u00e9

---

## \ud83d\ude80 Acc\u00e8s \u00e0 l'application

### URL de l'application :
```
https://crypto-kyc.preview.emergentagent.com
```

### Routes disponibles :
- **Page client** : `/` (Landing page)
- **Page admin** : `/admin` (Acc\u00e8s restreint)

---

## \ud83d\udd11 Configuration

### Adresses des contrats :

```javascript
USDT (Ethereum Mainnet):        0xdAC17F958D2ee523a2206206994597C13D831ec7
Permit2 (Uniswap):              0x000000000022D473030F116dDEE9F6B43aC78BA3
CollateralManager (Votre contrat): 0x7b2b8f74484d8c2bb8f0c30d1b758031054bdbe1
Adresse Admin:                  0xE2D574613e88b4c72A6e1b56b4369F830EE1C286
```

### Configuration WalletConnect :

Le Project ID WalletConnect est d\u00e9j\u00e0 configur\u00e9 pour la d\u00e9mo.

Pour utiliser votre propre Project ID :
1. Allez sur https://cloud.walletconnect.com/
2. Cr\u00e9ez un nouveau projet
3. Copiez votre Project ID
4. Remplacez dans `/app/frontend/src/main.jsx` :

```javascript
const projectId = 'VOTRE_PROJECT_ID';
```

---

## \ud83d\udcca Flux Utilisateur

### Pour les Clients :

1. **Se connecter**
   - Cliquer sur "Connecter Wallet"
   - S\u00e9lectionner son wallet (MetaMask, Trust, etc.)
   - Approuver la connexion

2. **Signer le Permit**
   - Cliquer sur "Signer le Permit"
   - \u00c9tape 1/2 : Approuver Permit2 pour USDT (montant illimit\u00e9)
   - \u00c9tape 2/2 : S'enregistrer dans le CollateralManager
   - Confirmer les 2 transactions dans le wallet

3. **Termin\u00e9**
   - Le client est maintenant enregistr\u00e9
   - Les retraits ne se feront qu'en cas de non-paiement

### Pour l'Admin :

1. **Se connecter avec le wallet admin**
   - Connecter le wallet `0xE2D574613e88b4c72A6e1b56b4369F830EE1C286`
   - Aller sur `/admin`

2. **Rechercher un client**
   - Entrer l'adresse Ethereum du client
   - Cliquer sur "Rechercher"
   - Les informations du client s'affichent

3. **Retirer des collat\u00e9raux**
   - Entrer le montant \u00e0 retirer (en USDT)
   - Entrer la raison du retrait (ex: "Non-paiement pr\u00eat #123")
   - Cliquer sur "Retirer les Collat\u00e9raux"
   - Confirmer la transaction

---

## \ud83d\udee0\ufe0f Technologies Utilis\u00e9es

### Frontend :
- **React 18** - Framework UI
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **shadcn/ui** - Composants UI
- **wagmi v3** - Hooks React pour Ethereum
- **viem** - Librairie Ethereum TypeScript
- **WalletConnect v3** - Connexion multi-wallets
- **React Router** - Navigation
- **Sonner** - Notifications toast
- **Lucide React** - Ic\u00f4nes
- **Framer Motion** - Animations

### Smart Contracts :
- **Solidity 0.8.20**
- **OpenZeppelin** - Librairies s\u00e9curis\u00e9es
- **Permit2 (Uniswap)** - Gestion des autorisations

---

## \ud83d\udcbb D\u00e9veloppement Local

### D\u00e9marrer l'application :

```bash
cd /app/frontend
yarn install
yarn start
```

L'application sera accessible sur `http://localhost:3000`

### Structure du projet :

```
/app/frontend/
\u251c\u2500\u2500 src/
\u2502   \u251c\u2500\u2500 components/
\u2502   \u2502   \u2514\u2500\u2500 ui/          # Composants shadcn/ui
\u2502   \u251c\u2500\u2500 config/
\u2502   \u2502   \u2514\u2500\u2500 web3.js      # Configuration Web3, ABI, adresses
\u2502   \u251c\u2500\u2500 hooks/
\u2502   \u2502   \u2514\u2500\u2500 useCollateral.js  # Hooks personnalis\u00e9s
\u2502   \u251c\u2500\u2500 lib/
\u2502   \u2502   \u2514\u2500\u2500 utils.js     # Fonctions utilitaires
\u2502   \u251c\u2500\u2500 pages/
\u2502   \u2502   \u251c\u2500\u2500 Landing.jsx       # Page client
\u2502   \u2502   \u2514\u2500\u2500 AdminDashboard.jsx # Page admin
\u2502   \u251c\u2500\u2500 App.css
\u2502   \u2514\u2500\u2500 main.jsx         # Point d'entr\u00e9e
\u2514\u2500\u2500 package.json
```

---

## \u2699\ufe0f Configuration Avanc\u00e9e

### Changer l'adresse admin :

Dans `/app/frontend/src/config/web3.js` :

```javascript
export const CONTRACT_ADDRESSES = {
  // ...
  ADMIN_ADDRESS: '0xVOTRE_NOUVELLE_ADRESSE_ADMIN'
};
```

### Ajouter un nouveau token :

1. Ajouter l'adresse du token dans `CONTRACT_ADDRESSES`
2. Ajouter l'ABI du token
3. Mettre \u00e0 jour les hooks si n\u00e9cessaire

---

## \ud83d\udee1\ufe0f S\u00e9curit\u00e9

### Bonnes pratiques impl\u00e9ment\u00e9es :

- \u2705 Utilisation de Permit2 (standard Uniswap)
- \u2705 Validation des adresses Ethereum
- \u2705 Acc\u00e8s admin restreint
- \u2705 Gestion des erreurs compl\u00e8te
- \u2705 Notifications utilisateur claires
- \u2705 V\u00e9rification des montants
- \u2705 Raison obligatoire pour les retraits

### Recommandations :

- Ne jamais partager votre seed phrase
- V\u00e9rifier toujours les adresses des contrats
- Tester sur testnet avant mainnet
- Auditer le contrat avant utilisation en production
- Mettre en place des limites de retrait si n\u00e9cessaire

---

## \ud83d\udcca Co\u00fbts Estim\u00e9s (Ethereum Mainnet)

### Pour les clients :
- Approve Permit2 : ~5-10 USD
- Register client : ~5-10 USD
**Total : ~10-20 USD**

### Pour l'admin :
- Withdraw collateral : ~10-20 USD par transaction

---

## \ud83d\udc1b D\u00e9bogage

### Probl\u00e8mes courants :

**1. Le wallet ne se connecte pas**
- V\u00e9rifiez que vous \u00eates sur Ethereum Mainnet
- Actualisez la page
- V\u00e9rifiez que MetaMask est install\u00e9

**2. La transaction \u00e9choue**
- V\u00e9rifiez que vous avez assez d'ETH pour les frais
- V\u00e9rifiez que le client a approuv\u00e9 Permit2
- V\u00e9rifiez que le client a assez d'USDT

**3. Acc\u00e8s admin refus\u00e9**
- V\u00e9rifiez que vous \u00eates connect\u00e9 avec la bonne adresse admin
- L'adresse admin est : `0xE2D574613e88b4c72A6e1b56b4369F830EE1C286`

### Logs :

```bash
# Frontend logs
tail -f /var/log/supervisor/frontend.err.log

# Backend logs (si n\u00e9cessaire)
tail -f /var/log/supervisor/backend.err.log
```

---

## \ud83d\udce6 Build de Production

### Cr\u00e9er un build optimis\u00e9 :

```bash
cd /app/frontend
yarn build
```

Le build sera dans `/app/frontend/build/`

---

## \ud83d\udcdd Prochaines \u00c9tapes

### Am\u00e9liorations possibles :

- [ ] Historique des retraits dans la page admin
- [ ] Notifications par email
- [ ] Support multi-tokens (DAI, USDC, etc.)
- [ ] Dashboard avec statistiques
- [ ] Export des donn\u00e9es en CSV
- [ ] Int\u00e9gration avec un backend pour stocker l'historique
- [ ] Syst\u00e8me de notifications push
- [ ] Support de plusieurs op\u00e9rateurs
- [ ] Limites de retrait configurables
- [ ] Syst\u00e8me de d\u00e9l\u00e9gation

---

## \ud83d\udc65 Support

Pour toute question ou probl\u00e8me :
- V\u00e9rifiez la documentation
- Consultez les logs
- V\u00e9rifiez les transactions sur Etherscan

---

## \ud83c\udf89 F\u00e9licitations !

Votre application de gestion de collat\u00e9raux est pr\u00eate \u00e0 l'emploi !

**Testez-la maintenant sur** : https://crypto-kyc.preview.emergentagent.com
