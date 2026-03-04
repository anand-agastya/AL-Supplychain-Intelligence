import json
import random
from datetime import datetime, timedelta

def load_json(filepath):
    with open(filepath, 'r') as f:
        return json.load(f)

# Mock generation code
def generate_phase5_data():
    suppliers = load_json('data/suppliers.json')
    routes = load_json('data/shipping_routes.json')
    
    supplier_ids = [s['id'] for s in suppliers]
    route_ids = [r['id'] for r in routes]
    materials = ['Bauxite', 'Alumina', 'Aluminum Ingot', 'Aluminum Billet']
    statuses = ['In Transit', 'Delayed', 'Processing']

    # Generate internal orders
    orders = []
    
    for i in range(25):
        order = {
            "po_id": f"PO-{1000 + i}",
            "supplier_id": random.choice(supplier_ids),
            "material": random.choice(materials),
            "eta": (datetime.now() + timedelta(days=random.randint(2, 30))).strftime("%Y-%m-%d"),
            "status": random.choice(statuses),
            "route_id": random.choice(route_ids)
        }
        orders.append(order)

    with open('data/internal_orders.json', 'w') as f:
        json.dump(orders, f, indent=2)

    # Generate macro data matching the 1-year timeline (say, ending at today)
    macro_data = []
    current_date = datetime.now() - timedelta(days=365)
    
    lme_inv = 500000
    energy_idx = 100.0

    while current_date <= datetime.now():
        macro_data.append({
            "date": current_date.strftime("%Y-%m-%d"),
            "lme_inventory": lme_inv,
            "energy_index": round(energy_idx, 2)
        })
        lme_inv += int(random.gauss(0, 5000))
        # Keep inventory positive
        lme_inv = max(200000, lme_inv)
        energy_idx += random.gauss(0.1, 1.5)
        current_date += timedelta(days=1)

    with open('data/macro_data.json', 'w') as f:
        json.dump(macro_data, f, indent=2)

if __name__ == "__main__":
    generate_phase5_data()
    print("Generated phase 5 mock data successfully.")
