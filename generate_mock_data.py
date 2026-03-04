import json
import random
from datetime import datetime, timedelta
import os

os.makedirs('data', exist_ok=True)

# 1. Generate Commodity Prices (Daily for 1 Year)
prices = []
base_date = datetime.now() - timedelta(days=365)
current_al = 2400
current_alumina = 350
current_bauxite = 45

for i in range(365):
    date_str = (base_date + timedelta(days=i)).strftime('%Y-%m-%d')
    
    # Introduce some random walk volatility
    current_al += random.uniform(-20, 21)
    current_alumina += random.uniform(-5, 5.2)
    current_bauxite += random.uniform(-0.5, 0.5)
    
    prices.append({
        "date": date_str,
        "aluminum": round(current_al, 2),
        "alumina": round(current_alumina, 2),
        "bauxite": round(current_bauxite, 2)
    })

with open('data/commodity_prices.json', 'w') as f:
    json.dump(prices, f, indent=2)

# 2. Events
events = [
    {
        "id": "evt-001",
        "title": "Port Strike in Guinea",
        "description": "Major union workers on strike at Kamsar port, delaying bauxite shipments by an estimated 2 weeks.",
        "date": (datetime.now() - timedelta(days=2)).strftime('%Y-%m-%d'),
        "severity": "Critical",
        "category": "Disruption",
        "coordinates": [10.65, -14.61],
        "affectedSuppliers": ["sup-001"]
    },
    {
        "id": "evt-002",
        "title": "Energy Rationing in Sichuan",
        "description": "Local government announces new power rationing. Aluminum smelters asked to curtail capacity.",
        "date": (datetime.now() - timedelta(days=5)).strftime('%Y-%m-%d'),
        "severity": "Warning",
        "category": "Disruption",
        "coordinates": [30.65, 104.06],
        "affectedSuppliers": ["sup-003"]
    },
    {
        "id": "evt-003",
        "title": "Alumina Price Rally",
        "description": "Spot prices surge on supply fears following Australian refinery outage.",
        "date": (datetime.now() - timedelta(days=1)).strftime('%Y-%m-%d'),
        "severity": "Warning",
        "category": "Price Spike",
        "coordinates": [-32.20, 115.86],
        "affectedSuppliers": ["sup-002"]
    }
]

with open('data/events.json', 'w') as f:
    json.dump(events, f, indent=2)

# 3. Suppliers
suppliers = [
    {
        "id": "sup-001",
        "name": "CBG Bauxite Operations",
        "region": "Africa",
        "riskScore": 85,
        "type": "Mine",
        "coordinates": [10.95, -14.38],
        "status": "Disrupted"
    },
    {
        "id": "sup-002",
        "name": "Worsley Alumina Refinery",
        "region": "Oceania",
        "riskScore": 45,
        "type": "Refinery",
        "coordinates": [-33.24, 116.01],
        "status": "Normal"
    },
    {
        "id": "sup-003",
        "name": "Sichuan Chinalco Smelter",
        "region": "Asia",
        "riskScore": 68,
        "type": "Refinery",
        "coordinates": [30.55, 104.10],
        "status": "At Risk"
    },
    {
        "id": "sup-004",
        "name": "Alumar Smelter",
        "region": "South America",
        "riskScore": 25,
        "type": "Refinery",
        "coordinates": [-2.53, -44.30],
        "status": "Normal"
    }
]

with open('data/suppliers.json', 'w') as f:
    json.dump(suppliers, f, indent=2)

# 4. Shipping Routes
routes = [
    {
        "id": "rte-001",
        "name": "Guinea to China (Bauxite)",
        "path": [[10.65, -14.61], [-35.0, 20.0], [5.0, 100.0], [30.0, 120.0]],
        "status": "Congested"
    },
    {
        "id": "rte-002",
        "name": "Australia to Middle East (Alumina)",
        "path": [[-32.20, 115.86], [-10.0, 100.0], [15.0, 60.0], [25.0, 55.0]],
        "status": "Clear"
    }
]

with open('data/shipping_routes.json', 'w') as f:
    json.dump(routes, f, indent=2)

print("Mock data generated successfully!")
