import { memo, useCallback, useMemo } from 'react';
import { X, TrendingUp, Shield, AlertTriangle, Activity, BarChart3 } from 'lucide-react';
import type { Widget as WidgetType } from '../types/dashboard';

interface WidgetProps {
    widget: WidgetType;
    onRemove: (widgetId: string) => void;
    className?: string;
}

const getWidgetIcon = (widgetName: string) => {
    const name = widgetName.toLowerCase();
    if (name.includes('risk') || name.includes('threat') || name.includes('security')) {
        return <Shield className="w-5 h-5" aria-hidden="true" />;
    }
    if (name.includes('trend') || name.includes('metric') || name.includes('performance')) {
        return <TrendingUp className="w-5 h-5" aria-hidden="true" />;
    }
    if (name.includes('alert') || name.includes('incident') || name.includes('critical')) {
        return <AlertTriangle className="w-5 h-5" aria-hidden="true" />;
    }
    if (name.includes('chart') || name.includes('graph') || name.includes('analytics')) {
        return <BarChart3 className="w-5 h-5" aria-hidden="true" />;
    }
    return <Activity className="w-5 h-5" aria-hidden="true" />;
};

const parseWidgetContent = (content: string) => {
    // Enhanced parsing for better metric extraction
    const metrics: string[] = [];
    const labels: string[] = [];

    // Extract numbers and their context
    const numberMatches = content.match(/\b(\d{1,3}(?:,\d{3})*|\d+)\b/g);
    const textParts = content.split(/\b\d{1,3}(?:,\d{3})*\b/);

    if (numberMatches && textParts.length > 1) {
        numberMatches.forEach((metric, index) => {
            metrics.push(metric);
            const context = textParts[index]?.trim().replace(/[^\w\s]/g, '').trim();
            labels.push(context || `Metric ${index + 1}`);
        });
    }

    return { metrics, labels };
};

export const Widget = memo<WidgetProps>(({ widget, onRemove, className = '' }) => {
    const { metrics, labels } = useMemo(() => parseWidgetContent(widget.widget_content), [widget.widget_content]);
    const icon = useMemo(() => getWidgetIcon(widget.widget_name), [widget.widget_name]);

    const handleRemove = useCallback(() => {
        onRemove(widget.widget_id);
    }, [onRemove, widget.widget_id]);

    const isDataAvailable = !widget.widget_content.includes('No Graph data available!') &&
        !widget.widget_content.includes('No data');

    const widgetId = `widget-${widget.widget_id}`;

    return (
        <div
            className={`card p-6 group relative gpu-accelerated ${className}`}
            role="article"
            aria-labelledby={`${widgetId}-title`}
            aria-describedby={`${widgetId}-content`}
        >
            {/* Enhanced Remove Button */}
            {widget.is_removable && (
                <button
                    onClick={handleRemove}
                    className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-red-50 text-neutral-400 hover:text-red-500 transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    aria-label={`Remove ${widget.widget_name} widget`}
                    title={`Remove ${widget.widget_name}`}
                >
                    <X className="w-4 h-4" aria-hidden="true" />
                </button>
            )}

            {/* Enhanced Widget Header */}
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 shadow-sm">
                    {icon}
                </div>
                <h3
                    id={`${widgetId}-title`}
                    className="font-semibold text-neutral-900 text-lg leading-tight"
                >
                    {widget.widget_name}
                </h3>
            </div>

            {/* Enhanced Widget Content */}
            <div id={`${widgetId}-content`} className="space-y-3">
                {!isDataAvailable ? (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-neutral-100 flex items-center justify-center">
                            <TrendingUp className="w-8 h-8 text-neutral-400" aria-hidden="true" />
                        </div>
                        <p className="text-sm text-neutral-500 font-medium">No Graph data available!</p>
                    </div>
                ) : metrics.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                        {metrics.slice(0, 4).map((metric, index) => (
                            <div
                                key={index}
                                className="text-center p-3 rounded-lg bg-gradient-to-br from-neutral-50 to-neutral-100 border border-neutral-200 hover:shadow-sm transition-shadow"
                            >
                                <div className="text-xl font-bold text-neutral-900 mb-1">
                                    {metric}
                                </div>
                                <div className="text-xs text-neutral-600 font-medium capitalize">
                                    {labels[index] || `Metric ${index + 1}`}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200">
                        <p className="text-sm text-neutral-700">{widget.widget_content}</p>
                    </div>
                )}
            </div>

            {/* Enhanced Widget Footer */}
            <div className="mt-4 pt-4 border-t border-neutral-200">
                <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-500">
                        Created: {new Date(widget.creation_timestamp).toLocaleDateString()}
                    </span>
                    <span className="status-indicator status-success">
                        Active
                    </span>
                </div>
            </div>
        </div>
    );
});

Widget.displayName = 'Widget';