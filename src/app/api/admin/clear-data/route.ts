import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { verifyAdminAccess } from "@/lib/adminAuth";

export async function POST(request: NextRequest) {
  // Verify admin access
  const authResult = await verifyAdminAccess(request);
  if (!authResult.authorized) {
    return authResult.response!;
  }

  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();

    // Clear all collections (except admin_users)
    const collections = ["sessions"];

    for (const collectionName of collections) {
      try {
        await db.collection(collectionName).deleteMany({});
      } catch (error) {
        console.error(`Error clearing collection ${collectionName}:`, error);
      }
    }

    return NextResponse.json({
      success: true,
      message: "All data cleared successfully",
    });
  } catch (error) {
    console.error("Clear data API error:", error);
    return NextResponse.json(
      { error: "Failed to clear data" },
      { status: 500 }
    );
  }
}
