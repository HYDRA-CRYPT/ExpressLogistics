import Delivery from "../models/delivery.model.js";
import {
  generateInvoicePDF,
  uploadInvoiceToCloudinary,
} from "../services/pdfService.js";

export const getInvoicePdf = async (req, res) => {
  try {
    const { id } = req.params;
    const delivery = await Delivery.findById(id).lean();
    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }

    // ✅ If invoiceUrl already exists on delivery, return it
    if (delivery.invoiceUrl) {
      return res.json({ url: delivery.invoiceUrl });
    }

    // ✅ Generate invoice
    const pdfBuffer = await generateInvoicePDF(delivery);

    // ✅ Upload to Cloudinary
    const invoiceUrl = await uploadInvoiceToCloudinary(
      pdfBuffer,
      delivery.trackingCode
    );

    // ✅ Save Cloudinary link to delivery record (so we don’t regenerate every time)
    delivery.invoiceUrl = invoiceUrl;
    await Delivery.findByIdAndUpdate(delivery._id, { invoiceUrl });

    // ✅ Respond with the invoice link
    res.json({ url: invoiceUrl });
  } catch (err) {
    console.error("❌ Invoice generation failed:", err);
    res.status(500).json({ message: "Could not generate invoice" });
  }
};
