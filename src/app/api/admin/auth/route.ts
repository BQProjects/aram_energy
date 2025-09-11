import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";

export async function POST(request: NextRequest) {
  console.log("Auth API: Login request received");
  try {
    const { username, password } = await request.json();
    console.log("Auth API: Login attempt for username:", username);

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();

    // Find admin user
    const adminUser = await db.collection("admin_users").findOne({ username });

    if (!adminUser) {
      console.log("Auth API: User not found");
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, adminUser.password);

    if (!isValidPassword) {
      console.log("Auth API: Invalid password");
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    console.log("Auth API: Credentials valid, generating token");
    // Generate JWT token
    const token = jwt.sign(
      { username: adminUser.username, role: adminUser.role },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    console.log("Auth API: Token generated successfully");
    return NextResponse.json({
      success: true,
      token,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Auth API error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
