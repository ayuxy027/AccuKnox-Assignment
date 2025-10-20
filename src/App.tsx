import { useDashboardStore } from './store/dashboardStore';
import { DashboardHeader } from './components/DashboardHeader';
import { CategorySection } from './components/CategorySection';
import { PersonalizationPanel } from './components/PersonalizationPanel';
import { ChartWidget } from './components/ChartWidget';

// Sample chart data for visual elements
const sampleChartData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 200 },
  { name: 'Apr', value: 278 },
  { name: 'May', value: 189 },
  { name: 'Jun', value: 239 },
];

const pieChartData = [
  { name: 'Critical', value: 12, color: '#ef4444' },
  { name: 'High', value: 45, color: '#f59e0b' },
  { name: 'Medium', value: 89, color: '#3b82f6' },
  { name: 'Low', value: 156, color: '#10b981' },
];

const lineChartData = [
  { name: 'Week 1', value: 2400 },
  { name: 'Week 2', value: 1398 },
  { name: 'Week 3', value: 9800 },
  { name: 'Week 4', value: 3908 },
  { name: 'Week 5', value: 4800 },
  { name: 'Week 6', value: 3800 },
];

function App() {
  const {
    filteredCategories,
    isPersonalizationPanelOpen,
    removeWidget,
    togglePersonalizationPanel,
  } = useDashboardStore();

  return (
    <div className="min-h-screen bg-neutral-50">
      <DashboardHeader />

      <main className="container py-8 mt-4">
        {/* Enhanced Analytics Overview Section */}
        <section className="mb-12" aria-labelledby="analytics-heading">
          <div className="mb-6">
            <h2 id="analytics-heading" className="text-2xl font-bold text-neutral-900">
              Analytics Overview
            </h2>
          </div>
          <div className="grid-auto-fit">
            <ChartWidget
              title="Security Trends"
              data={sampleChartData}
              type="bar"
              color="#3b82f6"
            />
            <ChartWidget
              title="Risk Distribution"
              data={pieChartData}
              type="pie"
            />
            <ChartWidget
              title="Performance Metrics"
              data={lineChartData}
              type="line"
              color="#10b981"
            />
          </div>
        </section>

        {/* Enhanced Dashboard Categories */}
        <section aria-labelledby="categories-heading">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 id="categories-heading" className="text-2xl font-bold text-neutral-900">
              Dashboard Categories
            </h2>
            <div className="text-sm text-neutral-600 font-medium">
              {filteredCategories.reduce((total, cat) => total + cat.widgets.length, 0)} total widgets
            </div>
          </div>

          {filteredCategories.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center shadow-sm">
                <span className="text-4xl" role="img" aria-label="Search icon">🔍</span>
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">No widgets found</h3>
              <p className="text-neutral-600 mb-6 max-w-md mx-auto">
                Try adjusting your search query or add new widgets to your dashboard.
              </p>
              <button
                onClick={togglePersonalizationPanel}
                className="btn btn-primary"
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