import React, { useState } from 'react';
import { X, Plus, Check } from 'lucide-react';
import { useDashboardStore } from '../store/dashboardStore';
import type { NewWidgetData } from '../types/dashboard';

interface PersonalizationPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export const PersonalizationPanel: React.FC<PersonalizationPanelProps> = ({
    isOpen,
    onClose,
}) => {
    const { categories, addCustomWidget } = useDashboardStore();
    const [showCustomWidgetForm, setShowCustomWidgetForm] = useState(false);
    const [customWidgetData, setCustomWidgetData] = useState<NewWidgetData>({
        widget_name: '',
        widget_content: '',
        category_id: '',
    });

    const handleCustomWidgetSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (customWidgetData.widget_name && customWidgetData.widget_content && customWidgetData.category_id) {
            addCustomWidget(customWidgetData);
            setCustomWidgetData({
                widget_name: '',
                widget_content: '',
                category_id: '',
            });
            setShowCustomWidgetForm(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content p-6 animate-fade-in" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-slate-900">
                        Personalise your dashboard
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-700"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Add Custom Widget Button */}
                <div className="mb-6">
                    <button
                        onClick={() => setShowCustomWidgetForm(!showCustomWidgetForm)}
                        className="btn btn-secondary w-full"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Custom Widget
                    </button>
                </div>

                {/* Custom Widget Form */}
                {showCustomWidgetForm && (
                    <form onSubmit={handleCustomWidgetSubmit} className="mb-6 p-4 border border-slate-200 rounded-lg">
                        <h3 className="font-medium text-slate-900 mb-4">Create New Widget</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Widget Name (required)
                                </label>
                                <input
                                    type="text"
                                    value={customWidgetData.widget_name}
                                    onChange={(e) => setCustomWidgetData(prev => ({ ...prev, widget_name: e.target.value }))}
                                    className="input"
                                    placeholder="Enter widget name"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Widget Content (required)
                                </label>
                                <textarea
                                    value={customWidgetData.widget_content}
                                    onChange={(e) => setCustomWidgetData(prev => ({ ...prev, widget_content: e.target.value }))}
                                    className="input min-h-[80px] resize-none"
                                    placeholder="Enter widget content (e.g., 'Metric 1: 100 Metric 2: 200')"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Select Category (required)
                                </label>
                                <select
                                    value={customWidgetData.category_id}
                                    onChange={(e) => setCustomWidgetData(prev => ({ ...prev, category_id: e.target.value }))}
                                    className="input"
                                    required
                                >
                                    <option value="">Choose a category</option>
                                    {categories.map((category) => (
                                        <option key={category.category_id} value={category.category_id}>
                                            {category.category_name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex gap-2">
                                <button type="submit" className="btn btn-primary flex-1">
                                    Create Widget
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowCustomWidgetForm(false)}
                                    className="btn btn-secondary"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                )}

                {/* Available Widgets */}
                <div className="space-y-4">
                    <h3 className="font-medium text-slate-900">Available Widgets by Category</h3>

                    {categories.map((category) => (
                        <div key={category.category_id} className="border border-slate-200 rounded-lg p-4">
                            <h4 className="font-medium text-slate-800 mb-3">{category.category_name}</h4>

                            {category.widgets.length === 0 ? (
                                <p className="text-sm text-slate-500 italic">No widgets in this category</p>
                            ) : (
                                <div className="space-y-2">
                                    {category.widgets.map((widget) => (
                                        <div key={widget.widget_id} className="flex items-center justify-between p-2 rounded hover:bg-slate-50">
                                            <div className="flex items-center gap-2">
                                                <Check className="w-4 h-4 text-emerald-600" />
                                                <span className="text-sm text-slate-700">{widget.widget_name}</span>
                                            </div>
                                            <span className="text-xs text-slate-500">
                                                {widget.is_removable ? 'Removable' : 'Fixed'}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-slate-200">
                    <div className="flex gap-2">
                        <button onClick={onClose} className="btn btn-primary flex-1">
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
