"use client";

import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import ordersData from '../../data/internal_orders.json';
import { PurchaseOrder } from '../../types';
import { Ship } from 'lucide-react';

export default function LogisticsDrawer() {
    const { setHighlightedRouteId } = useDashboard();
    const orders = ordersData as PurchaseOrder[];

    return (
        <div className="space-y-4">
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                <div className="flex gap-3">
                    <Ship className="w-5 h-5 text-orange-500 shrink-0" />
                    <div>
                        <h3 className="text-orange-100 font-medium">Maritime Logistics</h3>
                        <p className="text-sm text-orange-500/80 mt-1">Select a Purchase Order to highlight the shipping route on the map.</p>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                {orders.map(order => (
                    <button
                        key={order.po_id}
                        onClick={() => setHighlightedRouteId(order.route_id)}
                        className="w-full text-left p-4 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 transition-colors"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-slate-200 text-sm">{order.po_id}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${order.status === 'Delayed' ? 'bg-red-500/20 text-red-400' :
                                    order.status === 'Processing' ? 'bg-yellow-500/20 text-yellow-400' :
                                        'bg-green-500/20 text-green-400'
                                }`}>
                                {order.status}
                            </span>
                        </div>
                        <div className="text-sm text-slate-400">
                            <p>Material: {order.material}</p>
                            <p>Route: {order.route_id}</p>
                            <p>ETA: {order.eta}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
