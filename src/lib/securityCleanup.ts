import { cleanupExpiredTokens } from "@/lib/tokenManager";
import { cleanupRateLimits } from "@/lib/rateLimit";
import { cleanupExpiredCSRFTokens } from "@/lib/csrf";

export async function performSecurityCleanup(): Promise<void> {
  console.log("Starting security cleanup...");

  try {
    // Clean up expired blacklisted tokens
    await cleanupExpiredTokens();

    // Clean up old rate limit records
    await cleanupRateLimits();

    // Clean up expired CSRF tokens
    cleanupExpiredCSRFTokens();

    console.log("Security cleanup completed successfully");
  } catch (error) {
    console.error("Security cleanup failed:", error);
  }
}

// Run cleanup every hour
if (typeof setInterval !== "undefined") {
  setInterval(performSecurityCleanup, 60 * 60 * 1000); // 1 hour
}
