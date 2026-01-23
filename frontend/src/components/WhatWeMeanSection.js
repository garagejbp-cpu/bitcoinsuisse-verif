import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const WhatWeMeanSection = () => {
  const points = [
    {
      number: '1',
      title: 'Meilleure personnalisation et service',
      description: 'Nous aimons écouter et nous adapter. Parlez-nous de vos besoins. Si vous êtes fondateur ou investisseur précoce d\'un token que nous ne supportons pas encore, nous pouvons construire une solution sur mesure pour répondre à vos besoins.'
    },
    {
      number: '2',
      title: 'Meilleure exécution',
      description: 'Intégration transparente sur plus de 12 des plus grandes plateformes mondiales pour une meilleure exécution, offrant une meilleure valeur pour les grandes commandes et de meilleurs prix pour les altcoins moins liquides. Neuf types d\'ordres différents, y compris des options d\'exécution intelligentes, via une seule interface et un seul contrepartie suisse.'
    },
    {
      number: '3',
      title: 'Meilleure transparence des transactions',
      description: 'Nous vous fournissons une transparence complète sur les détails d\'exécution, tels que la plateforme et les frais pour chaque transaction.'
    },
    {
      number: '4',
      title: 'Meilleures récompenses de staking',
      description: 'Nos nœuds de staking utilisent des systèmes et processus dédiés et optimisés pour améliorer les récompenses. Notre historique de succès nous a aidés à devenir l\'un des quatre principaux fournisseurs de staking avec garde au monde.'
    },
    {
      number: '5',
      title: 'Meilleures options de prêt',
      description: 'Nous offrons certains des services de prêt collatéralisés les plus flexibles du secteur, permettant à nos clients d\'emprunter en USD, EUR et CHF en utilisant toute combinaison de plus de 16 actifs en garantie, y compris les actifs stakés.'
    },
    {
      number: '6',
      title: 'Meilleure expertise native',
      description: 'Parlez à ceux qui savent. Nous sommes sur le marché depuis 2013, avons joué un rôle clé dans le lancement de certains des plus grands protocoles de couche 1, et avons une équipe composée d\'experts crypto natifs.'
    }
  ];

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 bg-[color:hsl(var(--background))]" data-testid="what-we-mean-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Left side - Title and CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/3 lg:sticky lg:top-32 space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-semibold text-[color:hsl(var(--foreground))]">
              Ce Que Nous Entendons par <span className="text-[color:hsl(var(--primary))]">Mieux</span>
            </h2>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center h-12 px-6 rounded-[var(--radius)] bg-[color:hsl(var(--primary))] text-[color:hsl(var(--primary-foreground))] hover:bg-[color:hsl(var(--primary))]/90 transition-colors duration-200 active:scale-[0.98] font-medium"
              data-testid="what-we-mean-cta"
            >
              Devenir Client
            </Link>
            <div className="hidden lg:block">
              <img
                src="https://www.bitcoinsuisse.com/_next/image?url=https%3A%2F%2Fassets.bitcoinsuisse.com%2Fschiscms%2Fassets%2Fwhat_we_mean_by_better_3x_5d89e93a16.png&w=1440&q=100"
                alt=""
                className="w-full h-auto rounded-xl opacity-80"
              />
            </div>
          </motion.div>

          {/* Right side - Points */}
          <div className="lg:w-2/3 space-y-8">
            {points.map((point, index) => (
              <motion.div
                key={point.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[color:hsl(var(--card))] border border-[color:hsl(var(--border))] rounded-xl p-6 sm:p-8 space-y-4"
                data-testid="better-point-card"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[color:hsl(var(--primary))]/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-[color:hsl(var(--primary))]">
                      {point.number}
                    </span>
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-xl font-semibold text-[color:hsl(var(--foreground))]">
                      {point.title}
                    </h3>
                    <p className="text-base text-[color:hsl(var(--muted-foreground))] leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeMeanSection;
