import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ShipmentDetails from "@/Admin/pages/ShipmentDetails";
import { type ShipmentData } from "@/types/tracking";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useFetch } from "../../hooks/useFetch";

// Define the same interfaces from your TrackShipments component
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

const OwnerTrackDetails = () => {
  const { code } = useParams<{ code: string }>();
  const [deliveryId, setDeliveryId] = useState<string | null>(null);
  const [shipment, setShipment] = useState<AdminShipmentData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // First, fetch delivery by tracking code to get the ID (public endpoint)
  const {
    data: trackingData,
    isLoading: trackingLoading,
    error: trackingError,
  } = useFetch<{ _id: string; trackingCode: string }>({
    url: code ? `/deliveries/track/${code}` : null,
    enabled: !!code && !deliveryId,
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

  console.log("First fetch URL:", code ? `/deliveries/track/${code}` : null);
  console.log(
    "Second fetch URL:",
    deliveryId ? `/deliveries/${deliveryId}` : null
  );
  console.log("Delivery ID state:", deliveryId);
  const isLoading = trackingLoading || deliveryLoading;

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
      setShipment(transformedData);
    }
  }, [deliveryData]);

  useEffect(() => {
    if (trackingError || deliveryError) {
      setError(
        "Shipment not found. Please check your tracking number and try again."
      );
      setShipment(null);
      setDeliveryId(null);
    } else {
      setError(null);
    }
  }, [trackingError, deliveryError]);

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

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center p-10">
          <div className="text-red-500 text-xl mb-4">Tracking Error</div>
          <div className="text-red-600 dark:text-red-400">{error}</div>
          <div className="text-sm text-gray-500 mt-2">
            Tracking Number: {code}
          </div>
        </div>
      </div>
    );
  }

  if (!shipment) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center text-red-500 p-10">
          No shipment found for tracking number: {code}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <ShipmentDetails
        shipment={shipment}
        onShipmentUpdate={setShipment}
        isAdmin={true} // Pass admin flag if needed
      />
    </div>
  );
};

export default OwnerTrackDetails;
