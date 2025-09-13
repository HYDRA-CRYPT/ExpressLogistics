import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import {
  Package,
  MapPin,
  Clock,
  User,
  MessageCircle,
  Mail,
  Calendar,
  ArrowLeft,
  CheckCircle,
  Truck,
  AlertCircle,
  Shield,
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
import { toast } from "react-toastify";
import SEOHelmet from "@/components/SEOHelmet";
import { getTelegramLink } from "@/config/contacts";
import { motion } from "framer-motion";

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

      // Show toast when starting to fetch
      toast.info("Loading shipment details...", {
        autoClose: 1000,
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
    const baseClasses = "shadow-lg";
    const onHoldClasses =
      "border-2 border-red-300 shadow-lg shadow-red-500/50 ring-4 ring-red-500/20";

    switch (status.toLowerCase()) {
      case "delivered":
        return `${baseClasses} bg-green-500 text-white shadow-green-500/25`;
      case "out for delivery":
        return `${baseClasses} bg-blue-500 text-white shadow-blue-500/25`;
      case "in transit":
        return `${baseClasses} bg-orange-500 text-white shadow-orange-500/25`;
      case "shipped":
        return `${baseClasses} bg-purple-500 text-white shadow-purple-500/25`;
      case "processing":
        return `${baseClasses} bg-indigo-500 text-white shadow-indigo-500/25`;
      case "pending":
        return `${baseClasses} bg-yellow-500 text-white shadow-yellow-500/25`;
      case "on hold":
        return `${onHoldClasses} bg-red-500 hover:bg-red-600 text-white`;
      default:
        return `${baseClasses} bg-gray-500 text-white shadow-gray-500/25`;
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
    });
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
                )}`}
              >
                {getStatusIcon(shipment?.status || "pending")}
                <span>{shipment?.status || "Pending"}</span>
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipment Overview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="shadow-lg border-gray-200/50 dark:border-zinc-700/50 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 dark:text-white flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </motion.div>
                    Shipment Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <motion.div
                      className="space-y-6"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        className="flex items-start space-x-4"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div
                          className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20"
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </motion.div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white mb-1">
                            Sent Date
                          </p>
                          <p className="text-gray-600 dark:text-gray-300">
                            {formatDate(shipment?.dateSent)}
                          </p>
                        </div>
                      </motion.div>

                      <motion.div
                        className="flex items-start space-x-4"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div
                          className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20"
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </motion.div>
                        </motion.div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white mb-1">
                            Estimated Delivery
                          </p>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Badge
                              variant="secondary"
                              className="text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
                            >
                              {formatDate(shipment?.deliveryDate)}
                            </Badge>
                          </motion.div>
                        </div>
                      </motion.div>
                    </motion.div>

                    <motion.div
                      className="space-y-6"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        className="flex items-start space-x-4"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div
                          className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20"
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Truck className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                          </motion.div>
                        </motion.div>
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
                      </motion.div>

                      <motion.div
                        className="flex items-start space-x-4"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.div
                          className="p-2 rounded-lg bg-orange-50 dark:bg-orange-900/20"
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <motion.div
                            animate={{ rotate: [0, 10, 0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            <Shield className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                          </motion.div>
                        </motion.div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white mb-1">
                            Service
                          </p>
                          <p className="text-gray-600 dark:text-gray-300">
                            Express Logistics Service
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Timeline */}
            {shipment && shipment.trackingCode && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="shadow-lg border-gray-200/50 dark:border-zinc-700/50 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900 dark:text-white flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </motion.div>
                      Tracking Timeline
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      Real-time updates on your shipment's journey
                    </CardDescription>
                  </CardHeader>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
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
                  </motion.div>
                </Card>
              </motion.div>
            )}

            {/* Map View */}
            {shipment && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="shadow-lg border-gray-200/50 dark:border-zinc-700/50 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900 dark:text-white flex items-center gap-2">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </motion.div>
                      Route & Current Location
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      Live tracking of your shipment's current position
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <motion.div
                      className="h-96 rounded-xl overflow-hidden border border-gray-200/50 dark:border-zinc-700/50"
                      whileHover={{ scale: 1.01 }}
                      transition={{ duration: 0.3 }}
                    >
                      <MapView shipment={shipment} />
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {/* Sender & Receiver Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="shadow-lg border-gray-200/50 dark:border-zinc-700/50 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 dark:text-white">
                    Shipment Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <motion.div
                          className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Badge
                            variant="outline"
                            className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"
                          >
                            Sender
                          </Badge>
                        </motion.div>
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
                    </motion.div>

                    <motion.div
                      className="border-t dark:border-zinc-700 pt-6"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <motion.div
                          className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </motion.div>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Badge
                            variant="outline"
                            className="text-green-600 dark:text-green-400 border-green-200 dark:border-green-800"
                          >
                            Receiver
                          </Badge>
                        </motion.div>
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
                          <motion.div
                            className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            <motion.div
                              animate={{ rotate: [0, 15, 0, -15, 0] }}
                              transition={{ duration: 3, repeat: Infinity }}
                            >
                              <MessageCircle className="h-3 w-3" />
                            </motion.div>
                            <span>@{shipment.receiver.phone}</span>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Package Information */}
            {shipment?.items && shipment.items.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="shadow-lg border-gray-200/50 dark:border-zinc-700/50 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900 dark:text-white flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Package className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </motion.div>
                      Package Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {shipment.items.map((item, index) => (
                        <motion.div
                          key={index}
                          className="flex justify-between items-start p-4 rounded-lg bg-gray-50 dark:bg-zinc-700/50 border border-gray-200/50 dark:border-zinc-600/50"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                          viewport={{ once: true }}
                        >
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 dark:text-white mb-1">
                              {item.description || `Item ${index + 1}`}
                            </p>
                            {item.quantity && (
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Badge variant="secondary" className="text-xs">
                                  Qty: {item.quantity}
                                </Badge>
                              </motion.div>
                            )}
                          </div>
                          <div className="text-right ml-4">
                            {item.weight && (
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                                {item.weight} kg
                              </p>
                            )}
                            {item.value && (
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Badge
                                  variant="outline"
                                  className="text-gray-900 dark:text-white"
                                >
                                  ${item.value}
                                </Badge>
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      ))}

                      {shipment?.deliveryFee && (
                        <motion.div
                          className="mt-6 pt-4 border-t dark:border-zinc-700"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                          viewport={{ once: true }}
                        >
                          <motion.div
                            className="flex justify-between items-center p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <span className="font-medium text-gray-900 dark:text-white">
                              Delivery Fee:
                            </span>
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Badge className="bg-blue-600 text-white">
                                {shipment?.currency || "$"}
                                {shipment.deliveryFee}
                              </Badge>
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Contact Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="shadow-lg border-blue-200/50 dark:border-blue-800/50 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-900 dark:text-white flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: [0, 10, 0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </motion.div>
                    Need Help?
                  </CardTitle>
                  <CardDescription className="text-blue-700 dark:text-gray-300 text-sm">
                    Having issues with your shipment? Our support team is ready
                    to assist.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      asChild
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                    >
                      <a
                        href={getTelegramLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <motion.div
                          animate={{ rotate: [0, 15, 0, -15, 0] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          <MessageCircle className="mr-2 h-4 w-4" />
                        </motion.div>
                        Chat on Telegram
                      </a>
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    >
                      <motion.div
                        animate={{ x: [0, 3, 0, -3, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Mail className="mr-2 h-4 w-4" />
                      </motion.div>
                      Email Us
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default TrackDetails;
