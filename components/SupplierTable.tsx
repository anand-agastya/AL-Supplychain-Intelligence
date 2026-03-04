"use client";

import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import suppliersData from '../data/suppliers.json';
import { Supplier } from '../types';

export default function SupplierTable() {
    const { selectedRegion } = useDashboard();
    const suppliers = suppliersData as Supplier[];

    const filteredSuppliers = selectedRegion
        ? suppliers.filter(s => s.region === selectedRegion)
        : suppliers;

    const getStatusColor = (status: Supplier['status']) => {
        switch (status) {
            case 'Normal': return 'text-green-500';
            case 'At Risk': return 'text-yellow-500';
            case 'Disrupted': return 'text-red-500';
            default: return 'text-slate-400';
        }
    };

    const getRiskColor = (score: number) => {
        if (score < 40) return 'text-green-500';
        if (score < 70) return 'text-yellow-500';
        return 'text-red-500';
    };

    return (
        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden flex flex-col h-full">
            <div className="p-4 border-b border-slate-700 bg-slate-800/80">
                <h2 className="text-lg font-semibold text-slate-50">Supplier Status</h2>
                <p className="text-sm text-slate-400">
                    {selectedRegion ? `Filtered by ${selectedRegion}` : 'Global Overview'}
                </p>
            </div>
            <div className="overflow-auto flex-1 min-h-0">
                <table className="w-full text-left text-sm text-slate-300">
                    <thead className="text-xs text-slate-400 uppercase bg-slate-900/50 sticky top-0">
                        <tr>
                            <th className="px-4 py-3 font-medium">Name</th>
                            <th className="px-4 py-3 font-medium">Type</th>
                            <th className="px-4 py-3 font-medium">Region</th>
                            <th className="px-4 py-3 font-medium">Risk Score</th>
                            <th className="px-4 py-3 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSuppliers.map((supplier) => (
                            <tr key={supplier.id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                                <td className="px-4 py-3 font-medium text-slate-200">{supplier.name}</td>
                                <td className="px-4 py-3">{supplier.type}</td>
                                <td className="px-4 py-3">{supplier.region}</td>
                                <td className={`px-4 py-3 font-bold ${getRiskColor(supplier.riskScore)}`}>
                                    {supplier.riskScore}
                                </td>
                                <td className={`px-4 py-3 font-semibold ${getStatusColor(supplier.status)}`}>
                                    {supplier.status}
                                </td>
                            </tr>
                        ))}
                        {filteredSuppliers.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                                    No suppliers found for this region.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
