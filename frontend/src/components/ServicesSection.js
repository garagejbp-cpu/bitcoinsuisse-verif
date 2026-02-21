import React from 'react';
import { motion } from 'framer-motion';

const ServicesSection = () => {
  const services = [
    {
      title: 'Prêt',
      subtitle: 'Financer',
      description: 'Obtenez des liquidités en USDT ERC-20 pour financer vos projets. Seulement 20% d\'apport requis, collatéral non bloqué, déblocage sous 48-72h. La solution de financement crypto nouvelle génération.',
      icon: 'https://www.bitcoinsuisse.com/_next/image?url=https%3A%2F%2Fassets.bitcoinsuisse.com%2Fschiscms%2Fassets%2Flending_7fdca53e46.svg&w=96&q=100'
    },
    {
      title: 'Trading',
      subtitle: 'Investir',
      description: 'Intégration transparente sur plus de 12 des plus grandes plateformes mondiales pour une meilleure exécution, offrant une meilleure valeur pour les grandes commandes et de meilleurs prix pour les altcoins moins liquides.',
      icon: 'https://www.bitcoinsuisse.com/_next/image?url=https%3A%2F%2Fassets.bitcoinsuisse.com%2Fschiscms%2Fassets%2Ftrading_57b75cadae.svg&w=96&q=100'
    },
    {
      title: 'Staking',
      subtitle: 'Faire Croître',
      description: 'Faites croître vos actifs crypto avec un leader mondial du staking, avec des récompenses sur des actifs comme ETH, SOL, XTZ, ADA, NEAR et DOT qui surpassent régulièrement les benchmarks du secteur.',
      icon: 'https://www.bitcoinsuisse.com/_next/image?url=https%3A%2F%2Fassets.bitcoinsuisse.com%2Fschiscms%2Fassets%2Fstaking_701cb274ce.svg&w=96&q=100'
    },
    {
      title: 'Garde',
      subtitle: 'Protéger',
      description: 'Nous fournissons une garde froide de qualité institutionnelle pour une large gamme d\'actifs crypto dans le Bitcoin Suisse Vault, notre solution propriétaire auditée ISAE-3402.',
      icon: 'https://www.bitcoinsuisse.com/_next/image?url=https%3A%2F%2Fassets.bitcoinsuisse.com%2Fschiscms%2Fassets%2Fcustody_7b30ad0021.svg&w=96&q=100'
    },
    {
      title: 'Investir dans les Prêts',
      subtitle: 'Gagner',
      description: 'Prêtez en USDT ERC-20 pour obtenir des rendements attractifs par rapport aux instruments monétaires conventionnels à court terme.',
      icon: 'https://www.bitcoinsuisse.com/_next/image?url=https%3A%2F%2Fassets.bitcoinsuisse.com%2Fschiscms%2Fassets%2Finvest_in_loans_b52f1afd58.svg&w=96&q=100'
    },
    {
      title: 'Devenir Client',
      subtitle: '',
      description: 'Profitez de l\'expertise native du leader suisse du marché depuis 2013.',
      icon: 'https://www.bitcoinsuisse.com/_next/image?url=https%3A%2F%2Fassets.bitcoinsuisse.com%2Fschiscms%2Fassets%2Fbecome_a_client_04fbc7ef7e.svg&w=96&q=100'
    }
  ];

  return (
    <section className="relative py-16 sm:py-20 lg:py-28" data-testid="services-section">
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src="https://www.bitcoinsuisse.com/_next/image?url=https%3A%2F%2Fassets.bitcoinsuisse.com%2Fschiscms%2Fassets%2Four_services_background_visual_2x_6208d42936.png&w=1440&q=100"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-semibold text-[color:hsl(var(--foreground))]">
            Nos Services
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group bg-[color:hsl(var(--card))] border border-[color:hsl(var(--border))] rounded-xl p-6 sm:p-8 hover:border-[color:hsl(var(--primary))]/50 transition-all duration-300"
              data-testid="service-card"
            >
              <div className="space-y-4">
                <img
                  src={service.icon}
                  alt={service.title}
                  className="h-16 w-16 opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div>
                  <h3 className="text-xl font-semibold text-[color:hsl(var(--foreground))] mb-1">
                    {service.title}
                  </h3>
                  {service.subtitle && (
                    <p className="text-sm text-[color:hsl(var(--primary))] font-medium">
                      {service.subtitle}
                    </p>
                  )}
                </div>
                <p className="text-sm text-[color:hsl(var(--muted-foreground))] leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
