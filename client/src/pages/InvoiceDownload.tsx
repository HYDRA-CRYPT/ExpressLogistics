import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  FileText,
  Package,
  Calendar,
  DollarSign,
  User,
  MapPin,
  CheckCircle,
  Loader2,
  Eye,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LoadingSpinner from "@/components/LoadingSpinner";
import NoDataUI from "@/components/NoDataUI";
import SEOHelmet from "@/components/SEOHelmet";
import { toast } from "sonner";
import {
  generateInvoicePDFBlob,
  downloadInvoicePDF,
  previewInvoicePDF,
} from "@/utils/invoicePdfGenerator";
import type { DeliveryData } from "@/types/invoice";

interface InvoiceData {
  _id?: string;
  trackingCode?: string;
  sender?: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    country?: string;
  };
  receiver?: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    country?: string;
  };
  shipmentType?: string;
  items?: Array<{
    description?: string;
    quantity?: number;
    weight?: number;
    value?: number;
  }>;
  deliveryFee?: number;
  currency?: string;
  status?: string;
  dateSent?: string | Date;
  deliveryDate?: string | Date;
  invoiceUrl?: string;
  createdAt?: string | Date;
}

const InvoiceDownload: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const [shipment, setShipment] = useState<InvoiceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [invoiceUrl, setInvoiceUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const convertToDeliveryData = (shipment: InvoiceData): DeliveryData => {
    return {
      trackingCode: shipment.trackingCode || code || "",
      status: shipment.status || "In Transit",
      shipmentType: shipment.shipmentType || "Express",
      dateSent: shipment.dateSent
        ? new Date(shipment.dateSent).toISOString().split("T")[0]
        : undefined,
      deliveryDate: shipment.deliveryDate
        ? new Date(shipment.deliveryDate).toISOString().split("T")[0]
        : undefined,
      deliveryFee: shipment.deliveryFee || 0,
      currency: shipment.currency || "$",
      sender: shipment.sender
        ? {
            name: shipment.sender.name || "",
            email: shipment.sender.email || "",
            phone: shipment.sender.phone || "",
            address: shipment.sender.address || "",
            city: shipment.sender.city || "",
            country: shipment.sender.country || "",
          }
        : undefined,
      receiver: shipment.receiver
        ? {
            name: shipment.receiver.name || "",
            email: shipment.receiver.email || "",
            phone: shipment.receiver.phone || "",
            address: shipment.receiver.address || "",
            city: shipment.receiver.city || "",
            country: shipment.receiver.country || "",
          }
        : undefined,
      items:
        shipment.items?.map((item) => ({
          description: item.description || "",
          quantity: item.quantity || 1,
          value: item.value || 0,
          weight: item.weight,
        })) || [],
    };
  };

  const fetchShipmentData = async (trackingCode: string) => {
    try {
      const response = await fetch(
        `/api/deliveries/track/${trackingCode}/full`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(
            `No shipment found with tracking code: ${trackingCode}`
          );
        }
        throw new Error(
          `Failed to fetch shipment data: ${response.statusText}`
        );
      }

      const data = await response.json();
      setShipment(data);
    } catch (err) {
      console.error("Error fetching shipment:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load shipment data"
      );
    }
  };

  const checkInvoiceExists = useCallback(async (trackingCode: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Check if invoice already exists
      const response = await fetch(`/api/invoices/tracking/${trackingCode}`);

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setShipment(data.delivery);
          setInvoiceUrl(data.url);
        }
      } else {
        // If invoice doesn't exist, fetch shipment data
        await fetchShipmentData(trackingCode);
      }
    } catch (err) {
      console.error("Error checking invoice:", err);
      // Fallback to fetching shipment data
      await fetchShipmentData(trackingCode);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (code) {
      checkInvoiceExists(code);
    }
  }, [code, checkInvoiceExists]);

  const generateAndUploadPDF = async () => {
    if (!shipment || !code) {
      toast.error("No shipment data available");
      return;
    }

    try {
      setIsGenerating(true);

      // Convert shipment data to DeliveryData format
      const deliveryData = convertToDeliveryData(shipment);

      // Generate PDF blob
      const pdfBlob = generateInvoicePDFBlob(deliveryData);

      // Upload to backend
      setIsUploading(true);
      const formData = new FormData();
      formData.append("pdf", pdfBlob, `invoice_${code}.pdf`);

      const uploadResponse = await fetch(`/api/invoices/upload/${code}`, {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload invoice");
      }

      const uploadResult = await uploadResponse.json();
      if (uploadResult.success) {
        setInvoiceUrl(uploadResult.url);
        toast.success("Invoice generated and uploaded successfully!");
      }
    } catch (err) {
      console.error("PDF generation error:", err);
      toast.error("Failed to generate invoice. Please try again.");
    } finally {
      setIsGenerating(false);
      setIsUploading(false);
    }
  };

  const handleDownloadInvoice = async () => {
    if (!shipment || !code) {
      toast.error("No shipment data available");
      return;
    }

    try {
      setIsDownloading(true);

      if (invoiceUrl) {
        // If invoice URL exists, download from Cloudinary directly
        const link = document.createElement("a");
        link.href = invoiceUrl; // Use the direct URL without transformation
        link.download = `invoice_${code}.pdf`;
        link.target = "_blank"; // Open in new tab for better PDF handling
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Invoice downloaded successfully!");
      } else {
        // Generate PDF directly and download
        const deliveryData = convertToDeliveryData(shipment);

        downloadInvoicePDF(deliveryData);
        toast.success("Invoice downloaded successfully!");
      }
    } catch (err) {
      console.error("Download error:", err);
      toast.error("Failed to download invoice. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePreviewInvoice = () => {
    if (!shipment || !code) {
      toast.error("No shipment data available");
      return;
    }

    const deliveryData = convertToDeliveryData(shipment);

    previewInvoicePDF(deliveryData);
  };

  const formatDate = (date: string | Date | undefined) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (
    amount: number | undefined,
    currency: string | undefined
  ) => {
    if (!amount) return "N/A";
    return `${currency || "USD"} ${amount.toLocaleString()}`;
  };

  const getStatusColor = (status: string | undefined) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "in transit":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "shipped":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "processing":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "on hold":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-zinc-900 transition-colors min-h-screen">
        <div className="flex items-center justify-center py-20">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  // Error state
  if (error || !shipment) {
    return (
      <div className="bg-white dark:bg-zinc-900 transition-colors min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center">
            <NoDataUI
              title="Invoice Not Found"
              message={
                error ||
                `We couldn't find an invoice for tracking code: ${code}`
              }
              icon="search"
              onRefresh={() => {
                if (code) {
                  toast.info("Searching again...");
                  fetchShipmentData(code);
                }
              }}
              onSearch={() => {
                toast.info("Redirecting to tracking...");
                window.location.href = "/track";
              }}
              className="max-w-lg"
            />
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/track"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tracking
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900 transition-colors min-h-screen">
      <SEOHelmet
        page="invoice"
        customTitle={`Invoice ${code} - Download Invoice | Aegis Express Logistics`}
      />

      {/* Header */}
      <section className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-blue-900/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex-1">
              <Button
                asChild
                variant="ghost"
                className="mb-4 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-0"
              >
                <Link to={`/track/${code}`}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Shipment Details
                </Link>
              </Button>

              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-zinc-700/50 shadow-sm">
                  <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Invoice Download
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    Tracking ID:{" "}
                    <Badge variant="secondary" className="ml-1">
                      {code}
                    </Badge>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Badge
                variant="outline"
                className={`px-4 py-2 font-semibold border ${getStatusColor(
                  shipment.status
                )}`}
              >
                {shipment.status || "Pending"}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Invoice Download Section */}
          <Card className="shadow-lg border-gray-200/50 dark:border-zinc-700/50 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-900 dark:text-white flex items-center justify-center gap-2">
                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                Download Invoice
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Download your official shipment invoice for record keeping and
                accounting purposes
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-6">
                {/* Invoice Actions */}
                <div className="text-center space-y-4">
                  {invoiceUrl ? (
                    <>
                      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20">
                        <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Invoice Ready
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                          Your invoice has been generated and is ready for
                          download
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/20">
                        <FileText className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Generate Invoice
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                          Generate a professional PDF invoice for this shipment
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                  {!invoiceUrl && (
                    <Button
                      onClick={generateAndUploadPDF}
                      disabled={isGenerating || isUploading}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {isGenerating || isUploading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Upload className="mr-2 h-4 w-4" />
                      )}
                      {isGenerating
                        ? "Generating..."
                        : isUploading
                        ? "Uploading..."
                        : "Generate Invoice"}
                    </Button>
                  )}

                  <Button
                    onClick={handlePreviewInvoice}
                    variant="outline"
                    className="flex-1"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>

                  <Button
                    onClick={handleDownloadInvoice}
                    disabled={isDownloading}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    {isDownloading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="mr-2 h-4 w-4" />
                    )}
                    {isDownloading ? "Downloading..." : "Download"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipment Summary */}
          <Card className="shadow-lg border-gray-200/50 dark:border-zinc-700/50 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900 dark:text-white flex items-center gap-2">
                <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Shipment Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Shipment Details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Package className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Shipment Type
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {shipment.shipmentType || "Standard Delivery"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Date Sent
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {formatDate(shipment.dateSent)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Delivery Fee
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {formatCurrency(
                          shipment.deliveryFee,
                          shipment.currency
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sender & Receiver */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        From
                      </p>
                    </div>
                    <div className="pl-6">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {shipment.sender?.name || "Unknown Sender"}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {shipment.sender?.city && shipment.sender?.country
                          ? `${shipment.sender.city}, ${shipment.sender.country}`
                          : "Location not specified"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        To
                      </p>
                    </div>
                    <div className="pl-6">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {shipment.receiver?.name || "Unknown Receiver"}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {shipment.receiver?.city && shipment.receiver?.country
                          ? `${shipment.receiver.city}, ${shipment.receiver.country}`
                          : "Location not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Package Items */}
          {shipment.items && shipment.items.length > 0 && (
            <Card className="shadow-lg border-gray-200/50 dark:border-zinc-700/50 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white flex items-center gap-2">
                  <Package className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  Package Contents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {shipment.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-50 dark:bg-zinc-800/50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {item.description || `Item ${index + 1}`}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Qty: {item.quantity || 1} • Weight: {item.weight || 0}
                          kg
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {formatCurrency(item.value, shipment.currency)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceDownload;
