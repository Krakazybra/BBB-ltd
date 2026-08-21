import React, { useState } from 'react';
import { PageId, Language } from '../types';
import { ASSETS, TRANSLATIONS } from '../data/translations';
import { Menu, X, Phone, MessageSquare } from 'lucide-react';

interface TopNavBarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenQuoteModal: () => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  activePage,
  onNavigate,
  language,
  onLanguageChange,
  onOpenQuoteModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[language];

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'services', label: t.nav.services },
    { id: 'gallery', label: t.nav.gallery },
    { id: 'contacts', label: t.nav.contacts },
  ];

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent('Здравствуйте! Интересуют услуги налива/слива и перевозки опасных грузов.');
    window.open(`https://wa.me/77057838486?text=${text}`, '_blank');
  };

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#DBE2DC] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            id="brand-logo-button"
            onClick={() => handleNavClick('home')}
            className="cursor-pointer flex items-center space-x-3 group select-none"
          >
            <div className="h-12 flex items-center">
              <img
                src={ASSETS.headerLogo}
                alt="BBB LTD Logo"
                className="h-10 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="hidden sm:flex flex-col border-l border-[#DBE2DC] pl-3">
              <span className="text-[11px] font-mono tracking-widest text-[#536154] uppercase leading-tight font-semibold">
                Логистика опасных грузов
              </span>
              <span className="text-[10px] text-[#747874] font-medium">
                Казахстан • 20 лет опыта
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav-menu" className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 text-[15px] font-medium transition-colors relative tracking-tight ${
                    isActive
                      ? 'text-[#006a37] font-semibold'
                      : 'text-[#536154] hover:text-[#191c1b]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#006a37] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Language Switcher */}
            <div id="language-switcher" className="flex items-center border border-[#DBE2DC] rounded-lg overflow-hidden p-0.5 bg-[#f9faf8]">
              <button
                id="lang-btn-ru"
                onClick={() => onLanguageChange('ru')}
                className={`px-2.5 py-1 text-xs font-mono font-semibold uppercase rounded transition-colors ${
                  language === 'ru'
                    ? 'bg-[#006a37] text-white shadow-xs'
                    : 'text-[#536154] hover:text-[#191c1b]'
                }`}
              >
                RU
              </button>
              <button
                id="lang-btn-kz"
                onClick={() => onLanguageChange('kz')}
                className={`px-2.5 py-1 text-xs font-mono font-semibold uppercase rounded transition-colors ${
                  language === 'kz'
                    ? 'bg-[#006a37] text-white shadow-xs'
                    : 'text-[#536154] hover:text-[#191c1b]'
                }`}
              >
                KZ
              </button>
            </div>

            {/* Quick WhatsApp Call to Action */}
            <button
              id="header-whatsapp-cta"
              onClick={handleWhatsAppDirect}
              className="hidden lg:inline-flex items-center space-x-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-xs transition-all hover:shadow-md cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span className="whitespace-nowrap">{t.nav.writeWhatsapp}</span>
            </button>

            {/* Quote Quick Trigger button for tablet/desktop */}
            <button
              id="header-quote-button"
              onClick={onOpenQuoteModal}
              className="hidden sm:inline-flex lg:hidden items-center space-x-1.5 bg-[#006a37] hover:bg-[#00522b] text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow-xs transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">calculate</span>
              <span>Расчет</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border border-[#DBE2DC] text-[#191c1b] hover:bg-[#f2f4f1] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu-drawer" className="md:hidden border-t border-[#DBE2DC] bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-[#E4F3EA] text-[#006a37] font-semibold'
                      : 'text-[#191c1b] hover:bg-[#f2f4f1]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#006a37]"></span>}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#DBE2DC] flex flex-col space-y-2.5">
            <button
              id="mobile-whatsapp-cta"
              onClick={() => {
                handleWhatsAppDirect();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center space-x-2 bg-[#25D366] text-white py-3 rounded-lg font-semibold text-sm shadow-xs"
            >
              <span className="material-symbols-outlined text-[20px]">chat</span>
              <span>{t.nav.writeWhatsapp}</span>
            </button>

            <a
              id="mobile-phone-link"
              href="tel:+77057838486"
              className="w-full flex items-center justify-center space-x-2 bg-[#f2f4f1] text-[#191c1b] py-2.5 rounded-lg font-medium text-sm border border-[#DBE2DC]"
            >
              <Phone size={16} />
              <span>+7 705 783 84 86</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
