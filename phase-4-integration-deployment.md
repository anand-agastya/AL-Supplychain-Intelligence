# File: phase-4-integration-deployment.md
## Phase 4: Interactivity Integration & Deployment Prep

**Objective:** Connect the components using the Context API so the dashboard feels alive, finalize the styling, and ensure it is ready for Vercel.

### Tasks:
- [ ] **4.1 Chart Context Wiring:** Connect `CommodityChart` to `DashboardContext` so the `timeRange` state is globally managed (if needed by other components).
- [ ] **4.2 Map & Feed Integration:** Update `EventFeed.tsx` so clicking an event updates `activeEvent` in the Context. Update `GlobalRiskMap.tsx` to listen to `activeEvent` and automatically pan/fly to the event's coordinates.
- [ ] **4.3 Table Context Wiring:** Update `SupplierTable.tsx` to filter its rows based on the `selectedRegion` in the Context (which can be set by clicking a region on the map).
- [ ] **4.4 UI Polish:** Perform a final pass on Tailwind classes. Ensure padding, gaps, typography (`text-slate-50`, `text-slate-400`), and borders (`border-slate-700`) are consistent across all components to maintain the Bloomberg/Palantir aesthetic.
- [ ] **4.5 Build Verification:** Run `npm run build` locally to ensure there are no TypeScript errors, missing dependencies, or Next.js build failures.

### Required Tests (`UnitTests/Phase4_Integration.test.tsx`):
- [ ] Write an integration test where an event is "clicked" in the Event Feed, and verify that the `DashboardContext` updates the `activeEvent` properly.
- [ ] Run all previously created tests in the `/UnitTests` directory to ensure no regressions occurred during integration.
