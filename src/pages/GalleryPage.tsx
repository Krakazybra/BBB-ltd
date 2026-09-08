import React, { useState } from 'react';
import { PageId, Language, GalleryItem } from '../types';
import { GALLERY_ITEMS, TRANSLATIONS } from '../data/translations';
import { ChevronRight, Eye, ZoomIn } from 'lucide-react';

interface GalleryPageProps {
  onNavigate: (page: PageId) => void;
  language: Language;
  onOpenLightbox: (index: number) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  onNavigate,
  language,
  onOpenLightbox,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const t = TRANSLATIONS[language];

  const categories = [
    { id: 'all', label: t.galleryPage.allCategories },
    { id: 'filling', label: t.galleryPage.fillingCategory },
    { id: 'trucks', label: t.galleryPage.trucksCategory },
    { id: 'process', label: t.galleryPage.processCategory },
    { id: 'facilities', label: t.galleryPage.facilitiesCategory },
  ];

  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const handleWhatsApp = () => {
    window.open('https://wa.me/77057838486?text=' + encodeURIComponent('Здравствуйте! Хотим обсудить проект сотрудничества.'), '_blank');
  };

  return (
    <div id="gallery-page" className="w-full bg-[#f9faf8] py-8 sm:py-12">
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
          <span className="text-[#191c1b] font-bold">{t.galleryPage.title}</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-4xl font-bold font-heading text-[#191c1b] tracking-tight">
              {t.galleryPage.title}
            </h1>
            <p className="text-sm sm:text-base text-[#536154]">
              {t.galleryPage.subtitle}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#006a37] text-white shadow-xs'
                    : 'bg-white text-[#536154] hover:bg-[#f2f4f1] border border-[#e2e8e3]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => {
            const originalIndex = GALLERY_ITEMS.findIndex((g) => g.id === item.id);
            return (
              <div
                key={item.id}
                id={`gallery-card-${item.id}`}
                onClick={() => onOpenLightbox(originalIndex)}
                className="group bg-white rounded-2xl overflow-hidden border border-[#e2e8e3] shadow-xs hover:shadow-sm transition-all cursor-pointer flex flex-col"
              >
                <div className="relative h-48 sm:h-52 overflow-hidden bg-zinc-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                    <div className="w-9 h-9 rounded-full bg-white/90 text-[#006a37] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                      <ZoomIn size={18} />
                    </div>
                  </div>
                  {item.badge && (
                    <span className="absolute top-2.5 left-2.5 bg-[#006a37] text-[#90f8ae] text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow-xs">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold font-heading text-[#191c1b] group-hover:text-[#006a37] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#536154] mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#e2e8e3] flex items-center justify-between text-[10px] font-mono text-[#747874]">
                    <span>BBB Ltd Объект</span>
                    <span className="text-[#006a37] font-semibold flex items-center space-x-1">
                      <span>Смотреть</span>
                      <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Block */}
        <section className="bg-[#005a2f] text-white rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold font-heading">
            {t.galleryPage.ctaTitle}
          </h2>
          <p className="text-xs sm:text-sm text-[#a1f0bd] max-w-xl mx-auto leading-relaxed">
            {t.galleryPage.ctaSubtitle}
          </p>
          <div className="pt-1 flex justify-center">
            <button
              onClick={handleWhatsApp}
              className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm flex items-center space-x-2 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>{t.galleryPage.ctaButton}</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
