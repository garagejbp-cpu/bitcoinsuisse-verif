import React, { useState } from 'react';
import { motion } from 'framer-motion';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Newsletter functionality - placeholder for now
    console.log('Inscription newsletter:', { email, consent });
    alert('L\'inscription à la newsletter n\'est actuellement pas fonctionnelle. Ceci est un clone d\'affichage uniquement.');
  };

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 bg-[color:hsl(var(--background))]" data-testid="newsletter-section">
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src="https://www.bitcoinsuisse.com/_next/image?url=https%3A%2F%2Fassets.bitcoinsuisse.com%2Fschiscms%2Fassets%2Fget_started_visual_2x_f90c13aa6c.png&w=1440&q=100"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-semibold text-[color:hsl(var(--foreground))]">
              Recevez les Analyses Natives de l'Industrie Crypto
            </h2>
            <p className="text-base sm:text-lg text-[color:hsl(var(--muted-foreground))] max-w-2xl mx-auto">
              Recevez les actualités et recherches les plus importantes de l'industrie crypto directement dans votre boîte mail, sélectionnées par notre équipe d'experts natifs spécialisés.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="newsletter-email" className="block text-sm font-medium text-[color:hsl(var(--foreground))] mb-2">
                Email*
              </label>
              <input
                type="email"
                id="newsletter-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-[var(--radius)] bg-[color:hsl(var(--card))] border border-[color:hsl(var(--border))] text-[color:hsl(var(--foreground))] placeholder-[color:hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[color:hsl(var(--primary))] transition-all"
                placeholder="votre.email@exemple.com"
                data-testid="newsletter-email-input"
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="newsletter-consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
                className="mt-1 h-4 w-4 rounded border-[color:hsl(var(--border))] bg-[color:hsl(var(--card))] text-[color:hsl(var(--primary))] focus:ring-[color:hsl(var(--primary))]"
                data-testid="newsletter-consent-checkbox"
              />
              <label htmlFor="newsletter-consent" className="text-sm text-[color:hsl(var(--muted-foreground))]">
                J'accepte de recevoir les Insights de Bitcoin Suisse, incluant le Récapitulatif Hebdomadaire, l'Actualité du Secteur, les Perspectives Crypto et le Rapport de Gestion de Patrimoine.*
              </label>
            </div>

            <p className="text-xs text-[color:hsl(var(--muted-foreground))]">
              Vous pouvez vous désabonner de ces communications à tout moment. Pour plus d'informations sur la manière de vous désabonner, nos pratiques de confidentialité et notre engagement à protéger votre vie privée, veuillez consulter notre Avis de Confidentialité.
            </p>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center h-12 px-6 rounded-lg bg-[#E31B23] text-white hover:bg-[#c91820] transition-colors duration-200 active:scale-[0.98] font-medium"
              data-testid="newsletter-submit-button"
            >
              S'abonner
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
