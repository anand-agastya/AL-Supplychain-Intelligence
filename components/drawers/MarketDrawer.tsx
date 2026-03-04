"use client";

import React, { useMemo } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import commodityData from '../../data/commodity_prices.json';
import macroData from '../../data/macro_data.json';
import { CommodityPrice, MacroIndicator } from '../../types';
import { TrendingUp } from 'lucide-react';
import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

export default function MarketDrawer() {
    const { timeRange } = useDashboard();

    // Combine commodity prices and macro data by date
    const chartData = useMemo(() => {
        let daysToInclude = 365;
        if (timeRange === '1M') daysToInclude = 30;
        if (timeRange === '3M') daysToInclude = 90;

        const prices = (commodityData as CommodityPrice[]).slice(-daysToInclude);
        const macros = (macroData as MacroIndicator[]).slice(-daysToInclude);

        return prices.map((p, i) => ({
            ...p,
            lme_inventory: macros[i]?.lme_inventory || 0,
            energy_index: macros[i]?.energy_index || 0
        }));
    }, [timeRange]);

    return (
        <div className="space-y-4">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex gap-3">
                    <TrendingUp className="w-5 h-5 text-blue-500 shrink-0" />
                    <div>
                        <h3 className="text-blue-100 font-medium">Market Analytics</h3>
                        <p className="text-sm text-blue-500/80 mt-1">Overlaying LME Aluminum price with LME Global Inventory levels.</p>
                    </div>
                </div>
            </div>

            <div className="h-80 w-full bg-slate-800 p-4 rounded-lg border border-slate-700">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis
                            dataKey="date"
                            stroke="#94a3b8"
                            fontSize={10}
                            tickFormatter={(v) => {
                                const d = new Date(v);
                                return `${d.getMonth() + 1}/${d.getDate()}`;
                            }}
                        />
                        <YAxis yAxisId="left" stroke="#3b82f6" fontSize={10} domain={['auto', 'auto']} />
                        <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={10} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                        />
                        <Legend wrapperStyle={{ fontSize: '12px' }} />
                        <Bar yAxisId="right" dataKey="lme_inventory" name="Inventory (MT)" fill="#334155" opacity={0.6} />
                        <Line yAxisId="left" type="monotone" dataKey="aluminum" name="Price ($)" stroke="#3b82f6" strokeWidth={2} dot={false} />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                <h4 className="text-slate-200 font-medium mb-2">Energy Cost Index</h4>
                <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-slate-50">
                        {chartData.length > 0 ? chartData[chartData.length - 1].energy_index.toFixed(2) : '100.00'}
                    </span>
                    <span className="text-sm text-slate-400 mb-1">Index Res.</span>
                </div>
            </div>
        </div>
    );
}
