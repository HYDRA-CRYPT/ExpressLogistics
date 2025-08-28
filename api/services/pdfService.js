import PDFDocument from "pdfkit";
import streamifier from "streamifier";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const generateInvoicePDF = async (delivery) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      margin: 7,
      size: "A4",
      info: {
        Title: `Invoice - ${delivery.trackingCode}`,
        Author: "TechAgba Logistics",
        Subject: "Delivery Invoice",
        Creator: "TechAgba Logistics System",
      },
    });

    const chunks = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;
    const margin = doc.page.margins.left;

    let yPos = 5;

    // HEADER SECTION
    doc.rect(0, 0, pageWidth, 70).fill("#2563eb");
    doc
      .fillColor("#ffffff")
      .fontSize(28)
      .font("Helvetica-Bold")
      .text("TECHAGBA LOGISTICS", 40, 25);
    doc
      .fontSize(12)
      .font("Helvetica")
      .text("Fast • Reliable • Secure Delivery Services", 40, 50);
    doc
      .rect(pageWidth - 120, 15, 80, 40)
      .stroke("#ffffff")
      .fillColor("#ffffff")
      .fill();
    doc
      .fillColor("#2563eb")
      .fontSize(10)
      .text("COMPANY", pageWidth - 100, 25)
      .text("LOGO", pageWidth - 95, 40);

    yPos = doc.y + 20;

    // INVOICE TITLE
    doc
      .rect(30, yPos, pageWidth - 60, 40)
      .fillColor("#f5f5f5")
      .fill()
      .stroke("#cccccc");
    doc
      .fillColor("#000000")
      .fontSize(20)
      .font("Helvetica-Bold")
      .text("SHIPMENT INVOICE", 40, yPos + 8);
    doc
      .fontSize(14)
      .font("Helvetica")
      .text(`Tracking ID: ${delivery.trackingCode}`, 40, yPos + 25);

    const currentDate = new Date().toLocaleDateString();
    const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;
    doc
      .fontSize(10)
      .text(`Invoice Date: ${currentDate}`, pageWidth - 150, yPos + 8)
      .text(`Invoice #: ${invoiceNumber}`, pageWidth - 150, yPos + 22);

    yPos = doc.y + 20;

    // SHIPMENT DETAILS
    doc
      .rect(30, yPos, pageWidth - 60, 50)
      .fillColor("#fafafa")
      .fill()
      .stroke("#999999");
    doc
      .fillColor("#000000")
      .fontSize(12)
      .font("Helvetica-Bold")
      .text("SHIPMENT DETAILS", 40, yPos + 10);
    doc.fontSize(10).font("Helvetica");

    const shipmentDetails = [
      `Service Type: ${delivery.serviceType || "Standard"}`,
      `Status: ${delivery.status}`,
      `Pickup Date: ${
        delivery.pickupDate
          ? new Date(delivery.pickupDate).toLocaleDateString()
          : "N/A"
      }`,
      `Delivery Date: ${
        delivery.deliveryDate
          ? new Date(delivery.deliveryDate).toLocaleDateString()
          : "N/A"
      }`,
    ];

    shipmentDetails.forEach((detail, index) => {
      const xPosDetail = index % 2 === 0 ? 40 : 300;
      const currentY = yPos + 25 + Math.floor(index / 2) * 12;
      doc.text(detail, xPosDetail, currentY);
    });

    yPos = doc.y + 20;

    // SENDER & RECEIVER
    const drawContactBox = (title, contact, x, y, width, headerColor) => {
      doc.rect(x, y, width, 25).fillColor(headerColor).fill();
      doc
        .fillColor("#ffffff")
        .fontSize(11)
        .font("Helvetica-Bold")
        .text(title, x + 10, y + 8);

      const contentHeight = 90;
      doc
        .rect(x, y + 25, width, contentHeight)
        .fillColor("#ffffff")
        .fill()
        .stroke("#cccccc");
      doc.fillColor("#000000").fontSize(10).font("Helvetica");

      const contactInfo = [
        `Name: ${contact?.name || "N/A"}`,
        `Address: ${contact?.address || "N/A"}`,
        `City: ${contact?.city || "N/A"}`,
        `Country: ${contact?.country || "N/A"}`,
        `Phone: ${contact?.phone || "N/A"}`,
        `Email: ${contact?.email || "N/A"}`,
      ];
      contactInfo.forEach((info, idx) =>
        doc.text(info, x + 10, y + 35 + idx * 12)
      );
      return y + 25 + contentHeight;
    };

    const senderEndY = drawContactBox(
      "FROM (SENDER)",
      delivery.sender,
      30,
      yPos,
      260,
      "#2563eb"
    );
    const receiverEndY = drawContactBox(
      "TO (RECEIVER)",
      delivery.receiver,
      310,
      yPos,
      260,
      "#10b981"
    );
    yPos = Math.max(senderEndY, receiverEndY) + 20;

    // PACKAGE CONTENTS HEADER
    doc
      .rect(30, yPos, pageWidth - 60, 25)
      .fillColor("#2563eb")
      .fill();
    doc
      .fillColor("#ffffff")
      .fontSize(12)
      .font("Helvetica-Bold")
      .text("PACKAGE CONTENTS", 40, yPos + 8);
    yPos = doc.y + 10;

    // TABLE HEADERS
    const tableHeaders = ["Description", "Qty", "Weight (kg)", "Value"];
    const colWidths = [280, 60, 80, 100];
    doc
      .rect(30, yPos, pageWidth - 60, 20)
      .fillColor("#e5e7eb")
      .fill()
      .stroke("#000000");
    doc.fillColor("#000000").fontSize(10).font("Helvetica-Bold");
    let xPosHeader = 30;
    tableHeaders.forEach((header, index) => {
      doc.text(header, xPosHeader + 5, yPos + 6);
      if (index < tableHeaders.length - 1) {
        doc
          .moveTo(xPosHeader + colWidths[index], yPos)
          .lineTo(xPosHeader + colWidths[index], yPos + 20)
          .stroke();
      }
      xPosHeader += colWidths[index];
    });

    yPos = doc.y + 5;

    // ITEMS DATA
    let totalWeight = 0;
    let totalValue = 0;

    if (delivery.items && delivery.items.length > 0) {
      delivery.items.forEach((item, index) => {
        const rowHeight = 20;
        const currentRowY = yPos + index * rowHeight;
        if (index % 2 === 1)
          doc
            .rect(30, currentRowY, pageWidth - 60, rowHeight)
            .fillColor("#f8f9fa")
            .fill();
        doc.rect(30, currentRowY, pageWidth - 60, rowHeight).stroke("#cccccc");

        const itemData = [
          item.description?.length > 35
            ? item.description.substring(0, 35) + "..."
            : item.description || "N/A",
          (item.quantity || 0).toString(),
          (item.weight || 0).toFixed(2),
          `${delivery.currency || "$"} ${(item.value || 0).toLocaleString()}`,
        ];

        let xItem = 30;
        itemData.forEach((data, colIdx) => {
          doc.text(data, xItem + 5, currentRowY + 6);
          if (colIdx < itemData.length - 1) {
            doc
              .moveTo(xItem + colWidths[colIdx], currentRowY)
              .lineTo(xItem + colWidths[colIdx], currentRowY + rowHeight)
              .stroke();
          }
          xItem += colWidths[colIdx];
        });

        totalWeight += item.weight || 0;
        totalValue += item.value || 0;
      });

      yPos = yPos + delivery.items.length * 20 + 10;
    } else {
      doc
        .rect(30, yPos, pageWidth - 60, 30)
        .fillColor("#f8f9fa")
        .fill()
        .stroke("#cccccc");
      doc.fillColor("#666666").text("No items specified", 40, yPos + 10);
      yPos = doc.y + 20;
    }

    // TOTALS SECTION
    yPos = doc.y + 10; // tighten spacing
    doc
      .rect(30, yPos, pageWidth - 60, 50)
      .fillColor("#f5f5f5")
      .fill()
      .stroke("#000000");
    doc
      .fillColor("#000000")
      .fontSize(12)
      .font("Helvetica-Bold")
      .text("SUMMARY", 40, yPos + 10);
    doc
      .fontSize(10)
      .font("Helvetica")
      .text(`Total Items: ${delivery.items?.length || 0}`, 40, yPos + 25)
      .text(`Total Weight: ${totalWeight.toFixed(2)} kg`, 40, yPos + 35)
      .text(
        `Declared Value: ${
          delivery.currency || "$"
        } ${totalValue.toLocaleString()}`,
        300,
        yPos + 25
      )
      .text(
        `Delivery Fee: ${delivery.currency || "$"} ${(
          delivery.deliveryFee || 0
        ).toLocaleString()}`,
        300,
        yPos + 35
      );

    yPos = doc.y + 10;

    // BARCODE SECTION
    doc.rect(30, yPos, 200, 40).fillColor("#ffffff").fill().stroke("#cccccc");
    doc
      .fillColor("#000000")
      .fontSize(8)
      .font("Helvetica")
      .text("TRACKING BARCODE", 40, yPos + 5);
    doc
      .fontSize(20)
      .font("Helvetica-Bold")
      .text(delivery.trackingCode, 40, yPos + 15);

    // Only a small gap to signature/stamp
    yPos = doc.y + 15;

    // SIGNATURE AND STAMP
    doc.rect(350, yPos, 150, 60).fillColor("#fafafa").fill().stroke("#999999");
    doc
      .fillColor("#000000")
      .fontSize(10)
      .font("Helvetica-Bold")
      .text("OFFICIAL STAMP", 370, yPos + 10);
    doc.circle(425, yPos + 35, 20).stroke("#999999");
    doc
      .fontSize(8)
      .text("LOGISTICS", 405, yPos + 30)
      .text("SERVICES", 405, yPos + 40);

    // FOOTER
    yPos = doc.y + 10;
    if (yPos > pageHeight - margin - 40) {
      doc.addPage();
      yPos = margin;
    }
    doc.rect(0, yPos, pageWidth, 40).fillColor("#2563eb").fill();
    doc
      .fillColor("#ffffff")
      .fontSize(9)
      .font("Helvetica")
      .text(
        "TechAgba Logistics | 24/7 Customer Support: techagbadev@gmail.com | Fast, Reliable, Secure",
        30,
        yPos + 8
      );

    doc.end();
  });
};

