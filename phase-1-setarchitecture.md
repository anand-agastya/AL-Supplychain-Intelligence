# File: phase-1-setup-architecture.md
## Phase 1: Project Setup, Data, and State Management

**Objective:** Bootstrap the Next.js application, establish the correct folder structure, generate the simulated data, and set up the React Context for global state management.

### Tasks:
- [ ] **1.1 Next.js Initialization:** Initialize a new Next.js project with the App Router, TypeScript, and Tailwind CSS.
- [ ] **1.2 Install Dependencies:** Install required packages: `recharts`, `leaflet`, `react-leaflet`, `lucide-react`. Install testing libraries if not already present (e.g., Jest, React Testing Library).
- [ ] **1.3 Folder Structure:** Create the following directories: `/components`, `/data`, `/context`, `/types`, and `/UnitTests`.
- [ ] **1.4 TypeScript Interfaces:** Create `/types/index.ts` and define interfaces for `CommodityPrice`, `SupplyChainEvent`, `Supplier`, and `ShippingRoute`.
- [ ] **1.5 Mock Data Generation:** Create the 4 required JSON files in `/data` (`commodity_prices.json`, `events.json`, `suppliers.json`, `shipping_routes.json`). Ensure the price data covers a full 1-year timeline to support the 1M/3M/1Y toggles.
- [ ] **1.6 Global State Setup:** Create `/context/DashboardContext.tsx`. Implement the state variables: `selectedRegion`, `activeEvent`, and `timeRange` (default to '3M'). Export the Provider and a custom `useDashboard` hook.

### Required Tests (`UnitTests/Phase1_State_Data.test.tsx`):
- [ ] Write a test to verify the `DashboardContext` initializes with default values.
- [ ] Write a test to ensure the mock JSON data files can be successfully parsed and match the TypeScript interfaces.