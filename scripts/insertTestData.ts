import { MongoClient } from "mongodb";

// Test data for multiple postal codes
const testData = [
  {
    PLZ: "33098",
    Bundesland: "Nordrhein-Westfalen",
    Kreis: "Paderborn",
    Typ: "Kreis",
    Tariffs: [
      {
        Service: "R(H)EINPOWER Strom Direkt",
        Grundpreis: "249.7",
        Arbeitspreis: "31.98",
      },
      {
        Service: "R(H)EINPOWER MeinStrom Wärmepumpe 24",
        Grundpreis: "99.82",
        Arbeitspreis: "27.57",
      },
      {
        Service: "R(H)EINPOWER Erdgas direkt",
        Grundpreis: "189.85",
        Arbeitspreis: "10.61",
      },
      {
        Service: "SWDU Energie Service Pool Strom",
        Grundpreis: "189.33",
        Arbeitspreis: "26.76",
      },
      {
        Service: "SWDU Energie Service Pool Gas",
        Grundpreis: "130.04",
        Arbeitspreis: "8.92",
      },
    ],
  },
  {
    PLZ: "33602",
    Bundesland: "Nordrhein-Westfalen",
    Kreis: "Bielefeld",
    Typ: "Kreis",
    Tariffs: [
      {
        Service: "R(H)EINPOWER Strom Direkt",
        Grundpreis: "245.5",
        Arbeitspreis: "32.15",
      },
      {
        Service: "R(H)EINPOWER MeinStrom Wärmepumpe 24",
        Grundpreis: "95.60",
        Arbeitspreis: "27.80",
      },
      {
        Service: "R(H)EINPOWER Erdgas direkt",
        Grundpreis: "185.40",
        Arbeitspreis: "10.45",
      },
    ],
  },
  {
    PLZ: "58739",
    Bundesland: "Nordrhein-Westfalen",
    Kreis: "Soest",
    Typ: "Kreis",
    Tariffs: [
      {
        Service: "R(H)EINPOWER Strom Direkt",
        Grundpreis: "248.5",
        Arbeitspreis: "32.10",
      },
      {
        Service: "R(H)EINPOWER MeinStrom Wärmepumpe 24",
        Grundpreis: "97.50",
        Arbeitspreis: "27.65",
      },
      {
        Service: "R(H)EINPOWER Erdgas direkt",
        Grundpreis: "187.30",
        Arbeitspreis: "10.55",
      },
      {
        Service: "SWDU Energie Service Pool Strom",
        Grundpreis: "191.20",
        Arbeitspreis: "26.85",
      },
      {
        Service: "SWDU Energie Service Pool Gas",
        Grundpreis: "132.15",
        Arbeitspreis: "8.98",
      },
    ],
  },
];

async function insertTestData() {
  const uri =
    process.env.MONGODB_URI ||
    "mongodb+srv://jashkumardev:Xz38x9eSsYJcvQli@cluster0.vsnsmiy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("aram-energy");
    const collection = db.collection("tariffs");

    // Clear existing test data
    await collection.deleteMany({
      PLZ: { $in: ["33098", "33602", "59065", "58739"] },
    });

    // Insert test data
    await collection.insertMany(testData);

    console.log(
      `✅ Inserted ${testData.length} test postal code records with tariff data`
    );
  } catch (error) {
    console.error("❌ Error inserting test data:", error);
  } finally {
    await client.close();
  }
}

insertTestData();
