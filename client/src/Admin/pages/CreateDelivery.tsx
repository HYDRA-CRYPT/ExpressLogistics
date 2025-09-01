import ShipmentForm from "@/components/ShipmentForm";
import { useMutate } from "@/hooks/useMutate";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";

interface DeliveryRequest {
  sender: {
    name: string;
    address: string;
    city: string;
    phone: string;
    email: string;
    country: string;
  };
  receiver: {
    name: string;
    address: string;
    city: string;
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
    address: string;
    city: string;
    country: string;
    phone: string;
    email: string;
  };
  receiver: {
    name: string;
    address: string;
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

  const transformFormData = (data: Partial<ShipmentData>): DeliveryRequest => {
    // Only include allowed item fields to satisfy backend validation
    const safeItems =
      (data.items || []).map((it) => ({
        description: it.description || "",
        quantity: Number(it.quantity || 0),
        weight: Number(it.weight || 0),
        value: Number(it.value || 0),
      })) || [];

    return {
      sender: {
        name: data.sender?.name || "",
        email: data.sender?.email || "",
        phone: data.sender?.phone || "",
        city: data.sender?.city || "",
        address: data.sender?.address || "",
        country: data.sender?.country || "",
      },
      receiver: {
        name: data.receiver?.name || "",
        email: data.receiver?.email || "",
        phone: data.receiver?.phone || "",
        city: data.receiver?.city || "",
        address: data.receiver?.address || "",
        country: data.receiver?.country || "",
      },
      items: safeItems,
      goodsDescription: safeItems.length
        ? safeItems.map((i) => `${i.quantity}x ${i.description}`).join(", ")
        : "General Package",
      deliveryFee: Number(data.deliveryFee || 0),
      currency: data.currency?.code || "USD",
      dateSent: data.pickupDate
        ? new Date(data.pickupDate).toISOString()
        : new Date().toISOString(),
      deliveryDate: data.deliveryDate
        ? new Date(data.deliveryDate).toISOString()
        : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      checkEmail: Boolean(data.checkEmail),
    };
  };

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
      // Provide detailed error info for debugging
      // axios error typing: err as AxiosError
      let message = "Unknown error";
      // try to extract axios response
      try {
        const axiosErr = err as unknown as AxiosError<unknown> | undefined;
        if (axiosErr?.response?.data) {
          console.error(
            "CreateDelivery server response:",
            axiosErr.response.data
          );
          // try to extract a sensible message from the response body
          const respData = axiosErr.response.data as Record<string, unknown>;
          message = (respData?.message as string) || JSON.stringify(respData);
        } else if (axiosErr?.message) {
          message = axiosErr.message;
        }
      } catch (err) {
        // fallback
        if (err instanceof Error) message = err.message;
      }
      console.error("CreateDelivery error:", err);
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
