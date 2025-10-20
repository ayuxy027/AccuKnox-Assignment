import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { DashboardState, DashboardActions, Widget, NewWidgetData } from '../types/dashboard';
import dashboardConfig from '../data/dashboardConfig.json';
import { storage } from '../utils/storage';

const defaultCategories = dashboardConfig.dashboard_configuration;

interface DashboardStore extends DashboardState, DashboardActions {}

export const useDashboardStore = create<DashboardStore>()(
  subscribeWithSelector((set, get) => ({
    categories: defaultCategories,
    searchQuery: '',
    isPersonalizationPanelOpen: false,
    filteredCategories: defaultCategories,

    // Load initial data from localStorage
    initialize: () => {
      if (storage.isAvailable()) {
        const stored = storage.get();
        if (stored && stored.length > 0) {
          set({ 
            categories: stored,
            filteredCategories: stored 
          });
        }
      }
    },

    addWidget: (categoryId: string, widget: Widget) => {
      set((state) => {
        const updatedCategories = state.categories.map((category) =>
          category.category_id === categoryId
            ? { ...category, widgets: [...category.widgets, widget] }
            : category
        );
        
        // Debounced save to localStorage
        setTimeout(() => {
          if (storage.isAvailable()) {
            storage.set(updatedCategories);
          }
        }, 300);
        
        return { categories: updatedCategories };
      });
      
      // Update filtered categories
      get().updateSearchQuery(get().searchQuery);
    },

    removeWidget: (widgetId: string) => {
      set((state) => {
        const updatedCategories = state.categories.map((category) => ({
          ...category,
          widgets: category.widgets.filter((widget) => widget.widget_id !== widgetId),
        }));
        
        // Debounced save to localStorage
        setTimeout(() => {
          if (storage.isAvailable()) {
            storage.set(updatedCategories);
          }
        }, 300);
        
        return { categories: updatedCategories };
      });
      
      // Update filtered categories
      get().updateSearchQuery(get().searchQuery);
    },

    updateSearchQuery: (query: string) => {
      const { categories } = get();
      
      if (!query.trim()) {
        set({ searchQuery: query, filteredCategories: categories });
        return;
      }

      const filtered = categories
        .map((category) => ({
          ...category,
          widgets: category.widgets.filter((widget) =>
            widget.is_searchable &&
            widget.widget_name.toLowerCase().includes(query.toLowerCase())
          ),
        }))
        .filter((category) => category.widgets.length > 0);

      set({ searchQuery: query, filteredCategories: filtered });
    },

    togglePersonalizationPanel: () => {
      set((state) => ({
        isPersonalizationPanelOpen: !state.isPersonalizationPanelOpen,
      }));
    },

    addCustomWidget: (data: NewWidgetData) => {
      const newWidget: Widget = {
        widget_id: uuidv4(),
        widget_name: data.widget_name,
        widget_content: data.widget_content,
        is_removable: true,
        is_searchable: true,
        creation_timestamp: new Date().toISOString(),
      };

      get().addWidget(data.category_id, newWidget);
    },

    resetDashboard: () => {
      set({
        categories: defaultCategories,
        searchQuery: '',
        filteredCategories: defaultCategories,
        isPersonalizationPanelOpen: false,
      });
      
      // Clear localStorage
      if (storage.isAvailable()) {
        storage.clear();
      }
    },

    // Performance optimized batch operations
    batchUpdateWidgets: (updates: Array<{ widgetId: string; updates: Partial<Widget> }>) => {
      set((state) => {
        const updatedCategories = state.categories.map((category) => ({
          ...category,
          widgets: category.widgets.map((widget) => {
            const update = updates.find(u => u.widgetId === widget.widget_id);
            return update ? { ...widget, ...update.updates } : widget;
          }),
        }));
        
        // Debounced save to localStorage
        setTimeout(() => {
          if (storage.isAvailable()) {
            storage.set(updatedCategories);
          }
        }, 300);
        
        return { categories: updatedCategories };
      });
    },

    // Get widget by ID (optimized lookup)
    getWidgetById: (widgetId: string): Widget | null => {
      const { categories } = get();
      for (const category of categories) {
        const widget = category.widgets.find(w => w.widget_id === widgetId);
        if (widget) return widget;
      }
      return null;
    },

    // Get category by ID (optimized lookup)
    getCategoryById: (categoryId: string) => {
      const { categories } = get();
      return categories.find(c => c.category_id === categoryId) || null;
    },

    // Performance metrics
    getStats: () => {
      const { categories } = get();
      const totalWidgets = categories.reduce((sum, cat) => sum + cat.widgets.length, 0);
      const removableWidgets = categories.reduce((sum, cat) => 
        sum + cat.widgets.filter(w => w.is_removable).length, 0
      );
      
      return {
        totalCategories: categories.length,
        totalWidgets,
        removableWidgets,
        storageUsage: storage.getUsage(),
      };
    },
  }))
);

// Initialize store on first load
if (typeof window !== 'undefined') {
  useDashboardStore.getState().initialize();
}