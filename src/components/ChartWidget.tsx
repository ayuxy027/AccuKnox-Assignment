import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

interface ChartWidgetProps {
    title: string;
    data: any[];
    type: 'bar' | 'pie' | 'line';
    color?: string;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

export const ChartWidget: React.FC<ChartWidgetProps> = ({
    title,
    data,
    type,
    color = '#3b82f6',
}) => {
    const renderChart = () => {
        switch (type) {
            case 'bar':
                return (
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                            <YAxis stroke="#64748b" fontSize={12} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#ffffff',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                }}
                            />
                            <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                );

            case 'pie':
                return (
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={80}
                                paddingAngle={2}
                                dataKey="value"
                            >
                                {data.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#ffffff',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                );

            case 'line':
                return (
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                            <YAxis stroke="#64748b" fontSize={12} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#ffffff',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke={color}
                                strokeWidth={2}
                                dot={{ fill: color, strokeWidth: 2, r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                );

            default:
                return null;
        }
    };

    return (
        <div className="card p-6">
            <h3 className="font-semibold text-slate-900 mb-4">{title}</h3>
            <div className="h-[200px]">
                {renderChart()}
            </div>
        </div>
    );
};
