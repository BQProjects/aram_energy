/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();


    // Fetch all contact messages, sorted by newest first
    const contactMessages = await db.collection("contactMessages")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    // Return the data
    return NextResponse.json(contactMessages);
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact messages" },
      { status: 500 }
    );
  }
}
