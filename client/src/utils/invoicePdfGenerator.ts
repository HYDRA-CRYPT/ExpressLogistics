import jsPDF from "jspdf";
import type { DeliveryData } from "../types/invoice";

export const generateInvoicePDF = (delivery: DeliveryData): jsPDF => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 20;

  // Helper function to set colors
  const setBlueColor = () => doc.setFillColor(30, 64, 175);
  const setLightBlueColor = () => doc.setFillColor(224, 242, 254);
  const setDarkTextColor = () => doc.setTextColor(31, 41, 55);
  const setGrayTextColor = () => doc.setTextColor(107, 116, 128);

  let yPos = 20;

  // HEADER SECTION WITH BLUE BACKGROUND
  setBlueColor();
  doc.rect(0, 0, pageWidth, 50, "F");

  // Enhanced Logo area with Aegis Express branding
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, 15, 50, 20, 3, 3, "F");

  // Aegis Express Logo design - using text instead of symbols
  doc.setTextColor(30, 64, 175);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("AEGIS", margin + 5, 24);
  doc.setFontSize(12);
  doc.text("EXPRESS", margin + 5, 28);
  doc.setFontSize(8);
  doc.text("LOGISTICS", margin + 5, 32);

  // INVOICE title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(32);
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE", margin + 60, 35);

  // Invoice details box with enhanced styling
  const detailsX = pageWidth - 80;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(detailsX, 10, 70, 30, 2, 2, "F");

  setDarkTextColor();
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");

  const currentDate = new Date().toLocaleDateString();
  const invoiceNumber = `AEL-${Date.now().toString().slice(-8)}`;

  doc.text(`Invoice #: ${invoiceNumber}`, detailsX + 3, 18);
  doc.text(`Due Date: ${currentDate}`, detailsX + 3, 24);
  doc.text(`Invoice Date: ${currentDate}`, detailsX + 3, 30);

  yPos = 75;

  // BILLING INFORMATION SECTION with improved layout
  setDarkTextColor();
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");

  // Bill To Box
  doc.setFillColor(240, 249, 255);
  doc.roundedRect(margin, yPos, 75, 50, 2, 2, "F");
  doc.setDrawColor(30, 64, 175);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, yPos, 75, 50, 2, 2, "S");

  doc.setTextColor(30, 64, 175);
  doc.text("Bill To:", margin + 3, yPos + 8);

  // Bill From Box
  doc.setFillColor(240, 249, 255);
  doc.roundedRect(margin + 85, yPos, 75, 50, 2, 2, "F");
  doc.roundedRect(margin + 85, yPos, 75, 50, 2, 2, "S");

  doc.text("Bill From:", margin + 88, yPos + 8);

  yPos += 12;

  // Bill To information
  setGrayTextColor();
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");

  const receiverInfo = [
    delivery.receiver?.name || "Customer Name",
    delivery.receiver?.address || "Customer Address",
    `${delivery.receiver?.city || "City"}, ${
      delivery.receiver?.country || "Country"
    }`,
    delivery.receiver?.email || "customer@email.com",
    delivery.receiver?.phone || "+1234567890",
  ];

  receiverInfo.forEach((info, index) => {
    doc.text(info, margin + 3, yPos + index * 5);
  });

  // Bill From information
  const senderInfo = [
    delivery.sender?.name || "Aegis Express Logistics",
    delivery.sender?.address || "1301 2nd St NW Wasecae",
    `${delivery.sender?.city || "Minnesota(MN)"}, ${
      delivery.sender?.country || "United States of America"
    }`,
    delivery.sender?.email || "support@aegisexpress.com",
    delivery.sender?.phone || "+234 801 234 5678",
  ];

  senderInfo.forEach((info, index) => {
    doc.text(info, margin + 88, yPos + index * 5);
  });

  yPos += 55;

  // SHIPMENT DETAILS SECTION
  setBlueColor();
  doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 25, 2, 2, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("SHIPMENT DETAILS", margin + 5, yPos + 10);

  doc.setFontSize(10);
  doc.text(`Tracking: ${delivery.trackingCode}`, margin + 5, yPos + 18);
  doc.text(`Status: ${delivery.status}`, margin + 80, yPos + 18);
  doc.text(
    `Service: ${delivery.shipmentType || "Express"}`,
    margin + 130,
    yPos + 18
  );

  yPos += 35;

  // TABLE HEADER with enhanced styling
  setBlueColor();
  doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 12, 2, 2, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");

  // Table headers with better spacing
  doc.text("#", margin + 3, yPos + 8);
  doc.text("Description", margin + 15, yPos + 8);
  doc.text("Unit Price", margin + 90, yPos + 8);
  doc.text("Qty", margin + 125, yPos + 8);
  doc.text("Total", margin + 145, yPos + 8);

  yPos += 12;

  // TABLE ROWS with alternating colors
  let subtotal = 0;
  const rowHeight = 12;

  if (delivery.items && delivery.items.length > 0) {
    delivery.items.forEach((item, index) => {
      const itemTotal = (item.value || 0) * (item.quantity || 1);
      subtotal += itemTotal;

      // Alternating row colors with rounded corners
      if (index % 2 === 0) {
        setLightBlueColor();
        doc.roundedRect(
          margin,
          yPos,
          pageWidth - 2 * margin,
          rowHeight,
          1,
          1,
          "F"
        );
      }

      setDarkTextColor();
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");

      // Row data with better formatting
      doc.text((index + 1).toString(), margin + 3, yPos + 8);

      // Truncate description if too long
      const description = item.description?.substring(0, 35) || "Package Item";
      doc.text(description, margin + 15, yPos + 8);

      doc.text(
        `${delivery.currency || "USD"}${(item.value || 0).toFixed(2)}`,
        margin + 90,
        yPos + 8
      );
      doc.text((item.quantity || 1).toString(), margin + 125, yPos + 8);
      doc.text(
        `${delivery.currency || "USD"}${itemTotal.toFixed(2)}`,
        margin + 145,
        yPos + 8
      );

      yPos += rowHeight;
    });
  } else {
    // Default row if no items with enhanced styling
    setLightBlueColor();
    doc.roundedRect(margin, yPos, pageWidth - 2 * margin, rowHeight, 1, 1, "F");

    setDarkTextColor();
    doc.setFontSize(9);
    doc.text("1", margin + 3, yPos + 8);
    doc.text(
      "General Package - Premium Shipping Service",
      margin + 15,
      yPos + 8
    );
    doc.text(`${delivery.currency || "USD"}100.00`, margin + 90, yPos + 8);
    doc.text("1", margin + 125, yPos + 8);
    doc.text(`${delivery.currency || "USD"}100.00`, margin + 145, yPos + 8);
    subtotal = 100;
    yPos += rowHeight;
  }

  yPos += 15;

  // TOTALS SECTION with enhanced design
  const totalsX = pageWidth - 90;
  const totalsWidth = 80;

  // Calculate totals
  const tax = subtotal * 0.075; // 7.5% tax
  const deliveryFee = delivery.deliveryFee || 0;
  const total = subtotal + tax + deliveryFee;

  // Totals background
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(totalsX, yPos, totalsWidth, 40, 3, 3, "F");
  doc.setDrawColor(30, 64, 175);
  doc.setLineWidth(1);
  doc.roundedRect(totalsX, yPos, totalsWidth, 40, 3, 3, "S");

  setDarkTextColor();
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");

  // Subtotal
  doc.text("Subtotal:", totalsX + 5, yPos + 8);
  doc.text(
    `${delivery.currency || "USD"}${subtotal.toFixed(2)}`,
    totalsX + 45,
    yPos + 8
  );

  // Tax
  doc.text("Tax (7.5%):", totalsX + 5, yPos + 16);
  doc.text(
    `${delivery.currency || "USD"}${tax.toFixed(2)}`,
    totalsX + 45,
    yPos + 16
  );

  // Delivery Fee
  doc.text("Delivery:", totalsX + 5, yPos + 24);
  doc.text(
    `${delivery.currency || "USD"}${deliveryFee.toFixed(2)}`,
    totalsX + 45,
    yPos + 24
  );

  // Total with emphasis
  setBlueColor();
  doc.roundedRect(totalsX + 2, yPos + 28, totalsWidth - 4, 10, 2, 2, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text("TOTAL:", totalsX + 5, yPos + 35);
  doc.text(
    `${delivery.currency || "USD"}${total.toFixed(2)}`,
    totalsX + 45,
    yPos + 35
  );

  yPos += 60;

  // PAYMENT & TERMS SECTION with improved layout
  const sectionWidth = (pageWidth - 3 * margin) / 2;

  // Payment Methods
  doc.setFillColor(240, 249, 255);
  doc.roundedRect(margin, yPos, sectionWidth, 35, 2, 2, "F");
  doc.setDrawColor(30, 64, 175);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, yPos, sectionWidth, 35, 2, 2, "S");

  setDarkTextColor();
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Payment Methods:", margin + 3, yPos + 8);

  setGrayTextColor();
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("Bank: First Bank Nigeria", margin + 3, yPos + 16);
  doc.text("Account: 1234567890", margin + 3, yPos + 22);
  doc.text("Sort Code: 011-152-016", margin + 3, yPos + 28);

  // Terms & Conditions
  const termsX = margin + sectionWidth + 10;
  doc.setFillColor(240, 249, 255);
  doc.roundedRect(termsX, yPos, sectionWidth, 35, 2, 2, "F");
  doc.roundedRect(termsX, yPos, sectionWidth, 35, 2, 2, "S");

  setDarkTextColor();
  doc.setFont("helvetica", "bold");
  doc.text("Terms & Conditions:", termsX + 3, yPos + 8);

  setGrayTextColor();
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.text("- Payment due within 30 days", termsX + 3, yPos + 16);
  doc.text("- Insurance up to declared value", termsX + 3, yPos + 20);
  doc.text("- Claims within 7 days of delivery", termsX + 3, yPos + 24);
  doc.text("- Subject to terms of service", termsX + 3, yPos + 28);

  yPos += 50;

  // TRACKING SECTION with barcode simulation
  doc.setFillColor(240, 249, 255);
  doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 20, 2, 2, "F");
  doc.setDrawColor(30, 64, 175);
  doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 20, 2, 2, "S");

  setDarkTextColor();
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Track Online:", margin + 5, yPos + 8);
  doc.text(
    `www.aegisexpress.com/track/${delivery.trackingCode}`,
    margin + 5,
    yPos + 15
  );

  // Barcode simulation
  doc.setFillColor(0, 0, 0);
  for (let i = 0; i < 40; i++) {
    const barWidth = Math.random() > 0.5 ? 1 : 0.5;
    doc.rect(margin + 120 + i * 1.5, yPos + 5, barWidth, 10, "F");
  }

  yPos += 30;

  // THANK YOU SECTION with enhanced styling
  setBlueColor();
  doc.roundedRect(0, pageHeight - 40, pageWidth, 40, 0, 0, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.text("THANK YOU!", pageWidth / 2 - 35, pageHeight - 25);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(
    "For choosing Aegis Express Logistics",
    pageWidth / 2 - 35,
    pageHeight - 15
  );

  // Contact info in footer
  doc.setFontSize(8);
  doc.text(
    "Email: support@aegisexpress.com | Phone: +234 801 234 5678 | Web: www.aegisexpress.com",
    pageWidth / 2 - 60,
    pageHeight - 5
  );

  return doc;
};

// Function to generate and download PDF
export const downloadInvoicePDF = (delivery: DeliveryData): void => {
  const pdf = generateInvoicePDF(delivery);

  // Generate blob and create download link
  const pdfBlob = pdf.output("blob");
  const url = URL.createObjectURL(pdfBlob);

  // Create download link
  const fileName = `Invoice-${delivery.trackingCode}-${
    new Date().toISOString().split("T")[0]
  }.pdf`;
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.style.display = "none";

  // Trigger download
  document.body.appendChild(link);
  link.click();

  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Function to generate PDF as blob for uploading
export const generateInvoicePDFBlob = (delivery: DeliveryData): Blob => {
  const pdf = generateInvoicePDF(delivery);
  return pdf.output("blob");
};

// Function to preview PDF in new window
export const previewInvoicePDF = (delivery: DeliveryData): void => {
  const pdf = generateInvoicePDF(delivery);
  const pdfBlob = pdf.output("blob");
  const url = URL.createObjectURL(pdfBlob);
  window.open(url, "_blank");
};