export const uploadInvoiceToCloudinary = async (pdfBuffer, trackingCode) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      {
        resource_type: "raw",
        folder: "invoices",
        public_id: `invoice_${trackingCode}_${Date.now()}`,
        format: "pdf",
        flags: "attachment", // Forces download
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          reject(error);
        } else {
          console.log("PDF uploaded successfully:", result.secure_url);
          resolve(result.secure_url);
        }
      }
    );

    streamifier.createReadStream(pdfBuffer).pipe(uploadStream);
  });
};

// Enhanced email integration - updated sendDeliveryConfirmationEmail to include PDF
export const generateAndEmailInvoice = async (delivery) => {
  try {
    // Generate PDF
    const pdfBuffer = await generateInvoicePDF(delivery);

    // Upload to Cloudinary
    const pdfUrl = await uploadInvoiceToCloudinary(
      pdfBuffer,
      delivery.trackingCode
    );

    // Update delivery with invoice URL
    delivery.invoiceUrl = pdfUrl;

    return {
      success: true,
      pdfBuffer,
      pdfUrl,
      message: "Invoice generated and uploaded successfully",
    };
  } catch (error) {
    console.error("Error generating/uploading invoice:", error);
    throw new Error(`Invoice generation failed: ${error.message}`);
  }
};
