import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ShipmentDetails from "@/Admin/pages/ShipmentDetails";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useDeliveryStore } from "../../stores/deliveryStore";

const OwnerTrackDetails: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const { shipment, fetchShipment, isLoading, error } = useDeliveryStore();

  useEffect(() => {
    if (code) {
      fetchShipment(code);
    }
  }, [code, fetchShipment]);

  // Show loading state
  if (isLoading) return <LoadingSpinner />;

  // Show error state if there's an error from the store
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500 p-6">
          Error loading shipment:{" "}
          {error.message || error.toString() || "An unexpected error occurred"}
        </div>
      </div>
    );
  }

  // Show not found state
  if (!shipment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500 p-6">
          No shipment found for tracking number: {code}
        </div>
      </div>
    );
  }

  // Validate that shipment has required properties before rendering
  if (!shipment || typeof shipment !== "object") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500 p-6">
          Invalid shipment data received
        </div>
      </div>
    );
  }

  try {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <ShipmentDetails shipment={shipment} isAdmin={true} />
      </div>
    );
  } catch (renderError) {
    console.error("Error rendering ShipmentDetails:", renderError);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500 p-6">
          Error displaying shipment details. Please try again.
        </div>
      </div>
    );
  }
};

export default OwnerTrackDetails;
