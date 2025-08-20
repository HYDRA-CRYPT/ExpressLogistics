import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import redisClient from "../config/redis.js";

function signToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || "7d",
  });
}

// ===== LOGIN =====
export const login = async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password)
    return res.status(400).json({ message: "Missing credentials" });

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = signToken(user);

  // Store token in Redis with TTL (matches JWT expiry)
  const decoded = jwt.decode(token);
  const expiresInSec = decoded.exp - Math.floor(Date.now() / 1000);

  // ioredis syntax
  await redisClient.set(`auth:token:${user._id}`, token, "EX", expiresInSec);

  res.json({
    token,
    user: { id: user._id, email: user.email, role: user.role },
  });
};

// ===== LOGOUT =====
export const logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(400).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.decode(token);

    if (decoded?.id) {
      await redisClient.del(`auth:token:${decoded.id}`);
    }

    res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Logout failed" });
  }
};

// ===== SEED ADMIN (via CLI flag) =====
export async function seedAdminIfRequested() {
  if (!process.env.ADMIN_SEED_TOKEN) return;

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.log("ADMIN_EMAIL/ADMIN_PASSWORD missing — skipping seed");
    return;
  }

  // Use Redis to prevent reseeding in multi-instance setups
  const alreadySeeded = await redisClient.get("admin:seeded");
  if (alreadySeeded) {
    console.log("⚠️ Admin already seeded (checked via Redis)");
    return;
  }

  const existing = await User.findOne({ email });
  if (existing) {
    console.log("Admin already exists in DB:", email);
    await redisClient.set("admin:seeded", "true");
    return;
  }

  const user = new User({ email, password, role: "admin" });
  await user.save();

  await redisClient.set("admin:seeded", "true");

  console.log("✅ Admin seeded:", email);
}
