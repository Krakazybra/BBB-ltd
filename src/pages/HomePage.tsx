import React from 'react';
import { PageId, Language } from '../types';
import { ASSETS, TRANSLATIONS, STATIONS } from '../data/translations';
import { ArrowRight, Phone, CheckCircle2, ShieldAlert, Sparkles, Train, ChevronRight } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  language: Language;
  onOpenQuoteModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  language,
  onOpenQuoteModal,
}) => {
  const t = TRANSLATIONS[language];

  const handleWhatsApp = (topic?: string) => {
    const msg = encodeURIComponent(
      topic ? `Здравствуйте! Интересует ${topic}.` : 'Здравствуйте! Хочу проконсультироваться по услугам налива/слива и перевозки.'
    );
    window.open(`https://wa.me/77057838486?text=${msg}`, '_blank');
  };

  return (
    <div id="home-page" className="w-full bg-[#f9faf8]">
      {/* 1. Hero Section */}
      <section
        id="hero-section"
        className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden bg-[#101913]"
      >
        {/* Background Image with Dark Contrast Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={ASSETS.heroBg}
            alt="Railway chemical logistics"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity scale-105 transform duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#00210d]/90 via-[#101913]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101913] via-transparent to-[#101913]/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-3xl space-y-6">
            {/* Top Eyebrow Badge */}
            <div className="inline-flex items-center space-x-2 bg-[#006a37]/80 backdrop-blur-md border border-[#90f8ae]/30 px-3.5 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#90f8ae] animate-pulse"></span>
              <span className="text-xs font-mono font-bold tracking-widest text-[#90f8ae] uppercase">
                20 ЛЕТ ОПЫТА В КАЗАХСТАНЕ
              </span>
            </div>

            {/* Main Headline */}
            <h1
              id="hero-title"
              className="text-3xl sm:text-5xl lg:text-6xl font-bold font-heading text-white tracking-tight leading-[1.1] text-balance"
            >
              {t.hero.title}
            </h1>

            {/* Description Subtitle */}
            <p
              id="hero-description"
              className="text-base sm:text-lg text-[#c1cac1] leading-relaxed max-w-2xl font-body"
            >
              {t.hero.desc}
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3.5 sm:gap-4">
              <button
                id="hero-whatsapp-btn"
                onClick={() => handleWhatsApp('услуги налива/слива')}
                className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-lg hover:shadow-xl flex items-center space-x-2.5 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[22px]">chat</span>
                <span>{t.hero.whatsappBtn}</span>
              </button>

              <a
                id="hero-phone-btn"
                href="tel:+77057838486"
                className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 px-5 py-3.5 rounded-xl font-mono text-sm sm:text-base flex items-center space-x-2 transition-colors"
              >
                <Phone size={18} className="text-[#90f8ae]" />
                <span>{t.hero.phoneBtn}</span>
              </a>

              <button
                id="hero-quote-calc-btn"
                onClick={onOpenQuoteModal}
                className="text-[#90f8ae] hover:text-white px-4 py-3.5 text-xs sm:text-sm font-mono font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                <span>Онлайн-расчет</span>
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Quick KPI stats pill */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <span className="text-xl sm:text-2xl font-mono font-bold text-white block">20+</span>
                <span className="text-[11px] text-[#a1aba2] uppercase font-mono">Лет на рынке РК</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-mono font-bold text-[#90f8ae] block">5</span>
                <span className="text-[11px] text-[#a1aba2] uppercase font-mono">Ж/Д станций</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-mono font-bold text-white block">100%</span>
                <span className="text-[11px] text-[#a1aba2] uppercase font-mono">ADR / ДОПОГ</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. About Brief Section (Matches Screen 1) */}
      <section id="about-brief-section" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#DBE2DC] group">
              <img
                src={ASSETS.aboutBriefImg}
                alt="Промышленный объект налива BBB Ltd"
                className="w-full h-[360px] sm:h-[420px] object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-lg border border-[#DBE2DC] shadow-xs">
                <span className="text-xs font-mono font-bold text-[#006a37]">
                  Станция Караганда Сортировочная
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Brief Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-widest text-[#006a37]">
              <span>О компании</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold font-heading text-[#191c1b] leading-tight">
              {t.aboutBrief.title}
            </h2>

            <p className="text-base text-[#536154] leading-relaxed">
              {t.aboutBrief.desc}
            </p>

            <div className="pt-2">
              <button
                id="about-brief-more-btn"
                onClick={() => {
                  onNavigate('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center space-x-2 text-[#006a37] hover:text-[#00522b] font-bold text-sm group cursor-pointer"
              >
                <span>{t.aboutBrief.moreBtn}</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Services Bento Grid Section (Matches Screen 1) */}
      <section id="services-bento-section" className="py-20 bg-[#E4F3EA] border-y border-[#DBE2DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#191c1b]">
              {t.servicesSection.title}
            </h2>
            <p className="text-base text-[#536154] mt-2">
              {t.servicesSection.subtitle}
            </p>
          </div>

          {/* 3 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Серная кислота */}
            <div
              id="service-card-acid"
              className="bg-white rounded-2xl overflow-hidden border border-[#DBE2DC] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="h-52 overflow-hidden bg-zinc-100">
                  <img
                    src={ASSETS.serviceAcidImg}
                    alt="Налив и слив серной кислоты"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold font-heading text-[#191c1b] mb-2.5">
                    Налив и слив серной кислоты
                  </h3>
                  <p className="text-sm text-[#536154] leading-relaxed">
                    Строгий контроль герметичности и использования специализированных антикоррозийных материалов.
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => {
                    onNavigate('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs font-mono font-bold text-[#006a37] hover:text-[#00522b] flex items-center space-x-1 cursor-pointer"
                >
                  <span>{t.servicesSection.more}</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Card 2: Аммиак */}
            <div
              id="service-card-ammonia"
              className="bg-white rounded-2xl overflow-hidden border border-[#DBE2DC] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="h-52 overflow-hidden bg-zinc-100">
                  <img
                    src={ASSETS.serviceAmmoniaImg}
                    alt="Налив и слив аммиака"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold font-heading text-[#191c1b] mb-2.5">
                    Налив и слив аммиака
                  </h3>
                  <p className="text-sm text-[#536154] leading-relaxed">
                    Работа под высоким давлением с применением газоанализаторов и систем экстренной вентиляции.
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => {
                    onNavigate('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs font-mono font-bold text-[#006a37] hover:text-[#00522b] flex items-center space-x-1 cursor-pointer"
                >
                  <span>{t.servicesSection.more}</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Card 3: Перевозка опасных грузов */}
            <div
              id="service-card-logistics"
              className="bg-white rounded-2xl overflow-hidden border border-[#DBE2DC] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="h-52 overflow-hidden bg-zinc-100">
                  <img
                    src={ASSETS.serviceLogisticsImg}
                    alt="Организация перевозки опасных грузов"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold font-heading text-[#191c1b] mb-2.5">
                    Организация перевозки опасных грузов
                  </h3>
                  <p className="text-sm text-[#536154] leading-relaxed">
                    Полное документальное сопровождение и логистическое планирование для опасных грузов.
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => {
                    onNavigate('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs font-mono font-bold text-[#006a37] hover:text-[#00522b] flex items-center space-x-1 cursor-pointer"
                >
                  <span>{t.servicesSection.more}</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Strip Banner: "Стоимость — по запросу" (Exact match to Screen 1) */}
          <div className="mt-8 bg-[#101913] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#213527]">
            <div>
              <h4 className="text-xl sm:text-2xl font-bold font-heading text-white">
                {t.servicesSection.priceOnRequest}
              </h4>
              <p className="text-sm text-[#a1aba2] mt-1">
                Зависит от объёма партии, станции подачи и сроков.
              </p>
            </div>

            <button
              id="services-calc-whatsapp-btn"
              onClick={() => handleWhatsApp('расчет стоимости услуг')}
              className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-6 py-3.5 rounded-xl font-bold text-sm flex items-center space-x-2.5 whitespace-nowrap shadow-md transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">chat</span>
              <span>{t.servicesSection.requestCalcWhatsapp}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us Section (Matches Screen 1) */}
      <section id="why-us-section" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#191c1b]">
            {t.whyUs.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {t.whyUs.items.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl border border-[#DBE2DC] shadow-xs flex flex-col justify-between hover:border-[#006a37]/50 transition-colors"
            >
              <div className="text-3xl font-mono font-bold text-[#006a37] mb-4">
                0{index + 1}
              </div>
              <div>
                <h3 className="text-base font-bold font-heading text-[#191c1b] mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-[#536154] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Pre-footer CTA Section (Matches Screen 1) */}
      <section id="cta-section" className="py-16 bg-[#006a37] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-bold font-heading">
            {t.cta.title}
          </h2>
          <p className="text-sm sm:text-base text-[#90f8ae] max-w-2xl mx-auto">
            {t.cta.sub}
          </p>
          <div className="pt-2 flex justify-center">
            <button
              id="cta-whatsapp-btn"
              onClick={() => handleWhatsApp('обсуждение объемов и сроков')}
              className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-8 py-4 rounded-xl font-bold text-base shadow-xl hover:shadow-2xl flex items-center space-x-2.5 transition-all hover:scale-105 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">chat</span>
              <span>{t.cta.button}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
