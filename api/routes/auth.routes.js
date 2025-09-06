// routes/auth.routes.js
import express from "express";
import {
  login,
  logout,
  refreshToken,
  updatePassword,
  seedMultipleAdmins,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/user.model.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", protect, logout);
router.post("/refresh", refreshToken);
router.put("/update-password", protect, updatePassword);
router.post("/seed-admins", protect, seedMultipleAdmins); // Protected endpoint for seeding
router.get("/me", protect, async (req, res) => {
  try {
    // Get full user data including creation date
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Failed to get user data" });
  }
});

export default router;
