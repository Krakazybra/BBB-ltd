import React, { useState } from 'react';
import { STATIONS } from '../data/translations';
import { StationLocation, Language } from '../types';
import { MapPin, Train, Shield, CheckCircle2, ArrowRight } from 'lucide-react';

interface StationInteractiveMapProps {
  language: Language;
  onSelectStation?: (station: StationLocation) => void;
}

export const StationInteractiveMap: React.FC<StationInteractiveMapProps> = ({
  language,
  onSelectStation,
}) => {
  const [selectedId, setSelectedId] = useState<string>('karaganda');
  const activeStation = STATIONS.find((s) => s.id === selectedId) || STATIONS[0];

  return (
    <div id="station-interactive-map" className="bg-[#101913] rounded-2xl border border-[#213527] p-6 sm:p-8 text-white overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left: Map Visualization Container */}
        <div className="w-full lg:w-3/5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#90f8ae] animate-ping inline-block"></span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#90f8ae]">
                {language === 'ru' ? 'Железнодорожная сеть РК' : 'ҚР теміржол желісі'}
              </span>
            </div>
            <span className="text-xs font-mono text-[#a1aba2]">
              5 действующих узлов
            </span>
          </div>

          {/* Stylized Kazakhstan Map Area */}
          <div className="relative w-full aspect-16/10 bg-[#16231a] rounded-xl border border-[#213527] p-4 flex items-center justify-center overflow-hidden">
            {/* Background Grid Lines */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#90f8ae_1px,transparent_1px),linear-gradient(to_bottom,#90f8ae_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {/* Stylized Map Outline of Kazakhstan */}
            <svg
              className="w-full h-full text-[#213527] stroke-[#354f3d] fill-[#132017]"
              viewBox="0 0 1000 600"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 120 220 
                   Q 200 130 350 150 
                   T 600 120 
                   Q 800 110 880 200 
                   T 920 380 
                   Q 800 520 650 540 
                   T 450 510 
                   Q 280 550 180 460 
                   T 80 320 Z"
                strokeWidth="2"
                strokeDasharray="4 2"
              />
              
              {/* Rail Connection Lines Between Hubs */}
              {/* Karaganda (550, 230) -> Balkhash (580, 340) */}
              <line x1="550" y1="230" x2="580" y2="340" stroke="#006a37" strokeWidth="3" strokeDasharray="6 4" />
              {/* Balkhash (580, 340) -> Shu (540, 480) */}
              <line x1="580" y1="340" x2="540" y2="480" stroke="#006a37" strokeWidth="3" strokeDasharray="6 4" />
              {/* Shu (540, 480) -> Zhanatas (420, 460) */}
              <line x1="540" y1="480" x2="420" y2="460" stroke="#006a37" strokeWidth="3" strokeDasharray="6 4" />
              {/* Zhanatas (420, 460) -> Shieli (300, 430) */}
              <line x1="420" y1="460" x2="300" y2="430" stroke="#006a37" strokeWidth="3" strokeDasharray="6 4" />
            </svg>

            {/* Station Map Pins */}
            {STATIONS.map((station) => {
              const isSelected = station.id === selectedId;
              return (
                <button
                  key={station.id}
                  id={`map-pin-${station.id}`}
                  onClick={() => {
                    setSelectedId(station.id);
                    if (onSelectStation) onSelectStation(station);
                  }}
                  style={{
                    left: `${station.coords.x}%`,
                    top: `${station.coords.y}%`,
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all ${
                    isSelected ? 'z-20 scale-110' : 'z-10 hover:scale-105'
                  }`}
                >
                  <div className="relative flex flex-col items-center">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shadow-lg transition-all ${
                        isSelected
                          ? 'bg-[#90f8ae] text-[#00210d] ring-4 ring-[#90f8ae]/30'
                          : 'bg-[#006a37] text-white hover:bg-[#1EBE5D]'
                      }`}
                    >
                      <Train size={14} />
                    </div>

                    <span
                      className={`mt-1 text-[11px] font-mono whitespace-nowrap px-2 py-0.5 rounded shadow-md transition-all ${
                        isSelected
                          ? 'bg-[#90f8ae] text-[#00210d] font-bold'
                          : 'bg-[#101913]/90 text-[#e0e3de] group-hover:text-white border border-[#213527]'
                      }`}
                    >
                      {station.name.split(' ')[0]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Station Details Card */}
        <div className="w-full lg:w-2/5 flex flex-col justify-between bg-[#16231a] border border-[#213527] rounded-xl p-5">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#90f8ae] uppercase tracking-wider bg-[#006a37]/40 px-2 py-0.5 rounded">
                  {activeStation.type}
                </span>
                <h3 className="text-xl font-bold font-heading text-white mt-1.5">
                  {activeStation.name}
                </h3>
                <p className="text-xs text-[#a1aba2]">{activeStation.region}</p>
              </div>
              {activeStation.isMain && (
                <span className="text-[10px] font-mono bg-[#90f8ae] text-[#00210d] font-bold px-2 py-1 rounded">
                  ГЛАВНЫЙ УЗЕЛ
                </span>
              )}
            </div>

            <p className="text-xs text-[#c1cac1] leading-relaxed">
              {activeStation.description}
            </p>

            <div className="pt-2 border-t border-[#213527] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#747874]">Пропускная способность:</span>
                <span className="font-mono font-semibold text-[#90f8ae]">
                  {activeStation.capacity}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#747874]">Статус эстакады:</span>
                <span className="font-mono text-xs text-emerald-400 flex items-center space-x-1">
                  <CheckCircle2 size={13} />
                  <span>Работает 24/7</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Button for Selected Station */}
          <div className="pt-5 mt-4 border-t border-[#213527]">
            <a
              href={`https://wa.me/77057838486?text=${encodeURIComponent(
                `Здравствуйте! Интересуют услуги на станции ${activeStation.name}.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-2.5 px-4 rounded-lg text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              <span>Запросить подачу на станцию {activeStation.name.split(' ')[0]}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
