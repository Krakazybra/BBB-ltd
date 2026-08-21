import React from 'react';
import { PageId, Language } from '../types';
import { ASSETS, TRANSLATIONS } from '../data/translations';
import { StationInteractiveMap } from '../components/StationInteractiveMap';
import { ArrowRight, ChevronRight, ShieldCheck, MapPin, Award, CheckCircle2 } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  language: Language;
  onOpenQuoteModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  language,
  onOpenQuoteModal,
}) => {
  const t = TRANSLATIONS[language];

  const handleWhatsApp = (topic?: string) => {
    const msg = encodeURIComponent(
      topic ? `Здравствуйте! ${topic}` : 'Здравствуйте! Нужна консультация по перевозке опасных грузов.'
    );
    window.open(`https://wa.me/77057838486?text=${msg}`, '_blank');
  };

  return (
    <div id="about-page" className="w-full bg-[#f9faf8] py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs font-mono text-[#747874]">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-[#006a37] transition-colors cursor-pointer"
          >
            {t.nav.home}
          </button>
          <ChevronRight size={12} />
          <span className="text-[#191c1b] font-bold">{t.aboutPage.title}</span>
        </nav>

        {/* Header and Lead Text */}
        <div className="max-w-4xl space-y-4">
          <h1 className="text-3xl sm:text-5xl font-bold font-heading text-[#191c1b] tracking-tight">
            {t.aboutPage.title}
          </h1>
          <p className="text-base sm:text-xl text-[#536154] leading-relaxed">
            {t.aboutPage.leadText}
          </p>
        </div>

        {/* Two Highlight Images (Matches Screen 2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl overflow-hidden shadow-md border border-[#DBE2DC] group bg-zinc-100">
            <img
              src={ASSETS.aboutTruckLarge}
              alt="Специализированная автоцистерна для опасных грузов"
              className="w-full h-72 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-md border border-[#DBE2DC] group bg-zinc-100">
            <img
              src={ASSETS.aboutEstakada}
              alt="Железнодорожная эстакада налива"
              className="w-full h-72 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Section: Как мы обеспечиваем безопасность */}
        <section className="space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#191c1b]">
              {t.aboutPage.safetyTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.aboutPage.safetyCards.map((card, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border border-[#DBE2DC] shadow-xs flex flex-col justify-between hover:border-[#006a37]/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-[#E4F3EA] text-[#006a37] flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined text-[26px]">
                    {card.icon}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-bold font-heading text-[#191c1b] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#536154] leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: География работы */}
        <section className="space-y-8">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#191c1b]">
              {t.aboutPage.geographyTitle}
            </h2>
            <p className="text-sm text-[#536154]">
              {t.aboutPage.geographyDesc}
            </p>
          </div>

          {/* 5 Hub Badges List */}
          <div className="flex flex-wrap gap-3">
            {[
              'Караганда (Сортировочная)',
              'Балхаш',
              'Жанатас',
              'Шу',
              'Шиели',
            ].map((stationName, idx) => (
              <div
                key={idx}
                className="inline-flex items-center space-x-2 bg-white px-4 py-2.5 rounded-xl border border-[#DBE2DC] shadow-xs text-sm font-medium text-[#191c1b]"
              >
                <span className="w-2 h-2 rounded-full bg-[#006a37]"></span>
                <span>{stationName}</span>
              </div>
            ))}
          </div>

          {/* Interactive Hub Map */}
          <StationInteractiveMap language={language} />
        </section>

        {/* CTA Bottom Banner */}
        <section className="bg-[#006a37] text-white rounded-2xl p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white">
              {t.aboutPage.ctaQuestion}
            </h3>
            <p className="text-sm text-[#90f8ae]">
              Свяжитесь с нами — поможем согласовать схемы подачи и подготовить регламенты.
            </p>
          </div>

          <button
            onClick={() => handleWhatsApp('Консультация по перевозке опасных грузов')}
            className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-8 py-4 rounded-xl font-bold text-sm sm:text-base flex items-center space-x-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-[22px]">chat</span>
            <span>{t.aboutPage.ctaButton}</span>
          </button>
        </section>
      </div>
    </div>
  );
};
