import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./app.js";
import connectDB from "./config/db.js";
import { connectRedis } from "./config/redis.js";
import { seedAdminIfRequested } from "./controllers/auth.controller.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // connect MongoDB
    await connectDB();

    // connect Redis
    await connectRedis();

    // optional seeding
    if (process.argv.includes("--seed-admin")) {
      await seedAdminIfRequested();
      process.exit(0);
    }

    // start server only when both DB + Redis are ready
    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server failed to start:", err);
    process.exit(1);
  }
};

// only start the server if this file is run directly (not imported by tests)
if (process.argv[1].includes("server.js")) {
  startServer();
}

export default app; // allow tests to import app directly
