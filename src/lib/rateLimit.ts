import { NextRequest } from "next/server";
import clientPromise from "@/lib/mongodb";

interface RateLimitAttempt {
  ip: string;
  attempts: number;
  firstAttempt: Date;
  lastAttempt: Date;
  blockedUntil?: Date;
}

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const BLOCK_DURATION_MS = 30 * 60 * 1000; // 30 minutes

export async function checkRateLimit(
  request: NextRequest
): Promise<{ allowed: boolean; remainingAttempts?: number; resetTime?: Date }> {
  try {
    const ip = getClientIP(request);
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection<RateLimitAttempt>("rate_limits");

    const now = new Date();
    const windowStart = new Date(now.getTime() - WINDOW_MS);

    // Find existing rate limit record
    const rateLimit = await collection.findOne({ ip });

    if (!rateLimit) {
      // First attempt from this IP
      await collection.insertOne({
        ip,
        attempts: 1,
        firstAttempt: now,
        lastAttempt: now,
      });
      return { allowed: true, remainingAttempts: MAX_ATTEMPTS - 1 };
    }

    // Check if currently blocked
    if (rateLimit.blockedUntil && rateLimit.blockedUntil > now) {
      return {
        allowed: false,
        resetTime: rateLimit.blockedUntil,
      };
    }

    // Check if window has expired
    if (rateLimit.firstAttempt < windowStart) {
      // Reset the window
      await collection.updateOne(
        { ip },
        {
          $set: {
            attempts: 1,
            firstAttempt: now,
            lastAttempt: now,
          },
          $unset: { blockedUntil: "" },
        }
      );
      return { allowed: true, remainingAttempts: MAX_ATTEMPTS - 1 };
    }

    // Increment attempts
    const newAttempts = rateLimit.attempts + 1;

    if (newAttempts > MAX_ATTEMPTS) {
      // Block this IP
      const blockedUntil = new Date(now.getTime() + BLOCK_DURATION_MS);
      await collection.updateOne(
        { ip },
        {
          $set: {
            attempts: newAttempts,
            lastAttempt: now,
            blockedUntil,
          },
        }
      );
      return {
        allowed: false,
        resetTime: blockedUntil,
      };
    }

    // Update attempts
    await collection.updateOne(
      { ip },
      {
        $set: {
          attempts: newAttempts,
          lastAttempt: now,
        },
      }
    );

    return {
      allowed: true,
      remainingAttempts: MAX_ATTEMPTS - newAttempts,
    };
  } catch (error) {
    console.error("Rate limit check failed:", error);
    // In case of error, allow the request but log it
    return { allowed: true };
  }
}

export async function recordSuccessfulLogin(
  request: NextRequest
): Promise<void> {
  try {
    const ip = getClientIP(request);
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("rate_limits");

    // Clear rate limiting for successful login
    await collection.deleteOne({ ip });
  } catch (error) {
    console.error("Failed to clear rate limit:", error);
  }
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  // Fallback to a connection-based IP or unknown
  return "unknown";
}

// Clean up old rate limit records
export async function cleanupRateLimits(): Promise<void> {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("rate_limits");

    const cutoff = new Date(Date.now() - BLOCK_DURATION_MS);

    await collection.deleteMany({
      $and: [
        { lastAttempt: { $lt: cutoff } },
        {
          $or: [
            { blockedUntil: { $exists: false } },
            { blockedUntil: { $lt: new Date() } },
          ],
        },
      ],
    });
  } catch (error) {
    console.error("Failed to cleanup rate limits:", error);
  }
}
