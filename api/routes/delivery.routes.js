import express from "express";
import {
  createDelivery,
  getByTrackingCode,
  getByTrackingCodeWithTimeline, // New enhanced endpoint
  listDeliveries,
  getDeliveriesWithTimeline, // New enhanced endpoint
  updateStatus,
  addLocationUpdate,
  addLocationUpdateEnhanced, // New enhanced endpoint
  addBulkLocationUpdates, // New bulk endpoint
  getDeliveryTimeline, // New timeline-only endpoint
  getAdminLogsController,
  getDeliveryStats,
  deleteDelivery,
  editDelivery,
  getDeliveryById,
  testEmail,
  testAllEmails,
  testDeliveryEmail,
  simpleEmailTest,
} from "../controllers/delivery.controller.js";
import { getInvoicePdf } from "../controllers/invoice.controller.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// ====== PUBLIC ROUTES (No Authentication) ======

// Basic tracking (existing)
router.get("/track/:code", getByTrackingCode);

// Enhanced tracking with timeline
router.get("/track/:code/timeline", getByTrackingCodeWithTimeline);

// Get timeline only (lighter endpoint)
router.get("/track/:code/timeline-only", getDeliveryTimeline);

// Public invoice download
router.get("/track/:id/invoice.pdf", getInvoicePdf);

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

// Enhanced list with optional timeline
router.get("/admin/deliveries", authorize("admin"), getDeliveriesWithTimeline);

// Edit delivery (Admin only)
router.put("/:id", authorize("admin"), editDelivery);

// Delete delivery (Admin only)
router.delete("/:id", authorize("admin"), deleteDelivery);

// Get delivery by ID (Admin only)
router.get("/:id", authorize("admin"), getDeliveryById);

// ====== AUTHENTICATED USER ROUTES ======

// List deliveries (existing - for backward compatibility)
router.get("/", listDeliveries);

// Update delivery status
router.put("/:id/status", updateStatus);

// Basic location update (existing - for backward compatibility)
router.put("/:id/location", addLocationUpdate);

// Enhanced location update with email notifications
router.put("/:id/location-enhanced", addLocationUpdateEnhanced);

// Bulk location updates
router.put("/:id/bulk-locations", authorize("admin"), addBulkLocationUpdates);

export default router;
