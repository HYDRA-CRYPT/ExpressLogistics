import ShipmentForm from "@/components/ShipmentForm";
import { useMutate } from "@/hooks/useMutate";
import { useNavigate } from "react-router-dom";

interface DeliveryRequest {
  sender: {
    name: string;
    address: string;
    phone: string;
    email: string;
    country: string;
  };
  receiver: {
    name: string;
    address: string;
    phone: string;
    email: string;
    country: string;
  };
  items: Array<{
    description: string;
    quantity: number;
    weight: number;
    value: number;
  }>;
  goodsDescription: string;
  deliveryFee: number;
  currency: string;
  dateSent: string;
  deliveryDate: string;
  checkEmail: boolean;
}

interface DeliveryResponse {
  id: string;
  trackingCode: string;
  status: string;
}

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

const CreateDelivery = () => {
  const navigate = useNavigate();

  const createDelivery = useMutate<DeliveryResponse, DeliveryRequest>({
    invalidateQueries: ["fetch", "/deliveries"],
    onSuccess: (response) => {
      alert(`✅ Delivery created!\nTracking Code: ${response.trackingCode}`);
      resetForm();
    },
    onError: (error) => {
      alert(`❌ Failed to create delivery.\nError: ${error.message}`);
    },
  });

  const transformFormData = (data: Partial<ShipmentData>): DeliveryRequest => ({
    sender: {
      name: data.sender?.name || "",
      email: data.sender?.email || "",
      phone: data.sender?.phone || "",
      address: data.sender?.city || "",
      country: data.sender?.country || "",
    },
    receiver: {
      name: data.receiver?.name || "",
      email: data.receiver?.email || "",
      phone: data.receiver?.phone || "",
      address: data.receiver?.city || "",
      country: data.receiver?.country || "",
    },
    items: data.items || [],
    goodsDescription: data.items?.length
      ? data.items.map((i) => `${i.quantity}x ${i.description}`).join(", ")
      : "General Package",
    deliveryFee: data.deliveryFee || 0,
    currency: data.currency?.code || "USD",
    dateSent: data.pickupDate
      ? new Date(data.pickupDate).toISOString()
      : new Date().toISOString(),
    deliveryDate: data.deliveryDate
      ? new Date(data.deliveryDate).toISOString()
      : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    checkEmail: data.checkEmail || false,
  });

  const handleSubmit = async (form: Partial<ShipmentData>) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) throw new Error("Authentication required.");

      const requestData = transformFormData(form);

      await createDelivery.mutateAsync({
        url: "/deliveries",
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        data: requestData,
      });
    } catch (err: unknown) {
      let message = "Unknown error";
      if (err instanceof Error) message = err.message;
      console.error(err);
      alert(`❌ Failed to create delivery.\nReason: ${message}`);
    }
  };

  const resetForm = () => {
    createDelivery.reset();
    navigate("/owner/shipments"); // <-- change here
  };

  return (
    <div className="relative space-y-6">
      <ShipmentForm
        onSubmit={handleSubmit}
        isLoading={createDelivery.isPending}
      />
    </div>
  );
};

export default CreateDelivery;
