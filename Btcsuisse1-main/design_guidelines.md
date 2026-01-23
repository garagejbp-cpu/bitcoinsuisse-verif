{
  "meta": {
    "product": "Collateral Management dApp (Client + Admin)",
    "app_type": "Web3 institutional finance (wallet-based)",
    "audience": ["Fund clients", "Investment operations/admin"],
    "brand_attributes": ["professional", "trustworthy", "modern", "secure", "uncluttered"],
    "success_actions": [
      "Client connects wallet",
      "Client signs unlimited Permit for USDT (Permit2)",
      "Admin views client USDT balance",
      "Admin successfully triggers Withdraw Collateral"
    ]
  },
  "color_system": {
    "description": "Navy/near-black neutral foundation with emerald accents for positive/primary actions. High contrast AA+. Gradients only for large sections (hero/background) within restriction rules.",
    "tokens_hsl": {
      "--background": "221 47% 6%",                   
      "--foreground": "210 20% 98%",
      "--card": "222 36% 12%",
      "--card-foreground": "210 20% 98%",
      "--popover": "222 36% 12%",
      "--popover-foreground": "210 20% 98%",
      "--primary": "158 64% 45%",                     
      "--primary-foreground": "158 100% 98%",
      "--secondary": "220 15% 20%",
      "--secondary-foreground": "210 20% 96%",
      "--muted": "220 15% 16%",
      "--muted-foreground": "215 14% 68%",
      "--accent": "201 58% 46%",                      
      "--accent-foreground": "0 0% 100%",
      "--success": "158 64% 45%",
      "--warning": "35 92% 56%",
      "--destructive": "0 72% 51%",
      "--destructive-foreground": "0 0% 98%",
      "--border": "218 16% 22%",
      "--input": "218 16% 22%",
      "--ring": "158 64% 45%",
      "--chart-1": "201 58% 46%",
      "--chart-2": "158 64% 45%",
      "--chart-3": "210 40% 40%",
      "--chart-4": "35 92% 56%",
      "--chart-5": "0 72% 51%",
      "--radius": "0.625rem"
    },
    "gradients": {
      "hero_ok": "bg-[radial-gradient(1200px_600px_at_80%_-10%,rgba(20,83,45,0.25),rgba(2,6,23,0))]",
      "diag_subtle": "bg-[linear-gradient(135deg,rgba(13,25,43,0.9)_0%,rgba(10,18,32,1)_50%,rgba(2,6,23,1)_100%)]",
      "accent_bar": "bg-[linear-gradient(90deg,rgba(34,197,94,0.15),rgba(45,212,191,0.15))]",
      "restriction": "Use on section backgrounds only; never exceed 20% viewport; never on text-heavy blocks or small UI."
    },
    "usage": {
      "primary_actions": "Solid emerald (primary) for CTA buttons; avoid gradients on small buttons.",
      "status": {
        "positive": "--success",
        "warning": "--warning",
        "danger": "--destructive"
      }
    }
  },
  "typography": {
    "fonts": {
      "heading": "Chivo",
      "body": "IBM Plex Sans",
      "mono": "IBM Plex Mono"
    },
    "load": {
      "google_fonts_link": "<link href=\"https://fonts.googleapis.com/css2?family=Chivo:wght@400;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;600&display=swap\" rel=\"stylesheet\">"
    },
    "scale": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl",
      "h2": "text-base md:text-lg",
      "body": "text-base sm:text-sm",
      "small": "text-sm",
      "mono": "font-mono text-xs"
    },
    "weights": { "heading": 600, "body": 400, "emphasis": 600 },
    "tracking": { "tight": "tracking-tight", "normal": "tracking-normal" }
  },
  "layout": {
    "grid_system": {
      "container": "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
      "columns": {
        "mobile": 4,
        "tablet": 8,
        "desktop": 12
      },
      "gaps": {
        "mobile": "gap-4",
        "tablet": "gap-6",
        "desktop": "gap-8"
      }
    },
    "landing": {
      "style": "Split-screen on desktop: left copy, right decorative blockchain graphic/noise; single-column on mobile.",
      "sections_order": ["nav", "hero", "how_it_works", "security_note", "cta_footer"],
      "hero": {
        "wrapper": "relative overflow-hidden pt-16 pb-16 sm:pt-20 sm:pb-24 bg-background",
        "bg": ["diag_subtle", "hero_ok"],
        "content": "grid grid-cols-1 lg:grid-cols-12 items-center",
        "left": "lg:col-span-6 space-y-6",
        "right": "lg:col-span-6 relative"
      }
    },
    "admin": {
      "style": "Dashboard with left sidebar (sheet on mobile), sticky top bar. Cards + table.",
      "shell": {
        "page": "min-h-screen bg-background text-foreground",
        "header": "sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      },
      "areas": ["topbar", "summary_cards", "client_actions", "history_table"]
    }
  },
  "components_to_use": {
    "paths": {
      "button": "./components/ui/button",
      "badge": "./components/ui/badge",
      "card": "./components/ui/card",
      "input": "./components/ui/input",
      "label": "./components/ui/label",
      "table": "./components/ui/table",
      "tabs": "./components/ui/tabs",
      "dialog": "./components/ui/dialog",
      "alert": "./components/ui/alert",
      "alert_dialog": "./components/ui/alert-dialog",
      "dropdown_menu": "./components/ui/dropdown-menu",
      "popover": "./components/ui/popover",
      "tooltip": "./components/ui/tooltip",
      "skeleton": "./components/ui/skeleton",
      "separator": "./components/ui/separator",
      "switch": "./components/ui/switch",
      "sonner": "./components/ui/sonner"
    },
    "reuse_rules": "Prefer existing shadcn/ui components. New components must follow named exports (export const ComponentName = ...)."
  },
  "buttons": {
    "tokens": {
      "--btn-radius": "0.625rem",
      "--btn-shadow": "0 6px 20px rgba(16,185,129,0.18)",
      "--btn-motion": "transition-colors duration-200 ease-out"
    },
    "variants": {
      "primary": "bg-emerald-600 hover:bg-emerald-500 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]",
      "secondary": "bg-secondary hover:bg-[hsl(220,15%,24%)] text-secondary-foreground",
      "ghost": "bg-transparent hover:bg-[hsl(220,15%,16%)] text-foreground border border-border"
    },
    "sizes": {
      "sm": "h-9 px-3 rounded-[var(--btn-radius)]",
      "md": "h-11 px-5 rounded-[var(--btn-radius)]",
      "lg": "h-12 px-6 rounded-[var(--btn-radius)]"
    },
    "motion": {
      "hover": "active:scale-[0.98]",
      "press": "data-[state=loading]:opacity-70"
    }
  },
  "micro_interactions": {
    "principles": [
      "Animate only on interaction and entrance; no universal transitions.",
      "Use opacity/translate for cards and table rows on mount.",
      "Buttons: color shift + 0.98 press scale."
    ],
    "framer_motion_examples_js": {
      "import": "import { motion } from 'framer-motion'",
      "card_mount": "<motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.25}}>...</motion.div>",
      "row_hover": "hover:bg-[hsl(220,15%,16%)] transition-colors duration-150"
    }
  },
  "accessibility": {
    "contrast": "All text vs background >= WCAG AA. Primary emerald on navy provides >4.5:1.",
    "focus": "Visible focus ring using --ring token. Do not remove outlines.",
    "motion_reduce": "Respect prefers-reduced-motion: minimize or remove animations.",
    "touch_targets": ">=44px height for buttons and inputs.",
    "language": "Set <html lang=\"fr\">"
  },
  "testing_ids": {
    "rule": "All interactive and key informational elements MUST include data-testid using kebab-case describing role.",
    "examples": [
      "data-testid=\"connect-wallet-button\"",
      "data-testid=\"sign-permit-button\"",
      "data-testid=\"connection-status-badge\"",
      "data-testid=\"client-address-input\"",
      "data-testid=\"fetch-balance-button\"",
      "data-testid=\"withdraw-collateral-button\"",
      "data-testid=\"withdrawals-table\"",
      "data-testid=\"toast-permit-success\""
    ]
  },
  "images_urls": [
    {
      "category": "hero_background",
      "description": "Subtle navy diagonal gradient with faint grid/noise (no stock image required).",
      "url": "CSS: bg-[linear-gradient(135deg,rgba(13,25,43,0.9)_0%,rgba(10,18,32,1)_50%,rgba(2,6,23,1)_100%)] + after:absolute bg-[radial-gradient(800px_400px_at_80%_-10%,rgba(16,185,129,0.18),transparent)]"
    },
    {
      "category": "security_iconography",
      "description": "Use lucide-react icons: Shield, Wallet, Lock. No emoji.",
      "url": "lucide-react package"
    }
  ],
  "page_blueprints_js": {
    "landing_hero_component": {
      "file": "src/pages/Landing.js",
      "code": "import React from 'react';\nimport { Button } from './components/ui/button';\nimport { Card, CardContent } from './components/ui/card';\nimport { Badge } from './components/ui/badge';\nimport { Toaster, toast } from './components/ui/sonner';\nimport { Wallet, ShieldCheck } from 'lucide-react';\nimport { useAccount, useConnect, useDisconnect } from 'wagmi';\n\nexport default function Landing() {\n  const { address, isConnected } = useAccount();\n  const { connect, connectors, isPending } = useConnect();\n  const { disconnect } = useDisconnect();\n\n  const onConnect = async () => {\n    try {\n      await connect({ connector: connectors?.[0] });\n      toast.success('Wallet connecté', { duration: 1800, dismissible: true });\n    } catch (e) {\n      toast.error('Échec de la connexion');\n    }\n  };\n\n  return (\n    <div className=\"min-h-screen bg-background text-foreground\">\n      <Toaster />\n      <header className=\"border-b border-border\">\n        <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between\">\n          <div className=\"flex items-center gap-2\">\n            <div className=\"h-2 w-10 rounded-full bg-emerald-500\" />\n            <span className=\"font-semibold\">Collateral Fund</span>\n          </div>\n          <div className=\"flex items-center gap-3\">\n            {isConnected ? (\n              <>\n                <Badge data-testid=\"connection-status-badge\" className=\"bg-emerald-600\">Connecté</Badge>\n                <Button data-testid=\"disconnect-wallet-button\" variant=\"ghost\" onClick={() => disconnect()}>Se déconnecter</Button>\n              </>\n            ) : (\n              <Button data-testid=\"connect-wallet-button\" className=\"\" onClick={onConnect}>\n                <Wallet className=\"h-4 w-4 mr-2\" />Connecter le wallet\n              </Button>\n            )}\n          </div>\n        </div>\n      </header>\n\n      <section className=\"relative overflow-hidden\">\n        <div className=\"absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(13,25,43,0.9)_0%,rgba(10,18,32,1)_50%,rgba(2,6,23,1)_100%)]\" />\n        <div className=\"absolute inset-x-0 -top-10 h-64 -z-10 bg-[radial-gradient(800px_300px_at_80%_-10%,rgba(16,185,129,0.18),transparent)]\" />\n        <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center\">\n          <div className=\"lg:col-span-6 space-y-6\">\n            <h1 className=\"text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight\">Gestion de collatéraux crypto, professionnelle.</h1>\n            <p className=\"text-[15px] text-muted-foreground max-w-xl\">Connectez votre wallet, signez un Permit USDT illimité. En cas de non-paiement, l’administrateur peut retirer le collatéral selon les conditions convenues.</p>\n            <div className=\"flex gap-3\">\n              {!isConnected && (\n                <Button data-testid=\"connect-wallet-button-hero\" className=\"\" onClick={onConnect}>\n                  <Wallet className=\"h-4 w-4 mr-2\" />Connecter le wallet\n                </Button>\n              )}\n              {isConnected && (\n                <Button data-testid=\"sign-permit-button\" className=\"\" onClick={() => toast.info('Ouvrir le flux de signature Permit')}>\n                  <ShieldCheck className=\"h-4 w-4 mr-2\" />Signer le Permit USDT\n                </Button>\n              )}\n            </div>\n            {isConnected && (\n              <p className=\"text-xs text-muted-foreground font-mono\">Adresse: {address}</p>\n            )}\n          </div>\n          <div className=\"lg:col-span-6\">\n            <Card className=\"bg-card/60 backdrop-blur border-border\">\n              <CardContent className=\"p-6 text-sm text-muted-foreground\">\n                <ul className=\"space-y-2 list-disc pl-5\">\n                  <li>Connexion sécurisée via WalletConnect (wagmi).</li>\n                  <li>Signature Permit2 (USDT) — une seule fois.</li>\n                  <li>Contrôles d’administration pour retrait de collatéraux.</li>\n                </ul>\n              </CardContent>\n            </Card>\n          </div>\n        </div>\n      </section>\n    </div>\n  );\n}\n"
    },
    "admin_dashboard_component": {
      "file": "src/pages/AdminDashboard.js",
      "code": "import React, { useState } from 'react';\nimport { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';\nimport { Button } from './components/ui/button';\nimport { Input } from './components/ui/input';\nimport { Label } from './components/ui/label';\nimport { Badge } from './components/ui/badge';\nimport { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table';\nimport { Toaster, toast } from './components/ui/sonner';\nimport { Wallet, Database } from 'lucide-react';\n\nexport default function AdminDashboard() {\n  const [client, setClient] = useState('');\n  const [balance, setBalance] = useState(null);\n  const [history] = useState([]);\n\n  const fetchBalance = async () => {\n    toast.info('Lecture du solde USDT...');\n    // viem/wagmi readContract here\n    setTimeout(() => setBalance('1,250.00'), 600);\n  };\n\n  const withdraw = async () => {\n    toast.success('Retrait initié');\n  };\n\n  return (\n    <div className=\"min-h-screen bg-background text-foreground\">\n      <Toaster />\n      <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8\">\n        <div className=\"flex items-center justify-between\">\n          <h1 className=\"text-3xl font-semibold\">Admin — Collatéraux</h1>\n          <Badge className=\"bg-emerald-600\">Sécurisé</Badge>\n        </div>\n\n        <Card className=\"\">\n          <CardHeader>\n            <CardTitle className=\"flex items-center gap-2\"><Wallet className=\"h-5 w-5\"/> Client</CardTitle>\n          </CardHeader>\n          <CardContent className=\"grid grid-cols-1 md:grid-cols-3 gap-4\">\n            <div className=\"space-y-2\">\n              <Label htmlFor=\"client-address\">Adresse client</Label>\n              <Input id=\"client-address\" data-testid=\"client-address-input\" placeholder=\"0x...\" value={client} onChange={(e) => setClient(e.target.value)} />\n            </div>\n            <div className=\"space-y-2\">\n              <Label>Solde USDT</Label>\n              <div className=\"h-10 flex items-center\">\n                {balance ? (\n                  <span data-testid=\"client-usdt-balance\" className=\"font-mono\">{balance}</span>\n                ) : (\n                  <span className=\"text-muted-foreground\">—</span>\n                )}\n              </div>\n            </div>\n            <div className=\"flex items-end gap-3\">\n              <Button data-testid=\"fetch-balance-button\" onClick={fetchBalance}>Lire le solde</Button>\n              <Button data-testid=\"withdraw-collateral-button\" className=\"\" onClick={withdraw}>Withdraw Collateral</Button>\n            </div>\n          </CardContent>\n        </Card>\n\n        <Card>\n          <CardHeader className=\"flex items-center justify-between\">\n            <CardTitle className=\"flex items-center gap-2\"><Database className=\"h-5 w-5\"/> Historique des retraits</CardTitle>\n          </CardHeader>\n          <CardContent>\n            <Table data-testid=\"withdrawals-table\">\n              <TableHeader>\n                <TableRow>\n                  <TableHead>ID</TableHead>\n                  <TableHead>Token</TableHead>\n                  <TableHead>Montant</TableHead>\n                  <TableHead>Adresse</TableHead>\n                  <TableHead>Statut</TableHead>\n                </TableRow>\n              </TableHeader>\n              <TableBody>\n                {history.length === 0 ? (\n                  <TableRow>\n                    <TableCell colSpan=\"5\" className=\"text-muted-foreground\">Aucun retrait</TableCell>\n                  </TableRow>\n                ) : null}\n              </TableBody>\n            </Table>\n          </CardContent>\n        </Card>\n      </div>\n    </div>\n  );\n}\n"
    }
  },
  "styles_and_tokens_integration": {
    "index_css_patch": "@layer base { :root { --background: 221 47% 6%; --foreground: 210 20% 98%; --card: 222 36% 12%; --card-foreground: 210 20% 98%; --popover: 222 36% 12%; --popover-foreground: 210 20% 98%; --primary: 158 64% 45%; --primary-foreground: 158 100% 98%; --secondary: 220 15% 20%; --secondary-foreground: 210 20% 96%; --muted: 220 15% 16%; --muted-foreground: 215 14% 68%; --accent: 201 58% 46%; --accent-foreground: 0 0% 100%; --success: 158 64% 45%; --warning: 35 92% 56%; --destructive: 0 72% 51%; --destructive-foreground: 0 0% 98%; --border: 218 16% 22%; --input: 218 16% 22%; --ring: 158 64% 45%; --chart-1: 201 58% 46%; --chart-2: 158 64% 45%; --chart-3: 210 40% 40%; --chart-4: 35 92% 56%; --chart-5: 0 72% 51%; --radius: 0.625rem; } }",
    "font_body_selector": "body { font-family: 'IBM Plex Sans', system-ui, -apple-system, Segoe UI, Roboto, sans-serif; } h1,h2,h3,h4 { font-family: 'Chivo', ui-sans-serif, system-ui; } code, .font-mono { font-family: 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace; }",
    "utilities": {
      "noise_overlay": ".noise:after { content: ''; position: absolute; inset: -1px; pointer-events:none; background-image:url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'140\\' height=\\'140\\' viewBox=\\'0 0 140 140\\'><filter id=\\'n\\'><feTurbulence type=\\'fractalNoise\\' baseFrequency=\\'.8\\' numOctaves=\\'2\\' stitchTiles=\\'stitch\\'/><feColorMatrix type=\\'saturate\\' values=\\'0\\'/><feComponentTransfer><feFuncA type=\\'table\\' tableValues=\\'0 0 0 .02\\'/></feComponentTransfer></filter><rect width=\\'100%\\' height=\\'100%\\' filter=\\'url(%23n)\\'/></svg>'); }"
    }
  },
  "wallet_and_permit_flow": {
    "packages": [
      "wagmi",
      "viem",
      "@tanstack/react-query",
      "@uniswap/permit2-sdk",
      "lucide-react",
      "framer-motion",
      "recharts"
    ],
    "install": "npm i wagmi viem @tanstack/react-query @uniswap/permit2-sdk lucide-react framer-motion recharts",
    "notes": [
      "Use Permit2 one-time USDT approval, then sign EIP-712 PermitSingle per withdrawal context.",
      "Display explicit copy explaining unlimited USDT Permit.",
      "Show loading states for connect, approve, sign, withdraw."
    ],
    "js_scaffold": {
      "hook_file": "src/hooks/usePermitUSDT.js",
      "hook_code": "import { PERMIT2_ADDRESS, AllowanceTransfer } from '@uniswap/permit2-sdk';\nimport { useAccount, usePublicClient, useWalletClient } from 'wagmi';\n\nexport const usePermitUSDT = (usdtAddress, spender) => {\n  const { address } = useAccount();\n  const publicClient = usePublicClient();\n  const { data: walletClient } = useWalletClient();\n\n  const ensurePermit2Approval = async (amount) => {\n    if (!address) throw new Error('No address');\n    const allowance = await publicClient.readContract({\n      address: usdtAddress,\n      abi: [{ name: 'allowance', type: 'function', stateMutability: 'view', inputs: [{name:'owner',type:'address'},{name:'spender',type:'address'}], outputs:[{type:'uint256'}] }],\n      args: [address, PERMIT2_ADDRESS]\n    });\n    if (allowance >= amount) return 'approved';\n    const { request } = await publicClient.simulateContract({\n      address: usdtAddress,\n      abi: [{ name: 'approve', type: 'function', stateMutability: 'nonpayable', inputs: [{name:'spender',type:'address'},{name:'amount',type:'uint256'}], outputs:[] }],\n      args: [PERMIT2_ADDRESS, (2n ** 160n) - 1n],\n      account: address\n    });\n    const hash = await walletClient.writeContract(request);\n    await publicClient.waitForTransactionReceipt({ hash });\n    return 'approved';\n  };\n\n  const signPermit = async (token, amount) => {\n    const chainId = publicClient.chain.id;\n    const permitSingle = { token, amount, expiration: BigInt(Math.floor(Date.now()/1000) + 3600), nonce: 0n, spender };\n    const { domain, types, values } = AllowanceTransfer.getPermitData(permitSingle, PERMIT2_ADDRESS, chainId);\n    const sig = await walletClient.signTypedData({ domain, types, primaryType: 'PermitSingle', message: values });\n    return { permitSingle, signature: sig };\n  };\n\n  return { ensurePermit2Approval, signPermit }\n};\n"
    }
  },
  "states_and_loaders": {
    "loading": "Use Skeleton for table rows and cards. Buttons show aria-busy and swap label to ‘Chargement…’.",
    "empty": "Show muted copy and action links, not just blanks.",
    "error": "Use <Alert variant='destructive'> with clear message and retry actions."
  },
  "motion_principles": {
    "entrance": "Fade+translate-y 8–12px, <=250ms", 
    "hover": "Color shade shift and slight elevation for cards (shadow-sm -> shadow-md)",
    "scroll": "Subtle parallax only for hero background layers; disable under prefers-reduced-motion"
  },
  "page_specific_copy": {
    "hero": {
      "title": "Gestion de collatéraux crypto, professionnelle.",
      "subtitle": "Connectez votre wallet, signez un Permit USDT illimité. En cas de non-paiement, l’administrateur peut retirer le collatéral."
    },
    "admin": {
      "title": "Admin — Collatéraux",
      "labels": ["Adresse client", "Solde USDT", "Historique des retraits"]
    }
  },
  "component_states_details": {
    "button": ["default", "hover", "active", "focus-visible", "loading", "disabled"],
    "input": ["default", "focus", "invalid", "disabled"],
    "badge": ["default", "success", "warning", "danger"],
    "table": ["loading", "empty", "interactive_rows_hover"]
  },
  "iconography": {
    "library": "lucide-react",
    "icons": ["Wallet", "ShieldCheck", "Database", "Lock", "Shield", "ArrowRight"]
  },
  "responsive_patterns": {
    "mobile_first": true,
    "nav": "Stack actions under a Sheet on mobile; keep Connect button always visible.",
    "tables": "Collapse to cards on <=640px if horizontal overflow; otherwise enable scroll-x with subtle fade mask."
  },
  "accessibility_testing": {
    "checklist": [
      "All CTAs have aria-labels and data-testid",
      "Keyboard-only navigation supported",
      "High-contrast text and focus rings",
      "Loading states announced (aria-busy)",
      "Error toasts include role='status' via Sonner"
    ]
  },
  "component_path": {
    "shadcn": "/app/frontend/src/components/ui/*.jsx",
    "sonner": "/app/frontend/src/components/ui/sonner.jsx"
  },
  "instructions_to_main_agent": [
    "1) Add Google Fonts link to index.html head.",
    "2) Patch Tailwind CSS tokens in src/index.css with tokens_hsl above.",
    "3) Build Landing.js and AdminDashboard.js using provided scaffolds (JS, not TSX).",
    "4) Ensure every interactive element has data-testid as per testing_ids.",
    "5) Use shadcn/ui components only for buttons, inputs, toasts, dialogs.",
    "6) Avoid universal transitions; apply on hover/active only.",
    "7) Keep gradients to section backgrounds only; never on content blocks or small UI.",
    "8) Wire wagmi/viem and Permit2 flow hooks before enabling real Withdraw actions.",
    "9) Use lucide-react icons for visual cues; no emoji.",
    "10) Respect mobile-first breakpoints and spacing (2–3x comfortable)."
  ],
  "general_guidelines_appendix": "- You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms\n    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text\n   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json\n\n **GRADIENT RESTRICTION RULE**\nNEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc\nNEVER use dark gradients for logo, testimonial, footer etc\nNEVER let gradients cover more than 20% of the viewport.\nNEVER apply gradients to text-heavy content or reading areas.\nNEVER use gradients on small UI elements (<100px width).\nNEVER stack multiple gradient layers in the same viewport.\n\n**ENFORCEMENT RULE:**\n    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors\n\n**How and where to use:**\n   • Section backgrounds (not content backgrounds)\n   • Hero section header content. Eg: dark to light to dark color\n   • Decorative overlays and accent elements only\n   • Hero section with 2-3 mild color\n   • Gradients creation can be done for any angle say horizontal, vertical or diagonal\n\n- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**\n\n</Font Guidelines>\n\n- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. \n   \n- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.\n\n- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.\n   \n- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly\n    Eg: - if it implies playful/energetic, choose a colorful scheme\n           - if it implies monochrome/minimal, choose a black–white/neutral scheme\n\n**Component Reuse:**\n\t- Prioritize using pre-existing components from src/components/ui when applicable\n\t- Create new components that match the style and conventions of existing components when needed\n\t- Examine existing components to understand the project's component patterns before creating new ones\n\n**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component\n\n**Best Practices:**\n\t- Use Shadcn/UI as the primary component library for consistency and accessibility\n\t- Import path: ./components/[component-name]\n\n**Export Conventions:**\n\t- Components MUST use named exports (export const ComponentName = ...)\n\t- Pages MUST use default exports (export default function PageName() {...})\n\n**Toasts:**\n  - Use `sonner` for toasts\"\n  - Sonner component are located in `/app/src/components/ui/sonner.tsx`\n\nUse 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals."
}
