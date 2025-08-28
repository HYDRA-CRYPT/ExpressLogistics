import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import JsBarcode from "jsbarcode";
import {
  Download,
  FileText,
  Loader2,
  Eye,
  Upload,
  CheckCircle,
} from "lucide-react";

interface ShipmentData {
  shipmentType: string;
  pickupDate: string;
  deliveryDate: string;
  sender: {
    name: string;
    city: string;
    country: string;
    phone: string;
    email: string;
  };
  receiver: {
    name: string;
    city: string;
    country: string;
    phone: string;
    email: string;
  };
  items: Array<{
    description: string;
    quantity: number;
    weight: number;
    value: number;
  }>;
  deliveryFee: number;
  currency: { code: string; symbol: string; name: string };
  checkEmail: boolean;
}

interface PDFGeneratorProps {
  shipmentData: ShipmentData;
  onPDFGenerated?: (pdfBlob: Blob) => void;
  autoGenerate?: boolean;
  trackingCode?: string; // From delivery creation response
}

export const PDFGenerator: React.FC<PDFGeneratorProps> = ({
  shipmentData,
  onPDFGenerated,
  autoGenerate = false,
  trackingCode,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

  const generateBarcode = (text: string): string => {
    const canvas = document.createElement("canvas");
    JsBarcode(canvas, text, {
      format: "CODE128",
      width: 2,
      height: 50,
      displayValue: true,
      fontSize: 10,
      textMargin: 2,
      margin: 0,
    });
    return canvas.toDataURL("image/png");
  };

  const generateTrackingID = (): string => {
    return (
      trackingCode ||
      `SP${Date.now().toString().slice(-8)}${Math.random()
        .toString(36)
        .substr(2, 4)
        .toUpperCase()}`
    );
  };

  const formatCurrency = (amount: number): string => {
    return `${shipmentData.currency.symbol}${amount.toFixed(2)}`;
  };

  // Generate PDF using jsPDF
  const generatePDF = async (): Promise<Blob> => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = 210;
    let yPos = 15;

    const trackingID = generateTrackingID();

    // Company Header
    doc.setFillColor(37, 99, 235);
    doc.rect(0, 0, pageWidth, 25, "F");

    // Company Name
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("SWIFT COURIER", 20, 18);

    // Company Tagline
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Fast • Reliable • Secure Delivery Services", 20, 22);

    // Logo placeholder
    doc.setFillColor(255, 255, 255);
    doc.rect(160, 5, 35, 15, "F");
    doc.setTextColor(37, 99, 235);
    doc.setFontSize(8);
    doc.text("COMPANY", 170, 11);
    doc.text("LOGO", 173, 15);

    yPos = 35;

    // Invoice Title and Tracking
    doc.setFillColor(245, 245, 245);
    doc.rect(15, yPos, pageWidth - 30, 15, "F");
    doc.setDrawColor(200, 200, 200);
    doc.rect(15, yPos, pageWidth - 30, 15);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("SHIPMENT INVOICE", 20, yPos + 6);

    doc.setFontSize(12);
    doc.text(`Tracking ID: ${trackingID}`, 20, yPos + 11);

    // Date and Invoice Number
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(`Invoice Date: ${new Date().toLocaleDateString()}`, 130, yPos + 6);
    doc.text(
      `Invoice #: INV-${Date.now().toString().slice(-6)}`,
      130,
      yPos + 11
    );

    yPos += 25;

    // Shipment Details Box
    doc.setFillColor(250, 250, 250);
    doc.rect(15, yPos, pageWidth - 30, 20, "F");
    doc.setDrawColor(150, 150, 150);
    doc.rect(15, yPos, pageWidth - 30, 20);

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("SHIPMENT DETAILS", 20, yPos + 6);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const shipmentDetails = [
      `Service Type: ${shipmentData.shipmentType}`,
      `Pickup Date: ${shipmentData.pickupDate}`,
      `Delivery Date: ${shipmentData.deliveryDate}`,
      `Email Notifications: ${
        shipmentData.checkEmail ? "Enabled" : "Disabled"
      }`,
    ];

    shipmentDetails.forEach((detail, index) => {
      const xPos = index % 2 === 0 ? 20 : 110;
      const currentY = yPos + 10 + Math.floor(index / 2) * 4;
      doc.text(detail, xPos, currentY);
    });

    yPos += 30;

    // Sender and Receiver Information
    const drawContactBox = (
      title: string,
      contact: any,
      x: number,
      y: number,
      width: number,
      color: number[]
    ) => {
      // Header
      doc.setFillColor(color[0], color[1], color[2]);
      doc.rect(x, y, width, 8, "F");
      doc.setDrawColor(0, 0, 0);
      doc.rect(x, y, width, 8);

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(title, x + 3, y + 5.5);

      // Content box
      const contentHeight = 35;
      doc.setFillColor(255, 255, 255);
      doc.rect(x, y + 8, width, contentHeight, "F");
      doc.rect(x, y + 8, width, contentHeight);

      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);

      const contactInfo = [
        `Name: ${contact.name}`,
        `City: ${contact.city}`,
        `Country: ${contact.country}`,
        `Phone: ${contact.phone}`,
        `Email: ${contact.email}`,
      ];

      contactInfo.forEach((info, index) => {
        doc.text(info, x + 3, y + 13 + index * 5);
      });

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

    // Items Section
    doc.setFillColor(37, 99, 235);
    doc.rect(15, yPos, pageWidth - 30, 8, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("PACKAGE CONTENTS", 20, yPos + 5.5);

    yPos += 10;

    // Items table header
    const tableHeaders = ["Description", "Qty", "Weight (kg)", "Value"];
    const colWidths = [90, 25, 30, 35];
    let xPos = 15;

    doc.setFillColor(230, 230, 230);
    doc.rect(15, yPos, pageWidth - 30, 7, "F");
    doc.setDrawColor(0, 0, 0);
    doc.rect(15, yPos, pageWidth - 30, 7);

    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);

    tableHeaders.forEach((header, index) => {
      doc.text(header, xPos + 2, yPos + 4.5);
      if (index < tableHeaders.length - 1) {
        doc.line(
          xPos + colWidths[index],
          yPos,
          xPos + colWidths[index],
          yPos + 7
        );
      }
      xPos += colWidths[index];
    });

    yPos += 7;

    // Items data
    doc.setFont("helvetica", "normal");
    let totalWeight = 0;
    let totalValue = 0;

    shipmentData.items.forEach((item, index) => {
      xPos = 15;
      const rowY = yPos + index * 7;

      // Alternate row colors
      if (index % 2 === 1) {
        doc.setFillColor(248, 248, 248);
        doc.rect(15, rowY, pageWidth - 30, 7, "F");
      }

      // Draw row borders
      doc.setDrawColor(200, 200, 200);
      doc.rect(15, rowY, pageWidth - 30, 7);

      const itemData = [
        item.description.length > 35
          ? item.description.substring(0, 35) + "..."
          : item.description,
        item.quantity.toString(),
        item.weight.toFixed(2),
        formatCurrency(item.value),
      ];

      itemData.forEach((data, colIndex) => {
        doc.text(data, xPos + 2, rowY + 4.5);
        if (colIndex < itemData.length - 1) {
          doc.line(
            xPos + colWidths[colIndex],
            rowY,
            xPos + colWidths[colIndex],
            rowY + 7
          );
        }
        xPos += colWidths[colIndex];
      });

      totalWeight += item.weight;
      totalValue += item.value;
    });

    yPos += shipmentData.items.length * 7 + 10;

    // Totals Section
    doc.setFillColor(245, 245, 245);
    doc.rect(15, yPos, pageWidth - 30, 20, "F");
    doc.setDrawColor(0, 0, 0);
    doc.rect(15, yPos, pageWidth - 30, 20);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("SUMMARY", 20, yPos + 6);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(`Total Items: ${shipmentData.items.length}`, 20, yPos + 11);
    doc.text(`Total Weight: ${totalWeight.toFixed(2)} kg`, 20, yPos + 15);

    doc.text(`Declared Value: ${formatCurrency(totalValue)}`, 110, yPos + 11);
    doc.setFont("helvetica", "bold");
    doc.text(
      `Delivery Fee: ${formatCurrency(shipmentData.deliveryFee)}`,
      110,
      yPos + 15
    );

    yPos += 30;

    // Barcode Section
    try {
      const barcodeDataURL = generateBarcode(trackingID);
      doc.addImage(barcodeDataURL, "PNG", 15, yPos, 70, 15);

      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text("Scan for tracking", 15, yPos + 18);
    } catch (error) {
      console.warn("Barcode generation failed:", error);
    }

    yPos += 25;

    // Signature and Stamp Section
    doc.setDrawColor(100, 100, 100);
    doc.setFillColor(250, 250, 250);

    // Official Stamp
    doc.rect(75, yPos, 55, 25, "FD");
    doc.text("OFFICIAL STAMP", 90, yPos + 8);
    doc.setDrawColor(150, 150, 150);
    doc.circle(102, yPos + 15, 8, "D");
    doc.text("COURIER", 95, yPos + 14);
    doc.text("SERVICES", 94, yPos + 17);

    // Footer
    doc.setFillColor(37, 99, 235);
    doc.rect(0, yPos, pageWidth, 15, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(
      "Swift Courier Services | 24/7 Customer Support: +1-800-SWIFT-1 | www.swiftcourier.com",
      20,
      yPos + 5
    );
    doc.text(
      `Generated: ${new Date().toLocaleString()} | This is a computer-generated invoice.`,
      20,
      yPos + 9
    );

    return doc.output("blob");
  };

  // Function to upload PDF to your backend/cloud storage
  const uploadToAssets = async (pdfBlob: Blob): Promise<string> => {
    setIsUploading(true);

    try {
      const formData = new FormData();
      const fileName = `invoice-${generateTrackingID()}-${Date.now()}.pdf`;
      formData.append("file", pdfBlob, fileName);
      formData.append("folder", "invoices"); // Optional: organize in folders

      // Replace with your actual upload endpoint
      const token = localStorage.getItem("adminToken");
      const response = await fetch("/api/upload/assets", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type header when using FormData
        },
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const result = await response.json();
      return result.url; // Your API should return the file URL
    } catch (error) {
      console.error("Upload to assets failed:", error);
      // Fallback: could use Cloudinary or other cloud storage
      return await uploadToCloudinary(pdfBlob);
    } finally {
      setIsUploading(false);
    }
  };

  // Fallback cloud storage function
  const uploadToCloudinary = async (pdfBlob: Blob): Promise<string> => {
    const formData = new FormData();
    formData.append("file", pdfBlob);
    formData.append("upload_preset", "your_cloudinary_preset"); // Replace with your preset
    formData.append("resource_type", "raw"); // For PDF files
    formData.append("folder", "invoices");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/your_cloud_name/raw/upload", // Replace with your cloud name
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Cloudinary upload failed");
    }

    const result = await response.json();
    return result.secure_url;
  };

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    try {
      const pdfBlob = await generatePDF();
      setPdfBlob(pdfBlob);

      // Create preview URL
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);

      // Call the callback if provided
      if (onPDFGenerated) {
        onPDFGenerated(pdfBlob);
      }

      // Auto-upload to assets
      try {
        const uploadedUrl = await uploadToAssets(pdfBlob);
        setUploadedUrl(uploadedUrl);
        console.log("PDF uploaded to assets:", uploadedUrl);
      } catch (uploadError) {
        console.warn(
          "Upload to assets failed, but PDF generated successfully:",
          uploadError
        );
      }

      // Auto-download
      const a = document.createElement("a");
      a.href = url;
      a.download = `shipment-invoice-${generateTrackingID()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Auto-generate when component mounts if autoGenerate is true
  useEffect(() => {
    if (
      autoGenerate &&
      shipmentData.sender.name &&
      shipmentData.receiver.name
    ) {
      handleGeneratePDF();
    }
  }, [autoGenerate, shipmentData]);

  const handlePreview = () => {
    if (pdfUrl) {
      window.open(pdfUrl, "_blank");
    }
  };

  const handleUploadOnly = async () => {
    if (pdfBlob) {
      try {
        const uploadedUrl = await uploadToAssets(pdfBlob);
        setUploadedUrl(uploadedUrl);
        alert("PDF uploaded to assets successfully!");
      } catch (error) {
        alert("Failed to upload PDF to assets.");
        console.log(error);
      }
    }
  };

  const isDataComplete = () => {
    return (
      shipmentData.sender.name &&
      shipmentData.receiver.name &&
      shipmentData.items.length > 0
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-bold text-gray-800">
          Generate Professional Invoice
        </h3>
        {trackingCode && (
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
            Tracking: {trackingCode}
          </span>
        )}
      </div>

      <div className="space-y-4">
        {/* Invoice Preview */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-3">Invoice Preview</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div>
                <span className="font-medium text-blue-700">Service:</span>{" "}
                <span className="text-gray-700">
                  {shipmentData.shipmentType}
                </span>
              </div>
              <div>
                <span className="font-medium text-blue-700">From:</span>{" "}
                <span className="text-gray-700">
                  {shipmentData.sender.name || "Not specified"}
                </span>
              </div>
              <div>
                <span className="font-medium text-blue-700">To:</span>{" "}
                <span className="text-gray-700">
                  {shipmentData.receiver.name || "Not specified"}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <span className="font-medium text-blue-700">Items:</span>{" "}
                <span className="text-gray-700">
                  {shipmentData.items.length}
                </span>
              </div>
              <div>
                <span className="font-medium text-blue-700">Weight:</span>{" "}
                <span className="text-gray-700">
                  {shipmentData.items
                    .reduce((sum, item) => sum + item.weight, 0)
                    .toFixed(2)}{" "}
                  kg
                </span>
              </div>
              <div>
                <span className="font-medium text-blue-700">Fee:</span>{" "}
                <span className="text-gray-700 font-semibold">
                  {shipmentData.currency.symbol}
                  {shipmentData.deliveryFee}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Status indicators */}
        <div className="flex gap-2">
          {pdfUrl && (
            <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded text-sm">
              <CheckCircle className="w-4 h-4" />
              PDF Generated
            </div>
          )}
          {uploadedUrl && (
            <div className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-1 rounded text-sm">
              <Upload className="w-4 h-4" />
              Uploaded to Assets
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleGeneratePDF}
            disabled={isGenerating || !isDataComplete()}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Download className="w-5 h-5" />
            )}
            {isGenerating ? "Generating PDF..." : "Generate & Download"}
          </button>

          {pdfUrl && (
            <button
              onClick={handlePreview}
              className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center gap-2"
            >
              <Eye className="w-5 h-5" />
              Preview
            </button>
          )}

          {pdfBlob && !uploadedUrl && (
            <button
              onClick={handleUploadOnly}
              disabled={isUploading}
              className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center gap-2"
            >
              {isUploading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              {isUploading ? "Uploading..." : "Upload to Assets"}
            </button>
          )}
        </div>

        {/* Upload URL Display */}
        {uploadedUrl && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <h5 className="font-medium text-green-800 mb-2">
              PDF Stored Successfully!
            </h5>
            <div className="text-sm text-green-700">
              <p className="mb-1">Asset URL:</p>
              <code className="bg-white px-2 py-1 rounded text-xs break-all">
                {uploadedUrl}
              </code>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(uploadedUrl);
                  alert("URL copied to clipboard!");
                }}
                className="ml-2 text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
              >
                Copy URL
              </button>
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h5 className="font-medium text-gray-800 mb-2">Features Included:</h5>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
            <div>✓ Professional layout & branding</div>
            <div>✓ Tracking barcode generation</div>
            <div>✓ Sender & receiver details</div>
            <div>✓ Itemized package contents</div>
            <div>✓ Signature & stamp sections</div>
            <div>✓ Auto-upload to assets folder</div>
          </div>
        </div>

        {/* Data Completion Status */}
        {!isDataComplete() && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-yellow-800 text-sm">
              ⚠️ Complete sender, receiver, and item information to generate PDF
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
