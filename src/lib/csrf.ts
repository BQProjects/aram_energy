import { randomBytes } from "crypto";
import { NextRequest } from "next/server";

// In-memory store for CSRF tokens (in production, use Redis or database)
const csrfTokens = new Map<string, { token: string; expires: number }>();

export function generateCSRFToken(sessionId: string): string {
  const token = randomBytes(32).toString("hex");
  const expires = Date.now() + 60 * 60 * 1000; // 1 hour

  csrfTokens.set(sessionId, { token, expires });

  // Cleanup expired tokens
  for (const [id, data] of csrfTokens.entries()) {
    if (data.expires < Date.now()) {
      csrfTokens.delete(id);
    }
  }

  return token;
}

export function validateCSRFToken(sessionId: string, token: string): boolean {
  const storedData = csrfTokens.get(sessionId);

  if (!storedData) {
    return false;
  }

  if (storedData.expires < Date.now()) {
    csrfTokens.delete(sessionId);
    return false;
  }

  return storedData.token === token;
}

export function getCSRFTokenFromRequest(request: NextRequest): string | null {
  // Check header first
  const headerToken = request.headers.get("x-csrf-token");
  if (headerToken) {
    return headerToken;
  }

  // Check form data if it's a POST request
  // This would need to be implemented based on your form handling
  return null;
}

export function cleanupExpiredCSRFTokens(): void {
  const now = Date.now();
  for (const [id, data] of csrfTokens.entries()) {
    if (data.expires < now) {
      csrfTokens.delete(id);
    }
  }
}
