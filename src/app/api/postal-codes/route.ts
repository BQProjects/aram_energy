import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get("q")?.trim() || "";
  if (!search) return NextResponse.json([]);

  const client = await clientPromise;
  const db = client.db("germany_data");
  const collection = db.collection("postal_codes");

  // Find postal codes that start with the search string (case-insensitive)
  const results = await collection
    .find({ PLZ: { $regex: `^${search}`, $options: "i" } })
    .limit(10)
    .toArray();

  // Return only PLZ and Ort (city)
  // Return PLZ, Ort (city), and Kreis (district)
  return NextResponse.json(
    results.map((r) => ({
      plz: r.PLZ,
      division: r.Bundesland || "",
      district: r.Kreis || "",
      type: r.Typ || "",
    }))
  );
}
