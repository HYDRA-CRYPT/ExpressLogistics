import { api } from "@/services/api";
import { BASE_URL } from "@/utils/Url";
import axios from "axios";

// Delivery service
export const deliveryService = {
  create: async (deliveryData: any) => {
    const response = await api.post("/deliveries", deliveryData);
    return response.data;
  },

  list: async () => {
    const response = await api.get("/deliveries");
    return response.data;
  },

  track: async (trackingCode: string) => {
    // This endpoint is public, no auth needed
    const response = await axios.get(
      `${BASE_URL}/deliveries/track/${trackingCode}`
    );
    return response.data;
  },

  updateStatus: async (deliveryId: string, status: string) => {
    const response = await api.put(`/deliveries/${deliveryId}/status`, {
      status,
    });
    return response.data;
  },

  addLocation: async (deliveryId: string, locationData: any) => {
    const response = await api.put(
      `/deliveries/${deliveryId}/location`,
      locationData
    );
    return response.data;
  },

  getAdminLogs: async () => {
    const response = await api.get("/deliveries/admin/logs");
    return response.data;
  },
};
