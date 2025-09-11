import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { verifyAdminAccess } from "@/lib/adminAuth";

// Simplified interface - only fields used in dashboard
interface DashboardSubmission {
  _id: string;
  personalDetails: {
    name: string;
    email?: string;
    phone?: string;
  };
  selectedTariff?: {
    selectedTariffData?: {
      name: string;
    };
  };
}

export async function GET(request: NextRequest) {

  // Verify admin access using httpOnly cookies
  const authResult = await verifyAdminAccess(request);
  if (!authResult.authorized) {
    return authResult.response!;
  }

  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();

    // Get stats with error handling
    let totalTariffs = 0;
    let totalSubmissions = 0;
    let recentSubmissions: DashboardSubmission[] = [];

    try {
      totalTariffs = await db.collection("energy_tariffs").countDocuments();
    } catch (error) {
      console.log("Dashboard API: Error counting tariffs:", error);
      // Collection might not exist, that's okay
    }

    try {
      totalSubmissions = await db.collection("submissions").countDocuments();
    } catch (error) {
      console.log("Dashboard API: Error counting submissions:", error);
    }

    try {
      recentSubmissions = (await db
        .collection("submissions")
        .find({})
        .sort({ submittedAt: -1 })
        .limit(5)
        .toArray()) as unknown as DashboardSubmission[];
    } catch (error) {
      console.log("Dashboard API: Error fetching recent submissions:", error);
    }
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
