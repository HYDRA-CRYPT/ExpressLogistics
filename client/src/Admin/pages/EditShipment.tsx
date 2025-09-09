import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditShipmentForm from "@/components/EditShipmentForm";
import LoadingSpinner from "@/components/LoadingSpinner";
import BeautifulErrorUI from "@/components/BeautifulErrorUI";
import { getDeliveryById, editDeliveryById } from "@/services/deliveryService";
import type { EditShipmentData } from "@/types/shipmentTypes";
import { toast } from "react-toastify";

const EditShipmentPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // use a proper typed state instead of `any`
  const [deliveryData, setDeliveryData] = useState<EditShipmentData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const getErrorMessage = (err: unknown) =>
    typeof err === "object" && err !== null && "message" in err
      ? String(err.message)
      : String(err ?? "Unknown error");

  // Fetch delivery data by ID
  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    setIsError(false);
    setError(null);

    toast.info("Loading shipment details...");

    getDeliveryById(id)
      .then((data) => {
        // cast to expected shape (service should ideally return this type)
        setDeliveryData(data as EditShipmentData);
        toast.success("Shipment details loaded");
      })
      .catch((err: unknown) => {
        setIsError(true);
        const errorMsg = getErrorMessage(err) || "Failed to fetch delivery";
        setError(errorMsg);
        toast.error(`Failed to load shipment: ${errorMsg}`);
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  // Update delivery handler
  const handleUpdate = (updatedData: Partial<EditShipmentData>) => {
    if (!id) return;
    setIsUpdating(true);

    const toastId = toast.loading("Updating shipment...");

    editDeliveryById(id, updatedData)
      .then(() => {
        toast.update(toastId, {
          render: "Shipment updated successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        navigate("/owner/shipments");
      })
      .catch((err: unknown) => {
        const errorMsg = getErrorMessage(err) || "Failed to update delivery";
        setError(errorMsg);
        toast.update(toastId, {
          render: `Failed to update shipment: ${errorMsg}`,
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      })
      .finally(() => setIsUpdating(false));
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return (
      <div className="flex justify-center p-4 sm:p-6 lg:p-8">
        <BeautifulErrorUI
          error={{ message: error || "Unknown error", code: "EDIT_ERROR" }}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  if (!deliveryData)
    return (
      <div className="flex justify-center p-4 sm:p-6 lg:p-8">
        <BeautifulErrorUI
          error={{ message: "Shipment not found", code: "NOT_FOUND" }}
          onRetry={() => navigate("/owner/shipments")}
        />
      </div>
    );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-6">
        <EditShipmentForm
          initialData={deliveryData}
          onSubmit={handleUpdate}
          isLoading={isUpdating}
          isEditing={true}
        />
      </div>
    </div>
  );
};

export default EditShipmentPage;
