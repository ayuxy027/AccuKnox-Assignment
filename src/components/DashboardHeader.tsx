import { memo, useCallback } from 'react';
import { Plus, RotateCcw } from 'lucide-react';
import { useDashboardStore } from '../store/dashboardStore';
import { SearchInput } from './SearchInput';

interface DashboardHeaderProps {
    className?: string;
}

export const DashboardHeader = memo<DashboardHeaderProps>(({ className = '' }) => {
    const {
        searchQuery,
        updateSearchQuery,
        togglePersonalizationPanel,
        resetDashboard
    } = useDashboardStore();

    const handleSearchChange = useCallback((value: string) => {
        updateSearchQuery(value);
    }, [updateSearchQuery]);

    const handleResetClick = useCallback(() => {
        resetDashboard();
    }, [resetDashboard]);

    const handleAddWidgetClick = useCallback(() => {
        togglePersonalizationPanel();
    }, [togglePersonalizationPanel]);

    return (
        <header className={`border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95 text-gray-900 ${className}`}>
            <div className="max-w-7xl mx-auto px-6 py-4 pb-6">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <span>Home</span>
                    <span>{'>'}</span>
                    <span className="text-gray-900 font-medium">Dashboard V2</span>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:flex items-center justify-between gap-4">
                    {/* Main Title */}
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-gray-900">
                            CNAPP Dashboard
                        </h1>
                    </div>

                    {/* Enhanced Search Bar */}
                    <div className="flex-1 max-w-md">
                        <SearchInput
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search anything..."
                            debounceMs={200}
                        />
                    </div>

                    {/* Enhanced Action Buttons */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleAddWidgetClick}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-150"
                            aria-label="Add new widget to dashboard"
                        >
                            <Plus className="w-4 h-4" aria-hidden="true" />
                            <span>Add Widget</span>
                        </button>
                        <button
                            onClick={handleResetClick}
                            className="inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 bg-transparent hover:bg-gray-100 rounded-lg transition-colors duration-150"
                            title="Reset to default dashboard"
                            aria-label="Reset dashboard to default state"
                        >
                            <RotateCcw className="w-4 h-4" aria-hidden="true" />
                        </button>
                        {/* Time Filter */}
                        <button className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg transition-colors duration-150">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Last 2 days</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden space-y-3">
                    {/* Mobile Header Row */}
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-bold text-gray-900">
                            CNAPP Dashboard
                        </h1>

                        <button
                            onClick={handleAddWidgetClick}
                            className="inline-flex items-center justify-center p-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-150"
                            aria-label="Add new widget to dashboard"
                        >
                            <Plus className="w-4 h-4" aria-hidden="true" />
                        </button>
                    </div>

                    {/* Mobile Search Bar */}
                    <div className="w-full">
                        <SearchInput
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search anything..."
                            debounceMs={200}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
});

DashboardHeader.displayName = 'DashboardHeader';