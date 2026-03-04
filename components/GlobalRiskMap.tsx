"use client";

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useDashboard } from '../context/DashboardContext';
import suppliersData from '../data/suppliers.json';
import routesData from '../data/shipping_routes.json';
import { Supplier, ShippingRoute } from '../types';

// Leaflet marker icons are bugged in Next.js out of the box without this fix
const iconDefault = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});

// Custom icons based on status
const createIcon = (color: string) => {
    return L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.5);"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
    });
};

const iconNormal = createIcon('#22c55e'); // green
const iconWarning = createIcon('#eab308'); // yellow
const iconCritical = createIcon('#ef4444'); // red

const getStatusIcon = (status: Supplier['status']) => {
    if (status === 'Normal') return iconNormal;
    if (status === 'At Risk') return iconWarning;
    return iconCritical;
};

const getRouteColor = (status: ShippingRoute['status']) => {
    if (status === 'Clear') return '#3b82f6'; // blue
    if (status === 'Congested') return '#eab308'; // yellow
    return '#ef4444'; // red
};

// Component to handle flying to active events
function MapController() {
    const { activeEvent } = useDashboard();
    const map = useMap();

    useEffect(() => {
        if (activeEvent?.coordinates) {
            map.flyTo([activeEvent.coordinates[0], activeEvent.coordinates[1]], 6, {
                duration: 2
            });
        }
    }, [activeEvent, map]);

    return null;
}

export default function GlobalRiskMap() {
    const { setSelectedRegion, activeEvent, highlightedSupplierIds, highlightedRouteId } = useDashboard();
    const suppliers = suppliersData as Supplier[];
    const routes = routesData as ShippingRoute[];

    const initialCenter: [number, number] = [20, 0];
    const initialZoom = 2;

    return (
        <div className="w-full h-full bg-slate-800 border border-slate-700 rounded-lg overflow-hidden relative z-0">
            <MapContainer
                center={initialCenter}
                zoom={initialZoom}
                style={{ height: '100%', width: '100%', background: '#0f172a' }}
                zoomControl={false}
            >
                {/* CartoDB Dark Matter Base Map for Enterprise Analytics Look */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                <MapController />

                {/* Render Routes */}
                {routes.map((route) => {
                    const isHighlighted = route.id === highlightedRouteId;
                    return (
                        <Polyline
                            key={route.id}
                            positions={route.path}
                            color={isHighlighted ? '#f8fafc' : getRouteColor(route.status)}
                            weight={isHighlighted ? 6 : (route.status === 'Clear' ? 2 : 4)}
                            dashArray={route.status === 'Congested' ? '5, 10' : undefined}
                            opacity={isHighlighted ? 0.9 : 0.6}
                        >
                            <Popup className="dark-popup">
                                <div className="p-1">
                                    <p className="font-bold text-slate-800">{route.name}</p>
                                    <p className="text-sm">Status: {route.status}</p>
                                </div>
                            </Popup>
                        </Polyline>
                    );
                })}

                {/* Render Suppliers */}
                {suppliers.map((supplier) => {
                    const isHighlighted = highlightedSupplierIds.includes(supplier.id);

                    // If highlighted, wrap the normal icon logic with an extra pulsing div using L.divIcon
                    let iconToUse = getStatusIcon(supplier.status);
                    if (isHighlighted) {
                        iconToUse = L.divIcon({
                            className: 'custom-div-icon highlighted-supplier',
                            html: `
                              <div style="position: relative;">
                                <div class="absolute -inset-2 rounded-full border-2 border-slate-50 border-dashed animate-pulse" style="z-index: 0"></div>
                                <div style="background-color: ${supplier.status === 'Normal' ? '#22c55e' :
                                    supplier.status === 'At Risk' ? '#eab308' : '#ef4444'
                                }; width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 8px white; position: relative; z-index: 10;"></div>
                              </div>
                            `,
                            iconSize: [20, 20],
                            iconAnchor: [10, 10],
                        });
                    }

                    return (
                        <Marker
                            key={supplier.id}
                            position={supplier.coordinates}
                            icon={iconToUse}
                            zIndexOffset={isHighlighted ? 1000 : 0}
                            eventHandlers={{
                                click: () => {
                                    setSelectedRegion(supplier.region);
                                }
                            }}
                        >
                            <Popup>
                                <div className="p-1">
                                    <p className="font-bold text-slate-800">{supplier.name}</p>
                                    <p className="text-sm">Type: {supplier.type}</p>
                                    <p className="text-sm">Risk Score: {supplier.riskScore}</p>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}

                {/* Render Active Event Pulse if exists */}
                {activeEvent && (
                    <Marker
                        position={activeEvent.coordinates as [number, number]}
                        icon={L.divIcon({
                            className: 'event-pulse fade-in',
                            html: `<div class="w-8 h-8 rounded-full border-2 border-red-500 bg-red-500/30 animate-ping"></div>`,
                            iconSize: [32, 32],
                            iconAnchor: [16, 16],
                        })}
                    />
                )}
            </MapContainer>
        </div>
    );
}
