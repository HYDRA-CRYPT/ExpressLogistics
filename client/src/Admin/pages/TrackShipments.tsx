import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Send } from "lucide-react";
import TrackingInput from "../../components/TrackingInput";
import LoadingSpinner from "../../components/LoadingSpinner";
import BeautifulErrorUI from "../../components/BeautifulErrorUI";
import ShipmentDetails from "./ShipmentDetails";
import { useFetch } from "../../hooks/useFetch";
import type { ShipmentData, RecentTrackingNumber } from "../../types/tracking";

// Extend ShipmentData to include admin-specific data
interface AdminShipmentData extends ShipmentData {
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

function TrackShipments() {
  const { code } = useParams<{ code?: string }>();
  const navigate = useNavigate();

  const [trackingNumber, setTrackingNumber] = useState("");
  const [deliveryId, setDeliveryId] = useState<string | null>(null);
  const [shipmentData, setShipmentData] = useState<AdminShipmentData | null>(
    null
  );
  const [recentNumbers, setRecentNumbers] = useState<RecentTrackingNumber[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);

  // First, fetch delivery by tracking code to get the ID (public endpoint)
  const {
    data: trackingData,
    isLoading: trackingLoading,
    error: trackingError,
  } = useFetch<{ _id: string; trackingCode: string }>({
    url: trackingNumber ? `/deliveries/track/${trackingNumber}` : null,
    enabled: !!trackingNumber && !deliveryId,
  });

  // Then fetch full delivery data by ID (admin endpoint)
  const {
    data: deliveryData,
    isLoading: deliveryLoading,
    error: deliveryError,
  } = useFetch<FullDeliveryData>({
    url: deliveryId ? `/deliveries/${deliveryId}` : null,
    enabled: !!deliveryId,
  });

  const isLoading = trackingLoading || deliveryLoading;

  useEffect(() => {
    loadRecentNumbers();

    // If there is a code in URL, track it automatically
    if (code && code !== trackingNumber) {
      setTrackingNumber(code);
    }
  }, [code]);

  // When tracking data is fetched, extract the ID
  useEffect(() => {
    if (trackingData && trackingData._id) {
      setDeliveryId(trackingData._id);
    }
  }, [trackingData]);

  // When full delivery data is fetched, transform and set it
  useEffect(() => {
    if (deliveryData) {
      const transformedData = transformDeliveryToShipment(deliveryData);
      setShipmentData(transformedData);
      addToRecentTracking(trackingNumber);
    }
  }, [deliveryData, trackingNumber]);

  useEffect(() => {
    if (trackingError || deliveryError) {
      setError(
        "Shipment not found. Please check your tracking number and try again."
      );
      setShipmentData(null);
      setDeliveryId(null);
    } else {
      setError(null);
    }
  }, [trackingError, deliveryError]);

  const loadRecentNumbers = () => {
    const recent = JSON.parse(
      localStorage.getItem("adminRecentTracking") || "[]"
    );
    setRecentNumbers(recent);
  };

  const addToRecentTracking = (trackingCode: string) => {
    if (!trackingCode) return;

    const recent = JSON.parse(
      localStorage.getItem("adminRecentTracking") || "[]"
    );
    const newEntry: RecentTrackingNumber = {
      id: Date.now().toString(),
      trackingNumber: trackingCode,
      createdAt: new Date().toISOString(),
    };

    const updatedRecent = [
      newEntry,
      ...recent.filter(
        (r: RecentTrackingNumber) => r.trackingNumber !== trackingCode
      ),
    ].slice(0, 10);
    localStorage.setItem("adminRecentTracking", JSON.stringify(updatedRecent));
    setRecentNumbers(updatedRecent);
  };

  // Transform full delivery data to match ShipmentData interface
  const transformDeliveryToShipment = (
    delivery: FullDeliveryData
  ): AdminShipmentData => {
    const getProgressPercentage = (status: string): number => {
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
    };

    // Use the timeline from the API if available, otherwise generate basic one
    const timeline =
      delivery.timeline && delivery.timeline.length > 0
        ? delivery.timeline
        : [
            {
              id: "1",
              title: "Package Received",
              location: `${delivery.sender.city}, ${delivery.sender.country}`,
              date: new Date(delivery.createdAt).toISOString().split("T")[0],
              time: new Date(delivery.createdAt).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              }),
              completed: true,
            },
            {
              id: "2",
              title: delivery.status,
              location:
                delivery.history?.length > 0
                  ? `${delivery.history[delivery.history.length - 1].city}, ${
                      delivery.history[delivery.history.length - 1].country
                    }`
                  : "Processing Center",
              date:
                delivery.history?.length > 0
                  ? new Date(delivery.history[delivery.history.length - 1].time)
                      .toISOString()
                      .split("T")[0]
                  : new Date().toISOString().split("T")[0],
              time:
                delivery.history?.length > 0
                  ? new Date(
                      delivery.history[delivery.history.length - 1].time
                    ).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : new Date().toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
              completed: delivery.status !== "Pending",
            },
          ];

