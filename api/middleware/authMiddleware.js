import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
  try {
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;

    if (!token) {
      res.status(401);
      throw new Error("No token, authorization denied");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("_id email role");

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (e) {
    if (e.name === "TokenExpiredError") {
      res.status(401);
      throw new Error("Token expired, please log in again");
    }
    if (e.name === "JsonWebTokenError") {
      res.status(401);
      throw new Error("Invalid token");
    }
    res.status(401);
    throw new Error("Unauthorized");
  }
};

// Optional role-based guard
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403);
      throw new Error("Forbidden");
    }
    next();
  };
};
