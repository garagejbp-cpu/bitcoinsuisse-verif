import React from 'react';
import { motion } from 'framer-motion';

const NumbersSection = () => {
  const stats = [
    {
      value: '6 bn',
      label: 'Actifs crypto sous garde en CHF'
    },
    {
      value: '100 mn',
      label: 'Capitaux propres en CHF'
    },
    {
      value: '200 +',
      label: 'Membres de l\'équipe'
    },
    {
      value: '1300 +',
      label: 'Années d\'expérience combinée à explorer et façonner le monde crypto'
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-[color:hsl(var(--card))]" data-testid="numbers-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-semibold text-[color:hsl(var(--foreground))]">
            Les Chiffres Parlent d'Eux-Mêmes
          </h2>
          <p className="mt-4 text-base text-[color:hsl(var(--muted-foreground))]">
            Les chiffres ci-dessous s'appliquent au groupe Bitcoin Suisse.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center space-y-3"
              data-testid="stat-card"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#E31B23]">
                {stat.value}
              </div>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NumbersSection;
