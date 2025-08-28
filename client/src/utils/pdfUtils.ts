import jsPDF from "jspdf";
import JsBarcode from "jsbarcode";
import type { ShipmentData } from "../types/shipment";

export async function generateAndUploadPDF(
  shipmentData: ShipmentData
): Promise<string> {
  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = 210;
  let yPos = 15;

  // ===== HEADER =====
  doc.setFillColor(37, 99, 235);
  doc.rect(0, 0, pageWidth, 25, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("SWIFT COURIER", 20, 18);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Fast • Reliable • Secure Delivery Services", 20, 22);

  // ===== INVOICE TITLE =====
  yPos = 35;
  doc.setFillColor(245, 245, 245);
  doc.rect(15, yPos, pageWidth - 30, 15, "F");
  doc.setDrawColor(200, 200, 200);
  doc.rect(15, yPos, pageWidth - 30, 15);

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("SHIPMENT INVOICE", 20, yPos + 6);
  doc.setFontSize(12);

  // ===== SHIPMENT DETAILS =====
  yPos += 25;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`Service: ${shipmentData.shipmentType}`, 20, yPos);
  doc.text(`Pickup: ${shipmentData.pickupDate}`, 20, yPos + 5);
  doc.text(`Delivery: ${shipmentData.deliveryDate}`, 20, yPos + 10);

  yPos += 20;

  // ===== SENDER / RECEIVER =====
  const drawContactBox = (
    title: string,
    contact: string | any,
    x: number,
    y: number,
    width: number,
    color: number[]
  ) => {
    doc.setFillColor(color[0], color[1], color[2]);
    doc.rect(x, y, width, 8, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(title, x + 3, y + 5.5);

    const contentHeight = 30;
    doc.setFillColor(255, 255, 255);
    doc.rect(x, y + 8, width, contentHeight, "F");
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);

    const info = [
      `Name: ${contact.name}`,
      `City: ${contact.city}`,
      `Country: ${contact.country}`,
      `Phone: ${contact.phone}`,
      `Email: ${contact.email}`,
    ];
    info.forEach((line, i) => doc.text(line, x + 3, y + 13 + i * 5));

    return y + 8 + contentHeight;
  };

  const senderEndY = drawContactBox(
    "FROM (SENDER)",
    shipmentData.sender,
    15,
    yPos,
    90,
    [37, 99, 235]
  );
  const receiverEndY = drawContactBox(
    "TO (RECEIVER)",
    shipmentData.receiver,
    110,
    yPos,
    90,
    [16, 185, 129]
  );

  yPos = Math.max(senderEndY, receiverEndY) + 15;
  const randomID = Math.floor(1000 + Math.random() * 9000).toString();

  // ===== BARCODE =====
  try {
    const canvas = document.createElement("canvas");
    JsBarcode(canvas, randomID, { format: "CODE128", width: 2, height: 50 });
    const barcodeDataURL = canvas.toDataURL("image/png");
    doc.addImage(barcodeDataURL, "PNG", 15, yPos, 70, 15);
    doc.setFontSize(8);
    doc.text("Scan for tracking", 15, yPos + 18);
  } catch (e) {
    console.warn("Barcode generation failed:", e);
  }

  // ===== FOOTER =====
  yPos += 25;
  doc.setFillColor(37, 99, 235);
  doc.rect(0, yPos, pageWidth, 15, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.text("Swift Courier Services | www.swiftcourier.com", 20, yPos + 5);

  // ===== EXPORT PDF =====
  const pdfBlob = new Blob([doc.output("arraybuffer")], {
    type: "application/pdf",
  });

  const formData = new FormData();
  formData.append("file", pdfBlob, `invoice_${randomID}.pdf`);
  formData.append("upload_preset", "invoices_unsigned"); // your preset
  formData.append("folder", "invoice_folder");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dk1cria0z/raw/upload",
    { method: "POST", body: formData }
  );

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(`Failed to upload invoice to Cloudinary: ${errorDetails}`);
  }

  const result = await response.json();
  console.log("PDF uploaded to Cloudinary:", result);
  return result.secure_url;
}
