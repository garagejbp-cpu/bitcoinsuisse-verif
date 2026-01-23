import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    } else {
      setPreferences(JSON.parse(consent));
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true
    };
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted));
    setPreferences(allAccepted);
    setShowBanner(false);
  };

  const handleEssentialOnly = () => {
    const essentialOnly = {
      necessary: true,
      analytics: false,
      marketing: false
    };
    localStorage.setItem('cookieConsent', JSON.stringify(essentialOnly));
    setPreferences(essentialOnly);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    setShowBanner(false);
    setShowSettings(false);
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-[color:hsl(var(--card))] border-t border-[color:hsl(var(--border))] shadow-2xl"
        data-testid="cookie-banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {!showSettings ? (
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-semibold text-[color:hsl(var(--foreground))]">
                  Nous utilisons des cookies pour améliorer votre expérience
                </h3>
                <p className="text-sm text-[color:hsl(var(--muted-foreground))]">
                  Certains cookies sont nécessaires et activent des fonctionnalités essentielles telles que la sécurité, la gestion du réseau et l'accessibilité. Nous définissons également des cookies d'analyse pour nous aider à améliorer notre site web en collectant et en rapportant des informations sur la manière dont vous l'utilisez. Pour plus d'informations sur le fonctionnement de ces cookies, veuillez consulter notre Avis de Confidentialité.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 min-w-fit">
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-6 py-3 rounded-[var(--radius)] bg-transparent text-[color:hsl(var(--foreground))] border border-[color:hsl(var(--border))] hover:bg-[color:hsl(var(--accent))]/40 transition-colors font-medium whitespace-nowrap"
                  data-testid="cookie-manage-button"
                >
                  Gérer
                </button>
                <button
                  onClick={handleEssentialOnly}
                  className="px-6 py-3 rounded-[var(--radius)] bg-[color:hsl(var(--secondary))] text-[color:hsl(var(--secondary-foreground))] border border-[color:hsl(var(--border))] hover:bg-[color:hsl(var(--accent))]/60 transition-colors font-medium whitespace-nowrap"
                  data-testid="cookie-essential-button"
                >
                  Essentiels Uniquement
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-3 rounded-[var(--radius)] bg-[color:hsl(var(--primary))] text-[color:hsl(var(--primary-foreground))] hover:bg-[color:hsl(var(--primary))]/90 transition-colors font-medium whitespace-nowrap"
                  data-testid="cookie-accept-all-button"
                >
                  Tout Accepter
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[color:hsl(var(--foreground))]">
                  Préférences des Cookies
                </h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-[color:hsl(var(--muted-foreground))] hover:text-[color:hsl(var(--foreground))] transition-colors"
                  data-testid="cookie-settings-close"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[color:hsl(var(--secondary))] rounded-lg">
                  <div>
                    <h4 className="font-medium text-[color:hsl(var(--foreground))]">
                      Cookies Nécessaires
                    </h4>
                    <p className="text-sm text-[color:hsl(var(--muted-foreground))]">
                      Les cookies nécessaires activent les fonctionnalités essentielles. Le site web ne peut pas fonctionner correctement sans ces cookies.
                    </p>
                  </div>
                  <div className="ml-4">
                    <span className="text-sm text-[color:hsl(var(--muted-foreground))]">Toujours Actif</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-[color:hsl(var(--secondary))] rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-[color:hsl(var(--foreground))]">
                      Cookies d'Analyse
                    </h4>
                    <p className="text-sm text-[color:hsl(var(--muted-foreground))]">
                      Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site web en collectant des données anonymes.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer ml-4">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                      className="sr-only peer"
                      data-testid="cookie-analytics-toggle"
                    />
                    <div className="w-11 h-6 bg-[color:hsl(var(--accent))] peer-focus:ring-2 peer-focus:ring-[color:hsl(var(--primary))] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all after:pointer-events-none peer-checked:bg-[color:hsl(var(--primary))]" />
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-[color:hsl(var(--secondary))] rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-[color:hsl(var(--foreground))]">
                      Cookies Marketing
                    </h4>
                    <p className="text-sm text-[color:hsl(var(--muted-foreground))]">
                      Les cookies marketing nous permettent de vous montrer des publicités personnalisées pertinentes pour vos intérêts.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer ml-4">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                      className="sr-only peer"
                      data-testid="cookie-marketing-toggle"
                    />
                    <div className="w-11 h-6 bg-[color:hsl(var(--accent))] peer-focus:ring-2 peer-focus:ring-[color:hsl(var(--primary))] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all after:pointer-events-none peer-checked:bg-[color:hsl(var(--primary))]" />
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={handleSavePreferences}
                  className="px-6 py-3 rounded-[var(--radius)] bg-[color:hsl(var(--primary))] text-[color:hsl(var(--primary-foreground))] hover:bg-[color:hsl(var(--primary))]/90 transition-colors font-medium"
                  data-testid="cookie-save-preferences-button"
                >
                  Enregistrer les Préférences
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CookieBanner;
