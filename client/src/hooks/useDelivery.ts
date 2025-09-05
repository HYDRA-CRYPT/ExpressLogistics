// src/hooks/useDeliveries.ts
import { useMutate } from "./useMutate";
import { useFetch } from "./useFetch";

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
  status: string;
}

interface DeliveryResponse {
  id: string;
  trackingCode: string;
  status: string;
}

// Create delivery hook
export function useCreateDelivery() {
  return useMutate<DeliveryResponse, DeliveryRequest>({
    invalidateQueries: ["fetch", "/deliveries"],
    onSuccess: (delivery) => {
      console.log("Delivery created:", delivery);
    },
    onError: (error) => {
      console.error("Create delivery error:", error);
    },
  });
}

// List deliveries hook
export function useDeliveries() {
  return useFetch<DeliveryResponse[]>({
    url: "/deliveries",
  });
}

// Track delivery hook (public endpoint)
export function useTrackDelivery(trackingCode: string | null) {
  return useFetch<DeliveryResponse>({
    url: `/deliveries/track/${trackingCode}`,
    enabled: !!trackingCode,
  });
}

// Update delivery status hook
export function useUpdateDeliveryStatus() {
  return useMutate<DeliveryResponse, { deliveryId: string; status: string }>({
    invalidateQueries: ["fetch", "/deliveries"],
    onSuccess: (delivery) => {
      console.log("Delivery status updated:", delivery);
    },
  });
}

// Add location update hook
export function useAddLocationUpdate() {
  return useMutate<
    DeliveryResponse,
    {
      deliveryId: string;
      locationData: {
        description: string;
        time: string;
        location: { lat: number; lng: number };
        city: string;
        country: string;
      };
    }
  >({
    invalidateQueries: ["fetch", "/deliveries"],
    onSuccess: (delivery) => {
      console.log("Location update added:", delivery);
    },
  });
}

// Admin logs hook
export function useAdminLogs() {
  return useFetch<any[]>({
    url: "/deliveries/admin/logs",
  });
}

// Usage examples:

// In CreateDelivery component:
export function useCreateDeliverySimple() {
  const createDelivery = useCreateDelivery();

  const handleSubmit = (deliveryData: DeliveryRequest) => {
    createDelivery.mutate({
      url: "/deliveries",
      data: deliveryData,
      method: "POST",
    });
  };

  return {
    createDelivery: handleSubmit,
    isLoading: createDelivery.isPending,
    error: createDelivery.error,
    data: createDelivery.data,
  };
}

export function useDeliveryList() {
  const { data, isLoading, error } = useDeliveries();

  return {
    deliveries: Array.isArray(data) ? data : [],
    isLoading,
    error,
  };
}

// In TrackingPage component:
export function useDeliveryTracking(trackingCode: string) {
  const { data: delivery, isLoading, error } = useTrackDelivery(trackingCode);

  return {
    delivery,
    isLoading,
    error,
  };
}

// In AdminPanel component:
export function useDeliveryManagement() {
  const updateStatus = useUpdateDeliveryStatus();
  const addLocation = useAddLocationUpdate();

  const updateDeliveryStatus = (deliveryId: string, status: string) => {
    updateStatus.mutate({
      url: `/deliveries/${deliveryId}/status`,
      data: { deliveryId, status },
      method: "PUT",
    });
  };

  const addLocationUpdate = (deliveryId: string, locationData: any) => {
    addLocation.mutate({
      url: `/deliveries/${deliveryId}/location`,
      data: { deliveryId, locationData },
      method: "PUT",
    });
  };

  return {
    updateDeliveryStatus,
    addLocationUpdate,
    isUpdatingStatus: updateStatus.isPending,
    isAddingLocation: addLocation.isPending,
  };
}
