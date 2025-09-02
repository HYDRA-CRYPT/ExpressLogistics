import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
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
} from "lucide-react";
import MapView from "../components/MapView";
import TimelineComponent from "../Admin/pages/TimelineComponent";
import LoadingSpinner from "../components/LoadingSpinner";
import { useDeliveryStore } from "../stores/deliveryStore";

const TrackDetails = () => {
  const { code } = useParams<{ code: string }>();
  const trackingId = code; // Rename for consistency with the rest of the component
  const { shipment, isLoading, error, fetchShipment, clearShipment } =
    useDeliveryStore();

  useEffect(() => {
    if (trackingId) {
      console.log(
        "TrackDetails: Fetching shipment for tracking ID:",
        trackingId
      );
      fetchShipment(trackingId);
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

  // Show loading state
  if (isLoading) {
    return (
      <div className="pt-20 bg-white dark:bg-zinc-900 transition-colors min-h-screen">
        <div className="flex items-center justify-center py-20">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="pt-20 bg-white dark:bg-zinc-900 transition-colors min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Tracking Information Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {error.message ||
                "The tracking number you entered could not be found."}
            </p>
            <Link
              to="/track"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Try Another Tracking Number
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Show not found state
  if (!shipment) {
    return (
      <div className="pt-20 bg-white dark:bg-zinc-900 transition-colors min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No Shipment Found
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Please check your tracking number and try again.
            </p>
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
    <div className="pt-20 bg-white dark:bg-zinc-900 transition-colors min-h-screen">
      {/* Header */}
      <section className="bg-gray-50 dark:bg-zinc-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <Link
                to="/track"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-4 transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Tracking
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Shipment Details
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Tracking ID:{" "}
                {shipment?.trackingCode ||
                  shipment?.trackingNumber ||
                  trackingId}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div
                className={`px-4 py-2 rounded-full font-semibold flex items-center space-x-2 ${getStatusColor(
                  shipment?.status || "pending"
                )}`}
              >
                {getStatusIcon(shipment?.status || "pending")}
                <span>{shipment?.status || "Pending"}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipment Overview */}
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Shipment Overview
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Sent Date
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        {formatDate(shipment?.dateSent)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-green-600 dark:text-green-400 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Estimated Delivery
                      </p>
                      <p className="text-green-600 dark:text-green-400 font-semibold">
                        {formatDate(shipment?.deliveryDate)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Package className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Shipment Type
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        {shipment?.shipmentType ||
                          shipment?.shipmentTypeDisplay ||
                          "Standard"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-1" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Service
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        Express Logistics Service
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            {shipment && shipment.trackingCode && (
              <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6">
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
              </div>
            )}

            {/* Map View */}
            {shipment && (
              <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Route & Current Location
                </h2>
                <div className="h-96 rounded-lg overflow-hidden">
                  <MapView shipment={shipment} />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Sender & Receiver Info */}
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Shipment Details
              </h3>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Sender
                    </span>
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 ml-7">
                    <p className="font-medium">
                      {shipment?.sender?.name || "N/A"}
                    </p>
                    <p className="text-sm">
                      {shipment?.sender?.address ||
                        `${shipment?.sender?.city || ""}, ${
                          shipment?.sender?.country || ""
                        }`}
                    </p>
                  </div>
                </div>

                <div className="border-t dark:border-zinc-700 pt-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Receiver
                    </span>
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 ml-7">
                    <p className="font-medium">
                      {shipment?.receiver?.name || "N/A"}
                    </p>
                    <p className="text-sm">
                      {shipment?.receiver?.address ||
                        `${shipment?.receiver?.city || ""}, ${
                          shipment?.receiver?.country || ""
                        }`}
                    </p>
                    {shipment?.receiver?.phone && (
                      <p className="text-sm flex items-center space-x-1 mt-1">
                        <Phone className="h-3 w-3" />
                        <span>{shipment.receiver.phone}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Package Information */}
            {shipment?.items && shipment.items.length > 0 && (
              <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Package Information
                </h3>

                <div className="space-y-4">
                  {shipment.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border-b dark:border-zinc-700 pb-3 last:border-b-0"
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {item.description || `Item ${index + 1}`}
                        </p>
                        {item.quantity && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Quantity: {item.quantity}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        {item.weight && (
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {item.weight} kg
                          </p>
                        )}
                        {item.value && (
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            ${item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}

                  {shipment?.deliveryFee && (
                    <div className="mt-4 pt-4 border-t dark:border-zinc-700">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900 dark:text-white">
                          Delivery Fee:
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {shipment?.currency || "$"}
                          {shipment.deliveryFee}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Contact Support */}
            <div className="bg-blue-50 dark:bg-zinc-800 border border-blue-200 dark:border-zinc-600 rounded-xl p-6">
              <h3 className="text-lg font-bold text-blue-900 dark:text-white mb-4">
                Need Help?
              </h3>
              <p className="text-blue-700 dark:text-gray-300 mb-4 text-sm">
                Having issues with your shipment? Our support team is ready to
                assist.
              </p>
              <div className="space-y-3">
                <Link
                  to="/contact"
                  className="w-full bg-blue-600 dark:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center justify-center"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Contact Support
                </Link>
                <button className="w-full border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 px-4 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-white transition-colors flex items-center justify-center">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackDetails;
