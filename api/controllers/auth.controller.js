import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import redisClient from "../config/redis.js";

function signToken(user, expiresIn = process.env.JWT_EXPIRES || "7d") {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn,
  });
}

function signRefreshToken(user) {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
    {
      expiresIn: "30d", // Refresh token lasts longer
    }
  );
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
  const refreshToken = signRefreshToken(user);

  // Store both tokens in Redis
  const decoded = jwt.decode(token);
  const expiresInSec = decoded.exp - Math.floor(Date.now() / 1000);

  await redisClient.set(`auth:token:${user._id}`, token, "EX", expiresInSec);
  await redisClient.set(
    `auth:refresh:${user._id}`,
    refreshToken,
    "EX",
    30 * 24 * 60 * 60
  ); // 30 days

  res.json({
    token,
    refreshToken,
    user: { id: user._id, email: user.email, role: user.role },
  });
};

// export const profile = async (req, res) => {
//   try {
//     // Get full user data including creation date
//     const user = await User.findById(req.user.id).select("-password");
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json({
//       user: {
//         id: user._id,
//         email: user.email,
//         role: user.role,
//         createdAt: user.createdAt,
//         updatedAt: user.updatedAt,
//       },
//     });
//   } catch (error) {
//     console.error("Get user error:", error);
//     res.status(500).json({ message: "Failed to get user data" });
//   }
// };

// ===== REFRESH TOKEN =====

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token required" });
    }

    // Verify refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET
    );

    // Check if refresh token exists in Redis
    const storedRefreshToken = await redisClient.get(
      `auth:refresh:${decoded.id}`
    );
    if (!storedRefreshToken || storedRefreshToken !== refreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // Get user and generate new tokens
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const newToken = signToken(user);
    const newRefreshToken = signRefreshToken(user);

    // Update Redis with new tokens
    const newDecoded = jwt.decode(newToken);
    const expiresInSec = newDecoded.exp - Math.floor(Date.now() / 1000);

    await redisClient.set(
      `auth:token:${user._id}`,
      newToken,
      "EX",
      expiresInSec
    );
    await redisClient.set(
      `auth:refresh:${user._id}`,
      newRefreshToken,
      "EX",
      30 * 24 * 60 * 60
    );

    res.json({
      token: newToken,
      refreshToken: newRefreshToken,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(401).json({ message: "Invalid refresh token" });
  }
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
      // Remove both access and refresh tokens
      await redisClient.del(`auth:token:${decoded.id}`);
      await redisClient.del(`auth:refresh:${decoded.id}`);
    }

    res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Logout failed" });
  }
};

// ===== UPDATE PASSWORD =====
export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id; // From auth middleware

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current password and new password are required",
      });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    // Validate new password strength
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
    if (newPassword.length < 8 || !passwordRegex.test(newPassword)) {
      return res.status(400).json({
        message:
          "New password must be at least 8 characters long and contain uppercase, lowercase, number and special character",
      });
    }

    // Check if new password is different from current
    const isSamePassword = await user.comparePassword(newPassword);
    if (isSamePassword) {
      return res.status(400).json({
        message: "New password must be different from current password",
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    // Optionally, invalidate all existing tokens to force re-login
    await redisClient.del(`auth:token:${userId}`);
    await redisClient.del(`auth:refresh:${userId}`);

    res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Password update error:", error);
    res.status(500).json({
      message: "Failed to update password",
    });
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

// ===== SEED MULTIPLE ADMINS =====
export const seedMultipleAdmins = async (req, res) => {
  try {
    const { admins } = req.body;

    if (!Array.isArray(admins) || admins.length === 0) {
      return res.status(400).json({
        message:
          "Please provide an array of admin objects with email and password",
      });
    }

    const results = [];

    for (const adminData of admins) {
      const { email, password, role = "admin" } = adminData;

      if (!email || !password) {
        results.push({
          email: email || "unknown",
          status: "failed",
          message: "Email and password required",
        });
        continue;
      }

      // Check if admin already exists
      const existing = await User.findOne({ email });
      if (existing) {
        results.push({
          email,
          status: "skipped",
          message: "Admin already exists",
        });
        continue;
      }

      try {
        const user = new User({ email, password, role });
        await user.save();
        results.push({
          email,
          status: "created",
          message: "Admin created successfully",
        });
      } catch (error) {
        results.push({
          email,
          status: "failed",
          message: error.message,
        });
      }
    }

    res.json({
      success: true,
      message: "Admin seeding completed",
      results,
    });
  } catch (error) {
    console.error("Multiple admin seeding error:", error);
    res.status(500).json({
      message: "Failed to seed admins",
    });
  }
};
