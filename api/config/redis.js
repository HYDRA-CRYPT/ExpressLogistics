// config/redis.js
import Redis from "ioredis";

const REDIS_URL =
  process.env.REDIS_URL ||
  "rediss://default:ARtxAAImcDExOTA4YjI3YjkxYjQ0Y2MzYTZjMjU3ODUwYWE1OTBmOHAxNzAyNQ@pretty-emu-7025.upstash.io:6379";

// Initialize ioredis client
const redisClient = new Redis(REDIS_URL);

// Event listeners
redisClient.on("connect", () => console.log("✅ Redis connected"));
redisClient.on("ready", () => console.log("✅ Redis ready"));
redisClient.on("error", (err) => console.error("❌ Redis error:", err));
redisClient.on("end", () => console.log("⚠️ Redis connection closed"));

// Connect function (optional, ioredis auto-connects)
export const connectRedis = async () => {
  try {
    await redisClient.ping();
    console.log("✅ Redis ping successful");
  } catch (err) {
    console.error("❌ Failed to connect to Redis:", err);
    process.exit(1);
  }
};

export default redisClient;
