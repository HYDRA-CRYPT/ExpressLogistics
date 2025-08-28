import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import redisClient from "../config/redis.js";

export const protect = async (req, res, next) => {
  try {
    // 1. Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // 2. Verify JWT token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (jwtError) {
      if (jwtError.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Token expired, please log in again",
          expired: true,
        });
      }
      return res.status(401).json({ message: "Invalid token" });
    }

    // 3. Check if token exists in Redis
    const storedToken = await redisClient.get(`auth:token:${decoded.id}`);

    if (!storedToken) {
      return res.status(401).json({
        message: "Token not found in session, please log in again",
      });
    }

    if (storedToken !== token) {
      return res.status(401).json({
        message: "Token mismatch, please log in again",
      });
    }

    // 4. Check if user still exists
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 5. Grant access to protected route
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({ message: "Authentication error" });
  }
};

// Middleware to restrict to specific roles (matches your current usage)
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. Required role: ${roles.join(
          " or "
        )}. Current role: ${req.user.role}`,
      });
    }

    next();
  };
};

// Alternative naming (for backward compatibility)
export const restrictTo = authorize;

// Admin only middleware (shorthand)
export const adminOnly = authorize("admin");

// Optional auth middleware (doesn't throw error if no token)
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(); // Continue without authentication
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return next(); // Continue without authentication
    }

    // Try to verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check Redis
    const storedToken = await redisClient.get(`auth:token:${decoded.id}`);

    if (storedToken === token) {
      const user = await User.findById(decoded.id).select("-password");
      if (user) {
        req.user = user;
      }
    }

    next(); // Continue regardless of auth result
  } catch (error) {
    // Ignore auth errors in optional auth
    next();
  }
};
