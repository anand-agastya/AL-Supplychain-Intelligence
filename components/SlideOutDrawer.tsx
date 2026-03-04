"use client";

import React, { ReactNode } from 'react';
import { useDashboard, DrawerType } from '../context/DashboardContext';
import { X } from 'lucide-react';

interface SlideOutDrawerProps {
    title: string;
    drawerId: DrawerType;
    children: ReactNode;
}

export default function SlideOutDrawer({ title, drawerId, children }: SlideOutDrawerProps) {
    const { activeDrawer, setActiveDrawer } = useDashboard();
    const isOpen = activeDrawer === drawerId;

    return (
        <div
            className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-slate-900 border-l border-slate-700 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
        >
            <div className="flex flex-col h-full overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-800/50">
                    <h2 className="text-xl font-bold text-slate-50">{title}</h2>
                    <button
                        onClick={() => setActiveDrawer(null)}
                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
