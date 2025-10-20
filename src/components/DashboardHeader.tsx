import React from 'react';
import { Search, Plus, RotateCcw } from 'lucide-react';
import { useDashboardStore } from '../store/dashboardStore';

export const DashboardHeader: React.FC = () => {
    const {
        searchQuery,
        updateSearchQuery,
        togglePersonalizationPanel,
        resetDashboard
    } = useDashboardStore();

    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="container py-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Logo/Title */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">D</span>
                        </div>
                        <h1 className="text-xl font-semibold text-slate-900">
                            Dynamic Dashboard
                        </h1>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-md">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Q Search anything..."
                                value={searchQuery}
                                onChange={(e) => updateSearchQuery(e.target.value)}
                                className="input pl-10"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={resetDashboard}
                            className="btn btn-ghost"
                            title="Reset to default dashboard"
                        >
                            <RotateCcw className="w-4 h-4" />
                        </button>

                        <button
                            onClick={togglePersonalizationPanel}
                            className="btn btn-primary"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Widget
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};
