import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const client = await clientPromise;
    const db = client.db();
    const result = await db
      .collection("bookings")
      .insertOne({ ...data, createdAt: new Date() });
    return NextResponse.json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to save booking" },
      { status: 500 }
    );
  }
}
