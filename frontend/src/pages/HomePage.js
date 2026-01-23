import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import YouDeserveBetterSection from '../components/YouDeserveBetterSection';
import ClientTypesSection from '../components/ClientTypesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ServicesSection from '../components/ServicesSection';
import NumbersSection from '../components/NumbersSection';
import WhatWeMeanSection from '../components/WhatWeMeanSection';
import NewsSection from '../components/NewsSection';
import NewsletterSection from '../components/NewsletterSection';
import CTASection from '../components/CTASection';
import CookieBanner from '../components/CookieBanner';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[color:hsl(var(--background))]">
      <Navigation />
      <HeroSection />
      <YouDeserveBetterSection />
      <ClientTypesSection />
      <TestimonialsSection />
      <ServicesSection />
      <NumbersSection />
      <WhatWeMeanSection />
      <NewsSection />
      <NewsletterSection />
      <CTASection />
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default HomePage;
