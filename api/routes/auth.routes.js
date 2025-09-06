// routes/auth.routes.js
import express from "express";
import {
  login,
  logout,
  refreshToken,
  updatePassword,
  seedMultipleAdmins,
  profile,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", protect, logout);
router.post("/refresh", refreshToken);
router.put("/update-password", protect, updatePassword);
router.post("/seed-admins", protect, seedMultipleAdmins); // Protected endpoint for seeding
router.get("/me", protect, profile);

export default router;
