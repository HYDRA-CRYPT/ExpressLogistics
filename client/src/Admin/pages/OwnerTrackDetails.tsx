import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ShipmentDetails from "@/Admin/pages/ShipmentDetails";
import LoadingSpinner from "@/components/LoadingSpinner";
import BeautifulErrorUI from "@/components/BeautifulErrorUI";
import NoDataUI from "@/components/NoDataUI";
import { useDeliveryStore } from "../../stores/deliveryStore";
import { toast } from "react-toastify";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Package } from "lucide-react";
import InvoiceDownload from "@/pages/InvoiceDownload";

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
      <div className="min-h-screen bg-white dark:bg-zinc-900">
        <Tabs defaultValue="shipment" className="w-full">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <TabsList className="w-full justify-start bg-transparent border-b-0 space-x-8">
                <TabsTrigger
                  value="shipment"
                  className="flex items-center space-x-2 px-0 py-4 border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent"
                >
                  <Package className="h-4 w-4" />
                  <span>Shipment Details</span>
                </TabsTrigger>
                <TabsTrigger
                  value="invoice"
                  className="flex items-center space-x-2 px-0 py-4 border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent"
                >
                  <FileText className="h-4 w-4" />
                  <span>Invoice & Documents</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="shipment" className="mt-0">
            <ShipmentDetails shipment={shipment} isAdmin={true} />
          </TabsContent>

          <TabsContent value="invoice" className="mt-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <InvoiceDownload />
            </div>
          </TabsContent>
        </Tabs>
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
