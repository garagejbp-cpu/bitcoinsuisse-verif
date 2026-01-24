import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="relative py-16 sm:py-20 lg:py-28 bg-[color:hsl(var(--background))]" data-testid="cta-section">
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src="https://www.bitcoinsuisse.com/_next/image?url=https%3A%2F%2Fassets.bitcoinsuisse.com%2Fschiscms%2Fassets%2Fre_experience_crypto_visual_2x_759ae68768.png&w=1440&q=100"
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
          className="text-center space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-semibold text-[color:hsl(var(--foreground))]">
              Redécouvrez la Crypto avec Nous
            </h2>
            <p className="text-base sm:text-lg text-[color:hsl(var(--muted-foreground))] max-w-2xl mx-auto leading-relaxed">
              Fatigué du bricolage crypto – essayer d'assembler des portefeuilles, comptes, plateformes d'échange et API tout seul ? Lassé d'essayer d'expliquer la crypto à votre banquier ? Vous méritez mieux.
            </p>
            <p className="text-base sm:text-lg text-[color:hsl(var(--muted-foreground))] max-w-2xl mx-auto leading-relaxed">
              Nous vous offrons une combinaison unique d'expertise native authentique, une gamme de produits intégrée et adaptable, et un service client dédié et compétent.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-[#E31B23] text-white hover:bg-[#c91820] transition-colors duration-200 active:scale-[0.98] font-medium text-lg"
            data-testid="cta-become-client-button"
          >
            Devenir Client
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
