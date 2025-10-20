import type { Category } from '../types/dashboard';

const STORAGE_KEY = 'dynamic-dashboard-v1';
const STORAGE_VERSION = '1.0.0';

interface StoredData {
  version: string;
  timestamp: number;
  categories: Category[];
}

export const storage = {
  // Get data from localStorage with error handling
  get(): Category[] | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;
      
      const data: StoredData = JSON.parse(stored);
      
      // Check version compatibility
      if (data.version !== STORAGE_VERSION) {
        console.warn('Storage version mismatch, clearing old data');
        this.clear();
        return null;
      }
      
      // Check if data is not too old (24 hours)
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours
      if (Date.now() - data.timestamp > maxAge) {
        console.warn('Stored data is too old, clearing');
        this.clear();
        return null;
      }
      
      return data.categories;
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
      this.clear();
      return null;
    }
  },

  // Save data to localStorage with compression and error handling
  set(categories: Category[]): void {
    try {
      const data: StoredData = {
        version: STORAGE_VERSION,
        timestamp: Date.now(),
        categories,
      };
      
      const serialized = JSON.stringify(data);
      
      // Check if data is too large (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (serialized.length > maxSize) {
        console.warn('Data too large for localStorage, truncating');
        // Keep only the most recent widgets per category
        const truncated = categories.map(category => ({
          ...category,
          widgets: category.widgets.slice(-10) // Keep last 10 widgets per category
        }));
        
        const truncatedData: StoredData = {
          version: STORAGE_VERSION,
          timestamp: Date.now(),
          categories: truncated,
        };
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(truncatedData));
        return;
      }
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
      // Try to clear some space
      this.clear();
    }
  },

  // Clear all stored data
  clear(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  },

  // Get storage usage info
  getUsage(): { used: number; available: number } {
    try {
      const used = localStorage.getItem(STORAGE_KEY)?.length || 0;
      const available = 5 * 1024 * 1024; // 5MB estimate
      return { used, available };
    } catch {
      return { used: 0, available: 0 };
    }
  },

  // Check if localStorage is available
  isAvailable(): boolean {
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }
};
