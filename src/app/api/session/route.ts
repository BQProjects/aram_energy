import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, _id, ...sessionData } = body;

    // Use either _id or sessionId as the document identifier
    const documentId = _id || sessionId;

    if (!documentId) {
      return NextResponse.json(
        { error: "Missing session identifier" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    let objectId: ObjectId;
    try {
      objectId = new ObjectId(documentId);
    } catch {
      return NextResponse.json(
        { error: "Invalid ObjectId format" },
        { status: 400 }
      );
    }

    const updateData = {
      ...sessionData,
      _id: objectId,
      sessionId: documentId,
      updatedAt: new Date(),
    };

    const result = await db
      .collection("sessions")
      .updateOne({ _id: objectId }, { $set: updateData }, { upsert: true });

    return NextResponse.json({
      success: true,
      _id: documentId,
      upserted: result.upsertedCount > 0,
    });
  } catch (error) {
    console.error("Session save error:", error);
    return NextResponse.json(
      { error: "Failed to save session" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("id") || searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    let objectId: ObjectId;
    try {
      objectId = new ObjectId(sessionId);
    } catch {
      return NextResponse.json(
        { error: "Invalid ObjectId format" },
        { status: 400 }
      );
    }

    const session = await db.collection("sessions").findOne({ _id: objectId });

    if (!session) {
      return NextResponse.json({ session: null });
    }

    return NextResponse.json({ session });
  } catch (error) {
    console.error("Session fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch session" },
      { status: 500 }
    );
  }
}
