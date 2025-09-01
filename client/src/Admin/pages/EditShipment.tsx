import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditShipmentForm from "@/components/EditShipmentForm";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getDeliveryById, editDeliveryById } from "@/services/deliveryService";
import type { EditShipmentData } from "@/types/shipmentTypes";

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
    getDeliveryById(id)
      .then((data) => {
        // cast to expected shape (service should ideally return this type)
        setDeliveryData(data as EditShipmentData);
      })
      .catch((err: unknown) => {
        setIsError(true);
        setError(getErrorMessage(err) || "Failed to fetch delivery");
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  // Update delivery handler
  const handleUpdate = (updatedData: Partial<EditShipmentData>) => {
    if (!id) return;
    setIsUpdating(true);
    editDeliveryById(id, updatedData)
      .then(() => navigate("/owner/shipments"))
      .catch((err: unknown) =>
        setError(getErrorMessage(err) || "Failed to update delivery")
      )
      .finally(() => setIsUpdating(false));
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error: {error}</div>;
  if (!deliveryData) return <div>Not found</div>;

  return (
    <div>
      <EditShipmentForm
        initialData={deliveryData}
        onSubmit={handleUpdate}
        isLoading={isUpdating}
        isEditing={true}
      />
    </div>
  );
};

export default EditShipmentPage;
