import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Send, Search, FileSearch } from "lucide-react";
import TrackingInput from "../../components/TrackingInput";
import LoadingSpinner from "../../components/LoadingSpinner";
import BeautifulErrorUI from "../../components/BeautifulErrorUI";
import ShipmentDetails from "./ShipmentDetails";
import type { ShipmentData } from "./ShipmentDetails";
import { useFetch } from "../../hooks/useFetch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Extend ShipmentData compatibility by allowing extra keys
interface AdminShipmentData extends Record<string, unknown> {
  trackingNumber: string;
  type: string;
  packageCount: number;
  status: ShipmentStatus;
  estimatedDelivery: string;
  currentLocation: string;
  lastUpdated: string;
  origin: {
    city: string;
    state: string;
    date: string;
  };
  destination: {
    city: string;
    state: string;
    date: string;
  };
  timeline: Array<{
    id: string;
    title: string;
    location: string;
    date: string;
    time: string;
    completed: boolean;
    coordinates?: {
      lat: number;
      lng: number;
    };
    description?: string;
  }>;
  progressPercentage: number;
  adminData?: {
    id: string;
    senderDetails: {
      name: string;
      email: string;
      address: string;
      city: string;
      country: string;
      phone: string;
    };
    receiverDetails: {
      name: string;
      email: string;
      address: string;
      city: string;
      country: string;
      phone: string;
    };
    items: Array<{
      description: string;
      quantity: number;
      weight: number;
      value: number;
    }>;
    deliveryFee: number;
    currency: string;
    history: Array<{
      description: string;
      time: string;
      city: string;
      country: string;
      location: {
        lat: number;
        lng: number;
      };
    }>;
    invoiceUrl?: string;
  };
}

// Define the full delivery response type for admin access
interface FullDeliveryData {
  _id: string;
  trackingCode: string;
  status: string;
  sender: {
    name: string;
    email: string;
    address: string;
    city: string;
    country: string;
    phone: string;
  };
  receiver: {
    name: string;
    email: string;
    address: string;
    city: string;
    country: string;
    phone: string;
  };
  items: Array<{
    description: string;
    quantity: number;
    weight: number;
    value: number;
  }>;
  deliveryFee: number;
  currency: string;
  deliveryDate: string;
  history: Array<{
    description: string;
    time: string;
    city: string;
    country: string;
    location: {
      lat: number;
      lng: number;
    };
  }>;
  timeline: Array<{
    id: string;
    title: string;
    location: string;
    date: string;
    time: string;
    completed: boolean;
    coordinates?: {
      lat: number;
      lng: number;
    };
    description?: string;
  }>;
  invoiceUrl?: string;
  createdAt: string;
  updatedAt: string;
}

interface TrackingResponse {
  _id: string;
  trackingCode: string;
}

type ShipmentStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "In Transit"
  | "On Hold"
  | "Delivered";

