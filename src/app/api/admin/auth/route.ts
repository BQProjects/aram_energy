import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";
import { checkRateLimit, recordSuccessfulLogin } from "@/lib/rateLimit";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";

export async function POST(request: NextRequest) {

  // Check rate limiting first
  const rateLimitResult = await checkRateLimit(request);
  if (!rateLimitResult.allowed) {
    const resetTime = rateLimitResult.resetTime;
    const resetTimeString = resetTime ? resetTime.toISOString() : "unknown";

    return NextResponse.json(
      {
        error: "Too many login attempts. Please try again later.",
        resetTime: resetTimeString,
      },
      { status: 429 }
    );
  }

  try {
    const { username, password } = await request.json();

    // Add small delay to prevent timing attacks
    await new Promise((resolve) =>
      setTimeout(resolve, 100 + Math.random() * 200)
    );

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();

    // Find admin user
    const adminUser = await db.collection("admin_users").findOne({ username });

    if (!adminUser) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, adminUser.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }


    // Clear rate limiting on successful login
    await recordSuccessfulLogin(request);

    // Generate JWT token with additional security claims
    const token = jwt.sign(
      {
        username: adminUser.username,
        role: adminUser.role,
        iat: Math.floor(Date.now() / 1000),
        loginTime: new Date().toISOString(),
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );


    // Create response with secure cookie
    const response = NextResponse.json({
      success: true,
      token,
      message: "Login successful",
    });

    // Set secure cookie
    response.cookies.set("adminToken", token, {
      path: "/",
      maxAge: 86400, // 24 hours
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    console.error("Auth API error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
