"use client";

import React, { useMemo, useState } from 'react';
import { useDashboard, TimeRange } from '../context/DashboardContext';
import commodityData from '../data/commodity_prices.json';
import { CommodityPrice } from '../types';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';

export default function CommodityChart() {
    const { timeRange, setTimeRange } = useDashboard();
    const allData = commodityData as CommodityPrice[];

    // Filter data based on timeRange selection
    const chartData = useMemo(() => {
        let daysToInclude = 365;
        if (timeRange === '1M') daysToInclude = 30;
        if (timeRange === '3M') daysToInclude = 90;

        // Assuming data is chronologically ordered, we take the last X days
        return allData.slice(-daysToInclude);
    }, [allData, timeRange]);

    const timeButtons: { label: string; value: TimeRange }[] = [
        { label: '1M', value: '1M' },
        { label: '3M', value: '3M' },
        { label: '1Y', value: '1Y' },
    ];

    const [visibleLines, setVisibleLines] = useState({
        aluminum: true,
        alumina: true,
        bauxite: true
    });

    const toggleLine = (key: keyof typeof visibleLines) => {
        setVisibleLines((prev: typeof visibleLines) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 flex flex-col h-full">
            {/* Header and Controls */}
            <div className="flex justify-between items-center mb-4 shrink-0 flex-wrap gap-2">
                <div>
                    <h2 className="text-lg font-semibold text-slate-50">Commodity Prices</h2>
                    <p className="text-sm text-slate-400">USD per Metric Ton</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 items-end sm:items-center">
                    {/* Commodity Toggles */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => toggleLine('aluminum')}
                            className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium border transition-colors ${visibleLines.aluminum ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-slate-800 border-slate-700 text-slate-500 hover:text-slate-400'
                                }`}
                        >
                            <div className={`w-2 h-2 rounded-full ${visibleLines.aluminum ? 'bg-blue-500' : 'bg-slate-600'}`}></div>
                            Aluminum
                        </button>
                        <button
                            onClick={() => toggleLine('alumina')}
                            className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium border transition-colors ${visibleLines.alumina ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-slate-800 border-slate-700 text-slate-500 hover:text-slate-400'
                                }`}
                        >
                            <div className={`w-2 h-2 rounded-full ${visibleLines.alumina ? 'bg-amber-500' : 'bg-slate-600'}`}></div>
                            Alumina
                        </button>
                        <button
                            onClick={() => toggleLine('bauxite')}
                            className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium border transition-colors ${visibleLines.bauxite ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-800 border-slate-700 text-slate-500 hover:text-slate-400'
                                }`}
                        >
                            <div className={`w-2 h-2 rounded-full ${visibleLines.bauxite ? 'bg-emerald-500' : 'bg-slate-600'}`}></div>
                            Bauxite
                        </button>
                    </div>

                    {/* Time Range Controls */}
                    <div className="flex gap-1 bg-slate-900 rounded-lg p-1 border border-slate-700">
                        {timeButtons.map((btn) => (
                            <button
                                key={btn.value}
                                onClick={() => setTimeRange(btn.value)}
                                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${timeRange === btn.value
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                                    }`}
                            >
                                {btn.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recharts Container */}
            <div className="flex-1 min-h-0 w-full relative">
                <div className="absolute inset-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                            <XAxis
                                dataKey="date"
                                stroke="#94a3b8"
                                fontSize={12}
                                tickMargin={10}
                                tickFormatter={(v) => {
                                    const d = new Date(v);
                                    return `${d.getMonth() + 1}/${d.getDate()}`;
                                }}
                            />
                            <YAxis
                                stroke="#94a3b8"
                                fontSize={12}
                                tickFormatter={(v) => `$${v}`}
                                domain={['auto', 'auto']}
                                width={60}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                                itemStyle={{ color: '#f8fafc' }}
                            />
                            {/* We hid the default legend because we built a custom one above */}
                            <Line
                                hide={!visibleLines.aluminum}
                                type="monotone"
                                dataKey="aluminum"
                                name="Aluminum"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                dot={false}
                                activeDot={{ r: 6 }}
                            />
                            <Line
                                hide={!visibleLines.alumina}
                                type="monotone"
                                dataKey="alumina"
                                name="Alumina"
                                stroke="#f59e0b"
                                strokeWidth={2}
                                dot={false}
                            />
                            <Line
                                hide={!visibleLines.bauxite}
                                type="monotone"
                                dataKey="bauxite"
                                name="Bauxite"
                                stroke="#10b981"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
