# File: phase-5-schema-alignment-and-context.md
## Phase 5: Schema Alignment, Expanded Data, & Context Routing

**Objective:** Update all TypeScript interfaces to strictly match the provided JSON schemas, generate the new operational data files, and expand the Context API to handle slide-out drawers and relational map highlighting.

### Tasks:
- [ ] **5.1 Strict Type Definitions:** Update `/types/index.ts`. Enforce the exact schemas provided:
  - `Supplier`: `{ id, name, region, riskScore, type, coordinates: [number, number], status }`
  - `Event`: `{ id, title, description, date, severity, category, coordinates: [number, number], affectedSuppliers: string[] }`
  - `ShippingRoute`: `{ id, name, path: [number, number][], status }`
- [ ] **5.2 New Operational Interfaces:** Define `PurchaseOrder` (must include `po_id`, `supplier_id`, `material`, `eta`, `status`, `route_id`) and `MacroIndicator` (must include `date`, `lme_inventory`, `energy_index`).
- [ ] **5.3 Generate Operational Mock Data:** Create `/data/internal_orders.json` (min 15 records mapping to valid `supplier_id`s and `route_id`s) and `/data/macro_data.json` (matching the 1-year date range of commodity prices).
- [ ] **5.4 Expand DashboardContext:** In `/context/DashboardContext.tsx`, add the following state variables and their setters:
  - `activeDrawer` (type: `'risk' | 'alerts' | 'market' | 'logistics' | null`)
  - `highlightedSupplierIds` (type: `string[]` - used to pulse/highlight markers on the map)
  - `highlightedRouteId` (type: `string | null` - used to highlight a specific polyline on the map)

### Required Tests (`UnitTests/Phase5_Data_Context.test.tsx`):
- [ ] Write a test verifying `DashboardContext` successfully updates `activeDrawer` and `highlightedSupplierIds`.
- [ ] Write a test parsing `events.json` to ensure the `affectedSuppliers` array only contains IDs that exist in the `suppliers.json` mock file.
