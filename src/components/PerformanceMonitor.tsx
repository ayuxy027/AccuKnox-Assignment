import React, { memo, useState, useEffect } from 'react';
import { Activity, Database, Zap } from 'lucide-react';
import { useDashboardStore } from '../store/dashboardStore';

interface PerformanceMonitorProps {
    className?: string;
}

export const PerformanceMonitor = memo<PerformanceMonitorProps>(({ className = '' }) => {
    const getStats = useDashboardStore((state) => state.getStats);
    const [stats, setStats] = useState(() => getStats());
    const [renderTime, setRenderTime] = useState<number>(0);

    useEffect(() => {
        const startTime = performance.now();

        // Update stats
        setStats(getStats());

        // Measure render time
        requestAnimationFrame(() => {
            const endTime = performance.now();
            setRenderTime(Math.round(endTime - startTime));
        });
    }, [getStats]);

    const formatBytes = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
    };

    const storagePercentage = (stats.storageUsage.used / stats.storageUsage.available) * 100;

    return (
        <div className={`bg-white border border-neutral-200 rounded-lg p-4 shadow-sm ${className}`}>
            <div className="flex items-center gap-2 mb-3">
                <Activity className="w-4 h-4 text-blue-600" aria-hidden="true" />
                <h3 className="font-semibold text-neutral-900 text-sm">Performance Metrics</h3>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2">
                    <Zap className="w-3 h-3 text-green-600" aria-hidden="true" />
                    <span className="text-neutral-600">Render:</span>
                    <span className="font-medium text-neutral-900">{renderTime}ms</span>
                </div>

                <div className="flex items-center gap-2">
                    <Database className="w-3 h-3 text-blue-600" aria-hidden="true" />
                    <span className="text-neutral-600">Storage:</span>
                    <span className="font-medium text-neutral-900">{formatBytes(stats.storageUsage.used)}</span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-neutral-600">Widgets:</span>
                    <span className="font-medium text-neutral-900">{stats.totalWidgets}</span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-neutral-600">Categories:</span>
                    <span className="font-medium text-neutral-900">{stats.totalCategories}</span>
                </div>
            </div>

            {/* Storage usage bar */}
            <div className="mt-3">
                <div className="flex justify-between text-xs text-neutral-600 mb-1">
                    <span>Storage Usage</span>
                    <span>{storagePercentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-1.5">
                    <div
                        className={`h-1.5 rounded-full transition-all duration-300 ${storagePercentage > 80 ? 'bg-red-500' :
                                storagePercentage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                        style={{ width: `${Math.min(storagePercentage, 100)}%` }}
                    />
                </div>
            </div>
        </div>
    );
});

PerformanceMonitor.displayName = 'PerformanceMonitor';
