export interface Widget {
  widget_id: string;
  widget_name: string;
  widget_content: string;
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
  widget_content: string;
  category_id: string;
}

export interface DashboardState {
  categories: Category[];
  searchQuery: string;
  isPersonalizationPanelOpen: boolean;
  filteredCategories: Category[];
}

export interface DashboardActions {
  addWidget: (categoryId: string, widget: Widget) => void;
  removeWidget: (widgetId: string) => void;
  updateSearchQuery: (query: string) => void;
  togglePersonalizationPanel: () => void;
  addCustomWidget: (data: NewWidgetData) => void;
  resetDashboard: () => void;
}
