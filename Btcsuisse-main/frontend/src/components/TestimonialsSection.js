import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "En tant qu'entreprise crypto innovante, vous voulez un partenaire solide et établi à vos côtés - avec Bitcoin Suisse, nous avons trouvé exactement ce navigateur d'avenir pour la prochaine ère numérique. Le défi et l'encouragement mutuels nous ont permis de nous développer sous tous les aspects et d'atteindre un positionnement unique. La profondeur de compréhension et les solutions de Bitcoin Suisse sont impressionnantes.",
      author: 'Christian Ott',
      role: 'Co-Fondateur CAM Switzerland AG',
      image: 'https://www.bitcoinsuisse.com/_next/image?url=https%3A%2F%2Fassets.bitcoinsuisse.com%2Fschiscms%2Fassets%2FScreenshot_2025_06_02_173744_b415dc67ff.png&w=1440&q=100'
    },
    {
      quote: "Bitcoin Suisse n'est pas seulement l'un des fournisseurs de services financiers crypto les plus fiables du secteur, mais c'est toujours un plaisir de travailler avec eux, offrant un service client amical et attentionné. Ils sont solides comme le roc. Il n'y a pas de meilleur choix dans la région, et peut-être même mondialement.",
      author: 'Joseph Lubin',
      role: 'Co-Fondateur d\'Ethereum, Fondateur & PDG de ConsenSys',
      image: 'https://www.bitcoinsuisse.com/_next/image?url=https%3A%2F%2Fassets.bitcoinsuisse.com%2Fschiscms%2Fassets%2Fjoe_lubin_square_912a74d85b.jpg&w=1440&q=100'
    },
    {
      quote: "Bien avant que les banques traditionnelles ne commencent à s'engager dans l'espace crypto, nous avons trouvé un partenaire innovant et capable en Bitcoin Suisse. Leur compréhension approfondie de l'industrie et de la technologie sous-jacente est vraiment exceptionnelle. En tant que fournisseur de services natif crypto, Bitcoin Suisse s'est démarqué très tôt avec un esprit commercial aligné avec le nôtre.",
      author: 'Jean-Frédéric Mognetti',
      role: 'Directeur Exécutif, Fondation Tezos',
      image: 'https://www.bitcoinsuisse.com/_next/image?url=https%3A%2F%2Fassets.bitcoinsuisse.com%2Fschiscms%2Fassets%2FJF_Mognetti_Tezos_07a75f5740.jpg&w=1440&q=100'
    },
    {
      quote: "Bitcoin Suisse est une organisation légendaire, et c'est toujours un plaisir de voir quelles sont leurs vues sur les marchés, étant donné leur expérience dans le domaine.",
      author: 'Matt Hougan',
      role: 'Directeur des Investissements, Bitwise',
      image: 'https://www.bitcoinsuisse.com/_next/image?url=https%3A%2F%2Fassets.bitcoinsuisse.com%2Fschiscms%2Fassets%2F1696621034_matt_b5a3868a28.png&w=1440&q=100'
    }
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-[color:hsl(var(--background))]" data-testid="testimonials-carousel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-semibold text-[color:hsl(var(--foreground))]">
            Voici Ce Que Disent les Autres à Notre Sujet
          </h2>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 px-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-[color:hsl(var(--card))] border border-[color:hsl(var(--border))] rounded-xl p-8 sm:p-12"
                  >
                    <div className="flex flex-col lg:flex-row gap-8 items-center">
                      <div className="flex-1 space-y-6">
                        <svg className="h-8 w-8 text-[color:hsl(var(--primary))]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                        <p className="text-base sm:text-lg text-[color:hsl(var(--muted-foreground))] leading-relaxed italic">
                          {testimonial.quote}
                        </p>
                        <div className="pt-4">
                          <p className="text-lg font-semibold text-[color:hsl(var(--foreground))]">
                            {testimonial.author}
                          </p>
                          <p className="text-sm text-[color:hsl(var(--muted-foreground))]">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <img
                          src={testimonial.image}
                          alt={testimonial.author}
                          className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-[color:hsl(var(--border))]"
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={scrollPrev}
              className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-[color:hsl(var(--border))] hover:bg-[color:hsl(var(--accent))]/40 transition-colors"
              data-testid="testimonials-prev-button"
              aria-label="Témoignage précédent"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === selectedIndex 
                      ? 'w-8 bg-[color:hsl(var(--primary))]' 
                      : 'w-2 bg-[color:hsl(var(--accent))]'
                  }`}
                  aria-label={`Aller au témoignage ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={scrollNext}
              className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-[color:hsl(var(--border))] hover:bg-[color:hsl(var(--accent))]/40 transition-colors"
              data-testid="testimonials-next-button"
              aria-label="Témoignage suivant"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
