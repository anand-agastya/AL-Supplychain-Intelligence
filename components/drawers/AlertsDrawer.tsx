"use client";

import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import eventsData from '../../data/events.json';
import { SupplyChainEvent } from '../../types';
import { AlertTriangle } from 'lucide-react';

export default function AlertsDrawer() {
    const { setHighlightedSupplierIds, setActiveEvent } = useDashboard();
    const events = eventsData as SupplyChainEvent[];

    const handleEventClick = (event: SupplyChainEvent) => {
        setHighlightedSupplierIds(event.affectedSuppliers);
        setActiveEvent(event);
    };

    return (
        <div className="space-y-4">
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <div className="flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />
                    <div>
                        <h3 className="text-yellow-100 font-medium">Triage Inbox</h3>
                        <p className="text-sm text-yellow-500/80 mt-1">Select an event to view affected suppliers on the global map.</p>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                {events.map(event => (
                    <button
                        key={event.id}
                        onClick={() => handleEventClick(event)}
                        className="w-full text-left p-4 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 transition-colors"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className="font-semibold text-slate-200">{event.title}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${event.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                                    event.severity === 'Warning' ? 'bg-yellow-500/20 text-yellow-400' :
                                        'bg-blue-500/20 text-blue-400'
                                }`}>
                                {event.severity}
                            </span>
                        </div>
                        <p className="text-sm text-slate-400 mb-2">{event.description}</p>
                        <div className="text-xs text-slate-500">
                            Affected Suppliers: {event.affectedSuppliers.length > 0 ? event.affectedSuppliers.length : 'None'}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
