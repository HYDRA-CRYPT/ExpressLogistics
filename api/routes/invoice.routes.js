import express from "express";
import { getInvoicePdf } from "../controllers/invoice.controller.js";

const router = express.Router();

// ✅ Public access: invoice can be downloaded from tracking page
router.get("/:id/pdf", getInvoicePdf);

export default router;
