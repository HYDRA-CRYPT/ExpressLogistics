import express from "express";
import { login } from "../controllers/auth.controller.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/login", login);

// Protected: get user profile
router.get("/me", protect, (req, res) => {
  res.json({
    id: req.user._id,
    email: req.user.email,
    role: req.user.role,
  });
});
export default router;
