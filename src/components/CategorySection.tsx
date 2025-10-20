import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { Category } from '../types/dashboard';
import { Widget } from './Widget';

interface CategorySectionProps {
    category: Category;
    onRemoveWidget: (widgetId: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
    category,
    onRemoveWidget,
}) => {
    const [isExpanded, setIsExpanded] = React.useState(true);

    return (
        <section className="mb-8">
            {/* Category Header */}
            <div
                className="flex items-center justify-between p-4 bg-slate-50 rounded-t-lg border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-3">
                    {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-slate-600" />
                    ) : (
                        <ChevronRight className="w-5 h-5 text-slate-600" />
                    )}
                    <h2 className="text-lg font-semibold text-slate-900">
                        {category.category_name}
                    </h2>
                    <span className="px-2 py-1 text-xs font-medium text-slate-600 bg-slate-200 rounded-full">
                        {category.widgets.length} widget{category.widgets.length !== 1 ? 's' : ''}
                    </span>
                </div>
            </div>

            {/* Category Content */}
            {isExpanded && (
                <div className="border-l border-r border-b border-slate-200 rounded-b-lg bg-white">
                    {category.widgets.length === 0 ? (
                        <div className="p-8 text-center text-slate-500">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                                <span className="text-2xl">📊</span>
                            </div>
                            <p className="text-sm">No widgets in this category</p>
                            <p className="text-xs text-slate-400 mt-1">
                                Click "Add Widget" to get started
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                            {category.widgets.map((widget) => (
                                <Widget
                                    key={widget.widget_id}
                                    widget={widget}
                                    onRemove={onRemoveWidget}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};
