# File: phase-3-visualizations.md
## Phase 3: Complex Visualizations (Charts & Maps)

**Objective:** Implement the Recharts time-series visualization and the React-Leaflet map. 

### Tasks:
- [ ] **3.1 Commodity Chart Logic:** Create `/components/CommodityChart.tsx`. Implement a line chart using `recharts` showing Aluminum, Alumina, and Bauxite prices. 
- [ ] **3.2 Time Toggle Implementation:** Add UI buttons for "1M", "3M", and "1Y" to the chart header. Implement logic to slice the `commodity_prices.json` data array based on the selected time horizon.
- [ ] **3.3 Map Component Wrapper:** Because Leaflet relies on the `window` object, create `/components/MapWrapper.tsx` that dynamically imports the actual map component with `{ ssr: false }`.
- [ ] **3.4 Global Risk Map Component:** Create `/components/GlobalRiskMap.tsx`. Initialize a `react-leaflet` MapContainer using a dark tile layer (e.g., CartoDB Dark Matter). 
- [ ] **3.5 Map Markers:** Render markers on the map for suppliers and active shipping route risks based on the JSON data.

### Required Tests (`UnitTests/Phase3_Visualizations.test.tsx`):
- [ ] Write a unit test for the time-slicing logic inside the chart component to ensure a "1M" selection returns roughly 30 days of data from the 1-year dataset.
- [ ] Write a test confirming the map component wrapper successfully bypasses SSR (mocking dynamic import if necessary).
