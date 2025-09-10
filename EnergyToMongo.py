import pandas as pd
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb+srv://jashkumardev.........")
db = client["germany_data"]
collection = db["energy_tariffs"]

# === Read Excel (all columns as string) ===
df = pd.read_excel(
    "Liste-der-PLZ-in-Excel-Karte-Deutschland-Postleitzahlen(1).xlsx",
    header=3,  # Headers are in row 4 (0-indexed as 3)
    dtype=str
)

# === Clean column names ===
df.columns = [col.strip().replace(" ", "_").replace("(", "").replace(")", "").replace("-", "_") for col in df.columns]

# === Remove empty rows and trim spaces ===
df = df.dropna(how="all")
df = df.fillna("").map(lambda x: x.strip() if isinstance(x, str) else x)

# === Filter only Nordrhein-Westfalen ===
df = df[df["Bundesland"] == "Nordrhein-Westfalen"]

# === Filter specific Kreise ===
df = df[df["Kreis"].isin(["Bielefeld", "Gütersloh", "Paderborn", "Soest"])]

# === Transform data into nested structure ===
# Group by PLZ, Bundesland, Kreis, Typ
grouped_data = []
for _, row in df.iterrows():
    # Check if we already have this PLZ in our data
    found = False
    for item in grouped_data:
        if item['PLZ'] == row['PLZ']:
            found = True
            break
    
    # If not found, create a new entry
    if not found:
        new_entry = {
            'PLZ': row['PLZ'],
            'Bundesland': row['Bundesland'],
            'Kreis': row['Kreis'],
            'Typ': row['Typ'],
            'Tariffs': []
        }
        
        # Add tariff data for R(H)EINPOWER Strom Direkt
        tariff1 = {
            'Service': 'R(H)EINPOWER Strom Direkt',
            'Grundpreis': row['Grundpreis'],
            'Arbeitspreis': row['Arbeitspreis'],
        }
        new_entry['Tariffs'].append(tariff1)
        
        # Add tariff data for R(H)EINPOWER MeinStrom Wärmepumpe 24
        tariff2 = {
            'Service': 'R(H)EINPOWER MeinStrom Wärmepumpe 24',
            'Grundpreis': row['Grundpreis.1'],
            'Arbeitspreis': row['Arbeitspreis.1'],
        }
        new_entry['Tariffs'].append(tariff2)
        
        # Add tariff data for R(H)EINPOWER Erdgas direkt
        tariff3 = {
            'Service': 'R(H)EINPOWER Erdgas direkt',
            'Grundpreis': row['Grundpreis.2'],
            'Arbeitspreis': row['Arbeitspreis.2'],
        }
        new_entry['Tariffs'].append(tariff3)
        
        # Add tariff data for SWDU Energie Service Pool Strom
        tariff4 = {
            'Service': 'SWDU Energie Service Pool Strom',
            'Grundpreis': row['Grundpreis.3'],
            'Arbeitspreis': row['Arbeitspreis.3'],
        }
        new_entry['Tariffs'].append(tariff4)
        
        # Add tariff data for SWDU Energie Service Pool Gas
        tariff5 = {
            'Service': 'SWDU Energie Service Pool Gas',
            'Grundpreis': row['Grundpreis.4'],
            'Arbeitspreis': row['Arbeitspreis.4'],
        }
        new_entry['Tariffs'].append(tariff5)
        
        grouped_data.append(new_entry)

# === Optional: Clear old data ===
collection.delete_many({})

# === Insert into MongoDB ===
if grouped_data:
    collection.insert_many(grouped_data)
    print(f"✅ Inserted {len(grouped_data)} energy tariff records with nested tariff data for Bielefeld, Gütersloh, Paderborn, Soest in Nordrhein-Westfalen into MongoDB.")
else:
    print("❌ No data to insert. Check your filters or Excel file structure.")
