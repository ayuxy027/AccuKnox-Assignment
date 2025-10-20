import { memo, useCallback, useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { Category } from '../types/dashboard';
import { Widget } from './Widget';

interface CategorySectionProps {
    category: Category;
    onRemoveWidget: (widgetId: string) => void;
    className?: string;
}

export const CategorySection = memo<CategorySectionProps>(({
    category,
    onRemoveWidget,
    className = ''
}) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const handleToggle = useCallback(() => {
        setIsExpanded(prev => !prev);
    }, []);

    const handleRemoveWidget = useCallback((widgetId: string) => {
        onRemoveWidget(widgetId);
    }, [onRemoveWidget]);

    return (
        <section className={`mb-8 ${className}`}>
            {/* Enhanced Category Header */}
            <div
                className="flex items-center justify-between p-4 bg-gradient-to-r from-neutral-50 to-neutral-100 rounded-t-lg border border-neutral-200 cursor-pointer hover:from-neutral-100 hover:to-neutral-200 transition-all duration-200"
                onClick={handleToggle}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${category.category_name} category`}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleToggle();
                    }
                }}
            >
                <div className="flex items-center gap-3">
                    {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-neutral-600 transition-transform duration-200" />
                    ) : (
                        <ChevronRight className="w-5 h-5 text-neutral-600 transition-transform duration-200" />
                    )}
                    <h2 className="text-lg font-semibold text-neutral-900">
                        {category.category_name}
                    </h2>
                    <span className="px-2 py-1 text-xs font-medium text-neutral-600 bg-white border border-neutral-300 rounded-full shadow-sm">
                        {category.widgets.length} widget{category.widgets.length !== 1 ? 's' : ''}
                    </span>
                </div>
            </div>

            {/* Enhanced Category Content */}
            {isExpanded && (
                <div className="border-l border-r border-b border-neutral-200 rounded-b-lg bg-white shadow-sm">
                    {category.widgets.length === 0 ? (
                        <div className="p-8 text-center text-neutral-500">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center shadow-sm">
                                <span className="text-2xl" role="img" aria-label="Chart icon">📊</span>
                            </div>
                            <p className="text-sm font-medium">No widgets in this category</p>
                            <p className="text-xs text-neutral-400 mt-1">
                                Click "Add Widget" to get started
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6">
                            {category.widgets.map((widget) => (
                                <Widget
                                    key={widget.widget_id}
                                    widget={widget}
                                    onRemove={handleRemoveWidget}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </section>
    );
});

CategorySection.displayName = 'CategorySection';