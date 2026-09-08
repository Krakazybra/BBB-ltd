import React, { useState } from 'react';
import { PageId, Language } from '../types';
import { TRANSLATIONS, STATIONS } from '../data/translations';
import { StationInteractiveMap } from '../components/StationInteractiveMap';
import { Phone, Clock, MessageSquare, Send, ChevronRight, MapPin, Building, ShieldCheck } from 'lucide-react';

interface ContactsPageProps {
  onNavigate: (page: PageId) => void;
  language: Language;
}

export const ContactsPage: React.FC<ContactsPageProps> = ({
  onNavigate,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const [formData, setFormData] = useState({
    cargo: 'Серная кислота',
    volume: '',
    departure: '',
    arrival: '',
    phone: '',
    name: '',
    comment: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*Новая заявка с сайта BBB Ltd*:
• *Имя:* ${formData.name || 'Не указано'}
• *Телефон:* ${formData.phone || 'Не указан'}
• *Груз:* ${formData.cargo}
• *Объем:* ${formData.volume || 'По согласованию'}
• *Отправление:* ${formData.departure || 'Уточняется'}
• *Назначение:* ${formData.arrival || 'Уточняется'}
• *Комментарий:* ${formData.comment || 'Нет'}`;

    window.open(`https://wa.me/77057838486?text=${encodeURIComponent(text)}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div id="contacts-page" className="w-full bg-[#f9faf8] py-8 sm:py-12">
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
          <span className="text-[#191c1b] font-bold">{t.contactsPage.title}</span>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl space-y-2.5">
          <h1 className="text-2xl sm:text-4xl font-bold font-heading text-[#191c1b] tracking-tight">
            {t.contactsPage.title}
          </h1>
          <p className="text-sm sm:text-base text-[#536154]">
            {t.contactsPage.subtitle}
          </p>
        </div>

        {/* Contact Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {/* Card 1: Phone */}
          <div className="bg-white p-5 rounded-2xl border border-[#e2e8e3] shadow-xs space-y-3 hover:border-[#006a37]/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#eaf5ee] text-[#006a37] flex items-center justify-center">
              <Phone size={20} />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#747874]">
                {t.contactsPage.phoneLabel}
              </span>
              <h3 className="text-lg font-bold font-mono text-[#191c1b] mt-0.5">
                +7 705 783 84 86
              </h3>
              <p className="text-xs text-[#536154] mt-0.5">
                Прямая линия диспетчерской службы
              </p>
            </div>
            <a
              href="tel:+77057838486"
              className="inline-flex items-center space-x-1 text-xs font-mono font-bold text-[#006a37] hover:underline"
            >
              <span>Позвонить</span>
              <ChevronRight size={13} />
            </a>
          </div>

          {/* Card 2: WhatsApp */}
          <div className="bg-white p-5 rounded-2xl border border-[#e2e8e3] shadow-xs space-y-3 hover:border-[#006a37]/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">chat</span>
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#747874]">
                {t.contactsPage.whatsappLabel}
              </span>
              <h3 className="text-lg font-bold font-heading text-[#191c1b] mt-0.5">
                WhatsApp Messenger
              </h3>
              <p className="text-xs text-[#536154] mt-0.5">
                {t.contactsPage.whatsappSub}
              </p>
            </div>
            <a
              href="https://wa.me/77057838486"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1 text-xs font-mono font-bold text-[#25D366] hover:underline"
            >
              <span>Открыть чат</span>
              <ChevronRight size={13} />
            </a>
          </div>

          {/* Card 3: Working Hours */}
          <div className="bg-white p-5 rounded-2xl border border-[#e2e8e3] shadow-xs space-y-3 hover:border-[#006a37]/50 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#eaf5ee] text-[#006a37] flex items-center justify-center">
              <Clock size={20} />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#747874]">
                {t.contactsPage.hoursLabel}
              </span>
              <h3 className="text-lg font-bold font-mono text-[#191c1b] mt-0.5">
                {t.contactsPage.hoursValue}
              </h3>
              <p className="text-xs text-[#536154] mt-0.5">
                Отгрузка на станциях: 24/7
              </p>
            </div>
            <div className="text-xs font-mono text-[#006a37] flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              <span>Инженер на связи</span>
            </div>
          </div>
        </div>

        {/* Form and Hubs Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Quick Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#e2e8e3] p-5 sm:p-6 shadow-xs">
            <div className="mb-4">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#006a37]">
                Оперативный расчет
              </span>
              <h3 className="text-xl font-bold font-heading text-[#191c1b] mt-0.5">
                {t.contactsPage.requestFormTitle}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold font-mono text-[#536154] uppercase tracking-wider mb-1">
                    {t.contactsPage.formLabels.cargo}
                  </label>
                  <select
                    value={formData.cargo}
                    onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                    className="w-full text-xs sm:text-sm px-3 py-2 border border-[#e2e8e3] rounded-lg bg-[#f9faf8] focus:bg-white focus:outline-none focus:border-[#006a37]"
                  >
                    <option value="Серная кислота">Серная кислота</option>
                    <option value="Аммиак жидкий">Аммиак жидкий / безводный</option>
                    <option value="Соляная кислота">Соляная кислота</option>
                    <option value="Другой химический груз">Другой опасный груз</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold font-mono text-[#536154] uppercase tracking-wider mb-1">
                    {t.contactsPage.formLabels.volume}
                  </label>
                  <input
                    type="text"
                    value={formData.volume}
                    onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                    placeholder="напр. 1200 тонн"
                    className="w-full text-xs sm:text-sm px-3 py-2 border border-[#e2e8e3] rounded-lg bg-[#f9faf8] focus:bg-white focus:outline-none focus:border-[#006a37]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold font-mono text-[#536154] uppercase tracking-wider mb-1">
                    {t.contactsPage.formLabels.departure}
                  </label>
                  <input
                    type="text"
                    value={formData.departure}
                    onChange={(e) => setFormData({ ...formData, departure: e.target.value })}
                    placeholder="напр. Караганда Сортировочная"
                    className="w-full text-xs sm:text-sm px-3 py-2 border border-[#e2e8e3] rounded-lg bg-[#f9faf8] focus:bg-white focus:outline-none focus:border-[#006a37]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold font-mono text-[#536154] uppercase tracking-wider mb-1">
                    {t.contactsPage.formLabels.arrival}
                  </label>
                  <input
                    type="text"
                    value={formData.arrival}
                    onChange={(e) => setFormData({ ...formData, arrival: e.target.value })}
                    placeholder="напр. Шиели"
                    className="w-full text-xs sm:text-sm px-3 py-2 border border-[#e2e8e3] rounded-lg bg-[#f9faf8] focus:bg-white focus:outline-none focus:border-[#006a37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold font-mono text-[#536154] uppercase tracking-wider mb-1">
                    {t.contactsPage.formLabels.name}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ваше имя / Компания"
                    className="w-full text-xs sm:text-sm px-3 py-2 border border-[#e2e8e3] rounded-lg bg-[#f9faf8] focus:bg-white focus:outline-none focus:border-[#006a37]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold font-mono text-[#536154] uppercase tracking-wider mb-1">
                    {t.contactsPage.formLabels.phone}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (___) ___-__-__"
                    className="w-full text-xs sm:text-sm px-3 py-2 border border-[#e2e8e3] rounded-lg bg-[#f9faf8] focus:bg-white focus:outline-none focus:border-[#006a37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold font-mono text-[#536154] uppercase tracking-wider mb-1">
                  {t.contactsPage.formLabels.comment}
                </label>
                <textarea
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  rows={2}
                  placeholder="Дополнительные сведения..."
                  className="w-full text-xs sm:text-sm px-3 py-2 border border-[#e2e8e3] rounded-lg bg-[#f9faf8] focus:bg-white focus:outline-none focus:border-[#006a37]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3 rounded-xl font-bold text-xs sm:text-sm shadow-xs flex items-center justify-center space-x-2 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>{t.contactsPage.formLabels.submit}</span>
              </button>
            </form>
          </div>

          {/* Logistics Stations Summary (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#101913] text-white p-5 rounded-2xl border border-[#213527]">
              <h4 className="text-base font-bold font-heading text-white mb-2">
                {t.contactsPage.hubTitle}
              </h4>
              <p className="text-xs text-[#a1aba2] mb-3">
                Собственные и партнерские терминалы налива и слива:
              </p>

              <div className="space-y-2">
                {STATIONS.map((station) => (
                  <div
                    key={station.id}
                    className="p-2.5 bg-[#16231a] rounded-xl border border-[#213527] flex items-start justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-white block text-xs">
                        {station.name}
                      </span>
                      <span className="text-[10px] text-[#a1aba2]">
                        {station.region} • {station.type}
                      </span>
                    </div>
                    {station.isMain && (
                      <span className="text-[8px] font-mono bg-[#90f8ae] text-[#00210d] font-bold px-1.5 py-0.5 rounded">
                        УЗЕЛ
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#f4f7f4] p-4 rounded-xl border border-[#e2e8e3] text-xs text-[#191c1b] space-y-1.5">
              <div className="flex items-center space-x-1.5 font-bold text-[#006a37]">
                <ShieldCheck size={16} />
                <span>Лицензии и сертификация</span>
              </div>
              <p className="text-[11px] text-[#536154] leading-relaxed">
                Все операции осуществляются в строгом соответствии с Правилами перевозок опасных грузов по железным дорогам РК и международными конвенциями.
              </p>
            </div>
          </div>
        </div>

        {/* Full Interactive Map */}
        <section className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#191c1b]">
            Интерактивная карта станций
          </h3>
          <StationInteractiveMap language={language} />
        </section>
      </div>
    </div>
  );
};
