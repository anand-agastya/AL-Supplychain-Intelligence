import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { DashboardProvider, useDashboard } from '../context/DashboardContext';
import commodityPrices from '../data/commodity_prices.json';
import events from '../data/events.json';
import suppliers from '../data/suppliers.json';
import shippingRoutes from '../data/shipping_routes.json';

describe('Phase 1: State & Data', () => {
    describe('DashboardContext', () => {
        it('initializes with default values', () => {
            const wrapper = ({ children }: { children: React.ReactNode }) => (
                <DashboardProvider>{children}</DashboardProvider>
            );

            const { result } = renderHook(() => useDashboard(), { wrapper });

            expect(result.current.selectedRegion).toBeNull();
            expect(result.current.activeEvent).toBeNull();
            expect(result.current.timeRange).toBe('3M');
        });

        it('can update timeRange', () => {
            const wrapper = ({ children }: { children: React.ReactNode }) => (
                <DashboardProvider>{children}</DashboardProvider>
            );

            const { result } = renderHook(() => useDashboard(), { wrapper });

            act(() => {
                result.current.setTimeRange('1Y');
            });

            expect(result.current.timeRange).toBe('1Y');
        });
    });

    describe('Mock Data Validation', () => {
        it('commodity_prices.json is valid and parsed', () => {
            expect(Array.isArray(commodityPrices)).toBe(true);
            expect(commodityPrices.length).toBeGreaterThan(0);
            expect(commodityPrices[0]).toHaveProperty('date');
            expect(commodityPrices[0]).toHaveProperty('aluminum');
            expect(commodityPrices[0]).toHaveProperty('alumina');
            expect(commodityPrices[0]).toHaveProperty('bauxite');
        });

        it('events.json is valid and parsed', () => {
            expect(Array.isArray(events)).toBe(true);
            expect(events.length).toBeGreaterThan(0);
            expect(events[0]).toHaveProperty('id');
            expect(events[0]).toHaveProperty('title');
            expect(events[0]).toHaveProperty('severity');
        });

        it('suppliers.json is valid and parsed', () => {
            expect(Array.isArray(suppliers)).toBe(true);
            expect(suppliers.length).toBeGreaterThan(0);
            expect(suppliers[0]).toHaveProperty('id');
            expect(suppliers[0]).toHaveProperty('name');
            expect(suppliers[0]).toHaveProperty('riskScore');
        });

        it('shipping_routes.json is valid and parsed', () => {
            expect(Array.isArray(shippingRoutes)).toBe(true);
            expect(shippingRoutes.length).toBeGreaterThan(0);
            expect(shippingRoutes[0]).toHaveProperty('id');
            expect(shippingRoutes[0]).toHaveProperty('path');
            expect(Array.isArray(shippingRoutes[0].path)).toBe(true);
        });
    });
});
