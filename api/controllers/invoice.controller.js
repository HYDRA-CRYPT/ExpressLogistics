import Delivery from "../models/delivery.model.js";
import { uploadInvoiceToCloudinary } from "../services/cloudinaryUpload.js";
import { createRequire } from "module";
import mongoose from "mongoose";

// Use createRequire for CommonJS modules like multer
const require = createRequire(import.meta.url);
const multer = require("multer");

// Configure multer for PDF uploads
const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"), false);
    }
  },
});

// Upload PDF invoice from frontend
export const uploadInvoicePDF = async (req, res) => {
  try {
    const { trackingCode } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "No PDF file provided" });
    }

    // Filter by admin ownership
    const delivery = await Delivery.findOne({
      trackingCode,
      createdBy: req.user.id,
    });
    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }

    // Upload PDF buffer to Cloudinary
    const invoiceUrl = await uploadInvoiceToCloudinary(
      req.file.buffer,
      trackingCode
    );

    // Save Cloudinary URL to delivery record
    delivery.invoiceUrl = invoiceUrl;
    await delivery.save();

    res.json({
      success: true,
      url: invoiceUrl,
      message: "Invoice uploaded successfully",
    });
  } catch (err) {
    console.error("❌ Invoice upload failed:", err);
    res.status(500).json({ message: "Could not upload invoice" });
  }
};

// Get invoice URL by tracking code
export const getInvoiceByTrackingCode = async (req, res) => {
  try {
    const { trackingCode } = req.params;
    // Filter by admin ownership
    const delivery = await Delivery.findOne({
      trackingCode,
      createdBy: req.user.id,
    }).lean();

    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }

    // Return existing invoice URL if available
    if (delivery.invoiceUrl) {
      return res.json({
        success: true,
        url: delivery.invoiceUrl,
        delivery: {
          trackingCode: delivery.trackingCode,
          status: delivery.status,
          shipmentType: delivery.shipmentType,
          dateSent: delivery.dateSent,
          deliveryDate: delivery.deliveryDate,
          deliveryFee: delivery.deliveryFee,
          currency: delivery.currency,
          sender: delivery.sender,
          receiver: delivery.receiver,
          items: delivery.items,
        },
      });
    }

    // Return delivery data for PDF generation in frontend
    res.json({
      success: true,
      url: null,
      delivery: {
        trackingCode: delivery.trackingCode,
        status: delivery.status,
        shipmentType: delivery.shipmentType,
        dateSent: delivery.dateSent,
        deliveryDate: delivery.deliveryDate,
        deliveryFee: delivery.deliveryFee,
        currency: delivery.currency,
        sender: delivery.sender,
        receiver: delivery.receiver,
        items: delivery.items,
      },
    });
  } catch (err) {
    console.error("❌ Get invoice failed:", err);
    res.status(500).json({ message: "Could not get invoice data" });
  }
};

// Direct download invoice (generate on-the-fly if needed)
export const downloadInvoiceByTrackingCode = async (req, res) => {
  try {
    const { trackingCode } = req.params;
    // Filter by admin ownership
    const delivery = await Delivery.findOne({
      trackingCode,
      createdBy: req.user.id,
    }).lean();

    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }

    // If invoice URL exists, redirect to Cloudinary URL for download
    if (delivery.invoiceUrl) {
      // For PDFs, don't use fl_attachment transformation, just redirect to the URL
      // The browser will handle the PDF display/download
      return res.redirect(delivery.invoiceUrl);
    }

    // If no invoice exists, return delivery data for frontend generation
    res.json({
      success: false,
      message: "Invoice not found, please generate it first",
      delivery: {
        trackingCode: delivery.trackingCode,
        status: delivery.status,
        shipmentType: delivery.shipmentType,
        dateSent: delivery.dateSent,
        deliveryDate: delivery.deliveryDate,
        deliveryFee: delivery.deliveryFee,
        currency: delivery.currency,
        sender: delivery.sender,
        receiver: delivery.receiver,
        items: delivery.items,
      },
    });
  } catch (err) {
    console.error("❌ Invoice download failed:", err);
    res.status(500).json({ message: "Could not download invoice" });
  }
};
