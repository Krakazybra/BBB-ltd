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
    { id: 'team', label: (t.nav as any).team || 'Команда' },
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
    <header id="main-header" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e2e8e3] transition-all shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[68px]">
          {/* Logo */}
          <div
            id="brand-logo-button"
            onClick={() => handleNavClick('home')}
            className="cursor-pointer flex items-center space-x-2.5 sm:space-x-3 group select-none shrink-0"
          >
            <div className="h-9 sm:h-10 flex items-center">
              <img
                src={ASSETS.headerLogo}
                alt="BBB LTD Logo"
                className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="hidden lg:flex flex-col border-l border-[#d5ded7] pl-2.5">
              <span className="text-[10px] font-mono tracking-wider text-[#536154] uppercase leading-none font-semibold">
                Опасные грузы
              </span>
              <span className="text-[10px] text-[#747874] font-medium mt-0.5">
                20 лет опыта в РК
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav-menu" className="hidden md:flex items-center space-x-1 lg:space-x-1.5">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 text-sm transition-colors relative tracking-tight rounded-lg cursor-pointer ${
                    isActive
                      ? 'text-[#006a37] font-semibold bg-[#eaf5ee]'
                      : 'text-[#536154] hover:text-[#191c1b] hover:bg-[#f4f6f4]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-2.5 shrink-0">
            {/* Language Switcher */}
            <div id="language-switcher" className="flex items-center border border-[#d5ded7] rounded-lg overflow-hidden p-0.5 bg-[#f7f9f7]">
              <button
                id="lang-btn-ru"
                onClick={() => onLanguageChange('ru')}
                className={`px-2 py-0.5 text-[11px] font-mono font-semibold uppercase rounded transition-colors ${
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
                className={`px-2 py-0.5 text-[11px] font-mono font-semibold uppercase rounded transition-colors ${
                  language === 'kz'
                    ? 'bg-[#006a37] text-white shadow-xs'
                    : 'text-[#536154] hover:text-[#191c1b]'
                }`}
              >
                KZ
              </button>
            </div>

            {/* Direct WhatsApp Action Button */}
            <button
              id="header-whatsapp-btn"
              onClick={handleWhatsAppDirect}
              className="hidden sm:inline-flex items-center space-x-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              <span>WhatsApp</span>
            </button>

            {/* Direct Phone Link */}
            <a
              id="header-phone-link"
              href="tel:+77057838486"
              className="hidden xl:inline-flex items-center space-x-1.5 text-xs font-mono font-semibold text-[#191c1b] hover:text-[#006a37] px-2.5 py-1.5 rounded-lg bg-[#f4f6f4] border border-[#e2e8e3] transition-colors"
            >
              <Phone size={13} className="text-[#006a37]" />
              <span>+7 705 783 84 86</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#536154] hover:text-[#191c1b] hover:bg-[#f4f6f4] rounded-lg cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
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
