import React, { useState } from 'react';
import { X, Plus, Check } from 'lucide-react';
import { useDashboardStore } from '../store/dashboardStore';
import type { NewWidgetData } from '../types/dashboard';

interface PersonalizationPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

const CATEGORY_TABS = ['CSPM', 'CWPP', 'Image', 'Ticket'];

export const PersonalizationPanel: React.FC<PersonalizationPanelProps> = ({
    isOpen,
    onClose,
}) => {
    const { categories, addCustomWidget, removeWidget } = useDashboardStore();
    const [activeTab, setActiveTab] = useState('CSPM');
    const [showCustomWidgetForm, setShowCustomWidgetForm] = useState(false);
    const [hiddenWidgets, setHiddenWidgets] = useState<Set<string>>(new Set());
    const [customWidgetData, setCustomWidgetData] = useState<NewWidgetData>({
        widget_name: '',
        widget_type: 'custom',
        widget_content: '',
        category_id: '',
    });

    const handleCustomWidgetSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (customWidgetData.widget_name && customWidgetData.widget_content && customWidgetData.category_id) {
            addCustomWidget(customWidgetData);
            setCustomWidgetData({
                widget_name: '',
                widget_type: 'custom',
                widget_content: '',
                category_id: '',
            });
            setShowCustomWidgetForm(false);
        }
    };

    const toggleWidgetVisibility = (widgetId: string) => {
        setHiddenWidgets(prev => {
            const newSet = new Set(prev);
            if (newSet.has(widgetId)) {
                newSet.delete(widgetId);
            } else {
                newSet.add(widgetId);
            }
            return newSet;
        });
    };

    const handleConfirm = () => {
        // Remove widgets that are hidden
        hiddenWidgets.forEach(widgetId => {
            removeWidget(widgetId);
        });
        onClose();
        setHiddenWidgets(new Set());
    };

    if (!isOpen) return null;

    // Filter categories based on active tab
    const getFilteredCategories = () => {
        const tabMap: { [key: string]: string[] } = {
            'CSPM': ['cspmExecutiveDashboard'],
            'CWPP': ['cwppDashboard'],
            'Image': ['registryScan'],
            'Ticket': []
        };

        const categoryIds = tabMap[activeTab] || [];
        return categories.filter(cat => categoryIds.includes(cat.category_id));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-end" onClick={onClose}>
            <div className="bg-white h-full w-full max-w-md shadow-2xl animate-slide-in-right overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="p-6">
                    {/* Header */}
                    <div className="bg-blue-600 text-white p-4 -m-6 mb-6 flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Add Widget</h2>
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-blue-700 rounded-full text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Instruction Text */}
                    <p className="text-sm text-gray-700 mb-4">
                        Personalise your dashboard by adding the following widget
                    </p>

                    {/* Category Tabs */}
                    <div className="flex gap-2 mb-6 border-b border-gray-200">
                        {CATEGORY_TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Add Custom Widget Button */}
                    <div className="mb-6">
                        <button
                            onClick={() => setShowCustomWidgetForm(!showCustomWidgetForm)}
                            className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
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
                                        value={typeof customWidgetData.widget_content === 'string' ? customWidgetData.widget_content : ''}
                                        onChange={(e) => setCustomWidgetData(prev => ({ ...prev, widget_content: e.target.value }))}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[80px] resize-none"
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
                    <div className="space-y-3 mb-6">
                        {getFilteredCategories().map((category) => (
                            <div key={category.category_id}>
                                {category.widgets.length > 0 && (
                                    <div className="space-y-2">
                                        {category.widgets.map((widget) => {
                                            const isChecked = !hiddenWidgets.has(widget.widget_id);
                                            return (
                                                <label
                                                    key={widget.widget_id}
                                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                                                    onClick={() => toggleWidgetVisibility(widget.widget_id)}
                                                >
                                                    <div className={`flex items-center justify-center w-5 h-5 border-2 rounded transition-colors ${isChecked
                                                            ? 'border-blue-600 bg-blue-600'
                                                            : 'border-gray-400 bg-white'
                                                        }`}>
                                                        {isChecked && <Check className="w-4 h-4 text-white" />}
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-900">{widget.widget_name}</span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        ))}
                        {getFilteredCategories().length === 0 && (
                            <p className="text-sm text-gray-500 italic text-center py-4">
                                No widgets in this category
                            </p>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
