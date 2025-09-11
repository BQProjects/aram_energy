import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAccess } from "@/lib/adminAuth";
import { generateCSRFToken } from "@/lib/csrf";

export async function GET(request: NextRequest) {
  // Verify admin access
  const authResult = await verifyAdminAccess(request);
  if (!authResult.authorized) {
    return authResult.response!;
  }

  try {
    // Use username as session identifier
    const sessionId = authResult.decoded?.username || "unknown";
    const csrfToken = generateCSRFToken(sessionId);

    return NextResponse.json({
      csrfToken,
    });
  } catch (error) {
    console.error("CSRF token generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate CSRF token" },
      { status: 500 }
    );
  }
}
