import ShipmentForm from "@/components/ShipmentForm";
import { useMutate } from "@/hooks/useMutate";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Plus } from "lucide-react";

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
      toast.success("Delivery created successfully!", {
        description: `Tracking Code: ${response.trackingCode}. PDF invoice and confirmation email are being processed in the background.`,
        duration: 5000,
      });
      resetForm();
    },
    onError: (error) => {
      console.error("CreateDelivery mutation error:", error);

      // Handle timeout errors specifically
      if (
        error.message.includes("timeout") ||
        error.message.includes("ECONNABORTED")
      ) {
        toast.warning(
          "Request timeout - Your delivery might still be processing",
          {
            description:
              "This can happen when generating PDFs and sending emails. Please check the shipments list to see if your delivery was created.",
            duration: 8000,
          }
        );
      } else {
        toast.error("Failed to create delivery", {
          description: error.message,
          duration: 5000,
        });
      }
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

      console.log("CreateDelivery: Submitting delivery creation request...");
      console.log("Request data:", requestData);

      // Show processing message
      console.log(
        "Processing delivery creation with PDF generation and email sending..."
      );

      await createDelivery.mutateAsync({
        url: "/deliveries",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Request-Timeout": "60000", // Indicate we expect a longer processing time
        },
        data: requestData,
      });
    } catch (err: unknown) {
      console.error("CreateDelivery error:", err);

      // Enhanced error handling for timeout and network issues
      if (err && typeof err === "object" && "code" in err) {
        const axiosErr = err as AxiosError<unknown>;

        if (
          axiosErr.code === "ECONNABORTED" ||
          axiosErr.message?.includes("timeout")
        ) {
          console.warn(
            "Request timed out - delivery might still be processing"
          );
          toast.warning("Request timed out!", {
            description:
              "Your delivery creation is still processing in the background. This is normal when generating PDFs and sending emails. Please wait a moment and check the shipments list to see if your delivery was created.",
            duration: 8000,
          });
          return; // Don't show additional error
        }

        if (
          !axiosErr.response &&
          (axiosErr.code === "ERR_NETWORK" || !navigator.onLine)
        ) {
          toast.error("Network Error", {
            description: "Please check your internet connection and try again.",
            duration: 5000,
          });
          return;
        }
      }

      // Provide detailed error info for debugging
      let message = "Unknown error occurred";
      try {
        const axiosErr = err as unknown as AxiosError<unknown> | undefined;
        if (axiosErr?.response?.data) {
          console.error(
            "CreateDelivery server response:",
            axiosErr.response.data
          );
          const respData = axiosErr.response.data as Record<string, unknown>;
          message = (respData?.message as string) || JSON.stringify(respData);
        } else if (axiosErr?.message) {
          message = axiosErr.message;
        }
      } catch {
        if (err instanceof Error) message = err.message;
      }

      console.error("CreateDelivery detailed error:", { err, message });
      toast.error("Failed to create delivery", {
        description: `Reason: ${message}. If the error persists, please try again or contact support.`,
        duration: 6000,
      });
    }
  };

  const resetForm = () => {
    createDelivery.reset();
    navigate("/owner/shipments"); // <-- change here
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="p-3 sm:p-4 lg:p-6 space-y-6 sm:space-y-8">
        {/* Header Section */}
        <Card className="border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm">
          <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              <Plus className="h-6 sm:h-8 w-6 sm:w-8 text-zinc-600 dark:text-zinc-400" />
              <span>Create New Delivery</span>
            </CardTitle>
            <CardDescription className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
              Create a new shipment and generate tracking information for your
              customers
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Form Section */}
        <Card className="border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm">
          <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
            <CardTitle className="text-lg sm:text-xl text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Package className="h-4 sm:h-5 w-4 sm:w-5 text-zinc-600 dark:text-zinc-400" />
              Shipment Details
            </CardTitle>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <Badge
                variant="secondary"
                className="bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm"
              >
                New Shipment
              </Badge>
              <Badge
                variant="outline"
                className="border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm"
              >
                Draft
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="px-2 sm:px-4 lg:px-6">
            <ShipmentForm
              onSubmit={handleSubmit}
              isLoading={createDelivery.isPending}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateDelivery;
