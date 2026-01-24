import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const WhatWeMeanSection = () => {
  const points = [
    {
      number: '1',
      title: 'Accompagnement Personnalisé',
      description: 'Chaque dossier est unique. Votre Relationship Manager dédié analyse vos besoins spécifiques et structure une solution de financement sur mesure. Que vous soyez une entreprise en expansion ou un investisseur institutionnel, nous adaptons nos conditions à votre situation.'
    },
    {
      number: '2',
      title: 'Processus Accéléré',
      description: 'Fini les délais bancaires interminables. Notre processus digitalisé et notre comité de direction réactif vous garantissent une réponse sous 5 jours ouvrés. Déblocage des fonds en USDT ERC-20 sous 48 à 72 heures après validation.'
    },
    {
      number: '3',
      title: 'Transparence Totale',
      description: 'Aucun frais caché, aucune mauvaise surprise. TAEG clairement défini, échéancier de remboursement détaillé et conditions contractuelles limpides. Vous savez exactement ce que vous payez, dès le premier jour.'
    },
    {
      number: '4',
      title: 'Collatéral Non Bloqué',
      description: 'Contrairement aux prêteurs traditionnels, nous n\'immobilisons pas vos actifs. Justifiez simplement de 20% du montant emprunté et conservez la pleine disposition de votre trésorerie. Votre capital reste productif.'
    },
    {
      number: '5',
      title: 'Flexibilité de Remboursement',
      description: 'Échéances mensuelles, trimestrielles ou in fine selon votre flux de trésorerie. Possibilité de remboursement anticipé sans pénalités. Des conditions pensées pour s\'adapter à la réalité de votre activité.'
    },
    {
      number: '6',
      title: 'Expertise Institutionnelle',
      description: 'Une équipe d\'analystes financiers et d\'experts blockchain à votre service. Due diligence rigoureuse, conformité réglementaire (KYC/AML) et cadre juridique solide. La sécurité d\'un partenaire institutionnel, l\'agilité de la finance décentralisée.'
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-semibold text-white">
              Ce Que Nous Entendons par <span className="text-[#E31B23]">Mieux</span>
            </h2>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center h-12 px-6 rounded-lg bg-[#E31B23] text-white hover:bg-[#c91820] transition-colors duration-200 active:scale-[0.98] font-medium"
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
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#E31B23]/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-[#E31B23]">
                      {point.number}
                    </span>
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-xl font-semibold text-white">
                      {point.title}
                    </h3>
                    <p className="text-base text-gray-300 leading-relaxed">
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
