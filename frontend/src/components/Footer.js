import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerSections = [
    {
      title: 'Services',
      links: [
        { name: 'Trading', href: '/contact' },
        { name: 'Staking', href: '/contact' },
        { name: 'Garde', href: '/contact' },
        { name: 'Prêt', href: '/contact' },
        { name: 'Investir dans les Prêts', href: '/contact' },
      ],
    },
    {
      title: 'Clients',
      links: [
        { name: 'Particuliers', href: '/contact' },
        { name: 'Fondations & Entreprises Crypto', href: '/contact' },
        { name: 'Entreprises', href: '/contact' },
        { name: 'Prestataires de Services Financiers', href: '/contact' },
        { name: 'Fonds', href: '/contact' },
      ],
    },
    {
      title: 'Société',
      links: [
        { name: 'À Propos', href: '/contact' },
        { name: 'Actualités', href: '#news' },
        { name: 'Carrières', href: '/contact' },
        { name: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Légal',
      links: [
        { name: 'Avis de Confidentialité', href: '/contact' },
        { name: 'Conditions d\'Utilisation', href: '/contact' },
        { name: 'Politique de Cookies', href: '/contact' },
        { name: 'Avertissement', href: '/contact' },
      ],
    },
  ];

  return (
    <footer className="bg-[color:hsl(var(--card))] border-t border-[color:hsl(var(--border))]" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and description */}
          <div className="lg:col-span-1">
            <div className="text-2xl font-bold text-[#E31B23] mb-4">
              Bitcoin Suisse
            </div>
            <p className="text-sm text-gray-400">
              Le principal fournisseur de services financiers crypto premium suisse.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#E31B23] transition-colors" aria-label="Twitter">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#E31B23] transition-colors" aria-label="LinkedIn">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#E31B23] transition-colors" aria-label="YouTube">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Footer sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-[color:hsl(var(--foreground))] mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.href.startsWith('/') ? (
                      <Link
                        to={link.href}
                        className="text-sm text-gray-400 hover:text-[#E31B23] transition-colors"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-gray-400 hover:text-[#E31B23] transition-colors"
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[color:hsl(var(--border))] flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-[color:hsl(var(--muted-foreground))]">
            © {new Date().getFullYear()} Bitcoin Suisse AG. Tous droits réservés.
          </p>
          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <span className="text-sm text-[color:hsl(var(--muted-foreground))]">
              Heures d'ouverture : Lundi au vendredi, 7h à 19h
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
