import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

// Types
interface Tariff {
  Service: string;
  Grundpreis: string;
  Arbeitspreis: string;
}

interface TariffData {
  _id: ObjectId;
  PLZ: string;
  Bundesland: string;
  Kreis: string;
  Typ: string;
  Tariffs: Tariff[];
}

// MongoDB connection
const client = await clientPromise;
const db = client.db("germany_data");

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const plz = searchParams.get("plz");
    const type = searchParams.get("type"); // 'electricity' or 'gas'
    const consumption = searchParams.get("consumption"); // annual consumption in kWh
    const customerType = searchParams.get("customerType"); // 'private' or 'company'

    if (!plz) {
      return NextResponse.json({ error: "PLZ is required" }, { status: 400 });
    }
    const collection = db.collection<TariffData>("energy_tariffs");

    // Find tariffs for the postal code
    const tariffData = await collection.findOne({ PLZ: plz });

    if (!tariffData) {
      return NextResponse.json(
        { error: "No tariffs found for this postal code" },
        { status: 404 }
      );
    }

    // Filter tariffs based on type (electricity/gas) and customer type
    const filteredTariffs = tariffData.Tariffs.filter((tariff: Tariff) => {
      // First filter by energy type
      let typeMatch = true;
      if (type === "electricity") {
        typeMatch =
          tariff.Service.toLowerCase().includes("strom") ||
          tariff.Service.toLowerCase().includes("electricity");
      } else if (type === "gas") {
        typeMatch =
          tariff.Service.toLowerCase().includes("gas") ||
          tariff.Service.toLowerCase().includes("erdgas");
      }

      // Then filter by customer type
      let customerMatch = true;
      if (customerType === "private") {
        // For private customers, exclude SWDU Energie tariffs
        customerMatch = !tariff.Service.toLowerCase().includes("swdu");
      } else if (customerType === "company") {
        // For company customers, exclude R(H)EINPOWER tariffs
        customerMatch = !tariff.Service.toLowerCase().includes("r(h)einpower");
      }

      return typeMatch && customerMatch;
    });

    // Calculate prices if consumption is provided
    const tariffsWithCalculation = filteredTariffs.map((tariff: Tariff) => {
      const basePrice = parseFloat(tariff.Grundpreis);
      const laborPricePerKwh = parseFloat(tariff.Arbeitspreis) / 100; // Convert cents to euros
      const annualConsumption = consumption ? parseFloat(consumption) : 0;

      const laborCost = laborPricePerKwh * annualConsumption;
      const totalYearlyCost = basePrice + laborCost;

      return {
        id: tariff.Service.replace(/\s+/g, "_").toLowerCase(), // Use service name as stable ID
        name: tariff.Service,
        basePrice: `${basePrice.toFixed(2)} EUR/year`,
        laborPrice: `${(laborPricePerKwh * 100).toFixed(2)} cents/kWh`,
        typeOfCurrent:
          type === "electricity" ? "Standard electricity" : "Standard gas",
        contractTerm: "24 months",
        priceGuarantee: "24 months",
        downPayment: "Monthly installments",
        total: `${totalYearlyCost.toFixed(2)} EUR/year`,
        // Raw values for calculation
        basePriceValue: basePrice,
        laborPriceValue: laborPricePerKwh,
        totalValue: totalYearlyCost,
      };
    });

    return NextResponse.json({
      tariffs: tariffsWithCalculation,
      location: {
        plz: tariffData.PLZ,
        state: tariffData.Bundesland,
        district: tariffData.Kreis,
      },
    });
  } catch (error) {
    console.error("Error fetching tariffs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