    return {
      trackingNumber: delivery.trackingCode,
      type: delivery.items?.[0]?.description || "Package",
      packageCount:
        delivery.items?.reduce((sum, item) => sum + item.quantity, 0) || 1,
      status: delivery.status as any,
      estimatedDelivery: delivery.deliveryDate
        ? new Date(delivery.deliveryDate).toLocaleDateString()
        : "TBD",
      currentLocation:
        delivery.history?.length > 0
          ? `${delivery.history[delivery.history.length - 1].city}, ${
              delivery.history[delivery.history.length - 1].country
            }`
          : `${delivery.sender.city}, ${delivery.sender.country}`,
      lastUpdated: new Date(delivery.updatedAt).toLocaleDateString(),
      origin: {
        city: `${delivery.sender.city}, ${delivery.sender.country}`,
        state: delivery.sender.city,
        date: new Date(delivery.createdAt).toLocaleDateString(),
      },
      destination: {
        city: `${delivery.receiver.city}, ${delivery.receiver.country}`,
        state: delivery.receiver.city,
        date: delivery.deliveryDate
          ? new Date(delivery.deliveryDate).toLocaleDateString()
          : "TBD",
      },
      timeline,
      progressPercentage: getProgressPercentage(delivery.status),
      // Add admin-specific data
      adminData: {
        id: delivery._id,
        senderDetails: delivery.sender,
        receiverDetails: delivery.receiver,
        items: delivery.items,
        deliveryFee: delivery.deliveryFee,
        currency: delivery.currency,
        history: delivery.history,
        invoiceUrl: delivery.invoiceUrl,
      },
    };
  };

  const handleTrack = (number: string) => {
    if (!number) return;

    setError(null);
    setShipmentData(null);
    setDeliveryId(null);
    setTrackingNumber(number);

    // Update URL to match your route structure
    if (number !== code) {
      navigate(`/owner/shipments/track/${number}`, { replace: true });
    }
  };

  const handleReset = () => {
    setTrackingNumber("");
    setDeliveryId(null);
    setShipmentData(null);
    setError(null);
    navigate("/owner/shipments/track", { replace: true });
  };

  if (trackingError || deliveryError) {
    return (
      <BeautifulErrorUI
        error={trackingError || deliveryError}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-900 dark:text-white px-2">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4">
              <Send className="w-6 h-6 text-white transform rotate-45" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold">
              Track Shipment (Admin)
            </h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-lg lg:text-xl max-w-2xl mx-auto">
            Enter tracking number to access full delivery information and
            management tools
          </p>
        </div>

        <div className="space-y-8">
          {/* Search Section */}
          <TrackingInput
            onTrack={handleTrack}
            isLoading={isLoading}
            recentNumbers={recentNumbers}
            trackingNumber={trackingNumber}
            setTrackingNumber={setTrackingNumber}
            navigate={navigate}
          />

          {isLoading && <LoadingSpinner />}

          {error && (
            <div className="w-full max-w-6xl mx-auto">
              <div className="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-200 dark:bg-red-900/50 rounded-full flex items-center justify-center">
                  <Send className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">
                  Tracking Error
                </h3>
                <p className="text-red-600 dark:text-red-300 mb-6">{error}</p>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white rounded-lg font-medium transition-colors duration-200"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {shipmentData && !isLoading && (
            <ShipmentDetails
              shipment={shipmentData}
              onShipmentUpdate={setShipmentData}
              isAdmin={true} // Pass admin flag to show additional details
            />
          )}

          {!isLoading && !shipmentData && !error && trackingNumber === "" && (
            <div className="w-full max-w-6xl mx-auto text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center">
                <Send className="w-10 h-10 text-slate-600 dark:text-slate-400 transform rotate-45" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">
                Admin Tracking Ready
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-lg max-w-md mx-auto">
                Enter a tracking number to access full delivery information
                including sensitive data, customer details, and management
                tools.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrackShipments;
