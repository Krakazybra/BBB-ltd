import React, { useState } from 'react';
import { MessageSquare, X, Send, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface WhatsAppFABProps {
  language: Language;
}

export const WhatsAppFAB: React.FC<WhatsAppFABProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const quickOptions = [
    { label: 'Расчет стоимости налива/слива', text: 'Здравствуйте! Прошу рассчитать стоимость налива/слива серной кислоты/аммиака.' },
    { label: 'Организация ж/д перевозки', text: 'Здравствуйте! Интересует организация ж/д перевозки опасного груза по станциям РК.' },
    { label: 'Свободные мощности на станциях', text: 'Добрый день! Подскажите текущую загрузку и свободные мощности на станциях.' },
  ];

  const handleSend = (text: string) => {
    const finalMsg = encodeURIComponent(text || 'Здравствуйте! Хочу проконсультироваться по услугам.');
    window.open(`https://wa.me/77057838486?text=${finalMsg}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div id="whatsapp-fab-container" className="fixed bottom-6 right-6 z-50">
      {/* Popover */}
      {isOpen && (
        <div
          id="whatsapp-fab-popover"
          className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-[#DBE2DC] p-5 animate-in slide-in-from-bottom-3 duration-200"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#DBE2DC]">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[20px]">chat</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#191c1b] leading-tight">
                  BBB Ltd • Оперативная связь
                </h4>
                <p className="text-[11px] text-[#006a37] font-medium flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse inline-block"></span>
                  <span>Онлайн (09:00 - 18:00)</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#747874] hover:text-[#191c1b] p-1 rounded-md"
            >
              <X size={18} />
            </button>
          </div>

          <div className="py-3 space-y-2">
            <p className="text-xs text-[#536154]">
              {language === 'ru'
                ? 'Выберите тему или напишите сообщение в WhatsApp:'
                : 'Тақырыпты таңдаңыз немесе WhatsApp-қа хабарлама жазыңыз:'}
            </p>

            <div className="space-y-1.5">
              {quickOptions.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(opt.text)}
                  className="w-full text-left text-xs bg-[#f2f4f1] hover:bg-[#E4F3EA] hover:text-[#006a37] p-2.5 rounded-lg text-[#191c1b] font-medium transition-colors flex items-center justify-between group"
                >
                  <span>{opt.label}</span>
                  <Send size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#006a37]" />
                </button>
              ))}
            </div>

            <div className="pt-2">
              <input
                type="text"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                placeholder="Ваш вопрос..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && customMsg.trim()) {
                    handleSend(customMsg);
                  }
                }}
                className="w-full text-xs px-3 py-2 border border-[#DBE2DC] rounded-lg focus:outline-none focus:border-[#006a37] mb-2"
              />
              <button
                onClick={() => handleSend(customMsg)}
                className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">send</span>
                <span>Перейти в WhatsApp чат</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        id="whatsapp-fab-trigger"
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer relative group"
        aria-label="Contact on WhatsApp"
      >
        <span className="material-symbols-outlined text-[30px]">chat</span>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#006a37] border-2 border-white rounded-full flex items-center justify-center text-[9px] font-bold text-white">
          1
        </span>
      </button>
    </div>
  );
};
