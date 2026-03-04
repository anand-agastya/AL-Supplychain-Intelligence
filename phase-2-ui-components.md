# File: phase-2-ui-components.md
## Phase 2: Layout & Foundational UI Components

**Objective:** Build the main dashboard grid and implement the standard (non-mapping/charting) visual components using the enterprise dark theme.

### Tasks:
- [ ] **2.1 Main Dashboard Layout:** Update `app/page.tsx` to use a CSS Grid/Flexbox layout with a dark theme background (`bg-slate-900`). Create designated areas for the Top Bar, Left Panel (Map/Charts), and Right Panel (Feed/Table).
- [ ] **2.2 KPI Cards Component:** Create `/components/KPICards.tsx`. It should render 4 summary cards (Global Risk Index, Active Alerts, Price Volatility, Route Disruptions) using `lucide-react` icons and conditional text coloring.
- [ ] **2.3 Supplier Table Component:** Create `/components/SupplierTable.tsx`. Implement a responsive table displaying the `suppliers.json` data. Add conditional formatting (Red/Yellow/Green) to the Risk Level column.
- [ ] **2.4 Event Feed Component:** Create `/components/EventFeed.tsx`. Build a vertically scrollable list displaying `events.json`. Style high-severity events with a distinct border or background tint (e.g., subtle red).

### Required Tests (`UnitTests/Phase2_UI_Components.test.tsx`):
- [ ] Write a test to verify `KPICards` renders the correct number of cards based on mock props.
- [ ] Write a test to verify `SupplierTable` applies the correct CSS class based on the "High" or "Low" risk level of a mock supplier.
- [ ] Write a test verifying the `EventFeed` renders items and handles scrolling overflow CSS properly.