import { memo, useState, useEffect } from 'react';
import { Database, ChevronDown, ChevronUp } from 'lucide-react';
import { storage } from '../utils/storage';

interface StorageIndicatorProps {
    className?: string;
}

export const StorageIndicator = memo<StorageIndicatorProps>(({ className = '' }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [usage, setUsage] = useState({ used: 0, available: 0 });

    useEffect(() => {
        const updateUsage = () => {
            setUsage(storage.getUsage());
        };

        updateUsage();

        // Update on storage changes
        const handleStorageChange = () => updateUsage();
        window.addEventListener('storage', handleStorageChange);

        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const formatBytes = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
    };

    const percentage = usage.available > 0 ? (usage.used / usage.available) * 100 : 0;

    return (
        <div className={`relative ${className}`}>
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                aria-label="Toggle storage information"
            >
                <Database className="w-4 h-4 text-neutral-600" />
                <span className="text-neutral-700 font-medium">
                    {formatBytes(usage.used)}
                </span>
                {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-neutral-600" />
                ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-600" />
                )}
            </button>

            {isExpanded && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-neutral-200 rounded-lg shadow-lg p-4 z-50">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-neutral-900">Local Storage</span>
                            <span className="text-xs text-neutral-500">
                                {percentage.toFixed(1)}% used
                            </span>
                        </div>

                        <div className="w-full bg-neutral-200 rounded-full h-2">
                            <div
                                className={`h-2 rounded-full transition-all duration-300 ${percentage > 80 ? 'bg-red-500' :
                                        percentage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                                    }`}
                                style={{ width: `${Math.min(percentage, 100)}%` }}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-xs">
                            <div>
                                <span className="text-neutral-600">Used:</span>
                                <span className="ml-1 font-medium">{formatBytes(usage.used)}</span>
                            </div>
                            <div>
                                <span className="text-neutral-600">Available:</span>
                                <span className="ml-1 font-medium">{formatBytes(usage.available)}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                storage.clear();
                                setUsage({ used: 0, available: 0 });
                            }}
                            className="w-full px-3 py-2 text-xs bg-red-50 hover:bg-red-100 text-red-700 rounded-md transition-colors"
                        >
                            Clear Storage
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
});

StorageIndicator.displayName = 'StorageIndicator';
