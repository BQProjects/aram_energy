import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const token =
      request.cookies.get("adminToken")?.value ||
      request.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("germany_data");

    // Fetch all tariffs from energy_tariffs collection
    const tariffs = await db
      .collection("energy_tariffs")
      .find({})
      .sort({ name: 1 })
      .toArray();

    return NextResponse.json(tariffs);
  } catch (error) {
    console.error("Error fetching tariffs:", error);
    return NextResponse.json(
      { error: "Failed to fetch tariffs" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const token =
      request.cookies.get("adminToken")?.value ||
      request.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await request.json();
    const { PLZ, Bundesland, Kreis, Typ, Tariffs } = body;

    // Validate required fields
    if (!PLZ || !Bundesland || !Kreis || !Typ || !Tariffs) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("germany_data");

    // Insert new tariff
    const result = await db.collection("energy_tariffs").insertOne({
      PLZ,
      Bundesland,
      Kreis,
      Typ,
      Tariffs,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(
      { message: "Tariff created successfully", id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating tariff:", error);
    return NextResponse.json(
      { error: "Failed to create tariff" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Verify authentication
    const token =
      request.cookies.get("adminToken")?.value ||
      request.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await request.json();
    const { id, PLZ, Bundesland, Kreis, Typ, Tariffs } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("germany_data");

    // Update tariff
    const result = await db.collection("energy_tariffs").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          PLZ,
          Bundesland,
          Kreis,
          Typ,
          Tariffs,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Tariff not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Tariff updated successfully" });
  } catch (error) {
    console.error("Error updating tariff:", error);
    return NextResponse.json(
      { error: "Failed to update tariff" },
      { status: 500 }
    );
  }
}
