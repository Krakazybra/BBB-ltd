import React, { useState, useEffect } from 'react';
import { PageId, Language } from './types';
import { GALLERY_ITEMS } from './data/translations';
import { TopNavBar } from './components/TopNavBar';
import { Footer } from './components/Footer';
import { WhatsAppFAB } from './components/WhatsAppFAB';
import { QuoteModal } from './components/QuoteModal';
import { GalleryLightbox } from './components/GalleryLightbox';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactsPage } from './pages/ContactsPage';

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('home');
  const [language, setLanguage] = useState<Language>('ru');
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string | undefined>(undefined);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Sync title and language
  useEffect(() => {
    document.title = language === 'ru'
      ? 'BBB Ltd — Безопасный налив, слив и перевозка опасных грузов в Казахстане'
      : 'BBB Ltd — Қауіпті жүктерді қауіпсіз құю, төгу және тасымалдау';
  }, [language]);

  const handleOpenQuoteModal = (serviceName?: string) => {
    setSelectedServiceForQuote(serviceName);
    setQuoteModalOpen(true);
  };

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  return (
    <div id="app-root-container" className="min-h-screen flex flex-col bg-[#f9faf8] text-[#191c1b] selection:bg-[#90f8ae] selection:text-[#00210d]">
      {/* Top Navigation Bar */}
      <TopNavBar
        activePage={activePage}
        onNavigate={setActivePage}
        language={language}
        onLanguageChange={setLanguage}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
      />

      {/* Main Content View with Smooth Transition */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            onNavigate={setActivePage}
            language={language}
            onOpenQuoteModal={() => handleOpenQuoteModal()}
          />
        )}

        {activePage === 'about' && (
          <AboutPage
            onNavigate={setActivePage}
            language={language}
            onOpenQuoteModal={() => handleOpenQuoteModal()}
          />
        )}

        {activePage === 'services' && (
          <ServicesPage
            onNavigate={setActivePage}
            language={language}
            onOpenQuoteModal={(serviceTitle) => handleOpenQuoteModal(serviceTitle)}
          />
        )}

        {activePage === 'gallery' && (
          <GalleryPage
            onNavigate={setActivePage}
            language={language}
            onOpenLightbox={handleOpenLightbox}
          />
        )}

        {activePage === 'contacts' && (
          <ContactsPage
            onNavigate={setActivePage}
            language={language}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={setActivePage}
        language={language}
      />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFAB language={language} />

      {/* Interactive Quote & WhatsApp Request Generator Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        language={language}
        preselectedService={selectedServiceForQuote}
      />

      {/* Full-Screen Gallery Image Lightbox */}
      <GalleryLightbox
        items={GALLERY_ITEMS}
        selectedIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={setLightboxIndex}
      />
    </div>
  );
}
