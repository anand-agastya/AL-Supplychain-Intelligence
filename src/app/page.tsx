import React from "react";
import { DashboardProvider } from "../../context/DashboardContext";
import KPICards from "../../components/KPICards";
import SupplierTable from "../../components/SupplierTable";
import EventFeed from "../../components/EventFeed";
import CommodityChart from "../../components/CommodityChart";
import MapWrapper from "../../components/MapWrapper";
import SlideOutDrawer from "../../components/SlideOutDrawer";
import AlertsDrawer from "../../components/drawers/AlertsDrawer";
import LogisticsDrawer from "../../components/drawers/LogisticsDrawer";
import MarketDrawer from "../../components/drawers/MarketDrawer";

export default function Home() {
  return (
    <DashboardProvider>
      <main className="min-h-screen bg-slate-900 text-slate-50 font-sans flex flex-col h-screen overflow-hidden">
        {/* Top Navigation / Header */}
        <header className="flex-none p-4 border-b border-slate-800 bg-slate-900 z-10">
          <h1 className="text-xl font-bold tracking-tight text-white flex items-baseline gap-2">
            <span className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-sm self-center">AL</span>
            <span>Enterprise Procurement Radar: Aluminum</span>
            <span className="text-sm font-normal text-slate-400 ml-2">- powered by AuGENT</span>
          </h1>
        </header>

        {/* Global KPIs Container */}
        <div className="flex-none z-10">
          <KPICards />
        </div>

        {/* Main Application Grid */}
        <div className="flex-1 p-4 pb-4 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">

            {/* Center/Left Content: Map and Charts */}
            <div className="col-span-1 lg:col-span-8 flex flex-col gap-4 h-full min-h-0">
              {/* Map */}
              <div className="flex-1 min-h-[300px]">
                <MapWrapper />
              </div>

              {/* Chart */}
              <div className="h-72 shrink-0">
                <CommodityChart />
              </div>
            </div>

            {/* Right Side Bar: Feed and Tables */}
            <div className="col-span-1 lg:col-span-4 flex flex-col gap-4 h-full min-h-0">
              {/* Event Feed */}
              <div className="flex-1 min-h-[300px]">
                <EventFeed />
              </div>

              {/* Supplier Table */}
              <div className="flex-1 min-h-[300px]">
                <SupplierTable />
              </div>
            </div>

          </div>
        </div>

        {/* Drawers */}
        <SlideOutDrawer title="Risk Analysis" drawerId="risk">
          <p className="text-slate-400">Advanced risk models computing... (Future Phase)</p>
        </SlideOutDrawer>
        <SlideOutDrawer title="Triage Inbox" drawerId="alerts">
          <AlertsDrawer />
        </SlideOutDrawer>
        <SlideOutDrawer title="Market Analytics" drawerId="market">
          <MarketDrawer />
        </SlideOutDrawer>
        <SlideOutDrawer title="Maritime Logistics" drawerId="logistics">
          <LogisticsDrawer />
        </SlideOutDrawer>

      </main>
    </DashboardProvider>
  );
}
