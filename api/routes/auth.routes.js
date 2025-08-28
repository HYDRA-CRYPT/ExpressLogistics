// routes/auth.routes.js
import express from "express";
import { login, logout, refreshToken } from "../controllers/auth.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", protect, logout);
router.post("/refresh", refreshToken);
router.get("/me", protect, (req, res) => {
  res.json({ user: req.user });
});

export default router;
