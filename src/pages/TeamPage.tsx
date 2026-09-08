import React, { useState } from 'react';
import { PageId, Language, TeamMember } from '../types';
import { TRANSLATIONS, TEAM_MEMBERS } from '../data/translations';
import { 
  ChevronRight, 
  ShieldCheck, 
  Phone, 
  CheckCircle2, 
  Building2, 
  UserCheck,
  Maximize2,
  X
} from 'lucide-react';

interface TeamPageProps {
  onNavigate: (page: PageId) => void;
  language: Language;
}

export const TeamPage: React.FC<TeamPageProps> = ({ onNavigate, language }) => {
  const t = TRANSLATIONS[language];
  const members: TeamMember[] = TEAM_MEMBERS[language];
  const directorMember = members.find((m) => m.id === 'director') || members[0];
  const deputyMember = members.find((m) => m.id === 'deputy-director') || members[1];

  const [imageLoadError, setImageLoadError] = useState(false);
  const [showFullPhoto, setShowFullPhoto] = useState(false);

  const photoSrc = directorMember.photoUrl || '/images/director_mukhyshev.jpg';

  const handleDirectWhatsApp = (name: string, role: string) => {
    const text = encodeURIComponent(
      language === 'ru'
        ? `Здравствуйте! Обращаюсь по вопросу сотрудничества с BBB Ltd к ${role} (${name}).`
        : `Сәлеметсіз бе! BBB Ltd компаниясымен ынтымақтастық мәселесі бойынша ${role} (${name}) хабарласып отырмын.`
    );
    window.open(`https://wa.me/77057838486?text=${text}`, '_blank');
  };

  return (
    <div id="team-page-root" className="w-full bg-[#f9faf8] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Breadcrumb */}
        <nav id="team-breadcrumb" className="flex items-center space-x-1.5 text-xs font-mono text-[#747874]">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-[#006a37] transition-colors cursor-pointer"
          >
            {t.nav.home}
          </button>
          <ChevronRight size={12} />
          <span className="text-[#191c1b] font-bold">{t.teamPage.breadcrumb}</span>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#eaf5ee] text-[#006a37] text-[11px] font-mono font-semibold uppercase tracking-wider">
            <Building2 size={13} />
            <span>{language === 'ru' ? 'Высшее руководство' : 'Жоғары басшылық'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold font-heading text-[#191c1b] tracking-tight">
            {t.teamPage.title}
          </h1>
          <p className="text-sm sm:text-base text-[#536154] leading-relaxed">
            {t.teamPage.subtitle}
          </p>
        </div>

        {/* Leadership Cards Section */}
        <section id="executive-leadership-section" className="space-y-6">
          <div className="border-b border-[#e2e8e3] pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#191c1b]">
                {t.teamPage.leadershipTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#536154] mt-0.5">
                {t.teamPage.leadershipSubtitle}
              </p>
            </div>
            <div className="flex items-center space-x-1.5 text-[11px] font-mono text-[#006a37] bg-[#eaf5ee] px-2.5 py-1 rounded-lg shrink-0">
              <ShieldCheck size={14} />
              <span>{language === 'ru' ? 'Персональная ответственность' : 'Жеке жауапкершілік'}</span>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* 1. Director Card (With Executive Photo) */}
            {directorMember && (
              <div
                id={`team-card-${directorMember.id}`}
                className="bg-white rounded-2xl border border-[#e2e8e3] shadow-xs hover:shadow-sm transition-all p-5 sm:p-6 flex flex-col justify-between"
              >
                <div className="space-y-5">
                  {/* Top: Photo + Key Profile Details */}
                  <div className="flex flex-col sm:flex-row gap-5 items-start">
                    {/* Director Photo Frame (Read-only, secure, production-grade) */}
                    <div className="w-full sm:w-48 shrink-0">
                      {!imageLoadError ? (
                        <div className="space-y-1.5">
                          <div 
                            className="aspect-[3/4] w-full rounded-xl bg-[#101913] border border-[#d5ded7] shadow-sm relative overflow-hidden group cursor-pointer"
                            onClick={() => setShowFullPhoto(true)}
                            title={language === 'ru' ? 'Нажмите для просмотра в полном размере' : 'Толық көлемде көру үшін басыңыз'}
                          >
                            <img
                              src={photoSrc}
                              alt={directorMember.name}
                              onError={() => setImageLoadError(true)}
                              className="w-full h-full object-cover object-top rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
                              referrerPolicy="no-referrer"
                            />
                            {/* Hover zoom indicator */}
                            <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/50 text-white/90 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Maximize2 size={13} />
                            </div>

                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent p-2.5 pt-6 pointer-events-none">
                              <span className="text-[10px] font-mono font-medium text-white/95 uppercase tracking-wider block">
                                BBB Ltd • {language === 'ru' ? 'Дирекция' : 'Дирекция'}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-[11px] font-mono text-[#747874] px-0.5">
                            <span className="text-[#006a37] font-semibold">
                              {language === 'ru' ? 'Официальный портрет' : 'Ресми портрет'}
                            </span>
                            <button
                              type="button"
                              onClick={() => setShowFullPhoto(true)}
                              className="hover:text-[#006a37] transition-colors cursor-pointer inline-flex items-center space-x-1"
                            >
                              <Maximize2 size={11} />
                              <span>{language === 'ru' ? 'Увеличить' : 'Үлкейту'}</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="aspect-[3/4] w-full rounded-xl bg-gradient-to-b from-[#101913] to-[#18291f] text-white border border-[#213527] shadow-xs flex flex-col justify-between p-4 relative overflow-hidden">
                          <div className="flex justify-between items-start">
                            <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 text-[#90f8ae] flex items-center justify-center text-sm font-bold font-heading">
                              {directorMember.initials}
                            </div>
                            <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-[#90f8ae]/15 text-[#90f8ae] border border-[#90f8ae]/25 uppercase">
                              Executive
                            </span>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-white/60 uppercase tracking-wider block">
                              ТОО «BBB Ltd»
                            </span>
                            <h4 className="text-xs font-bold text-white leading-tight">
                              {directorMember.name}
                            </h4>
                            <p className="text-[10px] text-[#a1aba2] font-mono">
                              {directorMember.role}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Header Info */}
                    <div className="space-y-2 flex-1">
                      <span className="inline-block px-2.5 py-0.5 rounded bg-[#eaf5ee] text-[#006a37] text-[11px] font-mono font-semibold">
                        {directorMember.badge}
                      </span>

                      <div>
                        <h3 className="text-lg sm:text-xl font-bold font-heading text-[#191c1b] leading-tight">
                          {directorMember.name}
                        </h3>
                        <p className="text-sm font-semibold text-[#006a37] mt-0.5">
                          {directorMember.role}
                        </p>
                      </div>

                      <p className="text-xs text-[#536154] leading-relaxed pt-1">
                        {directorMember.bio}
                      </p>

                      {directorMember.contactNote && (
                        <div className="pt-1.5 text-[11px] font-mono text-[#747874] flex items-center space-x-1.5">
                          <Building2 size={13} className="text-[#006a37] shrink-0" />
                          <span>{directorMember.contactNote}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Key Responsibilities */}
                  <div className="bg-[#f9faf8] p-3.5 sm:p-4 rounded-xl border border-[#e2e8e3] space-y-2">
                    <div className="flex items-center space-x-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#191c1b]">
                      <UserCheck size={13} className="text-[#006a37]" />
                      <span>{t.teamPage.viewCredentials}</span>
                    </div>
                    <ul className="space-y-1.5">
                      {directorMember.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start space-x-2 text-xs text-[#536154]">
                          <CheckCircle2 size={13} className="text-[#006a37] shrink-0 mt-0.5" />
                          <span className="leading-snug">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="mt-5 pt-3.5 border-t border-[#e2e8e3] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <span className="text-[11px] font-mono text-[#747874] hidden sm:inline">
                    {language === 'ru' ? 'Прямая связь с дирекцией' : 'Дирекциямен тікелей байланыс'}
                  </span>
                  <button
                    id={`team-whatsapp-cta-${directorMember.id}`}
                    onClick={() => handleDirectWhatsApp(directorMember.name, directorMember.role)}
                    className="inline-flex items-center justify-center space-x-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px]">chat</span>
                    <span>{language === 'ru' ? 'Написать директору в WhatsApp' : 'Директорға WhatsApp-қа жазу'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* 2. Deputy Director Card (Engineered Operational Command Design Without Photo) */}
            {deputyMember && (
              <div
                id={`team-card-${deputyMember.id}`}
                className="bg-white rounded-2xl border border-[#e2e8e3] shadow-xs hover:shadow-sm transition-all p-5 sm:p-6 flex flex-col justify-between"
              >
                <div className="space-y-5">
                  {/* Top: Distinguished Operational Command Header */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      {/* Executive Technical Insignia Monogram */}
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#101913] text-[#90f8ae] border border-[#213527] flex flex-col items-center justify-center shrink-0 shadow-xs">
                        <span className="font-heading font-bold text-lg text-white leading-none">
                          {deputyMember.initials}
                        </span>
                        <span className="text-[8px] font-mono text-[#90f8ae] uppercase tracking-wider font-semibold mt-1">
                          {language === 'ru' ? 'Операции' : 'Жедел'}
                        </span>
                      </div>

                      {/* Title, Name, Role */}
                      <div className="space-y-1 flex-1">
                        <span className="inline-block px-2.5 py-0.5 rounded bg-[#eaf5ee] text-[#006a37] text-[11px] font-mono font-semibold">
                          {deputyMember.badge}
                        </span>

                        <h3 className="text-lg sm:text-xl font-bold font-heading text-[#191c1b] leading-tight">
                          {deputyMember.name}
                        </h3>
                        <p className="text-sm font-semibold text-[#006a37]">
                          {deputyMember.role}
                        </p>
                      </div>
                    </div>

                    {/* 24/7 Operational Field Status Callout */}
                    <div className="bg-[#f2f7f4] border border-[#d2e4d6] rounded-xl p-3 sm:p-3.5 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5 text-[11px] font-mono font-bold text-[#006a37]">
                          <span className="w-2 h-2 rounded-full bg-[#006a37] animate-pulse"></span>
                          <span>
                            {language === 'ru' ? 'Полевой технический контроль 24/7' : '24/7 далалық техникалық бақылау'}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-[#536154] hidden sm:inline">
                          {language === 'ru' ? '5 станций РК' : 'ҚР 5 бекеті'}
                        </span>
                      </div>

                      <p className="text-xs text-[#2c3d2e] leading-relaxed">
                        {deputyMember.bio}
                      </p>

                      {/* Operational Stations tags */}
                      <div className="pt-1 flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
                        <span className="text-[#536154]">
                          {language === 'ru' ? 'Узловые терминалы:' : 'Тораптық терминалдар:'}
                        </span>
                        {['Караганда', 'Балхаш', 'Жанатас', 'Шу', 'Шиели'].map((st, idx) => (
                          <span key={idx} className="bg-white text-[#006a37] px-2 py-0.5 rounded border border-[#d2e4d6] font-semibold">
                            {st}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Key Responsibilities */}
                  <div className="bg-[#f9faf8] p-3.5 sm:p-4 rounded-xl border border-[#e2e8e3] space-y-2">
                    <div className="flex items-center space-x-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#191c1b]">
                      <UserCheck size={13} className="text-[#006a37]" />
                      <span>{t.teamPage.viewCredentials}</span>
                    </div>
                    <ul className="space-y-1.5">
                      {deputyMember.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start space-x-2 text-xs text-[#536154]">
                          <CheckCircle2 size={13} className="text-[#006a37] shrink-0 mt-0.5" />
                          <span className="leading-snug">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="mt-5 pt-3.5 border-t border-[#e2e8e3] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <span className="text-[11px] font-mono text-[#747874] hidden sm:inline">
                    {deputyMember.contactNote}
                  </span>
                  <button
                    id={`team-whatsapp-cta-${deputyMember.id}`}
                    onClick={() => handleDirectWhatsApp(deputyMember.name, deputyMember.role)}
                    className="inline-flex items-center justify-center space-x-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px]">chat</span>
                    <span>{language === 'ru' ? 'Связаться с оперативным отделом' : 'Жедел бөлімге жазу'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Leadership Standards / Principles Section */}
        <section id="leadership-principles-section" className="space-y-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#191c1b]">
              {t.teamPage.standardsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.teamPage.standards.map((standard, index) => (
              <div
                key={index}
                className="bg-white p-4 sm:p-5 rounded-xl border border-[#e2e8e3] shadow-xs flex flex-col justify-between hover:border-[#006a37]/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#eaf5ee] text-[#006a37] flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-[22px]">
                    {standard.icon}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-bold font-heading text-[#191c1b] mb-1">
                    {standard.title}
                  </h3>
                  <p className="text-xs text-[#536154] leading-relaxed">
                    {standard.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Operational Staff & Terminal Network Banner */}
        <section id="operational-network-section" className="bg-[#101913] text-white rounded-2xl p-6 sm:p-8 border border-[#213527]">
          <div className="max-w-3xl space-y-3">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#90f8ae]/15 text-[#90f8ae] text-[10px] font-mono font-semibold uppercase tracking-wider border border-[#90f8ae]/30">
              {t.teamPage.operationsBadge}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
              {t.teamPage.operationsStaffTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#a1aba2] leading-relaxed">
              {t.teamPage.operationsStaffDesc}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2">
              {['Караганда', 'Балхаш', 'Жанатас', 'Шу', 'Шиели'].map((station, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-white/10 text-xs font-mono text-[#e0e3de] border border-white/10"
                >
                  📍 {station}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Executive Direct Contact CTA */}
        <section id="executive-contact-cta" className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e2e8e3] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl text-center md:text-left">
            <h2 className="text-lg sm:text-xl font-bold font-heading text-[#191c1b]">
              {t.teamPage.directContactTitle}
            </h2>
            <p className="text-xs sm:text-sm text-[#536154] leading-relaxed">
              {t.teamPage.directContactDesc}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto shrink-0">
            <button
              id="team-executive-whatsapp"
              onClick={() => handleDirectWhatsApp(directorMember?.name || 'Дирекция', directorMember?.role || 'Директор')}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-5 py-2.5 rounded-xl font-semibold text-xs shadow-xs transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>{t.teamPage.whatsappExecutiveBtn}</span>
            </button>

            <a
              id="team-executive-phone"
              href="tel:+77057838486"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 bg-[#f4f6f4] hover:bg-[#eaf5ee] text-[#191c1b] px-4 py-2.5 rounded-xl font-semibold text-xs border border-[#e2e8e3] transition-colors"
            >
              <Phone size={14} className="text-[#006a37]" />
              <span>+7 705 783 84 86</span>
            </a>
          </div>
        </section>

        {/* Fullsize Director Photo Modal (Read-only Lightbox) */}
        {showFullPhoto && !imageLoadError && (
          <div 
            id="director-photo-modal"
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowFullPhoto(false)}
          >
            <div 
              className="relative max-w-2xl max-h-[92vh] bg-[#101913] rounded-2xl overflow-hidden shadow-2xl border border-white/20 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 text-white">
                <span className="text-xs font-mono font-semibold">
                  {directorMember.name} • {directorMember.role}
                </span>
                <button
                  onClick={() => setShowFullPhoto(false)}
                  className="p-1.5 text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/10 cursor-pointer"
                  title="Закрыть"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-auto flex items-center justify-center p-3 bg-black/60">
                <img 
                  src={photoSrc} 
                  alt={directorMember.name}
                  className="max-h-[78vh] w-auto object-contain rounded-lg shadow-xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="px-4 py-2.5 bg-[#101913] border-t border-white/10 flex items-center justify-between text-xs text-[#a1aba2]">
                <span className="font-mono text-[11px]">
                  ТОО «BBB Ltd» • Высшее стратегическое руководство
                </span>
                <span className="font-mono text-[11px] text-[#90f8ae]">
                  Караганда • РК
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

