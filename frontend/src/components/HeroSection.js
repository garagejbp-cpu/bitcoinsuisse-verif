import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 500], [0, -80]);
  const yFg = useTransform(scrollY, [0, 500], [0, 50]);

  return (
    <section 
      className="relative isolate overflow-hidden bg-[color:hsl(var(--background))] min-h-screen flex items-center pt-16" 
      data-testid="hero-section"
    >
      {/* Background image with parallax */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://www.bitcoinsuisse.com/_next/image?url=https%3A%2F%2Fassets.bitcoinsuisse.com%2Fschiscms%2Fassets%2Fhero_header_fc0a51fef3.png&w=1440&q=100"
          alt=""
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 hero-gradient" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-semibold text-[color:hsl(var(--foreground))]">
              La Meilleure Solution B2B de Prêt en <span className="text-[color:hsl(var(--primary))]">USDT ERC-20</span>
            </h1>
            <p className="text-base sm:text-lg text-[color:hsl(var(--muted-foreground))] leading-relaxed max-w-2xl">
              Financez vos projets à partir de 1 million d'euros avec seulement 20% d'apport. Prêt en USDT, collatéral non bloqué, processus simplifié. La solution de financement crypto pensée pour les professionnels.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center h-12 px-6 rounded-[var(--radius)] bg-[color:hsl(var(--primary))] text-[color:hsl(var(--primary-foreground))] hover:bg-[color:hsl(var(--primary))]/90 transition-colors duration-200 active:scale-[0.98] font-medium"
                data-testid="hero-primary-cta-button"
              >
                Devenir Client
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center h-12 px-6 rounded-[var(--radius)] bg-transparent text-[color:hsl(var(--foreground))] border border-[color:hsl(var(--border))] hover:bg-[color:hsl(var(--accent))]/40 transition-colors duration-200 active:scale-[0.98] font-medium"
                data-testid="hero-secondary-cta-button"
              >
                Ou parlons-en d'abord !
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Foreground image with parallax */}
      <motion.div 
        style={{ y: yFg }}
        className="absolute inset-0 z-5 pointer-events-none"
      >
        <img
          src="https://www.bitcoinsuisse.com/_next/image?url=https%3A%2F%2Fassets.bitcoinsuisse.com%2Fschiscms%2Fassets%2Fhero_header_front_d5e0b8c882.png&w=1440&q=100"
          alt=""
          className="w-full h-full object-cover opacity-80"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
