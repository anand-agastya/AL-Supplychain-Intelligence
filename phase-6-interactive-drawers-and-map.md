# File: phase-6-interactive-drawers-and-map.md
## Phase 6: Slide-out Drawers & Relational Map Interactivity

**Objective:** Implement the drill-down UI and wire the data relationships so that interacting with the text/feed directly manipulates the Leaflet map state, creating a dynamic command center feel.

### Tasks:
- [ ] **6.1 Drawer Wrapper Component:** Create `/components/SlideOutDrawer.tsx`. Implement a Tailwind-powered right-side drawer using fixed positioning, z-index (ensure it sits above the Leaflet map z-index), and a semi-transparent backdrop (`bg-black/50`).
- [ ] **6.2 Wire KPI Cards:** Update `KPICards.tsx`. Add `onClick` handlers to change the cursor to pointer and trigger `setActiveDrawer` with the appropriate string identifier.
- [ ] **6.3 Implement Triage Inbox (Alerts Drawer):** Create `/components/drawers/AlertsDrawer.tsx`. Render the `events.json` list. 
  - *Crucial Interactivity:* When an event is clicked in this drawer, call `setHighlightedSupplierIds` with the event's `affectedSuppliers` array, and use the map's `flyTo` method to pan to the event's `coordinates`.
- [ ] **6.4 Implement Maritime Logistics Drawer:** Create `/components/drawers/LogisticsDrawer.tsx`. Render a list of active `internal_orders.json`.
  - *Crucial Interactivity:* When a PO is clicked, call `setHighlightedRouteId` with the PO's `route_id`.
- [ ] **6.5 Upgrade GlobalRiskMap Component:** Update `/components/GlobalRiskMap.tsx` to consume the new Context states.
  - If a supplier ID exists in `highlightedSupplierIds`, change its Leaflet marker icon to a pulsing red circle or larger icon.
  - Map over `shipping_routes.json` to draw `Polyline` components. If `highlightedRouteId` matches a route, increase the `weight` and change the `color` of that specific polyline to stand out.
- [ ] **6.6 Implement Market Analytics Drawer:** Create `/components/drawers/MarketDrawer.tsx`. Render a `recharts` composed chart showing aluminum price lines overlaid with a bar chart representing `lme_inventory` from the macro dataset.

### Required Tests (`UnitTests/Phase6_Interactivity.test.tsx`):
- [ ] Write an integration test where clicking an event item successfully passes the `affectedSuppliers` array into the `DashboardContext` state.
- [ ] Write a test ensuring `SlideOutDrawer` correctly receives and toggles the Tailwind `translate-x-0` class based on the `activeDrawer` prop.