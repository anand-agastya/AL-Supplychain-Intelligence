import React from 'react';
import { render, screen, fireEvent, renderHook, act } from '@testing-library/react';
import CommodityChart from '../components/CommodityChart';
import { DashboardProvider, useDashboard } from '../context/DashboardContext';

// We mock Recharts since drawing SVGs in JSDOM is problematic
jest.mock('recharts', () => {
    const OriginalModule = jest.requireActual('recharts');
    return {
        ...OriginalModule,
        ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
            <div data-testid="responsive-container">{children}</div>
        ),
        LineChart: ({ children, data }: { children: React.ReactNode, data: any }) => (
            <div data-testid="line-chart" data-points={data?.length}>{children}</div>
        )
    };
});

describe('Phase 3: Visualizations', () => {
    describe('CommodityChart logic', () => {
        it('renders chart and toggles time slice properly', () => {
            // 1. Initial State wrapper
            const wrapper = ({ children }: { children: React.ReactNode }) => (
                <DashboardProvider>{children}</DashboardProvider>
            );

            // 2. We hook into state to spy on it or adjust it, but mostly we check the UI
            render(
                <DashboardProvider>
                    <CommodityChart />
                </DashboardProvider>
            );

            expect(screen.getByText('Commodity Prices')).toBeInTheDocument();

            // Time toggle buttons should exist
            const btn1M = screen.getByText('1M');
            const btn3M = screen.getByText('3M'); // default
            const btn1Y = screen.getByText('1Y');

            expect(btn1M).toBeInTheDocument();
            expect(btn3M).toBeInTheDocument();
            expect(btn1Y).toBeInTheDocument();

            // Initial is 3M -> length = 90
            const chart = screen.getByTestId('line-chart');
            expect(chart.getAttribute('data-points')).toBe('90');

            // Click 1Y -> length should equal 365
            fireEvent.click(btn1Y);
            expect(chart.getAttribute('data-points')).toBe('365');

            // Click 1M -> length should equal 30
            fireEvent.click(btn1M);
            expect(chart.getAttribute('data-points')).toBe('30');
        });
    });
});
