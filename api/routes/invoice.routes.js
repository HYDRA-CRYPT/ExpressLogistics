import express from "express";
import {
  uploadInvoicePDF,
  upload,
  getInvoiceByTrackingCode,
  downloadInvoiceByTrackingCode,
} from "../controllers/invoice.controller.js";

const router = express.Router();

// ✅ Upload PDF invoice from frontend
router.post("/upload/:trackingCode", upload.single("pdf"), uploadInvoicePDF);

// ✅ Get invoice URL by tracking code
router.get("/tracking/:trackingCode", getInvoiceByTrackingCode);

// ✅ Download invoice directly by tracking code
router.get("/download/:trackingCode", downloadInvoiceByTrackingCode);

export default router;
