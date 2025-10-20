export interface Widget {
  widget_id: string;
  widget_name: string;
  widget_type?: 'metrics' | 'chart' | 'compliance' | 'custom';
  widget_content: string | { [key: string]: string | number | boolean };
  is_removable: boolean;
  is_searchable: boolean;
  creation_timestamp: string;
}

export interface Category {
  category_id: string;
  category_name: string;
  widgets: Widget[];
}

export interface DashboardConfiguration {
  dashboard_configuration: Category[];
}

export interface NewWidgetData {
  widget_name: string;
  widget_type?: 'metrics' | 'chart' | 'compliance' | 'custom';
  widget_content: string | { [key: string]: string | number | boolean };
  category_id: string;
}

export interface DashboardState {
  categories: Category[];
  searchQuery: string;
  isPersonalizationPanelOpen: boolean;
  filteredCategories: Category[];
}

export interface DashboardActions {
  initialize: () => void;
  addWidget: (categoryId: string, widget: Widget) => void;
  removeWidget: (widgetId: string) => void;
  updateSearchQuery: (query: string) => void;
  togglePersonalizationPanel: () => void;
  addCustomWidget: (data: NewWidgetData) => void;
  resetDashboard: () => void;
  batchUpdateWidgets: (updates: Array<{ widgetId: string; updates: Partial<Widget> }>) => void;
  getWidgetById: (widgetId: string) => Widget | null;
  getCategoryById: (categoryId: string) => Category | null;
  getStats: () => {
    totalCategories: number;
    totalWidgets: number;
    removableWidgets: number;
    storageUsage: { used: number; available: number };
  };
}
