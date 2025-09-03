import cloudinary from "cloudinary";
import streamifier from "streamifier";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload PDF buffer to Cloudinary with proper settings for PDFs
export const uploadInvoiceToCloudinary = async (pdfBuffer, trackingCode) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      {
        resource_type: "auto", // Let Cloudinary auto-detect the file type
        folder: "invoices",
        public_id: `invoice_${trackingCode}_${Date.now()}`,
        access_mode: "public", // Ensure public access
        secure: true, // Use HTTPS URLs
        overwrite: true, // Allow overwriting
        invalidate: true, // Invalidate cached version
        tags: ["invoice", "delivery", trackingCode], // Add tags for organization
        // Don't set format or flags here, let Cloudinary handle it
      },
      (error, result) => {
        if (error) {
          console.error("❌ Cloudinary upload failed:", error);
          reject(new Error(`Cloudinary upload failed: ${error.message}`));
        } else {
          console.log("✅ PDF uploaded to Cloudinary:", result.secure_url);
          resolve(result.secure_url);
        }
      }
    );

    // Pipe the PDF buffer to Cloudinary
    streamifier.createReadStream(pdfBuffer).pipe(uploadStream);
  });
};
