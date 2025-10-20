import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { DashboardState, DashboardActions, Widget, NewWidgetData } from '../types/dashboard';
import dashboardConfig from '../data/dashboardConfig.json';

const defaultCategories = dashboardConfig.dashboard_configuration;

interface DashboardStore extends DashboardState, DashboardActions {}

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set, get) => ({
      categories: defaultCategories,
      searchQuery: '',
      isPersonalizationPanelOpen: false,
      filteredCategories: defaultCategories,

      addWidget: (categoryId: string, widget: Widget) => {
        set((state) => ({
          categories: state.categories.map((category) =>
            category.category_id === categoryId
              ? { ...category, widgets: [...category.widgets, widget] }
              : category
          ),
        }));
        get().updateSearchQuery(get().searchQuery);
      },

      removeWidget: (widgetId: string) => {
        set((state) => ({
          categories: state.categories.map((category) => ({
            ...category,
            widgets: category.widgets.filter((widget) => widget.widget_id !== widgetId),
          })),
        }));
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
      },
    }),
    {
      name: 'dashboard-storage',
      partialize: (state) => ({
        categories: state.categories,
        searchQuery: state.searchQuery,
      }),
    }
  )
);
