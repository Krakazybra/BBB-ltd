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
    <div id="about-page" className="w-full bg-[#f9faf8] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-1.5 text-xs font-mono text-[#747874]">
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
        <div className="max-w-3xl space-y-3">
          <h1 className="text-2xl sm:text-4xl font-bold font-heading text-[#191c1b] tracking-tight">
            {t.aboutPage.title}
          </h1>
          <p className="text-sm sm:text-base text-[#536154] leading-relaxed">
            {t.aboutPage.leadText}
          </p>
        </div>

        {/* Two Highlight Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-2xl overflow-hidden shadow-xs border border-[#e2e8e3] group bg-zinc-100">
            <img
              src={ASSETS.aboutTruckLarge}
              alt="Специализированная автоцистерна для опасных грузов"
              className="w-full h-56 sm:h-72 object-cover group-hover:scale-102 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xs border border-[#e2e8e3] group bg-zinc-100">
            <img
              src={ASSETS.aboutEstakada}
              alt="Железнодорожная эстакада налива"
              className="w-full h-56 sm:h-72 object-cover group-hover:scale-102 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Section: Как мы обеспечиваем безопасность */}
        <section className="space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#191c1b]">
              {t.aboutPage.safetyTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.aboutPage.safetyCards.map((card, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-2xl border border-[#e2e8e3] shadow-xs flex flex-col justify-between hover:border-[#006a37]/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#eaf5ee] text-[#006a37] flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[22px]">
                    {card.icon}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold font-heading text-[#191c1b] mb-1.5">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#536154] leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Banner to Team Page */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#e2e8e3] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-bold font-heading text-[#191c1b]">
              {language === 'ru' ? 'Руководство компании BBB Ltd' : 'BBB Ltd компаниясының басшылығы'}
            </h3>
            <p className="text-xs text-[#536154] max-w-2xl">
              {language === 'ru'
                ? 'Директор Мухышев Ж.Б. и Заместитель директора Конкуров Е. — персональная ответственность за безопасность каждого налива и маршрута.'
                : 'Директор Ж.Б. Мұқышев және Директордың орынбасары Е. Қоңқыров — әрбір құю мен бағыттың қауіпсіздігіне жеке жауапкершілік.'}
            </p>
          </div>
          <button
            onClick={() => {
              onNavigate('team');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center space-x-1.5 bg-[#006a37] hover:bg-[#00522b] text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors shadow-xs shrink-0 cursor-pointer"
          >
            <span>{language === 'ru' ? 'Страница команды' : 'Команда парақшасы'}</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Section: География работы */}
        <section className="space-y-6">
          <div className="max-w-3xl space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#191c1b]">
              {t.aboutPage.geographyTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#536154]">
              {t.aboutPage.geographyDesc}
            </p>
          </div>

          {/* 5 Hub Badges List */}
          <div className="flex flex-wrap gap-2">
            {[
              'Караганда (Сортировочная)',
              'Балхаш',
              'Жанатас',
              'Шу',
              'Шиели',
            ].map((stationName, idx) => (
              <div
                key={idx}
                className="inline-flex items-center space-x-2 bg-white px-3 py-1.5 rounded-lg border border-[#e2e8e3] text-xs font-medium text-[#191c1b]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#006a37]"></span>
                <span>{stationName}</span>
              </div>
            ))}
          </div>

          {/* Interactive Hub Map */}
          <StationInteractiveMap language={language} />
        </section>

        {/* CTA Bottom Banner */}
        <section className="bg-[#005a2f] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-sm">
          <div className="space-y-1 max-w-xl text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
              {t.aboutPage.ctaQuestion}
            </h3>
            <p className="text-xs sm:text-sm text-[#a1f0bd]">
              Свяжитесь с нами — поможем согласовать схемы подачи и подготовить регламенты.
            </p>
          </div>

          <button
            onClick={() => handleWhatsApp('Консультация по перевозке опасных грузов')}
            className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center space-x-2 shadow-xs transition-colors cursor-pointer whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>{t.aboutPage.ctaButton}</span>
          </button>
        </section>
      </div>
    </div>
  );
};
