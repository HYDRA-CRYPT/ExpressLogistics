import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Package,
  MapPin,
  Clock,
  User,
  Phone,
  Mail,
  Calendar,
  ArrowLeft,
  CheckCircle,
  Truck,
  AlertCircle,
  Shield,
  FileText,
  Download,
  Loader2,
  Eye,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import MapView from "../components/MapView";
import TimelineComponent from "../Admin/pages/TimelineComponent";
import LoadingSpinner from "../components/LoadingSpinner";
import NoDataUI from "../components/NoDataUI";
import { useDeliveryStore } from "../stores/deliveryStore";
import { toast } from "sonner";
import SEOHelmet from "@/components/SEOHelmet";
import {
  downloadInvoicePDF,
  previewInvoicePDF,
} from "../utils/invoicePdfGenerator";
import type { DeliveryData } from "../types/invoice";

const TrackDetails = () => {
  const { code } = useParams<{ code: string }>();
  const trackingId = code; // Rename for consistency with the rest of the component
  const { shipment, isLoading, error, fetchShipment, clearShipment } =
    useDeliveryStore();

  // Add download state
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (trackingId) {
      console.log(
        "TrackDetails: Fetching shipment for tracking ID:",
        trackingId
      );
      fetchShipment(trackingId);

      // Show toast when starting to fetch
      toast.info("Loading shipment details...", {
        duration: 1000,
      });
    }

    // Cleanup on unmount
    return () => {
      clearShipment();
    };
  }, [trackingId, fetchShipment, clearShipment]);

  // Add debugging logs
  console.log("TrackDetails Debug:", {
    code,
    trackingId,
    shipment,
    isLoading,
    error,
    hasShipment: !!shipment,
    shipmentKeys: shipment ? Object.keys(shipment) : [],
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-500 text-white";
      case "out for delivery":
        return "bg-blue-500 text-white";
      case "in transit":
        return "bg-orange-500 text-white";
      case "shipped":
        return "bg-purple-500 text-white";
      case "processing":
        return "bg-indigo-500 text-white";
      case "pending":
        return "bg-yellow-500 text-white";
      case "on hold":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="h-5 w-5" />;
      case "out for delivery":
      case "in transit":
        return <Truck className="h-5 w-5" />;
      case "shipped":
      case "processing":
        return <Package className="h-5 w-5" />;
      case "pending":
        return <Clock className="h-5 w-5" />;
      case "on hold":
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <Package className="h-5 w-5" />;
    }
  };

  const formatDate = (date: string | Date | number | undefined) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Convert shipment to DeliveryData format
  const convertToDeliveryData = (shipment: any): DeliveryData => {
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
        shipment.items?.map((item: any) => ({
          description: item.description || "",
          quantity: item.quantity || 1,
          value: item.value || 0,
          weight: item.weight,
        })) || [],
    };
  };

  // Direct download function with jsPDF fallback
  const handleDirectDownload = async () => {
    if (!code) return;

    try {
      setIsDownloading(true);

      // First try to get from backend
      const response = await fetch(`/api/invoices/download/${code}`);

      if (response.ok) {
        // Backend has the invoice, download it
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const fileName = `invoice_${code}_${
          new Date().toISOString().split("T")[0]
        }.pdf`;
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        toast.success("Invoice downloaded successfully!");
      } else {
        // Backend doesn't have invoice, generate with jsPDF
        if (shipment) {
          const deliveryData = convertToDeliveryData(shipment);
          downloadInvoicePDF(deliveryData);
          toast.success("Invoice generated and downloaded!");
        } else {
          throw new Error("No shipment data available");
        }
      }
    } catch (err) {
      console.error("Download error:", err);
      toast.error("Failed to download invoice. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  // Preview invoice function
  const handlePreviewInvoice = () => {
    if (shipment) {
      const deliveryData = convertToDeliveryData(shipment);
      previewInvoicePDF(deliveryData);
    } else {
      toast.error("No shipment data available");
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-zinc-900 transition-colors min-h-screen">
        <div className="flex items-center justify-center py-20">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  // Show not found state
  if (!shipment) {
    return (
      <div className="bg-white dark:bg-zinc-900 transition-colors min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center">
            <NoDataUI
              title="No Shipment Found"
              message={`We couldn't find any shipment with tracking code: ${trackingId}`}
              icon="search"
              onRefresh={() => {
                if (trackingId) {
                  toast.info("Searching again...");
                  fetchShipment(trackingId);
                }
              }}
              onSearch={() => {
                toast.info("Redirecting to search...");
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
        page="track"
        customTitle={`Track Package ${code} - Real-Time Tracking | Aegis Express Logistics`}
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
                <Link to="/track">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Tracking
                </Link>
              </Button>

              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-zinc-700/50 shadow-sm">
                  <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Shipment Details
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    Tracking ID:{" "}
                    <Badge variant="secondary" className="ml-1">
                      {shipment?.trackingCode ||
                        shipment?.trackingNumber ||
                        trackingId}
                    </Badge>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Badge
                variant="outline"
                className={`px-4 py-2 font-semibold flex items-center space-x-2 ${getStatusColor(
                  shipment?.status || "pending"
                )
                  .replace("bg-", "border-")
                  .replace("text-white", "text-current")}`}
              >
                {getStatusIcon(shipment?.status || "pending")}
                <span>{shipment?.status || "Pending"}</span>
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipment Overview */}
            <Card className="shadow-lg border-gray-200/50 dark:border-zinc-700/50 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white flex items-center gap-2">
                  <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Shipment Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                        <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white mb-1">
                          Sent Date
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          {formatDate(shipment?.dateSent)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
                        <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white mb-1">
                          Estimated Delivery
                        </p>
                        <Badge
                          variant="secondary"
                          className="text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
                        >
                          {formatDate(shipment?.deliveryDate)}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                        <Truck className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white mb-1">
                          Shipment Type
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          {shipment?.shipmentType ||
                            shipment?.shipmentTypeDisplay ||
                            "Standard"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                        <Shield className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white mb-1">
                          Service
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          Express Logistics Service
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            {shipment && shipment.trackingCode && (
              <Card className="shadow-lg border-gray-200/50 dark:border-zinc-700/50 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 dark:text-white flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Tracking Timeline
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    Real-time updates on your shipment's journey
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TimelineComponent
                    shipment={{
                      ...shipment,
                      trackingCode: shipment.trackingCode,
                      sender: {
                        name: shipment.sender?.name || "",
                        city: shipment.sender?.city || "",
                        country: shipment.sender?.country || "",
                        address: shipment.sender?.address || "",
                      },
                      receiver: {
                        name: shipment.receiver?.name || "",
                        city: shipment.receiver?.city || "",
                        country: shipment.receiver?.country || "",
                        address: shipment.receiver?.address || "",
                      },
                      status: shipment.status || "",
                      history: (shipment.history || []).map((h) => ({
                        _id: h._id,
                        description: h.description,
                        status: h.status,
                        time: h.time ? new Date(h.time) : new Date(),
                        updateDate: h.updateDate,
                        updateTime: h.updateTime,
                        location: h.coordinates,
                        city: h.city,
                        country: h.country,
                      })),
                      dateSent: shipment.dateSent
                        ? new Date(shipment.dateSent)
                        : new Date(),
                      deliveryDate: shipment.deliveryDate
                        ? new Date(shipment.deliveryDate)
                        : new Date(),
                    }}
                  />
                </CardContent>
              </Card>
            )}

            {/* Map View */}
            {shipment && (
              <Card className="shadow-lg border-gray-200/50 dark:border-zinc-700/50 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 dark:text-white flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Route & Current Location
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    Live tracking of your shipment's current position
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96 rounded-xl overflow-hidden border border-gray-200/50 dark:border-zinc-700/50">
                    <MapView shipment={shipment} />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Sender & Receiver Info */}
            <Card className="shadow-lg border-gray-200/50 dark:border-zinc-700/50 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white">
                  Shipment Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                        <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <Badge
                        variant="outline"
                        className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"
                      >
                        Sender
                      </Badge>
                    </div>
                    <div className="ml-11">
                      <p className="font-medium text-gray-900 dark:text-white mb-1">
                        {shipment?.sender?.name || "N/A"}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {shipment?.sender?.address ||
                          `${shipment?.sender?.city || ""}, ${
                            shipment?.sender?.country || ""
                          }`}
                      </p>
                    </div>
                  </div>

                  <div className="border-t dark:border-zinc-700 pt-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20">
                        <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <Badge
                        variant="outline"
                        className="text-green-600 dark:text-green-400 border-green-200 dark:border-green-800"
                      >
                        Receiver
                      </Badge>
                    </div>
                    <div className="ml-11">
                      <p className="font-medium text-gray-900 dark:text-white mb-1">
                        {shipment?.receiver?.name || "N/A"}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {shipment?.receiver?.address ||
                          `${shipment?.receiver?.city || ""}, ${
                            shipment?.receiver?.country || ""
                          }`}
                      </p>
                      {shipment?.receiver?.phone && (
                        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                          <Phone className="h-3 w-3" />
                          <span>{shipment.receiver.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Package Information */}
            {shipment?.items && shipment.items.length > 0 && (
              <Card className="shadow-lg border-gray-200/50 dark:border-zinc-700/50 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 dark:text-white flex items-center gap-2">
                    <Package className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    Package Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {shipment.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-start p-4 rounded-lg bg-gray-50 dark:bg-zinc-700/50 border border-gray-200/50 dark:border-zinc-600/50"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white mb-1">
                            {item.description || `Item ${index + 1}`}
                          </p>
                          {item.quantity && (
                            <Badge variant="secondary" className="text-xs">
                              Qty: {item.quantity}
                            </Badge>
                          )}
                        </div>
                        <div className="text-right ml-4">
                          {item.weight && (
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                              {item.weight} kg
                            </p>
                          )}
                          {item.value && (
                            <Badge
                              variant="outline"
                              className="text-gray-900 dark:text-white"
                            >
                              ${item.value}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}

                    {shipment?.deliveryFee && (
                      <div className="mt-6 pt-4 border-t dark:border-zinc-700">
                        <div className="flex justify-between items-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                          <span className="font-medium text-gray-900 dark:text-white">
                            Delivery Fee:
                          </span>
                          <Badge className="bg-blue-600 text-white">
                            {shipment?.currency || "$"}
                            {shipment.deliveryFee}
                          </Badge>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Download Invoice */}
            <Card className="shadow-lg border-green-200/50 dark:border-green-800/50 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10">
              <CardHeader>
                <CardTitle className="text-lg text-green-900 dark:text-white flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                  Invoice & Documentation
                </CardTitle>
                <CardDescription className="text-green-700 dark:text-gray-300 text-sm">
                  Download your official invoice and shipment documentation.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  asChild
                  className="w-full bg-green-600 hover:bg-green-700 text-white shadow-lg"
                >
                  <Link to={`/track/${code}/invoice`}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Invoice
                  </Link>
                </Button>
                <Button
                  onClick={handleDirectDownload}
                  disabled={isDownloading}
                  variant="outline"
                  className="w-full border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Quick Download
                    </>
                  )}
                </Button>
                <Button
                  onClick={handlePreviewInvoice}
                  variant="outline"
                  className="w-full border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Preview Enhanced PDF
                </Button>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card className="shadow-lg border-blue-200/50 dark:border-blue-800/50 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10">
              <CardHeader>
                <CardTitle className="text-lg text-blue-900 dark:text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Need Help?
                </CardTitle>
                <CardDescription className="text-blue-700 dark:text-gray-300 text-sm">
                  Having issues with your shipment? Our support team is ready to
                  assist.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  asChild
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                >
                  <Link to="/contact">
                    <Phone className="mr-2 h-4 w-4" />
                    Contact Support
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Email Us
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackDetails;
