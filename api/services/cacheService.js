import redis from "../config/redis.js";

const TRACKING_PREFIX = "tracking:";
const ADMIN_LOGS_KEY = "admin:logs";

// Cache tracking data with expiry
export async function cacheTracking(code, data, ttlSec = 300) {
  try {
    await redis.setEx(TRACKING_PREFIX + code, ttlSec, JSON.stringify(data));
  } catch (err) {
    console.error("❌ Failed to cache tracking:", err.message);
  }
}

export async function getCachedTracking(code) {
  try {
    const v = await redis.get(TRACKING_PREFIX + code);
    return v ? JSON.parse(v) : null;
  } catch (err) {
    console.error("❌ Failed to read tracking cache:", err.message);
    return null;
  }
}

// Admin logs (newest first, capped to 1000 entries)
export async function pushAdminLog(event) {
  try {
    const payload = JSON.stringify({ t: Date.now(), ...event });
    await redis.lPush(ADMIN_LOGS_KEY, payload);
    await redis.lTrim(ADMIN_LOGS_KEY, 0, 999);
  } catch (err) {
    console.error("❌ Failed to push admin log:", err.message);
  }
}

export async function getAdminLogs({ offset = 0, limit = 50 } = {}) {
  try {
    const end = offset + limit - 1;
    const items = await redis.lRange(ADMIN_LOGS_KEY, offset, end);
    return items.map((s) => JSON.parse(s));
  } catch (err) {
    console.error("❌ Failed to get admin logs:", err.message);
    return [];
  }
}

// Add this function to your existing cacheService.js file

export const deleteCachedTracking = async (trackingCode) => {
  try {
    if (redisClient && redisClient.isOpen) {
      const key = `tracking:${trackingCode}`;
      await redisClient.del(key);
      console.log(`Cache deleted for tracking code: ${trackingCode}`);
    }
  } catch (error) {
    console.error("Cache deletion error:", error);
    // Don't throw error - cache deletion failure shouldn't break the main operation
  }
};
