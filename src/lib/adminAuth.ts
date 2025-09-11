import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken, isTokenBlacklisted } from "@/lib/tokenManager";
import jwt from "jsonwebtoken";

export async function verifyAdminAccess(
  request: NextRequest
): Promise<{
  authorized: boolean;
  decoded?: jwt.JwtPayload;
  response?: NextResponse;
}> {
  try {
    const authHeader = request.headers.get("authorization");
    const cookieToken = request.cookies.get("adminToken")?.value;

    // Get token from either header or cookie
    let token = "";
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    } else if (cookieToken) {
      token = cookieToken;
    }

    if (!token) {
      return {
        authorized: false,
        response: NextResponse.json(
          { error: "Access denied. No token provided." },
          { status: 401 }
        ),
      };
    }

    // Check if token is blacklisted
    const isBlacklisted = await isTokenBlacklisted(token);
    if (isBlacklisted) {
      return {
        authorized: false,
        response: NextResponse.json(
          { error: "Access denied. Token is invalid." },
          { status: 401 }
        ),
      };
    }

    // Verify token
    const verificationResult = verifyAdminToken(token);
    if (!verificationResult.valid) {
      return {
        authorized: false,
        response: NextResponse.json(
          { error: "Access denied. Invalid token." },
          { status: 401 }
        ),
      };
    }

    return {
      authorized: true,
      decoded: verificationResult.decoded,
    };
  } catch (error) {
    console.error("Admin access verification failed:", error);
    return {
      authorized: false,
      response: NextResponse.json(
        { error: "Access denied. Authentication error." },
        { status: 401 }
      ),
    };
  }
}
