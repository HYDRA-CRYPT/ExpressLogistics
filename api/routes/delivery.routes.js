import express from "express";
import {
  createDelivery,
  getByTrackingCode,
  listDeliveries,
  updateStatus,
  addLocationUpdate,
  getAdminLogsController,
} from "../controllers/delivery.controller.js";
import { getInvoicePdf } from "../controllers/invoice.controller.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Public: anyone can track by code
router.get("/track/:code", getByTrackingCode);
router.get("/track/:id/invoice.pdf", getInvoicePdf);

// ✅ All below require auth
router.use(protect);

// Admin: create new delivery
router.post("/", authorize("admin"), createDelivery);

// List deliveries (could restrict by role later if needed)
router.get("/", listDeliveries);

// Update delivery status
router.put("/:id/status", updateStatus);

// Add delivery location update
router.put("/:id/location", addLocationUpdate);

// Admin: system logs
router.get("/admin/logs", authorize("admin"), getAdminLogsController);

export default router;
