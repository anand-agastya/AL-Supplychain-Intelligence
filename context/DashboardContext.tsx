"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SupplyChainEvent } from '../types';

export type TimeRange = '1M' | '3M' | '1Y';

export type DrawerType = 'risk' | 'alerts' | 'market' | 'logistics' | null;

export interface DashboardContextState {
    selectedRegion: string | null;
    setSelectedRegion: (region: string | null) => void;
    activeEvent: SupplyChainEvent | null;
    setActiveEvent: (event: SupplyChainEvent | null) => void;
    timeRange: TimeRange;
    setTimeRange: (range: TimeRange) => void;
    activeDrawer: DrawerType;
    setActiveDrawer: (drawer: DrawerType) => void;
    highlightedSupplierIds: string[];
    setHighlightedSupplierIds: (ids: string[]) => void;
    highlightedRouteId: string | null;
    setHighlightedRouteId: (id: string | null) => void;
}

const DashboardContext = createContext<DashboardContextState | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const [activeEvent, setActiveEvent] = useState<SupplyChainEvent | null>(null);
    const [timeRange, setTimeRange] = useState<TimeRange>('3M');
    const [activeDrawer, setActiveDrawer] = useState<DrawerType>(null);
    const [highlightedSupplierIds, setHighlightedSupplierIds] = useState<string[]>([]);
    const [highlightedRouteId, setHighlightedRouteId] = useState<string | null>(null);

    return (
        <DashboardContext.Provider value={{
            selectedRegion,
            setSelectedRegion,
            activeEvent,
            setActiveEvent,
            timeRange,
            setTimeRange,
            activeDrawer,
            setActiveDrawer,
            highlightedSupplierIds,
            setHighlightedSupplierIds,
            highlightedRouteId,
            setHighlightedRouteId
        }}>
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (context === undefined) {
        throw new Error('useDashboard must be used within a DashboardProvider');
    }
    return context;
};
