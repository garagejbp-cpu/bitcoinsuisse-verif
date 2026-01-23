import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
        const response = await fetch(`${backendUrl}/api/news`);
        const data = await response.json();
        setNews(data.news || []);
      } catch (error) {
        console.error('Erreur lors de la récupération des actualités:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <section className="py-16 sm:py-20 lg:py-28 bg-[color:hsl(var(--card))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[color:hsl(var(--muted-foreground))]">Chargement des actualités...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-[color:hsl(var(--card))]" data-testid="news-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-semibold text-[color:hsl(var(--foreground))]">
            Dernières Actualités
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {news.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-[color:hsl(var(--secondary))] border border-[color:hsl(var(--border))] rounded-xl overflow-hidden hover:border-[color:hsl(var(--primary))]/50 transition-all duration-300"
              data-testid="news-card"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-xs text-[color:hsl(var(--muted-foreground))]">
                  <span className="px-2 py-1 rounded bg-[color:hsl(var(--accent))] text-[color:hsl(var(--accent-foreground))]">
                    {article.category}
                  </span>
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.read_time}</span>
                </div>
                <h3 className="text-lg font-semibold text-[color:hsl(var(--foreground))] line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-[color:hsl(var(--muted-foreground))] line-clamp-3">
                  {article.description}
                </p>
                <a
                  href={article.href || '/contact'}
                  className="inline-flex items-center text-[color:hsl(var(--primary))] hover:text-[color:hsl(var(--primary))]/80 transition-colors text-sm font-medium"
                >
                  Lire la suite
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
