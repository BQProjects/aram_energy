import bcrypt from "bcryptjs";
import { MongoClient } from "mongodb";
import { config } from "dotenv";
import { join } from "path";

// Load environment variables from .env file
config({ path: join(process.cwd(), ".env") });

async function createAdminUser() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI environment variable is not set");
    }

    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db();

    // Check if admin user already exists
    const existingAdmin = await db
      .collection("admin_users")
      .findOne({ username: "admin" });

    if (existingAdmin) {
      console.log("Admin user already exists!");
      console.log("Username: admin");
      console.log("Password: admin123");
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash("admin123", 12);

    // Create admin user
    await db.collection("admin_users").insertOne({
      username: "admin",
      password: hashedPassword,
      role: "admin",
      createdAt: new Date(),
      isActive: true,
    });

    console.log("Admin user created successfully!");
    console.log("Username: admin");
    console.log("Password: admin123");
    console.log("Please change the password after first login!");
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    process.exit(0);
  }
}

createAdminUser();
