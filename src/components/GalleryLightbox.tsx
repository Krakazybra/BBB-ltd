import React, { useEffect } from 'react';
import { GalleryItem } from '../types';
import { X, ChevronLeft, ChevronRight, Maximize2, ShieldAlert } from 'lucide-react';

interface GalleryLightboxProps {
  items: GalleryItem[];
  selectedIndex: number | null;
  onClose: () => void;
  onSelectIndex: (idx: number) => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  items,
  selectedIndex,
  onClose,
  onSelectIndex,
}) => {
  if (selectedIndex === null || !items[selectedIndex]) return null;

  const current = items[selectedIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  const handleNext = () => {
    onSelectIndex((selectedIndex + 1) % items.length);
  };

  const handlePrev = () => {
    onSelectIndex((selectedIndex - 1 + items.length) % items.length);
  };

  return (
    <div
      id="gallery-lightbox-overlay"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 select-none"
      onClick={onClose}
    >
      {/* Top Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        <div className="text-white flex items-center space-x-3">
          <span className="text-xs font-mono bg-white/20 px-2.5 py-1 rounded">
            {selectedIndex + 1} / {items.length}
          </span>
          <h4 className="text-sm font-semibold tracking-wide hidden sm:block">
            {current.title}
          </h4>
        </div>

        <button
          onClick={onClose}
          className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors cursor-pointer"
        >
          <X size={22} />
        </button>
      </div>

      {/* Prev button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/50 hover:bg-black/80 p-3 rounded-full transition-all cursor-pointer z-10"
        aria-label="Previous image"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Next button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/50 hover:bg-black/80 p-3 rounded-full transition-all cursor-pointer z-10"
        aria-label="Next image"
      >
        <ChevronRight size={28} />
      </button>

      {/* Image and Caption */}
      <div
        className="max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={current.imageUrl}
          alt={current.title}
          className="max-h-[70vh] w-auto object-contain rounded-lg shadow-2xl border border-white/10"
          referrerPolicy="no-referrer"
        />

        <div className="mt-4 text-center max-w-2xl px-4 text-white">
          <div className="flex items-center justify-center space-x-2 mb-1.5">
            {current.badge && (
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#006a37] text-[#90f8ae] px-2 py-0.5 rounded">
                {current.badge}
              </span>
            )}
            <span className="text-base font-bold font-heading">{current.title}</span>
          </div>
          <p className="text-xs text-white/70">
            {current.description}
          </p>
        </div>
      </div>
    </div>
  );
};
