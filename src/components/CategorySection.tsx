import { memo, useCallback, useState } from 'react';
import { ChevronDown, ChevronRight, Plus } from 'lucide-react';
import type { Category } from '../types/dashboard';
import { Widget } from './Widget';

interface CategorySectionProps {
    category: Category;
    onRemoveWidget: (widgetId: string) => void;
    onAddWidget?: (categoryId: string) => void;
    className?: string;
}

export const CategorySection = memo<CategorySectionProps>(({
    category,
    onRemoveWidget,
    onAddWidget,
    className = ''
}) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const handleToggle = useCallback(() => {
        setIsExpanded(prev => !prev);
    }, []);

    const handleRemoveWidget = useCallback((widgetId: string) => {
        onRemoveWidget(widgetId);
    }, [onRemoveWidget]);

    const handleAddWidget = useCallback(() => {
        if (onAddWidget) {
            onAddWidget(category.category_id);
        }
    }, [onAddWidget, category.category_id]);

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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6">
                        {category.widgets.map((widget) => (
                            <Widget
                                key={widget.widget_id}
                                widget={widget}
                                onRemove={handleRemoveWidget}
                            />
                        ))}

                        {/* Add Widget Button */}
                        <button
                            onClick={handleAddWidget}
                            className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-gray-500 hover:text-blue-600"
                        >
                            <Plus className="w-8 h-8 mb-2" />
                            <span className="text-sm font-medium">Add Widget</span>
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
});

CategorySection.displayName = 'CategorySection';