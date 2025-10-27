import { useDashboardStore } from './store/dashboardStore';
import { DashboardHeader } from './components/DashboardHeader';
import { CategorySection } from './components/CategorySection';
import { PersonalizationPanel } from './components/PersonalizationPanel';

function App() {
  const {
    filteredCategories,
    isPersonalizationPanelOpen,
    removeWidget,
    togglePersonalizationPanel,
  } = useDashboardStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Dashboard Categories */}
        <section aria-labelledby="categories-heading">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-sm">
                <span className="text-4xl" role="img" aria-label="Search icon">🔍</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No widgets found</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Try adjusting your search query or add new widgets to your dashboard.
              </p>
              <button
                onClick={togglePersonalizationPanel}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-150"
                aria-label="Add new widgets to dashboard"
              >
                Add Widget
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredCategories.map((category) => (
                <CategorySection
                  key={category.category_id}
                  category={category}
                  onRemoveWidget={removeWidget}
                  onAddWidget={togglePersonalizationPanel}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Enhanced Personalization Panel */}
      <PersonalizationPanel
        isOpen={isPersonalizationPanelOpen}
        onClose={togglePersonalizationPanel}
      />
    </div>
  );
}

export default App;