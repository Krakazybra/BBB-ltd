export type PageId = 'home' | 'about' | 'services' | 'gallery' | 'contacts';

export type Language = 'ru' | 'kz';

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  imageUrl?: string;
  steps: string[];
  features?: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'all' | 'filling' | 'trucks' | 'process' | 'facilities';
  imageUrl: string;
  description: string;
  badge?: string;
}

export interface StationLocation {
  id: string;
  name: string;
  region: string;
  isMain?: boolean;
  type: string;
  capacity?: string;
  coords: { x: number; y: number }; // percentage on map
  description: string;
}

export interface QuoteRequest {
  serviceType: string;
  cargoType: 'sulfuric_acid' | 'ammonia' | 'other';
  volume: string;
  departureStation: string;
  arrivalStation: string;
  contactName: string;
  phone: string;
  notes: string;
}
