import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    type: 'Demandes Générales',
    company: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    category: 'Autre Demande',
    subject: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const contactTypes = [
    'Client Privé',
    'Client Entreprise',
    'Relations Investisseurs',
    'Demandes Marketing',
    'Demandes Médias',
    'Demandes Générales'
  ];

  const categories = [
    'Ouverture de Compte',
    'Connexion',
    'Trading',
    'Dépôt Crypto',
    'Retrait Crypto',
    'Virement Bancaire',
    'Staking',
    'Bug ou Sécurité',
    'Plainte',
    'Autre Demande'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || '';
      const response = await fetch(`${backendUrl}/api/contact/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Échec de la soumission du formulaire');
      }

      const data = await response.json();
      setSuccess(true);
      setFormData({
        type: 'Demandes Générales',
        company: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        category: 'Autre Demande',
        subject: '',
        description: ''
      });
    } catch (err) {
      setError(err.message || 'Une erreur s\'est produite. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[color:hsl(var(--background))]">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-semibold text-[color:hsl(var(--foreground))]">
                Nous sommes impatients de vous entendre.
              </h1>
              <p className="text-base sm:text-lg text-[color:hsl(var(--muted-foreground))]">
                Remplissez le formulaire ci-dessous et notre équipe vous recontactera dans les plus brefs délais.
              </p>
            </div>

            {/* Contact Info */}
            <div className="bg-[color:hsl(var(--card))] border border-[color:hsl(var(--border))] rounded-xl p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-[color:hsl(var(--foreground))] mb-4">
                Support Personnel, À Chaque Étape
              </h2>
              <p className="text-base text-[color:hsl(var(--muted-foreground))] mb-6">
                Notre équipe d'experts natifs est là pour vous fournir les outils, les informations et le support dont vous avez besoin...
              </p>
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-semibold text-[color:hsl(var(--foreground))] mb-2">Heures d'ouverture</h3>
                  <p className="text-[color:hsl(var(--muted-foreground))]">24/7 en ligne</p>
                  <p className="text-[color:hsl(var(--muted-foreground))]">Lundi au vendredi : 7h à 19h</p>
                </div>
                <div>
                  <a href="mailto:contact@bitcoinsuisse.com" className="text-[color:hsl(var(--primary))] hover:text-[color:hsl(var(--primary))]/80 transition-colors">
                    contact@bitcoinsuisse.com
                  </a>
                </div>
                <div className="space-y-1">
                  <p className="text-[color:hsl(var(--muted-foreground))]">
                    <a href="tel:0800800008" className="text-[color:hsl(var(--primary))] hover:text-[color:hsl(var(--primary))]/80 transition-colors">
                      0800 800 008
                    </a>
                    {' '}Appelez-nous gratuitement depuis la Suisse
                  </p>
                  <p className="text-[color:hsl(var(--muted-foreground))]">
                    <a href="tel:+41416600000" className="text-[color:hsl(var(--primary))] hover:text-[color:hsl(var(--primary))]/80 transition-colors">
                      +41 41 660 00 00
                    </a>
                    {' '}Appelez-nous de l'étranger
                  </p>
                </div>
              </div>
            </div>

            {/* Success/Error Messages */}
            {success && (
              <div className="bg-green-500/10 border border-green-500/50 rounded-xl p-4 text-green-500" data-testid="success-message">
                Merci pour votre message ! Nous vous recontacterons bientôt.
              </div>
            )}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-red-500" data-testid="error-message">
                {error}
              </div>
            )}

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="bg-[color:hsl(var(--card))] border border-[color:hsl(var(--border))] rounded-xl p-6 sm:p-8 space-y-6" data-testid="contact-form">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-[color:hsl(var(--foreground))] mb-2">
                  Type de Contact*
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-[var(--radius)] bg-[color:hsl(var(--input))] border border-[color:hsl(var(--border))] text-[color:hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[color:hsl(var(--primary))] transition-all"
                  data-testid="contact-type-select"
                >
                  {contactTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-[color:hsl(var(--foreground))] mb-2">
                  Nom de l'entreprise*
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-[var(--radius)] bg-[color:hsl(var(--input))] border border-[color:hsl(var(--border))] text-[color:hsl(var(--foreground))] placeholder-[color:hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[color:hsl(var(--primary))] transition-all"
                  data-testid="company-input"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="first_name" className="block text-sm font-medium text-[color:hsl(var(--foreground))] mb-2">
                    Prénom*
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-[var(--radius)] bg-[color:hsl(var(--input))] border border-[color:hsl(var(--border))] text-[color:hsl(var(--foreground))] placeholder-[color:hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[color:hsl(var(--primary))] transition-all"
                    data-testid="first-name-input"
                  />
                </div>
                <div>
                  <label htmlFor="last_name" className="block text-sm font-medium text-[color:hsl(var(--foreground))] mb-2">
                    Nom*
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-[var(--radius)] bg-[color:hsl(var(--input))] border border-[color:hsl(var(--border))] text-[color:hsl(var(--foreground))] placeholder-[color:hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[color:hsl(var(--primary))] transition-all"
                    data-testid="last-name-input"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[color:hsl(var(--foreground))] mb-2">
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-[var(--radius)] bg-[color:hsl(var(--input))] border border-[color:hsl(var(--border))] text-[color:hsl(var(--foreground))] placeholder-[color:hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[color:hsl(var(--primary))] transition-all"
                  placeholder="votre.email@exemple.com"
                  data-testid="email-input"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[color:hsl(var(--foreground))] mb-2">
                  Téléphone*
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-[var(--radius)] bg-[color:hsl(var(--input))] border border-[color:hsl(var(--border))] text-[color:hsl(var(--foreground))] placeholder-[color:hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[color:hsl(var(--primary))] transition-all"
                  placeholder="+41 XX XXX XX XX"
                  data-testid="phone-input"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-[color:hsl(var(--foreground))] mb-2">
                  Catégorie*
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-[var(--radius)] bg-[color:hsl(var(--input))] border border-[color:hsl(var(--border))] text-[color:hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[color:hsl(var(--primary))] transition-all"
                  data-testid="category-select"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-[color:hsl(var(--foreground))] mb-2">
                  Sujet*
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-[var(--radius)] bg-[color:hsl(var(--input))] border border-[color:hsl(var(--border))] text-[color:hsl(var(--foreground))] placeholder-[color:hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[color:hsl(var(--primary))] transition-all"
                  data-testid="subject-input"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-[color:hsl(var(--foreground))] mb-2">
                  Description*
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-[var(--radius)] bg-[color:hsl(var(--input))] border border-[color:hsl(var(--border))] text-[color:hsl(var(--foreground))] placeholder-[color:hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[color:hsl(var(--primary))] transition-all resize-none"
                  placeholder="Veuillez décrire votre demande en détail..."
                  data-testid="description-textarea"
                />
              </div>

              <p className="text-xs text-[color:hsl(var(--muted-foreground))]">
                Bitcoin Suisse a besoin des informations de contact que vous nous fournissez pour vous contacter au sujet de nos produits et services. Vous pouvez vous désabonner de ces communications à tout moment. Pour plus d'informations sur la manière de vous désabonner, ainsi que sur nos pratiques de confidentialité et notre engagement à protéger votre vie privée, veuillez consulter notre Avis de Confidentialité.
              </p>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center h-12 px-6 rounded-[var(--radius)] bg-[color:hsl(var(--primary))] text-[color:hsl(var(--primary-foreground))] hover:bg-[color:hsl(var(--primary))]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 active:scale-[0.98] font-medium"
                data-testid="contact-submit-button"
              >
                {loading ? 'Envoi en cours...' : 'Envoyer'}
              </button>
            </form>
          </motion.div>
        </div>
      </main>

      <Footer />
      <CookieBanner />
    </div>
  );
};

export default ContactPage;
