"use client";

import dynamic from 'next/dynamic';

// Next.js static rendering throws errors when Leaflet tries to access `window`.
// This dynamic import forces the Map to only render on the client-side.
const GlobalRiskMap = dynamic(
    () => import('./GlobalRiskMap'),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-full bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full border-4 border-slate-600 border-t-blue-500 animate-spin mb-4"></div>
                    <p className="text-slate-500 font-medium">Loading Global Logistics Map...</p>
                </div>
            </div>
        )
    }
);

export default GlobalRiskMap;
