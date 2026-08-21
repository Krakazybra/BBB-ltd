import React from 'react';
import { PageId, Language } from '../types';
import { ASSETS, TRANSLATIONS } from '../data/translations';
import { Phone, Clock, ShieldCheck, MapPin, Send } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, language }) => {
  const t = TRANSLATIONS[language];

  const handleNavClick = (id: PageId) => {
    onNavigate(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/77057838486?text=' + encodeURIComponent('Здравствуйте!'), '_blank');
  };

  return (
    <footer id="app-footer" className="bg-[#101913] text-[#e0e3de] border-t border-[#1e2e23] pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#213527]">
          {/* Col 1: Brand & Logo */}
          <div className="space-y-4 md:col-span-2">
            <div
              id="footer-logo-btn"
              onClick={() => handleNavClick('home')}
              className="cursor-pointer inline-block"
            >
              <img
                src={ASSETS.footerLogo}
                alt="BBB LTD"
                className="h-10 w-auto object-contain brightness-110"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-[#a1aba2] text-sm leading-relaxed max-w-md">
              {language === 'ru'
                ? 'Специализированная логистика опасных грузов: безопасный налив, слив и организация железнодорожных и автомобильных перевозок серной кислоты и аммиака в Республике Казахстан.'
                : 'Қауіпті жүктердің арнайы логистикасы: Қазақстан Республикасында күкірт қышқылы мен аммиакты қауіпсіз құю, төгу және теміржол мен автокөлікпен тасымалдауды ұйымдастыру.'}
            </p>
            <div className="flex items-center space-x-2 text-xs text-[#90f8ae] font-mono pt-1">
              <ShieldCheck size={16} />
              <span>Лицензированный оператор опасных грузов РК</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#90f8ae] uppercase">
              {t.footer.navTitle}
            </h4>
            <ul className="space-y-2.5 text-sm text-[#c1cac1]">
              <li>
                <button
                  id="footer-nav-home"
                  onClick={() => handleNavClick('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-about"
                  onClick={() => handleNavClick('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-services"
                  onClick={() => handleNavClick('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-gallery"
                  onClick={() => handleNavClick('gallery')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.gallery}
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-contacts"
                  onClick={() => handleNavClick('contacts')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.contacts}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contacts */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#90f8ae] uppercase">
              {t.footer.contactsTitle}
            </h4>
            <div className="space-y-3 text-sm text-[#c1cac1]">
              <a
                id="footer-phone-link"
                href="tel:+77057838486"
                className="flex items-center space-x-2.5 text-white hover:text-[#90f8ae] transition-colors font-medium"
              >
                <Phone size={16} className="text-[#90f8ae]" />
                <span>+7 705 783 84 86</span>
              </a>

              <div className="flex items-center space-x-2.5 text-xs text-[#a1aba2]">
                <Clock size={16} className="text-[#90f8ae]" />
                <span>{t.footer.hours} (Пн - Сб)</span>
              </div>

              <div className="flex items-start space-x-2.5 text-xs text-[#a1aba2]">
                <MapPin size={16} className="text-[#90f8ae] shrink-0 mt-0.5" />
                <span>Караганда, Балхаш, Жанатас, Шу, Шиели</span>
              </div>

              <button
                id="footer-whatsapp-btn"
                onClick={handleWhatsApp}
                className="mt-2 inline-flex items-center space-x-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow-xs transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                <span>Написать в WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#747874] space-y-3 sm:space-y-0">
          <p>{t.footer.copy}</p>
          <p className="font-mono text-[11px] text-[#536154]">
            Республика Казахстан • ISO & ДОПОГ стандарты
          </p>
        </div>
      </div>
    </footer>
  );
};
