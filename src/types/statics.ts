/**
 * Datacenter
 */
export interface Datacenter {
  id: number;
  name: string;
  location: string;
  country: string;
  status: 'active' | 'maintenance' | 'disabled';
  available_storage_types: ('SSD' | 'HDD' | 'NVMe')[];
  allowed_actions: string[];
  features: string[];
}

/**
 * Operating System
 */
export interface OperatingSystem {
  id: number;
  name: string;
  version: string;
  family: 'linux' | 'windows' | 'bsd';
  min_ram: number;
  min_storage: number;
  logo?: string;
}

/**
 * Cache time option
 */
export interface CacheTime {
  label: string;
  value: number;
}

/**
 * Slider/Banner
 */
export interface Slider {
  id: number;
  title: string;
  description?: string;
  image: string;
  link?: string;
  order: number;
}
