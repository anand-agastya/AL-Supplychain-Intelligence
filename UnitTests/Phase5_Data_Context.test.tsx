import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DashboardProvider, useDashboard } from '../context/DashboardContext';
import eventsData from '../data/events.json';
import suppliersData from '../data/suppliers.json';

describe('Phase 5: Schema Alignment and Context', () => {

    // Helper component to access context
    const ContextSpy = () => {
        const { activeDrawer, setActiveDrawer, highlightedSupplierIds, setHighlightedSupplierIds } = useDashboard();
        return (
            <div>
                <div data-testid="drawer-state">{activeDrawer || 'none'}</div>
                <div data-testid="suppliers-state">{highlightedSupplierIds.join(',')}</div>
                <button onClick={() => setActiveDrawer('alerts')}>Set Alerts</button>
                <button onClick={() => setHighlightedSupplierIds(['sup-123'])}>Set Suppliers</button>
            </div>
        );
    };

    it('DashboardContext manages new drawer and highlighted supplier states', () => {
        render(
            <DashboardProvider>
                <ContextSpy />
            </DashboardProvider>
        );

        // Initial states
        expect(screen.getByTestId('drawer-state').textContent).toBe('none');
        expect(screen.getByTestId('suppliers-state').textContent).toBe('');

        // Action: Set Drawer
        fireEvent.click(screen.getByText('Set Alerts'));
        expect(screen.getByTestId('drawer-state').textContent).toBe('alerts');

        // Action: Set Suppliers
        fireEvent.click(screen.getByText('Set Suppliers'));
        expect(screen.getByTestId('suppliers-state').textContent).toBe('sup-123');
    });

});
