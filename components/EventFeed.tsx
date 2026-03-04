"use client";

import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import eventsData from '../data/events.json';
import { SupplyChainEvent } from '../types';
import { AlertCircle, FileWarning, Info } from 'lucide-react';

export default function EventFeed() {
    const { activeEvent, setActiveEvent } = useDashboard();
    const events = eventsData as SupplyChainEvent[];

    const getSeverityStyles = (severity: SupplyChainEvent['severity']) => {
        switch (severity) {
            case 'Critical':
                return 'border-red-500/50 bg-red-500/10 text-red-100 hover:bg-red-500/20';
            case 'Warning':
                return 'border-yellow-500/50 bg-yellow-500/10 text-yellow-100 hover:bg-yellow-500/20';
            case 'Info':
                return 'border-blue-500/50 bg-blue-500/10 text-blue-100 hover:bg-blue-500/20';
            default:
                return 'border-slate-700 bg-slate-800 hover:bg-slate-700';
        }
    };

    const getSeverityIcon = (severity: SupplyChainEvent['severity']) => {
        switch (severity) {
            case 'Critical':
                return <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />;
            case 'Warning':
                return <FileWarning className="w-5 h-5 text-yellow-500 shrink-0" />;
            case 'Info':
                return <Info className="w-5 h-5 text-blue-500 shrink-0" />;
        }
    };

    return (
        <div className="bg-slate-800 border border-slate-700 rounded-lg flex flex-col h-full overflow-hidden">
            <div className="p-4 border-b border-slate-700 bg-slate-800/80 shrink-0">
                <h2 className="text-lg font-semibold text-slate-50 flex items-center gap-2">
                    Global Event Feed
                    <span className="bg-slate-700 text-slate-300 py-0.5 px-2 rounded-full text-xs font-medium">
                        {events.length}
                    </span>
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto min-h-0 p-4 space-y-3">
                {events.map((event) => {
                    const isActive = activeEvent?.id === event.id;
                    return (
                        <button
                            key={event.id}
                            onClick={() => setActiveEvent(isActive ? null : event)}
                            className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${getSeverityStyles(
                                event.severity
                            )} ${isActive ? 'ring-2 ring-blue-500 shadow-lg shadow-blue-500/20' : ''}`}
                        >
                            <div className="flex gap-3 items-start">
                                {getSeverityIcon(event.severity)}
                                <div>
                                    <div className="flex justify-between items-start gap-2 mb-1">
                                        <h3 className="font-semibold text-sm leading-tight">{event.title}</h3>
                                        <span className="text-xs opacity-70 whitespace-nowrap">{event.date}</span>
                                    </div>
                                    <p className="text-sm opacity-80 line-clamp-2 mt-1">{event.description}</p>

                                    <div className="mt-3 flex gap-2">
                                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-900/50 border border-slate-700/50">
                                            {event.category}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
