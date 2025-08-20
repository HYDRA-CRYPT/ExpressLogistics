import redis from "../config/redis.js";

const ADMIN_LOGS_KEY = "admin:logs";

export const logAdminAction = async (adminId, action) => {
  try {
    const log = {
      adminId,
      action,
      time: new Date().toISOString(),
    };

    await redis.lPush(ADMIN_LOGS_KEY, JSON.stringify(log));
    await redis.lTrim(ADMIN_LOGS_KEY, 0, 999); // keep last 1000 logs
  } catch (err) {
    console.error("❌ Failed to log admin action:", err.message);
  }
};
