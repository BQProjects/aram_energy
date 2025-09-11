import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";
import { verifyAdminAccess } from "@/lib/adminAuth";

export async function POST(request: NextRequest) {
  // Verify admin access
  const authResult = await verifyAdminAccess(request);
  if (!authResult.authorized) {
    return authResult.response!;
  }

  const decoded = authResult.decoded!; // Get the decoded token data

  try {
    const { newUsername, newPassword } = await request.json();

    if (!newUsername || !newPassword) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();

    // Check if new username already exists (excluding current user)
    const existingUser = await db.collection("admin_users").findOne({
      username: newUsername,
    });

    if (existingUser && existingUser.username !== decoded.username) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update the admin user
    const result = await db.collection("admin_users").updateOne(
      { username: decoded.username },
      {
        $set: {
          username: newUsername,
          password: hashedPassword,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Admin user not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Credentials updated successfully",
    });
  } catch (error) {
    console.error("Update credentials API error:", error);
    return NextResponse.json(
      { error: "Failed to update credentials" },
      { status: 500 }
    );
  }
}
