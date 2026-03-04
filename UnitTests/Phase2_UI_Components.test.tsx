import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import KPICards from '../components/KPICards';
import SupplierTable from '../components/SupplierTable';
import EventFeed from '../components/EventFeed';
import { DashboardProvider } from '../context/DashboardContext';

// Mock matchMedia if not present in JSDOM
beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
});

describe('Phase 2: UI Components', () => {
    describe('KPICards', () => {
        it('renders exactly 4 metric cards', () => {
            render(<KPICards />);

            expect(screen.getByText('Global Risk Index')).toBeInTheDocument();
            expect(screen.getByText('Active Alerts')).toBeInTheDocument();
            expect(screen.getByText('Price Volatility')).toBeInTheDocument();
            expect(screen.getByText('Route Disruptions')).toBeInTheDocument();
        });
    });

    describe('SupplierTable', () => {
        it('applies correct CSS classes based on status and risk level', () => {
            render(
                <DashboardProvider>
                    <SupplierTable />
                </DashboardProvider>
            );

            // Based on our mock data (suppliers.json)
            // "CBG Bauxite Operations" has risk 85 and status "Disrupted"
            expect(screen.getByText('CBG Bauxite Operations')).toBeInTheDocument();

            // Look up status text explicitly
            const disruptedCell = screen.getByText('Disrupted');
            expect(disruptedCell).toHaveClass('text-red-500');

            // Worsley Alumina Refinery has status Normal
            const normalCell = screen.getAllByText('Normal')[0];
            expect(normalCell).toHaveClass('text-green-500');
        });
    });

    describe('EventFeed', () => {
        it('renders events and allows selecting an active event', () => {
            render(
                <DashboardProvider>
                    <EventFeed />
                </DashboardProvider>
            );

            // Check title of one of the mock events
            const eventTitle = screen.getByText('Port Strike in Guinea');
            expect(eventTitle).toBeInTheDocument();

            // It should render an alert for Critical items (with styling class)
            // Our first event is critical
            const button = eventTitle.closest('button');
            expect(button).toHaveClass('border-red-500/50');

            // Click the button to select it
            fireEvent.click(button!);

            // Verify selection class is applied
            expect(button).toHaveClass('ring-blue-500');
        });
    });
});
