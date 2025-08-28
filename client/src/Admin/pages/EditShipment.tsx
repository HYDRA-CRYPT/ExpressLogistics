import { useParams } from "react-router-dom";
import ShipmentForm from "../../components/ShipmentForm";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useFetch } from "@/hooks/useFetch";

interface ShipmentData {
  shipmentType: string;
  pickupDate: string;
  deliveryDate: string;
  sender: {
    name: string;
    city: string;
    country: string;
    phone: string;
    email: string;
  };
  receiver: {
    name: string;
    city: string;
    country: string;
    phone: string;
    email: string;
  };
  items: Array<{
    description: string;
    quantity: number;
    weight: number;
    value: number;
  }>;
  deliveryFee: number;
  currency: { code: string; symbol: string; name: string };
  checkEmail: boolean;
}
const EditShipmentPage = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: shipmentData,
    isLoading,
    isError,
    error,
  } = useFetch<Partial<ShipmentData>>({
    url: `/shipments/${id}`,
    queryKey: ["shipment", id],
    enabled: !!id,
  });

  const handleUpdate: (data: Partial<ShipmentData>) => void = (updatedData) => {
    console.log("Updated shipment:", updatedData);
    alert("Shipment updated!");
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error: {error.message}</div>;
  if (!shipmentData) return <div>No shipment found</div>;

  return <ShipmentForm initialData={shipmentData} onSubmit={handleUpdate} />;
};

export default EditShipmentPage;
