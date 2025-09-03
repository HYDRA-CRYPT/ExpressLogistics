import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ShipmentDetails from "@/Admin/pages/ShipmentDetails";
import LoadingSpinner from "@/components/LoadingSpinner";
import BeautifulErrorUI from "@/components/BeautifulErrorUI";
import NoDataUI from "@/components/NoDataUI";
import { useDeliveryStore } from "../../stores/deliveryStore";
import { toast } from "sonner";

const OwnerTrackDetails: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const { shipment, fetchShipment, isLoading } = useDeliveryStore();

  useEffect(() => {
    if (code) {
      toast.info("Loading shipment details...");
      fetchShipment(code);
    }
  }, [code, fetchShipment]);

  // Show loading state
  if (isLoading) return <LoadingSpinner />;

  // Show not found state
  if (!shipment) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <NoDataUI
          title="No Shipment Found"
          message={`We couldn't find any shipment with tracking code: ${code}`}
          icon="search"
          onRefresh={() => {
            if (code) {
              toast.info("Searching again...");
              fetchShipment(code);
            }
          }}
          className="max-w-lg"
        />
      </div>
    );
  }

  // Validate that shipment has required properties before rendering
  if (typeof shipment !== "object") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <BeautifulErrorUI
          error={{
            message: "Invalid shipment data received",
            code: "INVALID_DATA",
          }}
          onRetry={() => {
            if (code) {
              toast.info("Retrying...");
              fetchShipment(code);
            }
          }}
          className="max-w-lg"
        />
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
      <div className="min-h-screen flex items-center justify-center p-4">
        <BeautifulErrorUI
          error={{
            message: "Error displaying shipment details. Please try again.",
            code: "RENDER_ERROR",
          }}
          onRetry={() => {
            if (code) {
              toast.info("Retrying...");
              fetchShipment(code);
            }
          }}
          className="max-w-lg"
        />
      </div>
    );
  }
};

export default OwnerTrackDetails;
