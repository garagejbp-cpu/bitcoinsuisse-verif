import React from 'react';
import { motion } from 'framer-motion';

const ClientTypesSection = () => {
  const clientTypes = [
    {
      title: 'Une PME ou ETI',
      description: 'Accélérez votre croissance sans diluer votre capital. Nos financements en USDT ERC-20 vous permettent de financer vos projets d\'expansion, acquisitions ou besoins en fonds de roulement avec une flexibilité que les banques traditionnelles ne peuvent offrir. Apport de 20%, déblocage rapide, remboursement adapté à votre trésorerie.',
      image: 'https://www.bitcoinsuisse.com/_next/image?url=https%3A%2F%2Fassets.bitcoinsuisse.com%2Fschiscms%2Fassets%2Fhero_foreground_visual_012e0e559f.png&w=1440&q=100',
      href: '#pme'
    },
    {
      title: 'Une Société de Trading ou d\'Investissement',
      description: 'Maximisez votre levier sans immobiliser vos positions. Obtenez des liquidités pour saisir les opportunités de marché tout en conservant l\'exposition à vos actifs. Financement structuré, conditions institutionnelles et exécution rapide pour les professionnels des marchés.',
      image: 'https://www.bitcoinsuisse.com/_next/image?url=https%3A%2F%2Fassets.bitcoinsuisse.com%2Fschiscms%2Fassets%2Ffoundation_foreground_visual_2x_fb4ac203ee.png&w=1440&q=100',
      href: '#trading'
    },
    {
      title: 'Un Family Office',
      description: 'Diversifiez vos stratégies de financement avec un partenaire de confiance. Accédez à des solutions de prêt sur mesure, confidentielles et adaptées aux exigences des grandes fortunes. Accompagnement personnalisé, structuration juridique robuste et reporting détaillé.',
      image: 'https://www.bitcoinsuisse.com/_next/image?url=https%3A%2F%2Fassets.bitcoinsuisse.com%2Fschiscms%2Fassets%2Fcorporations_hero_foreground_visual_2x_40365e384e.png&w=1440&q=100',
      href: '#family-office'
    },
    {
      title: 'Un Promoteur ou Investisseur Immobilier',
      description: 'Financez vos opérations immobilières avec la rapidité de la finance crypto. Bridge loan, financement d\'acquisition ou refinancement : nos solutions en USDT vous permettent de sécuriser vos deals dans des délais que le financement bancaire traditionnel ne peut égaler.',
      image: 'https://www.bitcoinsuisse.com/_next/image?url=https%3A%2F%2Fassets.bitcoinsuisse.com%2Fschiscms%2Fassets%2Fa_financial_service_provider_3x_6a4f1c8193.png&w=1440&q=100',
      href: '#immobilier'
    },
    {
      title: 'Un Fonds d\'Investissement',
      description: 'Capital-risque, private equity ou hedge fund : optimisez votre gestion de trésorerie et vos appels de fonds. Nos lignes de crédit institutionnelles vous offrent la flexibilité nécessaire pour déployer votre capital au bon moment, sans contraintes administratives excessives.',
      image: 'https://www.bitcoinsuisse.com/_next/image?url=https%3A%2F%2Fassets.bitcoinsuisse.com%2Fschiscms%2Fassets%2Fabout_us_hero_foreground_visual_2x_4f91b97683.png&w=1440&q=100',
      href: '#fonds'
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-gray-900" data-testid="client-types-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-semibold text-white mb-4">
            Votre Profil d'<span className="text-[#E31B23]">Emprunteur</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-400">
            Une solution de financement adaptée à chaque structure et à chaque besoin
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
              className="group relative overflow-hidden rounded-xl bg-black/50 border border-gray-800 p-6 sm:p-8 hover:border-[#E31B23]/50 transition-all duration-300"
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
                <h3 className="text-xl sm:text-2xl font-semibold text-white">
                  {client.title}
                </h3>
                <p className="text-base text-gray-300 leading-relaxed">
                  {client.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientTypesSection;
