# Enterprise Procurement Radar: Aluminum

## Powered by Augent

This project is a high-fidelity, interactive Market Intelligence Dashboard engineered specifically for enterprise supply chain visibility. It is designed to act as a **Command Center** for procurement teams, logistics coordinators, and operational risk managers monitoring the global aluminum supply chain ecosystem.

## Target Audience
- **Procurement Managers:** To monitor live commodity charts (Alumina, Bauxite, Aluminum), track macro inventory levels, and assess price volatility impacts.
- **Supply Chain & Logistics Leaders:** To visualize maritime shipping routes globally, identifying bottlenecks, tracking Purchase Orders, and monitoring ETA statuses.
- **Risk Analysts:** To be alerted to geopolitical events, labor strikes, and climate impacts, immediately triaging those events against their geolocated supplier base.

---

## Features

*   **Global Risk Map:** Built on React-Leaflet with a CartoDB Dark Matter tile set. Renders pulsing supply node markers and shipping polylines.
*   **Slide-out Context Drawers:** Interactive "drill-down" panels triggered from top-level KPI cards, offering detailed triage inboxes, market analytics, and logistics breakdowns.
*   **Relational Interactivity:** Map objects react dynamically in real-time when users select routes or events from the side panels.
*   **Enterprise Design System:** Built on Tailwind CSS, enforcing a strict dark-mode aesthetic utilizing deep slate palettes (`bg-slate-900`, `border-slate-700`).

---

## Project Structure

The codebase is built on **Next.js (App Router)** and architected for modularity and strict typings:

```text
AL-Supplychain-Intelligence/
├── components/          # Reusable UI components
│   ├── drawers/         # Slide-out interactive drawer panels
│   ├── CommodityChart.tsx # Recharts composed price/inventory charts
│   ├── EventFeed.tsx    # Live scrolling triage feed
│   ├── GlobalRiskMap.tsx  # Core React-Leaflet map logic
│   ├── KPICards.tsx     # Top level summary indicators
│   ├── MapWrapper.tsx   # Dynamic import boundary for SSR Map loading
│   ├── SlideOutDrawer.tsx # Base drawer logic and animations
│   └── SupplierTable.tsx  # Filterable grid
├── context/
│   └── DashboardContext.tsx # Centralized React Context (Selected Regions, Highlight States)
├── data/                # Mock JSON data driving the dashboard
│   ├── commodity_prices.json
│   ├── events.json
│   ├── internal_orders.json
│   ├── macro_data.json
│   ├── shipping_routes.json
│   └── suppliers.json
├── src/app/             # Next.js App Router root
│   ├── globals.css      # Core Tailwind and custom Leaflet CSS rules
│   ├── layout.tsx
│   └── page.tsx         # Main dashboard layout grid
├── types/               # TypeScript models (Supplier, Event, PurchaseOrder, etc.)
└── UnitTests/           # Jest testing suites
```

---

## Development & Usage

### Running Locally

Ensure you have Node.js installed, then follow these steps:

1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Start the Development Server:**
    ```bash
    npm run dev
    ```
3.  **View the Dashboard:**
    Open [http://localhost:3000](http://localhost:3000) in your web browser.

### Running Tests
The project features a comprehensive Jest testing suite covering the Context API, data schemas, and UI components.
```bash
npx jest
```

---

## Deployment to Vercel

This repository is optimized for zero-configuration deployment to [Vercel](https://vercel.com).

1.  **Push to GitHub:** Ensure your latest commits are pushed to your GitHub repository.
2.  **Import to Vercel:** Log in to your Vercel account, click "Add New Project", and import this repository.
3.  **Build Settings:** Vercel will auto-detect Next.js. The default build command (`npm run build`) and output directory (`.next`) will work perfectly.
4.  **Deploy:** Click "Deploy". Within minutes, your interactive dashboard will be live online.