function TrackShipments() {
  const { code } = useParams<{ code?: string }>();
  const navigate = useNavigate();

  const [trackingNumber, setTrackingNumber] = useState<string>("");
  const [deliveryId, setDeliveryId] = useState<string | null>(null);
  const [shipmentData, setShipmentData] = useState<AdminShipmentData | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  // Helper function to safely format dates
  const formatDate = useCallback((dateString: string): string => {
    try {
      if (!dateString) return "";
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "";
      }
      return date.toLocaleDateString();
    } catch (error) {
      console.warn("Error formatting date:", error);
      return "";
    }
  }, []);

  // Helper function to get progress percentage
  const getProgressPercentage = useCallback((status: string): number => {
    switch (status.toLowerCase()) {
      case "pending":
        return 20;
      case "processing":
        return 40;
      case "shipped":
      case "in transit":
        return 60;
      case "out for delivery":
        return 80;
      case "delivered":
        return 100;
      case "on hold":
        return 50;
      default:
        return 20;
    }
  }, []);

  // Transform delivery data to shipment format
  const transformDeliveryToShipment = useCallback(
    (delivery: FullDeliveryData): AdminShipmentData => {
      const timeline = delivery.timeline || [];

      return {
        trackingNumber: delivery.trackingCode || "",
        type: delivery.items?.[0]?.description || "Package",
        packageCount:
          delivery.items?.reduce(
            (sum, item) => sum + (item.quantity || 0),
            0
          ) || 1,
        status: (delivery.status as ShipmentStatus) || "Pending",
        estimatedDelivery: delivery.deliveryDate
          ? formatDate(delivery.deliveryDate)
          : "TBD",
        currentLocation:
          delivery.history?.length > 0
            ? `${delivery.history[delivery.history.length - 1].city}, ${
                delivery.history[delivery.history.length - 1].country
              }`
            : `${delivery.sender?.city || "Unknown"}, ${
                delivery.sender?.country || "Unknown"
              }`,
        lastUpdated: formatDate(delivery.updatedAt),
        origin: {
          city: `${delivery.sender?.city || "Unknown"}, ${
            delivery.sender?.country || "Unknown"
          }`,
          state: delivery.sender?.city || "Unknown",
          date: formatDate(delivery.createdAt),
        },
        destination: {
          city: `${delivery.receiver?.city || "Unknown"}, ${
            delivery.receiver?.country || "Unknown"
          }`,
          state: delivery.receiver?.city || "Unknown",
          date: delivery.deliveryDate
            ? formatDate(delivery.deliveryDate)
            : "TBD",
        },
        timeline,
        progressPercentage: getProgressPercentage(delivery.status || "Pending"),
        adminData: {
          id: delivery._id,
          senderDetails: delivery.sender,
          receiverDetails: delivery.receiver,
          items: delivery.items || [],
          deliveryFee: delivery.deliveryFee || 0,
          currency: delivery.currency || "USD",
          history: delivery.history || [],
          invoiceUrl: delivery.invoiceUrl,
        },
      };
    },
    [formatDate, getProgressPercentage]
  );

  // Construct URLs
  const trackingUrl = trackingNumber
    ? `/deliveries/track/${trackingNumber}`
    : "";
  const deliveryUrl = deliveryId ? `/deliveries/${deliveryId}` : "";

  // First, fetch delivery by tracking code to get the ID (public endpoint)
  const {
    data: trackingData,
    isLoading: trackingLoading,
    error: trackingError,
  } = useFetch<TrackingResponse>({
    url: trackingUrl,
    enabled: !!trackingNumber && !deliveryId,
  });

  // Then fetch full delivery data by ID (admin endpoint)
  const {
    data: deliveryData,
    isLoading: deliveryLoading,
    error: deliveryError,
  } = useFetch<FullDeliveryData>({
    url: deliveryUrl,
    enabled: !!deliveryId,
  });

  const isLoading = trackingLoading || deliveryLoading;

  // Initialize tracking number from URL parameter
  useEffect(() => {
    if (code && code !== trackingNumber) {
      setTrackingNumber(code);
    }
  }, [code, trackingNumber]);

  // Extract delivery ID when tracking data is fetched
  useEffect(() => {
    if (trackingData?._id) {
      setDeliveryId(trackingData._id);
      setError(null);
    }
  }, [trackingData]);

  // Transform and set delivery data when fetched
  useEffect(() => {
    if (deliveryData) {
      try {
        const transformedData = transformDeliveryToShipment(deliveryData);
        setShipmentData(transformedData);
        setError(null);
      } catch (transformError) {
        console.error("Error transforming delivery data:", transformError);
        setError("Error processing shipment data. Please try again.");
      }
    }
  }, [deliveryData, transformDeliveryToShipment]);

  // Handle errors from both fetch operations
  useEffect(() => {
    if (trackingError || deliveryError) {
      const errorMessage =
        trackingError?.message ||
        deliveryError?.message ||
        "Shipment not found. Please check your tracking number and try again.";
      setError(errorMessage);
      setShipmentData(null);
      setDeliveryId(null);
    }
  }, [trackingError, deliveryError]);

  // Handle tracking action
  const handleTrack = useCallback(
    (number: string) => {
      if (!number?.trim()) return;

      const trimmedNumber = number.trim();

      // Reset states
      setError(null);
      setShipmentData(null);
      setDeliveryId(null);
      setTrackingNumber(trimmedNumber);

      // Update URL if different from current
      if (trimmedNumber !== code) {
        navigate(`/owner/shipments/track/${trimmedNumber}`, { replace: true });
      }
    },
    [code, navigate]
  );

  // Handle reset action
  const handleReset = useCallback(() => {
    setTrackingNumber("");
    setDeliveryId(null);
    setShipmentData(null);
    setError(null);
    navigate("/owner/shipments/track", { replace: true });
  }, [navigate]);

  // Handle shipment data updates
  const handleShipmentUpdate = useCallback(
    (updatedShipment: ShipmentData | null) => {
      // updatedShipment is the component's exported ShipmentData shape.
      // TrackShipments keeps AdminShipmentData in state; cast safely.
      setShipmentData(updatedShipment as unknown as AdminShipmentData | null);
    },
    []
  );

  // Render error UI for critical errors
  if ((trackingError || deliveryError) && !error) {
    const criticalError = trackingError || deliveryError;
    return (
      <BeautifulErrorUI
        error={criticalError!}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="p-3 sm:p-4 lg:p-6 space-y-6 sm:space-y-8">
        {/* Header Section */}
        <Card className="border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm">
          <CardHeader className="text-center px-4 sm:px-6 py-6 sm:py-8">
            <div className="flex flex-col sm:flex-row items-center justify-center mb-4 gap-3 sm:gap-0">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-zinc-700 dark:bg-zinc-600 rounded-xl flex items-center justify-center sm:mr-4">
                <Send className="w-5 sm:w-6 h-5 sm:h-6 text-white transform rotate-45" />
              </div>
              <CardTitle className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-zinc-100">
                Track Shipment
              </CardTitle>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-4">
              <Badge
                variant="secondary"
                className="bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm"
              >
                Admin Access
              </Badge>
              <Badge
                variant="outline"
                className="border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm"
              >
                <FileSearch className="h-3 w-3 mr-1" />
                Full Details
              </Badge>
            </div>
            <CardDescription className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto px-2 sm:px-0">
              Enter tracking number to access full delivery information and
              management tools
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Search Section */}
        <Card className="border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm">
          <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
            <CardTitle className="text-lg sm:text-xl text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Search className="h-4 sm:h-5 w-4 sm:w-5 text-zinc-600 dark:text-zinc-400" />
              Tracking Search
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <TrackingInput
              onTrack={handleTrack}
              isLoading={isLoading}
              trackingNumber={trackingNumber}
              setTrackingNumber={setTrackingNumber}
              navigate={navigate}
            />
          </CardContent>
        </Card>

        {isLoading && (
          <Card className="border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm">
            <CardContent className="py-8 sm:py-12">
              <LoadingSpinner />
            </CardContent>
          </Card>
        )}

        {error && (
          <Card className="border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/10 backdrop-blur-sm">
            <CardContent className="py-8 sm:py-12 text-center px-4 sm:px-6">
              <div className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-4 bg-red-200 dark:bg-red-900/50 rounded-full flex items-center justify-center">
                <Send className="w-6 sm:w-8 h-6 sm:h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-red-700 dark:text-red-400 mb-2">
                Tracking Error
              </h3>
              <p className="text-red-600 dark:text-red-300 mb-6 text-sm sm:text-base">
                {error}
              </p>
              <Button
                onClick={handleReset}
                variant="destructive"
                className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}

        {shipmentData && !isLoading && (
          <Card className="border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm">
            <CardContent className="p-0">
              <ShipmentDetails
                shipment={shipmentData as unknown as ShipmentData}
                onShipmentUpdate={handleShipmentUpdate}
                isAdmin={true}
              />
            </CardContent>
          </Card>
        )}

        {!isLoading && !shipmentData && !error && trackingNumber === "" && (
          <Card className="border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm">
            <CardContent className="py-12 sm:py-16 text-center px-4 sm:px-6">
              <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-6 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center">
                <Send className="w-8 sm:w-10 h-8 sm:h-10 text-zinc-600 dark:text-zinc-400 transform rotate-45" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                Admin Tracking Ready
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
                Enter a tracking number above to get started
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default TrackShipments;
