import React, { useState } from 'react';
import { X, Send, Calculator, Check, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  preselectedService?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  language,
  preselectedService,
}) => {
  const [service, setService] = useState(preselectedService || 'Налив и слив серной кислоты');
  const [cargo, setCargo] = useState('Серная кислота');
  const [volume, setVolume] = useState('500 тонн');
  const [fromStation, setFromStation] = useState('Караганда Сортировочная');
  const [toStation, setToStation] = useState('Шиели');
  const [phone, setPhone] = useState('');
  const [clientName, setClientName] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const t = TRANSLATIONS[language].quoteModal;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*Запрос на расчет логистики (BBB Ltd)*:
• *Услуга:* ${service}
• *Груз:* ${cargo}
• *Объем:* ${volume}
• *Пункт отправления / станция:* ${fromStation}
• *Пункт назначения / станция:* ${toStation}
${clientName ? `• *Контактное лицо:* ${clientName}` : ''}
${phone ? `• *Телефон:* ${phone}` : ''}
${notes ? `• *Примечание:* ${notes}` : ''}`;

    const url = `https://wa.me/77057838486?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div
      id="quote-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="quote-modal-content"
        className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-[#DBE2DC] overflow-hidden my-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#006a37] text-white p-6 relative">
          <div className="flex items-center space-x-2 text-xs font-mono text-[#90f8ae] uppercase tracking-wider mb-1">
            <Calculator size={16} />
            <span>Калькулятор стоимости</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-heading">
            {t.title}
          </h3>
          <p className="text-sm text-[#c1cac1] mt-1">
            {t.subtitle}
          </p>
          <button
            id="quote-modal-close-btn"
            onClick={onClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white bg-black/20 hover:bg-black/30 p-2 rounded-full transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold font-mono text-[#536154] uppercase tracking-wider mb-1.5">
              {t.serviceType}
            </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full text-sm px-3.5 py-2.5 border border-[#DBE2DC] rounded-lg bg-[#f9faf8] focus:bg-white focus:outline-none focus:border-[#006a37] transition-colors"
            >
              <option value="Налив и слив серной кислоты">Налив и слив серной кислоты</option>
              <option value="Налив и слив аммиака">Налив и слив аммиака</option>
              <option value="Организация перевозки опасных грузов">Организация перевозки опасных грузов</option>
              <option value="Комплексная обработка и логистика под ключ">Комплексная обработка и логистика под ключ</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold font-mono text-[#536154] uppercase tracking-wider mb-1.5">
                {t.cargoType}
              </label>
              <select
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                className="w-full text-sm px-3.5 py-2.5 border border-[#DBE2DC] rounded-lg bg-[#f9faf8] focus:bg-white focus:outline-none focus:border-[#006a37] transition-colors"
              >
                <option value="Серная кислота">Серная кислота</option>
                <option value="Аммиак жидкий">Аммиак жидкий / безводный</option>
                <option value="Соляная кислота">Соляная кислота</option>
                <option value="Другой химический груз">Другой химический груз</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold font-mono text-[#536154] uppercase tracking-wider mb-1.5">
                {t.volume}
              </label>
              <input
                type="text"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                placeholder="напр. 600 тонн (10 цистерн)"
                className="w-full text-sm px-3.5 py-2.5 border border-[#DBE2DC] rounded-lg bg-[#f9faf8] focus:bg-white focus:outline-none focus:border-[#006a37] transition-colors"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold font-mono text-[#536154] uppercase tracking-wider mb-1.5">
                {t.stationFrom}
              </label>
              <input
                type="text"
                value={fromStation}
                onChange={(e) => setFromStation(e.target.value)}
                placeholder="напр. Караганда Сортировочная"
                className="w-full text-sm px-3.5 py-2.5 border border-[#DBE2DC] rounded-lg bg-[#f9faf8] focus:bg-white focus:outline-none focus:border-[#006a37] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold font-mono text-[#536154] uppercase tracking-wider mb-1.5">
                {t.stationTo}
              </label>
              <input
                type="text"
                value={toStation}
                onChange={(e) => setToStation(e.target.value)}
                placeholder="напр. Шиели / Жанатас"
                className="w-full text-sm px-3.5 py-2.5 border border-[#DBE2DC] rounded-lg bg-[#f9faf8] focus:bg-white focus:outline-none focus:border-[#006a37] transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold font-mono text-[#536154] uppercase tracking-wider mb-1.5">
                Ваше имя
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Имя или организация"
                className="w-full text-sm px-3.5 py-2.5 border border-[#DBE2DC] rounded-lg bg-[#f9faf8] focus:bg-white focus:outline-none focus:border-[#006a37] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold font-mono text-[#536154] uppercase tracking-wider mb-1.5">
                Телефон для ответа
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 (___) ___-__-__"
                className="w-full text-sm px-3.5 py-2.5 border border-[#DBE2DC] rounded-lg bg-[#f9faf8] focus:bg-white focus:outline-none focus:border-[#006a37] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold font-mono text-[#536154] uppercase tracking-wider mb-1.5">
              Дополнительные пожелания / сроки
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Укажите сроки подачи цистерн или особые требования..."
              className="w-full text-sm px-3.5 py-2 border border-[#DBE2DC] rounded-lg bg-[#f9faf8] focus:bg-white focus:outline-none focus:border-[#006a37] transition-colors"
            />
          </div>

          {/* Action button */}
          <div className="pt-2">
            <button
              id="quote-modal-submit-btn"
              type="submit"
              className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">chat</span>
              <span>{t.sendWhatsapp}</span>
              <ArrowRight size={18} />
            </button>
            <p className="text-center text-[11px] text-[#747874] mt-2">
              Запрос откроется в приложении WhatsApp на номер +7 705 783 84 86
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
