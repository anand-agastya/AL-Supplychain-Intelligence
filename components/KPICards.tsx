import React from 'react';
import { Activity, AlertTriangle, TrendingUp, Ship } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export default function KPICards() {
    const { setActiveDrawer } = useDashboard();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border-b border-slate-800 bg-slate-900/50">
            <div
                onClick={() => setActiveDrawer('risk')}
                className="bg-slate-800 rounded-lg p-4 border border-slate-700 flex items-center justify-between cursor-pointer hover:bg-slate-700 transition-colors"
            >
                <div>
                    <p className="text-sm text-slate-400 font-medium">Global Risk Index</p>
                    <p className="text-2xl font-bold text-slate-50 mt-1">68/100</p>
                </div>
                <div className="p-3 bg-red-500/10 rounded-full">
                    <Activity className="w-6 h-6 text-red-500" />
                </div>
            </div>

            <div
                onClick={() => setActiveDrawer('alerts')}
                className="bg-slate-800 rounded-lg p-4 border border-slate-700 flex items-center justify-between cursor-pointer hover:bg-slate-700 transition-colors"
            >
                <div>
                    <p className="text-sm text-slate-400 font-medium">Active Alerts</p>
                    <p className="text-2xl font-bold text-slate-50 mt-1">12</p>
                </div>
                <div className="p-3 bg-yellow-500/10 rounded-full">
                    <AlertTriangle className="w-6 h-6 text-yellow-500" />
                </div>
            </div>

            <div
                onClick={() => setActiveDrawer('market')}
                className="bg-slate-800 rounded-lg p-4 border border-slate-700 flex items-center justify-between cursor-pointer hover:bg-slate-700 transition-colors"
            >
                <div>
                    <p className="text-sm text-slate-400 font-medium">Price Volatility</p>
                    <p className="text-2xl font-bold text-slate-50 mt-1">+4.2%</p>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-full">
                    <TrendingUp className="w-6 h-6 text-blue-500" />
                </div>
            </div>

            <div
                onClick={() => setActiveDrawer('logistics')}
                className="bg-slate-800 rounded-lg p-4 border border-slate-700 flex items-center justify-between cursor-pointer hover:bg-slate-700 transition-colors"
            >
                <div>
                    <p className="text-sm text-slate-400 font-medium">Route Disruptions</p>
                    <p className="text-2xl font-bold text-slate-50 mt-1">3</p>
                </div>
                <div className="p-3 bg-orange-500/10 rounded-full">
                    <Ship className="w-6 h-6 text-orange-500" />
                </div>
            </div>
        </div>
    );
}
