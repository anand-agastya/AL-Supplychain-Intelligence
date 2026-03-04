\# Market Intelligence Dashboard - Coding Plan



\## 1. Project Objective \& Intent

The goal is to build an enterprise-grade Market Intelligence Dashboard for the procurement team of an Aluminum Manufacturer. The dashboard provides situational awareness regarding supply chain risks, commodity price volatility, and geopolitical events. 



This is a high-fidelity demo designed for executive pitching. It uses simulated data but must look and behave like a production system (resembling Palantir or Bloomberg terminals). It will be deployed as a static Next.js application on Vercel.



\## 2. Technology Stack \& Rationale

These choices are optimized for autonomous coding agent execution, ensuring maximum compatibility and minimal configuration friction.



\* \*\*Framework:\*\* Next.js (App Router) - Provides a robust, standard React environment that compiles easily for Vercel.

\* \*\*Styling:\*\* Tailwind CSS - Allows for rapid, utility-first styling without external CSS files.

\* \*\*UI Primitives:\*\* HTML/Tailwind standard elements. (Avoiding complex UI library CLIs to prevent agent execution errors; custom components will be built from scratch using Tailwind).

\* \*\*Icons:\*\* `lucide-react` - Standard, clean icon set.

\* \*\*Charts:\*\* `recharts` - Highly declarative, excellent for coding agents, and easily supports the required 1Y, 3M, 1M time toggles.

\* \*\*Maps:\*\* `react-leaflet` + `leaflet` - Open-source mapping requiring no API keys. We will use the 'CartoDB Dark Matter' tile layer to match the enterprise dark theme.

\* \*\*State Management:\*\* React Context API - Provides a native, lightweight way to handle the required cross-component interactivity without introducing Redux boilerplate.



\## 3. Interactivity \& State Management Plan

To make the dashboard feel alive, components must communicate. We will implement a `DashboardContext` to manage global state.



\*\*Global State Variables:\*\*

\* `selectedRegion` (string | null): Filters the map and supplier table.

\* `activeEvent` (EventObject | null): Highlights specific map coordinates and filters charts when an event in the feed is clicked.

\* `timeRange` (enum: '1M', '3M', '1Y'): Controls the X-axis domain for all `recharts` instances.



\*\*Interaction Flows:\*\*

1\.  \*\*Time Toggle:\*\* Clicking "1M", "3M", or "1Y" updates the `timeRange` state. The `CommodityChart` component listens to this and slices the `commodity\_prices.json` array accordingly.

2\.  \*\*Event Click:\*\* Clicking an alert in the `EventFeed` sets the `activeEvent`. The `GlobalRiskMap` automatically pans/zooms to the event's coordinates and pulses a red marker.

3\.  \*\*Region Filter:\*\* Clicking a region on the map or a KPI card sets `selectedRegion`, which filters the `SupplierTable` to show only relevant suppliers.



\## 4. Component Architecture

The application will be structured into distinct, modular components.



\* `app/page.tsx`: The main server component that imports the client-side dashboard wrapper.

\* `components/DashboardProvider.tsx`: The React Context provider holding the interactive state.

\* `components/KPICards.tsx`: Renders top-level summary metrics (Global Risk Index, Active Alerts).

\* `components/GlobalRiskMap.tsx`: The `react-leaflet` implementation. Must dynamically load to avoid SSR issues with Leaflet (`next/dynamic` with `ssr: false`).

\* `components/CommodityChart.tsx`: A `recharts` line chart component featuring a time-range toggle group (1M, 3M, 1Y) and multiple data lines (Aluminum, Alumina, Bauxite).

\* `components/EventFeed.tsx`: A scrollable list of recent simulated events. Items are clickable to trigger the `activeEvent` state.

\* `components/SupplierTable.tsx`: A data grid listing suppliers, their risk scores, and locations. Features conditional formatting (Red/Yellow/Green text) based on risk.



\## 5. UI/UX Design Guidelines

\* \*\*Theme:\*\* Strict Dark Mode.

\* \*\*Background:\*\* `#0f172a` (Slate-900).

\* \*\*Cards/Panels:\*\* `#1e293b` (Slate-800) with subtle borders `#334155` (Slate-700).

\* \*\*Text:\*\* `#f8fafc` (Slate-50) for primary, `#94a3b8` (Slate-400) for secondary.

\* \*\*Accents:\*\* \* Primary (Brand/Links): `#3b82f6` (Blue-500)

&nbsp;   \* Critical Alert (Disruptions): `#ef4444` (Red-500)

&nbsp;   \* Warning (Elevated Risk): `#eab308` (Yellow-500)

&nbsp;   \* Normal/Stable: `#22c55e` (Green-500)



\## 6. Implementation Steps for the Agent

1\.  \*\*Scaffold Project:\*\* Initialize Next.js with Tailwind CSS. Install dependencies (`recharts`, `leaflet`, `react-leaflet`, `lucide-react`).

2\.  \*\*Define Types \& Context:\*\* Create TypeScript interfaces for the data models and set up the `DashboardContext`.

3\.  \*\*Create Data Files:\*\* Populate the `/data` directory with the simulated JSON files covering a 1-year horizon.

4\.  \*\*Build Core Layout:\*\* Create the CSS grid layout in `app/page.tsx` dividing the screen into the top KPI bar, main map area, side event feed, bottom charts, and supplier table.

5\.  \*\*Implement Map:\*\* Build the dynamic Leaflet component with custom marker icons for mines, ports, and refineries.

6\.  \*\*Implement Charts:\*\* Build the Recharts component with the time-slicing logic.

7\.  \*\*Implement Feed \& Table:\*\* Build the list and table components, ensuring they consume the global state for filtering.

8\.  \*\*Refine \& Polish:\*\* Apply final Tailwind utility classes for padding, typography, hover states, and scrollbar styling to ensure a premium enterprise look.

