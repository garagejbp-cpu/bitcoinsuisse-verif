import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Particuliers', href: '/contact' },
    { name: 'Fondations Crypto', href: '/contact' },
    { name: 'Entreprises', href: '/contact' },
    { name: 'Prestataires Financiers', href: '/contact' },
    { name: 'Fonds', href: '/contact' },
    { name: 'Services', href: '/contact' },
    { name: 'À propos', href: '/contact' },
    { name: 'Actualités', href: '#news' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[color:hsl(var(--background))]/95 backdrop-blur-sm border-b border-[color:hsl(var(--border))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" data-testid="logo">
            <svg width="140" height="24" viewBox="0 0 140 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[color:hsl(var(--foreground))]">
              <text x="0" y="18" fontSize="18" fontWeight="700" fontFamily="Chivo, sans-serif" fill="currentColor">Bitcoin Suisse</text>
            </svg>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.href.startsWith('/') ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm text-[color:hsl(var(--foreground))] hover:text-[color:hsl(var(--primary))] transition-colors duration-200"
                  data-testid={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-[color:hsl(var(--foreground))] hover:text-[color:hsl(var(--primary))] transition-colors duration-200"
                  data-testid={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {link.name}
                </a>
              )
            ))}
            <Link
              to="/contact"
              className="inline-flex items-center justify-center h-11 px-5 rounded-lg bg-[#E31B23] text-white hover:bg-[#c91820] transition-colors duration-200 active:scale-[0.98]"
              data-testid="nav-contact-button"
            >
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-[color:hsl(var(--foreground))] hover:bg-[color:hsl(var(--accent))]/40 transition-colors"
            data-testid="mobile-menu-button"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden border-t border-[color:hsl(var(--border))] bg-[color:hsl(var(--card))]"
          data-testid="mobile-menu"
        >
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              link.href.startsWith('/') ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block text-sm text-[color:hsl(var(--foreground))] hover:text-[color:hsl(var(--primary))] py-2 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-sm text-[color:hsl(var(--foreground))] hover:text-[color:hsl(var(--primary))] py-2 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              )
            ))}
            <Link
              to="/contact"
              className="block text-center py-3 px-5 rounded-[var(--radius)] bg-[color:hsl(var(--primary))] text-[color:hsl(var(--primary-foreground))] hover:bg-[color:hsl(var(--primary))]/90 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navigation;
