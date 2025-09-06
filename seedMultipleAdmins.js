// Script to seed multiple admin users
// Run with: node seedMultipleAdmins.js

import mongoose from "mongoose";
import User from "../api/models/user.model.js";
import "dotenv/config";

const admins = [
  {
    email: "admin1@aegisexpress.com",
    password: "SecurePass123!",
    role: "admin",
  },
  {
    email: "admin2@aegisexpress.com",
    password: "SecurePass456!",
    role: "admin",
  },
  {
    email: "superadmin@aegisexpress.com",
    password: "SuperSecure789!",
    role: "admin",
  },
];

async function seedAdmins() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    for (const adminData of admins) {
      const existing = await User.findOne({ email: adminData.email });

      if (existing) {
        console.log(`❌ Admin already exists: ${adminData.email}`);
        continue;
      }

      const user = new User(adminData);
      await user.save();
      console.log(`✅ Created admin: ${adminData.email}`);
    }

    console.log("🎉 Admin seeding completed!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding admins:", error);
    process.exit(1);
  }
}

seedAdmins();
