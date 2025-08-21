import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, ...sessionData } = body;
    if (!sessionId)
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    const client = await clientPromise;
    const db = client.db();
    await db
      .collection("sessions")
      .updateOne(
        { _id: sessionId },
        { $set: { ...sessionData, updatedAt: new Date() } },
        { upsert: true }
      );
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to save session" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");
    if (!sessionId)
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    const client = await clientPromise;
    const db = client.db();
    const { ObjectId } = await import("mongodb");
    const session = await db.collection("sessions").findOne({ _id: new ObjectId(sessionId) });
    return NextResponse.json({ session });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch session" },
      { status: 500 }
    );
  }
}
