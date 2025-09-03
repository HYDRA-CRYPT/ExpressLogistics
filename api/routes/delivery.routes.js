import express from "express";
import {
  createDelivery,
  getByTrackingCode,
  listDeliveries,
  getAdminLogsController,
  getDeliveryStats,
  deleteDelivery,
  editDelivery,
  getDeliveryById,
  testEmail,
  testAllEmails,
  testDeliveryEmail,
  simpleEmailTest,
  getByTrackingCodeAndId,
  updateStatusAndLocation,
} from "../controllers/delivery.controller.js";
import { downloadInvoiceByTrackingCode } from "../controllers/invoice.controller.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// ====== PUBLIC ROUTES (No Authentication) ======
// Basic tracking (existing)
router.get("/track/:code", getByTrackingCode);

// NEW: Combined tracking with ID - gets full delivery info by tracking code
router.get("/track/:code/full", getByTrackingCodeAndId);

// Public invoice download
router.get("/track/:id/invoice.pdf", downloadInvoiceByTrackingCode);

// Test routes (temporary for testing)
router.get("/test-email", testEmail);
router.get("/test-all-emails", testAllEmails);
router.get("/test-delivery-email", testDeliveryEmail);
router.get("/simple-email-test", simpleEmailTest);

// ====== PROTECTED ROUTES (Authentication Required) ======
router.use(protect);

// ====== ADMIN ONLY ROUTES ======
// Create new delivery (Admin only)
router.post("/", authorize("admin"), createDelivery);

// Get statistics (move this up before /:id)
router.get("/stats", getDeliveryStats);

// System logs (Admin only)
router.get("/admin/logs", authorize("admin"), getAdminLogsController);

// Update status and location combined
router.put("/:id/update-combined", authorize("admin"), updateStatusAndLocation);

// Edit delivery (Admin only)
router.put("/:id", authorize("admin"), editDelivery);

// Delete delivery (Admin only)
router.delete("/:id", authorize("admin"), deleteDelivery);

// Get delivery by ID (Admin only)
router.get("/:id", authorize("admin"), getDeliveryById);

// ====== AUTHENTICATED USER ROUTES ======
// List deliveries (existing - for backward compatibility)
router.get("/", listDeliveries);

export default router;
