import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProcessSection = () => {
  const steps = [
    {
      number: '01',
      title: 'Prise de Contact & Qualification',
      items: [
        'Complétez notre formulaire de demande de financement sécurisé',
        'Présentation détaillée de votre projet d\'investissement',
        'Définition du montant de financement souhaité (minimum 1M€)',
        'Procédures KYC (Know Your Customer) et AML (Anti-Money Laundering)',
        'Transmission des documents requis : extrait KBIS, justificatifs de solvabilité, bilans comptables des 3 derniers exercices'
      ]
    },
    {
      number: '02',
      title: 'Onboarding & Analyse du Dossier',
      items: [
        'Attribution d\'un Relationship Manager dédié à votre compte',
        'Étude approfondie de votre dossier par notre équipe d\'analystes',
        'Due diligence financière et évaluation du profil de risque',
        'Présentation de votre dossier devant le Comité de Direction',
        'Notification de la décision sous 5 jours ouvrés'
      ]
    },
    {
      number: '03',
      title: 'Structuration & Contractualisation',
      items: [
        'Validation de votre adresse de réception des fonds (wallet ERC-20)',
        'Rédaction et signature électronique des contrats de prêt',
        'Définition du TAEG applicable et des conditions personnalisées',
        'Établissement de l\'échéancier de remboursement sur mesure',
        'Mise en place du cadre juridique et des garanties associées'
      ]
    },
    {
      number: '04',
      title: 'Déblocage des Fonds',
      items: [
        'Validation finale par notre service Conformité & Risques',
        'Transfert des fonds en USDT ERC-20 sous 48 à 72 heures ouvrées',
        'Confirmation de réception et activation de votre contrat',
        'Accès à votre espace client pour le suivi de votre financement',
        'Accompagnement continu par votre Relationship Manager'
      ]
    }
  ];

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 bg-black" data-testid="process-section">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <span className="inline-flex items-center px-6 py-3 rounded-full bg-[#E31B23]/10 border border-[#E31B23]/30 text-[#E31B23] font-semibold text-sm sm:text-base">
            💼 Justifiez de 20% du montant du prêt sans bloquer votre collatéral
          </span>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-semibold text-white">
            Comment Fonctionne Notre <span className="text-[#E31B23]">Processus</span> ?
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            Un accompagnement sur mesure en quatre étapes pour concrétiser votre financement en cryptomonnaie
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-gradient-to-br from-gray-900 to-gray-900/50 rounded-2xl p-8 border border-gray-800 hover:border-[#E31B23]/50 transition-all duration-300"
            >
              {/* Step number */}
              <div className="absolute -top-4 -left-4 w-14 h-14 rounded-full bg-[#E31B23] flex items-center justify-center shadow-lg shadow-[#E31B23]/30">
                <span className="text-white font-bold text-xl">{step.number}</span>
              </div>
              
              {/* Content */}
              <div className="ml-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-6">
                  {step.title}
                </h3>
                <ul className="space-y-3">
                  {step.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#E31B23] mt-2"></span>
                      <span className="text-gray-300 text-sm sm:text-base leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link
            to="/contact"
            className="inline-flex items-center justify-center h-14 px-10 rounded-lg bg-[#E31B23] text-white hover:bg-[#c91820] transition-all duration-200 active:scale-[0.98] font-semibold text-lg shadow-lg shadow-[#E31B23]/30 hover:shadow-xl hover:shadow-[#E31B23]/40"
            data-testid="process-cta-button"
          >
            Parler avec un Expert
            <svg className="ml-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
