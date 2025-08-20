// utils/pdfService.js
import PDFDocument from "pdfkit";
import cloudinary from "cloudinary";
import streamifier from "streamifier";

// Cloudinary config (from .env)
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const generateInvoicePDF = (delivery) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const buffers = [];

      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // ✅ Invoice content (static, no status/history)
      doc.fontSize(20).text("Logistics Company Invoice", { align: "center" });
      doc.moveDown();

      doc.fontSize(12).text(`Invoice for: ${delivery.receiver.name}`);
      doc.text(`Email: ${delivery.receiver.email}`);
      doc.moveDown();

      doc.text(`Tracking Code: ${delivery.trackingCode}`);
      doc.text(`Origin: ${delivery.sender?.country}`);
      doc.text(`Destination: ${delivery.receiver?.country}`);
      doc.moveDown();

      doc.text(`Goods Description: ${delivery.goodsDescription || "N/A"}`);
      doc.text(
        `Delivery Fee: ${delivery.deliveryFee || 0} ${delivery.currency || ""}`
      );

      doc.moveDown();
      doc.fontSize(10).text("Thank you for choosing our logistics service.", {
        align: "center",
      });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};

// Upload PDF buffer to Cloudinary
export const uploadInvoiceToCloudinary = (pdfBuffer, trackingCode) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      {
        resource_type: "raw", // raw for non-image files
        public_id: `invoices/Invoice-${trackingCode}`,
        format: "pdf",
        overwrite: true, // ensure same code updates invoice
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );

    streamifier.createReadStream(pdfBuffer).pipe(uploadStream);
  });
};
