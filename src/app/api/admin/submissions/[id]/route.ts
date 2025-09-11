import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { verifyAdminAccess } from "@/lib/adminAuth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Verify admin access
  const authResult = await verifyAdminAccess(request);
  if (!authResult.authorized) {
    return authResult.response!;
  }

  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();

    const { id } = await params;

    // Fetch the specific submission
    const submission = await db
      .collection("submissions")
      .findOne({ _id: new ObjectId(id) });

    if (!submission) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(submission);
  } catch (error) {
    console.error("Error fetching submission:", error);
    return NextResponse.json(
      { error: "Failed to fetch submission" },
      { status: 500 }
    );
  }
}
