import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import clientPromise from "@/lib/mongodb";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";

interface Submission {
  _id: string;
  calculationTarif: {
    selected: string;
    customerType: string;
    postalCode: string;
    annualConsumption: string;
    postalOptions: unknown[];
  };
  personalDetails: {
    salutation: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    birthDate?: string;
  };
  selectedTariff: {
    selectedTariffId: number;
    selectedTariffData: {
      id: number;
      name: string;
      basePrice: string;
      laborPrice: string;
      typeOfCurrent: string;
      contractTerm: string;
      priceGuarantee: string;
      total: string;
    };
  };
  addressDetails: {
    billingStreet?: string;
    billingCity?: string;
    postalCode?: string;
    street?: string;
    houseNumber?: string;
    desiredStart?: string;
  };
  sepaForm: {
    iban: string;
    accountHolder: string;
    status: string;
  };
  emailConfirmed: boolean;
  submittedAt: { $date: { $numberLong: string } } | string;
  status: string;
  [key: string]: string | number | boolean | object | undefined;
}

export async function GET(request: NextRequest) {
  console.log("Dashboard API: Request received");
  try {
    // Verify authentication
    const authHeader = request.headers.get("authorization");
    console.log(
      "Dashboard API: Auth header:",
      authHeader ? "Present" : "Missing"
    );
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("Dashboard API: No valid auth header");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.substring(7); // Remove "Bearer " prefix
    console.log(
      "Dashboard API: Token extracted:",
      token ? "Present" : "Missing"
    );

    try {
      jwt.verify(token, JWT_SECRET);
      console.log("Dashboard API: Token verified successfully");
    } catch {
      console.log("Dashboard API: Token verification failed");
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Connect to MongoDB
    console.log("Dashboard API: Connecting to MongoDB...");
    const client = await clientPromise;
    console.log("Dashboard API: MongoDB connected");
    const db = client.db();

    // Get stats with error handling
    console.log("Dashboard API: Fetching stats...");
    let totalTariffs = 0;
    let totalSubmissions = 0;
    let recentSubmissions: Submission[] = [];

    try {
      totalTariffs = await db.collection("energy_tariffs").countDocuments();
      console.log("Dashboard API: Total tariffs:", totalTariffs);
    } catch (error) {
      console.log("Dashboard API: Error counting tariffs:", error);
      // Collection might not exist, that's okay
    }


    try {
      totalSubmissions = await db.collection("submissions").countDocuments();
      console.log("Dashboard API: Total submissions:", totalSubmissions);
    } catch (error) {
      console.log("Dashboard API: Error counting submissions:", error);
    }

    try {
      recentSubmissions = (await db
        .collection("submissions")
        .find({})
        .sort({ submittedAt: -1 })
        .limit(5)
        .toArray()) as unknown as Submission[];
      console.log(
        "Dashboard API: Recent submissions count:",
        recentSubmissions.length
      );
    } catch (error) {
      console.log("Dashboard API: Error fetching recent submissions:", error);
    }

    console.log("Dashboard API: Returning data");
    return NextResponse.json({
      totalTariffs,
      totalSubmissions,
      recentSubmissions,
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
