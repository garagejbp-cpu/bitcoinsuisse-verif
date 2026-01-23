import React from 'react';
import { motion } from 'framer-motion';

const YouDeserveBetterSection = () => {
  const features = [
    {
      title: 'Proximité',
      subtitle: 'vous méritez un accompagnement personnalisé',
      description: 'Nous comprenons la valeur d\'avoir un accès direct à une expertise sectorielle. Notre équipe d\'experts crypto natifs dédiés travaille main dans la main avec nos clients.',
      image: 'https://www.bitcoinsuisse.com/_next/image?url=https%3A%2F%2Fassets.bitcoinsuisse.com%2Fschiscms%2Fassets%2Funrivalled_proximity_2x_1eb2b92c95.png&w=1440&q=100'
    },
    {
      title: 'Expertise',
      subtitle: 'vous méritez des connaissances natives approfondies',
      description: 'Avec une équipe de professionnels natifs immergés dans les actifs crypto depuis 2013, nous sommes à l\'avant-garde de la recherche on-chain et off-chain. Bénéficiez de notre expertise approfondie, de nos insights et de nos analyses.',
      image: 'https://www.bitcoinsuisse.com/_next/image?url=https%3A%2F%2Fassets.bitcoinsuisse.com%2Fschiscms%2Fassets%2Fbetter_convenience_visual_c9b2bf9b33.png&w=1440&q=100'
    },
    {
      title: 'Performance',
      subtitle: 'vous méritez un partenaire qui livre des résultats prouvés',
      description: 'Pionnier par l\'innovation et leader en performance : nous avons plus de CHF 6 milliards d\'actifs crypto sous garde et nous classons parmi les principaux opérateurs de staking au monde.',
      image: 'https://www.bitcoinsuisse.com/_next/image?url=https%3A%2F%2Fassets.bitcoinsuisse.com%2Fschiscms%2Fassets%2Fbetter_convenience_visual_1_6785457899.png&w=1440&q=100'
    }
  ];

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 bg-[color:hsl(var(--background))]" data-testid="you-deserve-better-section">
      {/* Background image */}
      <div className="absolute inset-0 z-0 opacity-30">
        <img
          src="https://www.bitcoinsuisse.com/_next/image?url=https%3A%2F%2Fassets.bitcoinsuisse.com%2Fschiscms%2Fassets%2Four_values_background_visual_2x_5e2e4e898b.png&w=1440&q=100"
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
            Vous Méritez <span className="text-[color:hsl(var(--primary))]">Mieux</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col space-y-4"
              data-testid={`feature-card-${feature.title.toLowerCase()}`}
            >
              <div className="w-full max-w-[214px] mx-auto">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-auto"
                />
              </div>
              <div className="space-y-3 text-center">
                <h3 className="text-lg font-semibold text-[color:hsl(var(--foreground))]">
                  {feature.title} - {feature.subtitle}
                </h3>
                <p className="text-sm text-[color:hsl(var(--muted-foreground))] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YouDeserveBetterSection;
