import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { verifyAdminAccess } from "@/lib/adminAuth";

export async function GET(request: NextRequest) {
  // Verify admin access
  const authResult = await verifyAdminAccess(request);
  if (!authResult.authorized) {
    return authResult.response!;
  }

  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();

    // Fetch submissions from test.submissions collection
    const submissions = await db
      .collection("submissions")
      .find({})
      .sort({ submittedAt: -1 })
      .toArray();

    return NextResponse.json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch submissions" },
      { status: 500 }
    );
  }
}
