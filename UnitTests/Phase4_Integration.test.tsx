import React from 'react';
import { render, screen, fireEvent, renderHook, act } from '@testing-library/react';
import EventFeed from '../components/EventFeed';
import { DashboardProvider, useDashboard } from '../context/DashboardContext';

describe('Phase 4: Integration & Interactivity', () => {

    // A test component to extract context value since we can't test context state changes purely from the DOM easily
    const ActiveEventSpy = () => {
        const { activeEvent } = useDashboard();
        return (
            <div data-testid="active-event-id">
                {activeEvent ? activeEvent.id : 'None'}
            </div>
        );
    };

    it('clicking an event in the feed updates the global context', () => {
        render(
            <DashboardProvider>
                <div style={{ display: 'flex' }}>
                    <EventFeed />
                    <ActiveEventSpy />
                </div>
            </DashboardProvider>
        );

        // Intially no actve event
        expect(screen.getByTestId('active-event-id').textContent).toBe('None');

        // Find the first event (from the mock events array, e.g evt-004)
        const eventTitle = screen.getByText('Wildcat Strike at Sangarédi');
        const eventButton = eventTitle.closest('button');

        // Click and verify context updated
        fireEvent.click(eventButton!);
        expect(screen.getByTestId('active-event-id').textContent).toBe('evt-004');

        // Click again to deselect
        fireEvent.click(eventButton!);
        expect(screen.getByTestId('active-event-id').textContent).toBe('None');
    });
});
