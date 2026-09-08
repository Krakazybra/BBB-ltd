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
    <div id="services-page" className="w-full bg-[#f9faf8] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-1.5 text-xs font-mono text-[#747874]">
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
        <div className="max-w-3xl space-y-2.5">
          <h1 className="text-2xl sm:text-4xl font-bold font-heading text-[#191c1b] tracking-tight">
            {t.servicesPage.title}
          </h1>
          <p className="text-sm sm:text-base text-[#536154]">
            {t.servicesPage.subtitle}
          </p>
        </div>

        {/* 3 Detailed Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={`service-detail-card-${service.id}`}
              className="bg-white rounded-2xl overflow-hidden border border-[#e2e8e3] shadow-xs hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="h-44 overflow-hidden bg-zinc-100 relative">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded">
                    0{index + 1}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-4">
                  <h3 className="text-lg font-bold font-heading text-[#191c1b] leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#536154] leading-relaxed">
                    {service.fullDesc}
                  </p>

                  {/* Steps section */}
                  <div className="space-y-2 pt-2 border-t border-[#e2e8e3]">
                    <h4 className="text-[11px] font-mono font-bold text-[#191c1b] uppercase tracking-wider">
                      {t.servicesPage.stepsHeading}
                    </h4>
                    <ol className="space-y-1.5 text-xs text-[#536154]">
                      {service.steps.map((step, stepIdx) => (
                        <li key={stepIdx} className="flex items-start space-x-1.5">
                          <span className="font-mono font-bold text-[#006a37] shrink-0 text-xs">
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
              <div className="p-5 pt-0 space-y-1.5">
                <button
                  onClick={() => handleWhatsApp(service.title)}
                  className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  <span>{t.servicesPage.quoteButton}</span>
                </button>

                <button
                  onClick={() => onOpenQuoteModal(service.title)}
                  className="w-full bg-[#f4f6f4] hover:bg-[#eaf5ee] text-[#006a37] py-2 px-3 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer"
                >
                  Сформировать заявку
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner Strip */}
        <div className="bg-[#101913] text-white rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#213527]">
          <div className="space-y-0.5">
            <h4 className="text-lg sm:text-xl font-bold font-heading text-white">
              {t.servicesPage.bottomBannerTitle}
            </h4>
            <p className="text-xs sm:text-sm text-[#a1aba2]">
              {t.servicesPage.bottomBannerSub}
            </p>
          </div>

          <button
            onClick={() => handleWhatsApp('расчет стоимости услуг')}
            className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center space-x-2 whitespace-nowrap shadow-xs transition-all cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>{t.servicesPage.quoteButton}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
