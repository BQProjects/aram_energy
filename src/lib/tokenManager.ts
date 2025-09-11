import clientPromise from "@/lib/mongodb";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";

interface BlacklistedToken {
  token: string;
  createdAt: Date;
  expiresAt: Date;
}

export async function blacklistToken(token: string): Promise<void> {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection<BlacklistedToken>("blacklisted_tokens");

    // Decode token to get expiration
    const decoded = jwt.decode(token) as jwt.JwtPayload;
    const expiresAt = decoded?.exp
      ? new Date(decoded.exp * 1000)
      : new Date(Date.now() + 24 * 60 * 60 * 1000);

    await collection.insertOne({
      token,
      createdAt: new Date(),
      expiresAt,
    });

    console.log("Token blacklisted successfully");
  } catch (error) {
    console.error("Failed to blacklist token:", error);
  }
}

export async function isTokenBlacklisted(token: string): Promise<boolean> {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("blacklisted_tokens");

    const blacklistedToken = await collection.findOne({ token });
    return !!blacklistedToken;
  } catch (error) {
    console.error("Failed to check token blacklist:", error);
    return false;
  }
}

export async function cleanupExpiredTokens(): Promise<void> {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("blacklisted_tokens");

    const now = new Date();
    await collection.deleteMany({ expiresAt: { $lt: now } });

    console.log("Cleaned up expired blacklisted tokens");
  } catch (error) {
    console.error("Failed to cleanup expired tokens:", error);
  }
}

export function verifyAdminToken(token: string): {
  valid: boolean;
  decoded?: jwt.JwtPayload;
} {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    return { valid: true, decoded };
  } catch (error) {
    console.error("Token verification failed:", error);
    return { valid: false };
  }
}
