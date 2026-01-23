import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ClientTypesSection = () => {
  const clientTypes = [
    {
      title: 'Un Particulier',
      description: 'Profitez d\'une expérience crypto supérieure : une suite cohérente de produits de trading, staking, garde et prêt coordonnée par un gestionnaire de clientèle expert en crypto, accessible via un seul compte.',
      image: 'https://www.bitcoinsuisse.com/_next/image?url=https%3A%2F%2Fassets.bitcoinsuisse.com%2Fschiscms%2Fassets%2Fhero_foreground_visual_012e0e559f.png&w=1440&q=100',
      href: '#individuals'
    },
    {
      title: 'Une Fondation ou Entreprise Crypto',
      description: 'Gérez, développez et utilisez mieux vos actifs crypto avec une garde de qualité institutionnelle, un staking expert, une liquidité profonde et un support de conformité. Travaillez avec un partenaire ayant une expertise native approfondie.',
      image: 'https://www.bitcoinsuisse.com/_next/image?url=https%3A%2F%2Fassets.bitcoinsuisse.com%2Fschiscms%2Fassets%2Ffoundation_foreground_visual_2x_fb4ac203ee.png&w=1440&q=100',
      href: '#foundations'
    },
    {
      title: 'Une Entreprise',
      description: 'Diversifiez votre bilan avec une allocation stratégique aux actifs crypto. Bénéficiez de nos solutions de garde institutionnelles, d\'un accompagnement expert et d\'un cadre entièrement conforme.',
      image: 'https://www.bitcoinsuisse.com/_next/image?url=https%3A%2F%2Fassets.bitcoinsuisse.com%2Fschiscms%2Fassets%2Fcorporations_hero_foreground_visual_2x_40365e384e.png&w=1440&q=100',
      href: '#corporations'
    },
    {
      title: 'Un Prestataire de Services Financiers',
      description: 'La crypto gagne en adoption institutionnelle via la prolifération des ETF et ETP. Allez plus loin en permettant à vos clients d\'investir dans de vrais tokens. En tant que partenaire des EAM, family offices, banques et autres, nous vous offrons une expertise native inestimable.',
      image: 'https://www.bitcoinsuisse.com/_next/image?url=https%3A%2F%2Fassets.bitcoinsuisse.com%2Fschiscms%2Fassets%2Fa_financial_service_provider_3x_6a4f1c8193.png&w=1440&q=100',
      href: '#financial'
    },
    {
      title: 'Un Fonds',
      description: 'Optimisez vos performances, exécutez des transactions efficacement et gérez vos actifs crypto en toute sécurité à grande échelle. Que vous soyez un hedge fund, un capital-risque, un fonds de pension ou un fonds souverain, discutons de solutions sur mesure.',
      image: 'https://www.bitcoinsuisse.com/_next/image?url=https%3A%2F%2Fassets.bitcoinsuisse.com%2Fschiscms%2Fassets%2Fabout_us_hero_foreground_visual_2x_4f91b97683.png&w=1440&q=100',
      href: '#funds'
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-[color:hsl(var(--card))]" data-testid="client-types-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-semibold text-[color:hsl(var(--foreground))] mb-4">
            Je suis...
          </h2>
          <p className="text-base sm:text-lg text-[color:hsl(var(--muted-foreground))]">
            Nous avons une offre sur mesure pour différents types de clients et besoins
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {clientTypes.map((client, index) => (
            <motion.div
              key={client.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl bg-[color:hsl(var(--secondary))] border border-[color:hsl(var(--border))] p-6 sm:p-8 hover:border-[color:hsl(var(--primary))]/50 transition-all duration-300"
              data-testid={`client-type-card-${client.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {/* Background image */}
              <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                <img
                  src={client.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="relative z-10 space-y-4">
                <h3 className="text-xl sm:text-2xl font-semibold text-[color:hsl(var(--foreground))]">
                  {client.title}
                </h3>
                <p className="text-base text-[color:hsl(var(--muted-foreground))] leading-relaxed">
                  {client.description}
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center text-[color:hsl(var(--primary))] hover:text-[color:hsl(var(--primary))]/80 transition-colors font-medium"
                >
                  En savoir plus
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientTypesSection;
