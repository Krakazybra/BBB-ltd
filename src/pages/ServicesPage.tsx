import React from 'react';
import { PageId, Language } from '../types';
import { SERVICES_DATA, TRANSLATIONS } from '../data/translations';
import { ChevronRight, CheckCircle2, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageId) => void;
  language: Language;
  onOpenQuoteModal: (serviceName?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  language,
  onOpenQuoteModal,
}) => {
  const t = TRANSLATIONS[language];
  const services = SERVICES_DATA[language];

  const handleWhatsApp = (serviceTitle: string) => {
    const msg = encodeURIComponent(`Здравствуйте! Интересует услуга: "${serviceTitle}". Прошу рассчитать стоимость.`);
    window.open(`https://wa.me/77057838486?text=${msg}`, '_blank');
  };

  return (
    <div id="services-page" className="w-full bg-[#f9faf8] py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs font-mono text-[#747874]">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-[#006a37] transition-colors cursor-pointer"
          >
            {t.nav.home}
          </button>
          <ChevronRight size={12} />
          <span className="text-[#191c1b] font-bold">{t.servicesPage.title}</span>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl space-y-3">
          <h1 className="text-3xl sm:text-5xl font-bold font-heading text-[#191c1b] tracking-tight">
            {t.servicesPage.title}
          </h1>
          <p className="text-base sm:text-lg text-[#536154]">
            {t.servicesPage.subtitle}
          </p>
        </div>

        {/* 3 Detailed Service Cards (Matches Screen 3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={`service-detail-card-${service.id}`}
              className="bg-white rounded-2xl overflow-hidden border border-[#DBE2DC] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="h-56 overflow-hidden bg-zinc-100 relative">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded">
                    0{index + 1}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-5">
                  <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#191c1b] leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-sm text-[#536154] leading-relaxed">
                    {service.fullDesc}
                  </p>

                  {/* Steps section */}
                  <div className="space-y-2.5 pt-2 border-t border-[#DBE2DC]">
                    <h4 className="text-xs font-mono font-bold text-[#191c1b] uppercase tracking-wider">
                      {t.servicesPage.stepsHeading}
                    </h4>
                    <ol className="space-y-2 text-xs text-[#536154]">
                      {service.steps.map((step, stepIdx) => (
                        <li key={stepIdx} className="flex items-start space-x-2">
                          <span className="font-mono font-bold text-[#006a37] shrink-0">
                            {stepIdx + 1}.
                          </span>
                          <span className="leading-tight">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>

              {/* Card Action Buttons */}
              <div className="p-6 pt-0 space-y-2">
                <button
                  onClick={() => handleWhatsApp(service.title)}
                  className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-xs"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>{t.servicesPage.quoteButton}</span>
                </button>

                <button
                  onClick={() => onOpenQuoteModal(service.title)}
                  className="w-full bg-[#f2f4f1] hover:bg-[#E4F3EA] text-[#006a37] py-2 px-3 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer"
                >
                  Сформировать подробную заявку
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner Strip (Matches Screen 3) */}
        <div className="bg-[#101913] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#213527]">
          <div className="space-y-1">
            <h4 className="text-xl sm:text-2xl font-bold font-heading text-white">
              {t.servicesPage.bottomBannerTitle}
            </h4>
            <p className="text-sm text-[#a1aba2]">
              {t.servicesPage.bottomBannerSub}
            </p>
          </div>

          <button
            onClick={() => handleWhatsApp('расчет стоимости услуг')}
            className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-6 py-3.5 rounded-xl font-bold text-sm flex items-center space-x-2 whitespace-nowrap shadow-md transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">chat</span>
            <span>{t.servicesPage.quoteButton}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
