{
  "brand_attributes": ["premium", "trustworthy", "Swiss-grade", "crypto-native", "professional"],
  "app_type": "Marketing/Showcase website for a premium crypto finance provider (Bitcoin Suisse clone)",
  "audience": ["HNWI individuals", "crypto foundations & firms", "corporations", "funds", "financial service providers"],
  "success_actions": ["scroll engagement on hero + services", "carousel interaction", "open cookie banner and set preferences", "submit contact form with validation", "responsive layouts across breakpoints"],

  "color_system": {
    "notes": "Extracted from live site crawl and visual sampling. Dark surfaces with cool charcoal tones, high-contrast typography, and a distinctive Swiss red accent. Some pages use cool blue-tinted imagery; keep UI tokens neutral + red.",
    "palette": {
      "bg-base": "#0B0D11",
      "bg-elevated": "#0E1116",
      "bg-soft": "#14181F",
      "text-strong": "#F5F5F5",
      "text-muted": "#B3B6BD",
      "border-subtle": "#232833",
      "accent-red": "#E42949",
      "accent-red-600": "#D12542",
      "accent-red-700": "#B31E39",
      "link": "#F5F5F5",
      "link-muted": "#D7DBE2",
      "success": "#3CB179",
      "warning": "#E3A008",
      "error": "#E42949",
      "blue-tint-700": "#162235",
      "blue-tint-800": "#0F1A2A",
      "overlay-40": "rgba(7, 9, 14, 0.4)"
    },
    "css_tokens": ":root {\n  --background: 220 20% 6%; /* #0B0D11 */\n  --foreground: 0 0% 96%; /* #F5F5F5 */\n  --muted-foreground: 220 12% 74%; /* #B3B6BD */\n  --card: 220 19% 7%; /* #0E1116 */\n  --card-foreground: 0 0% 96%;\n  --popover: 220 19% 7%;\n  --popover-foreground: 0 0% 96%;\n  --primary: 350 78% 53%; /* accent-red #E42949 */\n  --primary-foreground: 0 0% 98%;\n  --secondary: 220 22% 10%; /* #14181F */\n  --secondary-foreground: 0 0% 96%;\n  --accent: 220 18% 18%; /* #232833 */\n  --accent-foreground: 0 0% 96%;\n  --destructive: 350 78% 53%;\n  --destructive-foreground: 0 0% 98%;\n  --border: 219 18% 17%; /* #232833 */\n  --input: 219 18% 17%;\n  --ring: 350 78% 53%;\n  --radius: 0.75rem;\n}",
    "gradient_rules": {
      "restriction": [
        "Never use dark/saturated purple/pink, red/pink, green/blue, or blue/purple gradients on UI elements.",
        "Never cover more than 20% of the viewport with gradients.",
        "Never apply gradients to text-heavy content or small UI elements (<100px).",
        "Don't stack multiple gradient layers in the same viewport."
      ],
      "allowed_usage": [
        "Subtle decorative section overlays (hero and separators only).",
        "Mild two-color diagonal wash behind hero foreground imagery, kept under 20% coverage.",
        "Accent strokes or large cards background washes (very low opacity)."
      ],
      "hero_overlay_example": "bg-[radial-gradient(120%_80%_at_70%_20%,_rgba(22,34,53,0.35)_0%,_rgba(11,13,17,0)_60%)]"
    }
  },

  "typography": {
    "families": {
      "heading": "Chivo, ui-sans-serif, system-ui, -apple-system, Segoe UI, Inter, Roboto, Helvetica Neue, Arial, Noto Sans, Apple Color Emoji, Segoe UI Emoji",
      "body": "Karla, Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, Apple Color Emoji, Segoe UI Emoji",
      "mono": "Azeret Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace"
    },
    "import": [
      "https://fonts.googleapis.com/css2?family=Chivo:wght@300;400;500;600;700&display=swap",
      "https://fonts.googleapis.com/css2?family=Karla:wght@300;400;500;600;700&display=swap"
    ],
    "scale": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl tracking-tight font-semibold",
      "h2": "text-base sm:text-lg font-medium tracking-tight",
      "h3": "text-lg sm:text-xl font-semibold",
      "body": "text-base sm:text-base leading-relaxed",
      "small": "text-sm leading-snug text-muted-foreground"
    },
    "usage": {
      "headline_case": "Title Case for section headers. Keep body copy sentence case.",
      "letter_spacing": "tight for display (tracking-tight), normal for body",
      "line_heights": "h1 1.05–1.1, body 1.65"
    }
  },

  "spacing_layout": {
    "container": "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    "section_y": "py-16 sm:py-20 lg:py-28",
    "grid": {
      "cols": ["grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-3"],
      "gap": "gap-6 sm:gap-8 lg:gap-10"
    },
    "density": "Use generous whitespace; keep a minimum 24px vertical rhythm between blocks and 32–40px between sections on mobile (2–4x typical)."
  },

  "motion": {
    "principles": [
      "Buttons and interactive elements: 180–220ms ease-out color/border, 140ms scale on press (0.97).",
      "Section entrances: 320–520ms with 20–40px y-translation and 10% fade-in.",
      "Carousel slides: 300ms slide with easing and 40ms stagger for caption elements.",
      "Parallax foreground vs background: foreground moves 1.2x, background 0.6x of scroll delta (cap transforms)."
    ],
    "libraries": {
      "framer_motion": {
        "install": "npm i framer-motion",
        "example": "import { motion, useScroll, useTransform } from 'framer-motion';\nexport const HeroMotion = () => {\n  const { scrollY } = useScroll();\n  const yBg = useTransform(scrollY, [0, 300], [0, -40]);\n  const yFg = useTransform(scrollY, [0, 300], [0, 24]);\n  return (\n    <div className=\"relative overflow-hidden\">\n      <motion.img style={{ y: yBg }} src=\"/images/hero-bg.png\" alt=\"\" className=\"pointer-events-none absolute inset-0 h-full w-full object-cover\" />\n      <div className=\"relative\">\n        <motion.div initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.5, ease:'easeOut'}} className=\"space-y-6\">\n          <h1 className=\"text-4xl sm:text-5xl lg:text-6xl font-semibold\">Welcome to <span className=\"text-primary\">Better</span></h1>\n          <p className=\"text-base text-muted-foreground max-w-2xl\">We are the leading Swiss premium crypto finance service provider…</p>\n        </motion.div>\n      </div>\n      <motion.img style={{ y: yFg }} src=\"/images/hero-fg.png\" alt=\"\" className=\"pointer-events-none absolute inset-0 h-full w-full object-cover\" />\n    </div>\n  );\n};"
      }
    }
  },

  "components": {
    "paths": {
      "button": "./components/ui/button",
      "card": "./components/ui/card",
      "carousel": "./components/ui/carousel",
      "accordion": "./components/ui/accordion",
      "switch": "./components/ui/switch",
      "dialog": "./components/ui/dialog",
      "form": "./components/ui/form",
      "input": "./components/ui/input",
      "textarea": "./components/ui/textarea",
      "select": "./components/ui/select",
      "navigation_menu": "./components/ui/navigation-menu",
      "sheet": "./components/ui/sheet",
      "toast_sonner": "./components/ui/sonner"
    },
    "buttons": {
      "tokens": {
        "--btn-radius": "0.75rem",
        "--btn-shadow": "0 2px 12px rgba(0,0,0,0.25)",
        "--btn-motion": "200ms ease-out"
      },
      "variants": {
        "primary": "bg-primary text-primary-foreground hover:bg-[hsl(var(--primary))]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[hsl(var(--primary))]",
        "secondary": "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border",
        "ghost": "bg-transparent text-foreground hover:bg-accent/40 border border-transparent"
      },
      "sizes": {
        "sm": "h-9 px-4 rounded-[var(--btn-radius)]",
        "md": "h-11 px-5 rounded-[var(--btn-radius)]",
        "lg": "h-12 px-6 rounded-[var(--btn-radius)]"
      },
      "micro": {
        "hover": "transition-colors duration-200",
        "press": "active:scale-[0.98]",
        "focus": "focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))] focus-visible:ring-offset-2"
      }
    },

    "hero_section": {
      "structure": [
        "Layered background (static image) + optional mild radial gradient overlay",
        "Foreground decorative image layer (motion parallax)",
        "Left-aligned headline + subcopy + dual CTAs"
      ],
      "tailwind": "relative isolate overflow-hidden bg-[color:hsl(var(--background))]",
      "cta_group": "flex flex-col sm:flex-row gap-3 sm:gap-4",
      "ctas": [
        {"label": "Become a Client", "variant": "primary"},
        {"label": "Let’s talk first!", "variant": "ghost"}
      ],
      "data_testid": {
        "root": "hero-section",
        "primary_cta": "hero-primary-cta-button",
        "secondary_cta": "hero-secondary-cta-button"
      }
    },

    "service_cards": {
      "layout": "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8",
      "card": "group relative overflow-hidden rounded-xl bg-[color:hsl(var(--secondary))] border border-[color:hsl(var(--border))] p-6 sm:p-8",
      "image_style": "absolute inset-0 -z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-200",
      "heading": "text-lg sm:text-xl font-semibold",
      "body": "text-base text-muted-foreground",
      "cta_icon_button": "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border hover:bg-accent/40 transition-colors",
      "data_testid": "service-card"
    },

    "testimonials_carousel": {
      "component": "./components/ui/carousel",
      "slide": "space-y-4",
      "quote_icon_fill": "#E42949",
      "nav_buttons": "rounded-full border border-border hover:bg-accent/40 p-2",
      "progress": "h-0.5 bg-accent",
      "data_testid": {
        "root": "testimonials-carousel",
        "prev": "testimonials-prev-button",
        "next": "testimonials-next-button"
      }
    },

    "statistics_grid": {
      "layout": "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8",
      "item": {
        "value": "text-3xl sm:text-4xl font-semibold",
        "label": "text-sm text-muted-foreground"
      },
      "data_testid": "statistics-item"
    },

    "contact_form": {
      "libs": {
        "install": "npm i react-hook-form zod @hookform/resolvers",
        "use": "Use shadcn Form, Input, Textarea, Select. Validate with zod resolver."
      },
      "fields": ["category", "subject", "description", "attachment (optional)"],
      "validation": {
        "subject": "min 8 chars",
        "description": "min 20 chars",
        "category": "required"
      },
      "states": ["idle", "submitting", "success", "error"],
      "data_testid": {
        "form": "contact-form",
        "submit": "contact-form-submit-button",
        "error": "contact-form-error-text",
        "success": "contact-form-success-text"
      },
      "example": "import { useForm } from 'react-hook-form';\nimport { z } from 'zod';\nimport { zodResolver } from '@hookform/resolvers/zod';\nimport { Form, FormField, FormItem, FormControl, FormMessage } from './components/ui/form';\nimport { Input } from './components/ui/input';\nimport { Textarea } from './components/ui/textarea';\nimport { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';\nimport { Button } from './components/ui/button';\nimport { toast } from './components/ui/sonner';\n\nconst Schema = z.object({\n  category: z.string().min(1),\n  subject: z.string().min(8),\n  description: z.string().min(20)\n});\n\nexport default function ContactForm(){\n  const form = useForm({ resolver: zodResolver(Schema), defaultValues: {category:'', subject:'', description:''} });\n  const onSubmit = async (values) => {\n    try {\n      // TODO: wire to FastAPI\n      toast.success('Submitted');\n    } catch (e) {\n      toast.error('Submission failed');\n    }\n  };\n  return (\n    <Form {...form}>\n      <form data-testid=\"contact-form\" onSubmit={form.handleSubmit(onSubmit)} className=\"space-y-6\">\n        <FormField name=\"category\" control={form.control} render={({ field }) => (\n          <FormItem>\n            <Select onValueChange={field.onChange} value={field.value}>\n              <FormControl>\n                <SelectTrigger data-testid=\"contact-form-category\"><SelectValue placeholder=\"Category\"/></SelectTrigger>\n              </FormControl>\n              <SelectContent>\n                <SelectItem value=\"account-opening\">Account Opening</SelectItem>\n                <SelectItem value=\"trading\">Trading</SelectItem>\n                <SelectItem value=\"staking\">Staking</SelectItem>\n                <SelectItem value=\"other\">Other Request</SelectItem>\n              </SelectContent>\n            </Select>\n            <FormMessage data-testid=\"contact-form-category-error\"/>\n          </FormItem>\n        )}/>{/* subject */}\n        <FormField name=\"subject\" control={form.control} render={({ field }) => (\n          <FormItem>\n            <FormControl><Input data-testid=\"contact-form-subject\" placeholder=\"Subject\" {...field} /></FormControl>\n            <FormMessage data-testid=\"contact-form-subject-error\"/>\n          </FormItem>\n        )}/>{/* description */}\n        <FormField name=\"description\" control={form.control} render={({ field }) => (\n          <FormItem>\n            <FormControl><Textarea data-testid=\"contact-form-description\" placeholder=\"Describe your request\" rows=\"6\" {...field} /></FormControl>\n            <FormMessage data-testid=\"contact-form-description-error\"/>\n          </FormItem>\n        )}/>\n        <div className=\"pt-2\">\n          <Button data-testid=\"contact-form-submit-button\" type=\"submit\" className=\"\">Submit</Button>\n        </div>\n      </form>\n    </Form>\n  );\n}"
    },

    "cookie_consent": {
      "pattern": "Bottom sticky bar with Manage button opening a Dialog that contains Accordion groups and Switches (Necessary disabled, Analytics and Marketing toggles)",
      "use_components": ["dialog", "accordion", "switch", "button"],
      "data_testid": {
        "bar": "cookie-consent-bar",
        "manage": "cookie-consent-manage-button",
        "dialog": "cookie-consent-dialog",
        "accept_all": "cookie-accept-all-button",
        "essential_only": "cookie-essential-only-button"
      },
      "example": "import { Dialog, DialogContent, DialogTrigger } from './components/ui/dialog';\nimport { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './components/ui/accordion';\nimport { Switch } from './components/ui/switch';\nimport { Button } from './components/ui/button';\n\nexport const CookieConsent = () => {\n  return (\n    <div data-testid=\"cookie-consent-bar\" className=\"fixed inset-x-0 bottom-0 z-50 border-t border-border bg-[color:hsl(var(--secondary))] text-foreground\">\n      <div className=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4\">\n        <p className=\"text-sm\">We use cookies to improve your experience.</p>\n        <div className=\"flex items-center gap-2\">\n          <Button data-testid=\"cookie-accept-all-button\" size=\"sm\" className=\"\">Accept All</Button>\n          <Dialog>\n            <DialogTrigger asChild>\n              <Button data-testid=\"cookie-consent-manage-button\" size=\"sm\" variant=\"ghost\">Manage</Button>\n            </DialogTrigger>\n            <DialogContent data-testid=\"cookie-consent-dialog\" className=\"sm:max-w-lg\">\n              <Accordion type=\"single\" collapsible className=\"w-full\">\n                <AccordionItem value=\"necessary\">\n                  <AccordionTrigger>Necessary Cookies</AccordionTrigger>\n                  <AccordionContent>\n                    <div className=\"flex items-center justify-between\">\n                      <span className=\"text-sm\">Always on</span>\n                      <Switch disabled checked />\n                    </div>\n                  </AccordionContent>\n                </AccordionItem>\n                <AccordionItem value=\"analytics\">\n                  <AccordionTrigger>Analytics Cookies</AccordionTrigger>\n                  <AccordionContent>\n                    <div className=\"flex items-center justify-between\">\n                      <span className=\"text-sm\">Enable analytics</span>\n                      <Switch />\n                    </div>\n                  </AccordionContent>\n                </AccordionItem>\n                <AccordionItem value=\"marketing\">\n                  <AccordionTrigger>Marketing Cookies</AccordionTrigger>\n                  <AccordionContent>\n                    <div className=\"flex items-center justify-between\">\n                      <span className=\"text-sm\">Enable marketing</span>\n                      <Switch />\n                    </div>\n                  </AccordionContent>\n                </AccordionItem>\n              </Accordion>\n              <div className=\"flex justify-end gap-2\">\n                <Button data-testid=\"cookie-essential-only-button\" variant=\"ghost\">Essential Only</Button>\n                <Button>Accept All</Button>\n              </div>\n            </DialogContent>\n          </Dialog>\n        </div>\n      </div>\n    </div>\n  );\n};"
    },

    "navigation_footer": {
      "navigation": {
        "desktop": "Use ./components/ui/navigation-menu with left logo, center nav items, right CTA.",
        "mobile": "Use ./components/ui/sheet for off-canvas menu.",
        "data_testid": {
          "nav": "site-navigation",
          "menu_button": "site-mobile-menu-button",
          "cta": "site-nav-cta-button"
        }
      },
      "footer": {
        "layout": "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8",
        "style": "bg-[color:hsl(var(--secondary))] border-t border-border py-12",
        "data_testid": "site-footer"
      }
    }
  },

  "micro_interactions": {
    "list": [
      "Card hover: slight translate-y-[-2px] and shadow-md via shadow-[0_4px_24px_rgba(0,0,0,0.25)] duration-200",
      "Navigation underline on hover with scale-x transition (origin-left)",
      "Carousel arrows: subtle ring on focus-visible"
    ],
    "css_snippets": {
      "no_universal_transition": "Do not use transition: all; apply transition-colors or transition-opacity only where needed.",
      "nav_link": "relative after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-0 after:bg-[hsl(var(--primary))] hover:after:w-full after:transition-[width] after:duration-200"
    }
  },

  "accessibility": {
    "contrast": "Maintain WCAG AA: text-strong on bg-base (≥ 12.7:1).",
    "focus": "Use visible ring with --ring token on all actionable elements.",
    "reduced_motion": "Respect prefers-reduced-motion: disable parallax and reduce durations to ≤120ms.",
    "aria": "All carousels have aria-live=polite; buttons include aria-labels; forms map errors to inputs via aria-describedby.",
    "testing_ids": "Every interactive element must include data-testid using kebab-case role descriptors (e.g., data-testid=\"login-form-submit-button\")."
  },

  "image_urls": [
    {"category": "hero-bg", "description": "Hero background visual", "url": "https://assets.bitcoinsuisse.com/schiscms/assets/hero_header_fc0a51fef3.png"},
    {"category": "hero-fg", "description": "Hero foreground layer", "url": "https://assets.bitcoinsuisse.com/schiscms/assets/hero_header_front_d5e0b8c882.png"},
    {"category": "values-bg", "description": "Values section background", "url": "https://assets.bitcoinsuisse.com/schiscms/assets/our_values_background_visual_2x_5e2e4e898b.png"},
    {"category": "services-bg", "description": "Services section background", "url": "https://assets.bitcoinsuisse.com/schiscms/assets/our_services_background_visual_2x_6208d42936.png"},
    {"category": "card-visual-1", "description": "Individuals foreground visual", "url": "https://assets.bitcoinsuisse.com/schiscms/assets/hero_foreground_visual_012e0e559f.png"},
    {"category": "card-visual-2", "description": "Foundations foreground visual", "url": "https://assets.bitcoinsuisse.com/schiscms/assets/foundation_foreground_visual_2x_fb4ac203ee.png"},
    {"category": "card-visual-3", "description": "Corporations foreground visual", "url": "https://assets.bitcoinsuisse.com/schiscms/assets/corporations_hero_foreground_visual_2x_40365e384e.png"},
    {"category": "testimonial-avatar-1", "description": "Joseph Lubin avatar", "url": "https://assets.bitcoinsuisse.com/schiscms/assets/joe_lubin_square_912a74d85b.jpg"}
  ],

  "grid_system": {
    "container_class": "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    "columns": [1, 2, 3, 4, 6, 12],
    "gaps": ["gap-4", "gap-6", "gap-8", "gap-10"],
    "examples": {
      "three_up": "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8",
      "six_stats": "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6"
    }
  },

  "shadcn_mapping": {
    "note": "Always pull from ./components/ui/*.jsx and use named exports for components, default for pages.",
    "hero": ["button", "card (for layered caption blocks if needed)"],
    "services": ["card", "button"],
    "testimonials": ["carousel", "button"],
    "stats": ["card (optional)"],
    "form": ["form", "input", "textarea", "select", "button"],
    "nav": ["navigation_menu", "sheet", "button"],
    "cookie": ["dialog", "accordion", "switch", "button"],
    "toast": ["toast_sonner"]
  },

  "nav_structure": {
    "items": ["Individuals", "Crypto Foundations & Firms", "Corporations", "Funds", "Services", "Research", "About"],
    "cta": "Become a Client"
  },

  "example_layouts": {
    "home_sections_order": [
      "Hero", "Three Key Reasons (You deserve Better)", "I am… (client types)", "Testimonials", "Our Services", "Key Figures", "Research/News Teaser", "CTA Banner", "Footer"
    ],
    "hero_shell": "<section data-testid=\"hero-section\" class=\"relative bg-[color:hsl(var(--background))]\">\n  <div class=\"absolute inset-0\">\n    <img src=\"HERO_BG\" alt=\"\" class=\"h-full w-full object-cover\"/>\n    <div class=\"absolute inset-0 bg-gradient-to-t from-transparent to-transparent\"/>\n  </div>\n  <div class=\"relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32\">\n    <h1 class=\"text-4xl sm:text-5xl lg:text-6xl font-semibold\">Welcome to <span class=\"text-[hsl(var(--primary))]\">Better</span></h1>\n    <p class=\"mt-4 max-w-2xl text-base text-muted-foreground\">We are the leading Swiss premium crypto finance service provider…</p>\n    <div class=\"mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4\">\n      <button data-testid=\"hero-primary-cta-button\" class=\"btn btn-primary\">Become a Client</button>\n      <button data-testid=\"hero-secondary-cta-button\" class=\"btn btn-ghost\">Or let's talk first!</button>\n    </div>\n  </div>\n  <img src=\"HERO_FG\" alt=\"\" class=\"pointer-events-none absolute inset-0 h-full w-full object-cover\"/>\n</section>"
  },

  "icons": {
    "library": "lucide-react already in project or use FontAwesome CDN. Do not use emoji.",
    "quote_icon_fill": "#E42949"
  },

  "integration_notes": {
    "fastapi": "POST /api/contact to submit contact form; validate server-side and return clear error messages with data-testid='contact-form-error-text' in UI.",
    "mongodb": "Store contact tickets with createdAt, category, subject, description, clientMeta (UA, consent), and status.",
    "sonner": "Import toast from ./components/ui/sonner and render Toaster at root."
  },

  "testing_ids_policy": "All interactive and key informational elements MUST include a data-testid attribute in kebab-case describing the role (e.g., 'cookie-consent-manage-button', 'testimonials-next-button', 'statistics-item').",

  "instructions_to_main_agent": [
    "Set Tailwind theme tokens using color_system.css_tokens in src/index.css (replace defaults).",
    "Import Google fonts for Chivo and Karla in index.html or via @import, then set font-family on html/body.",
    "Build pages with mobile-first patterns and the defined grid_system and spacing_layout.",
    "Use shadcn/ui components from ./components/ui only for primitives (no native dropdowns, dialogs, toasts).",
    "Apply micro_interactions and motion guidelines; install framer-motion and implement parallax only for hero and key separators (respect reduced motion).",
    "Adhere strictly to gradient restrictions; if a gradient risks readability or exceeds 20% viewport, switch to solid bg-elevated.",
    "Ensure every Button, Link, Input, Menu item, Carousel control, and key informational text has data-testid per policy.",
    "Use provided image_urls to mirror layered visuals; host locally if hotlinking is not desired.",
    "Buttons: implement primary, secondary, ghost variants per tokens and ensure visible focus states.",
    "For carousels, use ./components/ui/carousel with embla settings matching 300ms transitions and progress indicator.",
    "Cookie consent: implement provided pattern and persist choices in localStorage.",
    "Contact form: client-side zod validation + server submission; show inline FormMessage and toast outcomes.",
    "Navigation: desktop uses navigation-menu.jsx with underline-on-hover; mobile uses sheet.jsx with lock body scroll."
  ],

  "component_path": {
    "button": "/app/frontend/src/components/ui/button.jsx",
    "card": "/app/frontend/src/components/ui/card.jsx",
    "carousel": "/app/frontend/src/components/ui/carousel.jsx",
    "accordion": "/app/frontend/src/components/ui/accordion.jsx",
    "switch": "/app/frontend/src/components/ui/switch.jsx",
    "dialog": "/app/frontend/src/components/ui/dialog.jsx",
    "form": "/app/frontend/src/components/ui/form.jsx",
    "input": "/app/frontend/src/components/ui/input.jsx",
    "textarea": "/app/frontend/src/components/ui/textarea.jsx",
    "select": "/app/frontend/src/components/ui/select.jsx",
    "navigation_menu": "/app/frontend/src/components/ui/navigation-menu.jsx",
    "sheet": "/app/frontend/src/components/ui/sheet.jsx",
    "toast_sonner": "/app/frontend/src/components/ui/sonner.jsx"
  },

  "general_ui_ux_guidelines": "- You must not apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms\n- You must not center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text\n- NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json\n\n **GRADIENT RESTRICTION RULE**\nNEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc\nNEVER use dark gradients for logo, testimonial, footer etc\nNEVER let gradients cover more than 20% of the viewport.\nNEVER apply gradients to text-heavy content or reading areas.\nNEVER use gradients on small UI elements (<100px width).\nNEVER stack multiple gradient layers in the same viewport.\n\n**ENFORCEMENT RULE:**\n    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors\n\n**How and where to use:**\n   • Section backgrounds (not content backgrounds)\n   • Hero section header content. Eg: dark to light to dark color\n   • Decorative overlays and accent elements only\n   • Hero section with 2-3 mild color\n   • Gradients creation can be done for any angle say horizontal, vertical or diagonal\n\n- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**\n\n- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. \n   \n- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.\n\n- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.\n   \n- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly\n    Eg: - if it implies playful/energetic, choose a colorful scheme\n           - if it implies monochrome/minimal, choose a black–white/neutral scheme\n\n**Component Reuse:**\n\t- Prioritize using pre-existing components from src/components/ui when applicable\n\t- Create new components that match the style and conventions of existing components when needed\n\t- Examine existing components to understand the project's component patterns before creating new ones\n\n**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component\n\n**Best Practices:**\n\t- Use Shadcn/UI as the primary component library for consistency and accessibility\n\t- Import path: ./components/[component-name]\n\n**Export Conventions:**\n\t- Components MUST use named exports (export const ComponentName = ...)\n\t- Pages MUST use default exports (export default function PageName() {...})\n\n**Toasts:**\n  - Use `sonner` for toasts\"\n  - Sonner component are located in `/app/src/components/ui/sonner.tsx`\n\nUse 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals."
}
