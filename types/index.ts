export interface CommodityPrice {
    date: string;
    aluminum: number;
    alumina: number;
    bauxite: number;
}

export interface SupplyChainEvent {
    id: string;
    title: string;
    description: string;
    date: string;
    severity: 'Critical' | 'Warning' | 'Info';
    category: 'Disruption' | 'Price Spike' | 'Geopolitical';
    coordinates: [number, number];
    affectedSuppliers: string[];
}

export interface Supplier {
    id: string;
    name: string;
    region: string;
    riskScore: number; // 0-100
    type: 'Mine' | 'Refinery' | 'Port';
    coordinates: [number, number];
    status: 'Normal' | 'At Risk' | 'Disrupted';
}

export interface ShippingRoute {
    id: string;
    name: string;
    path: [number, number][]; // Array of LatLng coordinates
    status: 'Clear' | 'Congested' | 'Blocked' | 'Disrupted' | 'Delayed';
}

export interface PurchaseOrder {
    po_id: string;
    supplier_id: string;
    material: string;
    eta: string;
    status: 'In Transit' | 'Delayed' | 'Processing';
    route_id: string;
}

export interface MacroIndicator {
    date: string;
    lme_inventory: number;
    energy_index: number;
}
