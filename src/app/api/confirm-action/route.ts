import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  const action = url.searchParams.get("action");
  if (!id || !action || !["accept", "decline"].includes(action)) {
    return NextResponse.json(
      { message: "Invalid confirmation link." },
      { status: 400 }
    );
  }
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("submissions");
    const submission = await collection.findOne({ _id: new ObjectId(id) });
    if (!submission) {
      return NextResponse.json(
        { message: "Submission not found." },
        { status: 404 }
      );
    }
    if (submission.confirmation !== "pending") {
      return NextResponse.json(
        {
          error:
            "This submission has already been processed. Please submit the form again if needed.",
        },
        { status: 400 }
      );
    }
    const newStatus = action === "accept" ? "confirmed" : "declined";
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { confirmation: newStatus, confirmationAt: new Date() } }
    );
    return NextResponse.json({ message: `Submission has been ${newStatus}.` });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred." },
      { status: 500 }
    );
  }
}
