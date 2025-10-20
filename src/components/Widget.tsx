import React from 'react';
import { X, TrendingUp, Shield, AlertTriangle, Activity } from 'lucide-react';
import type { Widget as WidgetType } from '../types/dashboard';

interface WidgetProps {
    widget: WidgetType;
    onRemove: (widgetId: string) => void;
}

const getWidgetIcon = (widgetName: string) => {
    const name = widgetName.toLowerCase();
    if (name.includes('risk') || name.includes('threat')) return <Shield className="w-5 h-5" />;
    if (name.includes('trend') || name.includes('metric')) return <TrendingUp className="w-5 h-5" />;
    if (name.includes('alert') || name.includes('incident')) return <AlertTriangle className="w-5 h-5" />;
    return <Activity className="w-5 h-5" />;
};

const parseWidgetContent = (content: string) => {
    // Parse content to extract key-value pairs and metrics
    const parts = content.split(/(\d+)/);
    const metrics = [];
    const labels = [];

    for (let i = 0; i < parts.length; i++) {
        if (parts[i].match(/\d+/)) {
            metrics.push(parts[i]);
            if (i > 0) labels.push(parts[i - 1].trim());
        }
    }

    return { metrics, labels };
};

export const Widget: React.FC<WidgetProps> = ({ widget, onRemove }) => {
    const { metrics, labels } = parseWidgetContent(widget.widget_content);
    const icon = getWidgetIcon(widget.widget_name);

    return (
        <div className="card p-6 hover:shadow-lg transition-all duration-200 group relative">
            {/* Remove Button */}
            {widget.is_removable && (
                <button
                    onClick={() => onRemove(widget.widget_id)}
                    className="absolute top-3 right-3 p-1 rounded-full hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    aria-label={`Remove ${widget.widget_name}`}
                >
                    <X className="w-4 h-4" />
                </button>
            )}

            {/* Widget Header */}
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                    {icon}
                </div>
                <h3 className="font-semibold text-slate-900 text-lg">
                    {widget.widget_name}
                </h3>
            </div>

            {/* Widget Content */}
            <div className="space-y-3">
                {widget.widget_content.includes('No Graph data available!') ? (
                    <div className="text-center py-8 text-slate-500">
                        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-slate-100 flex items-center justify-center">
                            <TrendingUp className="w-8 h-8 text-slate-400" />
                        </div>
                        <p className="text-sm">No Graph data available!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4">
                        {metrics.map((metric, index) => (
                            <div key={index} className="text-center p-3 rounded-lg bg-slate-50">
                                <div className="text-2xl font-bold text-slate-900 mb-1">
                                    {metric}
                                </div>
                                <div className="text-xs text-slate-600 capitalize">
                                    {labels[index] || 'Metric'}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Widget Footer */}
            <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Created: {new Date(widget.creation_timestamp).toLocaleDateString()}</span>
                    <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700">
                        Active
                    </span>
                </div>
            </div>
        </div>
    );
};
