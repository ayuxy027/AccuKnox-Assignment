import { memo, useCallback, useMemo } from 'react';
import { Plus, RotateCcw } from 'lucide-react';
import { useDashboardStore } from '../store/dashboardStore';
import { SearchInput } from './SearchInput';
import { StorageIndicator } from './StorageIndicator';

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

    const brandLogo = useMemo(() => (
        <div className="brand-logo" aria-label="Widgetly Logo">
            <span className="sr-only">Widgetly</span>
            <span aria-hidden="true">W</span>
        </div>
    ), []);

    return (
        <header className={`border-b border-neutral-200 sticky top-0 z-50 backdrop-blur-sm text-black ${className}`}>
            <div className="container py-4 pb-6">
                {/* Desktop Layout */}
                <div className="hidden md:flex items-center justify-between gap-4">
                    {/* Enhanced Logo/Title */}
                    <div className="flex items-center gap-3">
                        {brandLogo}
                        <h1 className="text-xl font-semibold text-neutral-900 text-gradient">
                            Widgetly
                        </h1>
                    </div>

                    {/* Enhanced Search Bar */}
                    <div className="flex-1 max-w-md">
                        <SearchInput
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Q Search anything..."
                            debounceMs={200}
                        />
                    </div>

                    {/* Enhanced Action Buttons */}
                    <div className="flex items-center gap-2">
                        <StorageIndicator />

                        <button
                            onClick={handleResetClick}
                            className="btn btn-ghost"
                            title="Reset to default dashboard"
                            aria-label="Reset dashboard to default state"
                        >
                            <RotateCcw className="w-4 h-4" aria-hidden="true" />
                        </button>

                        <button
                            onClick={handleAddWidgetClick}
                            className="btn btn-primary"
                            aria-label="Add new widget to dashboard"
                        >
                            <Plus className="w-4 h-4" aria-hidden="true" />
                            <span>Add Widget</span>
                        </button>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden space-y-3">
                    {/* Mobile Header Row */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {brandLogo}
                            <h1 className="text-lg font-semibold text-neutral-900 text-gradient">
                                Widgetly
                            </h1>
                        </div>

                        <div className="flex items-center gap-2">
                            <StorageIndicator />

                            <button
                                onClick={handleResetClick}
                                className="btn btn-ghost p-2"
                                title="Reset dashboard"
                                aria-label="Reset dashboard to default state"
                            >
                                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                            </button>

                            <button
                                onClick={handleAddWidgetClick}
                                className="btn btn-primary"
                                aria-label="Add new widget to dashboard"
                            >
                                <Plus className="w-4 h-4" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    {/* Mobile Search Bar */}
                    <div className="w-full">
                        <SearchInput
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search widgets..."
                            debounceMs={200}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
});

DashboardHeader.displayName = 'DashboardHeader';