// api/deliveryService.ts
// Helper functions and hooks for integrating with your backend API

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";
import { useFetch } from "../hooks/useFetch";

export interface LocationUpdatePayload {
  status: string;
  description: string;
  city: string;
  country: string;
  location: {
    lat: number;
    lng: number;
  };
  date: string;
}

export interface StatusUpdatePayload {
  status: string;
}

export interface UpdateStatusAndLocationPayload {
  status: string;
  description: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  checkEmail?: boolean;
}

export interface DeliveryDetails {
  trackingCode: string;
  status: string;
  sender: {
    name: string;
    address: string;
    country: string;
  };
  receiver: {
    name: string;
    address: string;
    country: string;
  };
  dateSent: string;
  deliveryDate?: string;
  updatedAt?: string; // <-- Add this if you use it for lastUpdated
  currency?: string; // <-- Add this if you use it
  items?: Array<{
    description?: string;
    quantity?: number;
    [key: string]: any; // for flexibility
  }>;
  history: Array<{
    description: string;
    date: string;
    city: string;
    country: string;
    location?: { lat: number; lng: number };
  }>;
  timeline: Array<{
    id?: string;
    title?: string;
    location?: string;
    date?: string;
    time?: string;
    completed?: boolean;
    status?: string;
    icon?: any;
    statusColor?: string;
    coordinates?: { lat: number; lng: number };
  }>;
}

// Hook to fetch delivery details
export const useDeliveryDetails = (trackingCode: string, enabled = true) => {
  return useFetch<DeliveryDetails>({
    url: `/deliveries/track/${trackingCode}/full`,
    queryKey: ["delivery", trackingCode],
    enabled: enabled && !!trackingCode,
  });
};

// Hook to update delivery status only
export const useUpdateDeliveryStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      trackingCode,
      status,
    }: {
      trackingCode: string;
      status: string;
    }) => {
      const response = await api.patch(`/deliveries/${trackingCode}/status`, {
        status,
      });
      return response.data;
    },
    onSuccess: (_, variables) => {
      // Invalidate and refetch delivery details
      queryClient.invalidateQueries({
        queryKey: ["delivery", variables.trackingCode],
      });

      // Optionally update the cache directly
      queryClient.setQueryData(
        ["delivery", variables.trackingCode],
        (oldData: DeliveryDetails | undefined) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            status: variables.status,
          };
        }
      );
    },
    onError: (error) => {
      console.error("Failed to update delivery status:", error);
    },
  });
};

// Hook to add location update
export const useAddLocationUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      trackingCode,
      locationUpdate,
    }: {
      trackingCode: string;
      locationUpdate: LocationUpdatePayload;
    }) => {
      const response = await api.post(
        `/deliveries/${trackingCode}/location`,
        locationUpdate
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["delivery", variables.trackingCode],
      });
    },
    onError: (error) => {
      console.error("Failed to add location update:", error);
    },
  });
};

// Hook to update both status and location
export const useUpdateStatusAndLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      deliveryId,
      payload,
    }: {
      deliveryId: string;
      payload: UpdateStatusAndLocationPayload;
    }) => {
      const response = await api.put(
        `/deliveries/${deliveryId}/update-combined`,
        payload
      );
      return response.data;
    },
    onSuccess: (data, variables) => {
      const trackingCode = data.trackingCode;
      queryClient.invalidateQueries({
        queryKey: ["delivery", trackingCode],
      });
      queryClient.setQueryData(
        ["delivery", trackingCode],
        (oldData: DeliveryDetails | undefined) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            status: variables.payload.status,
            history: [
              ...oldData.history,
              {
                description: variables.payload.description,
                date: new Date().toISOString(),
                city: variables.payload.city,
                country: variables.payload.country,
                location: {
                  lat: variables.payload.lat,
                  lng: variables.payload.lng,
                },
              },
            ],
          };
        }
      );
    },
    onError: (error) => {
      console.error("Failed to update status and location:", error);
      throw error;
    },
  });
};

// Mutation hook for deleting a delivery by ID
export function useDeleteDelivery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/deliveries/${id}`);
      return true;
    },
    onSuccess: () => {
      // Invalidate all deliveries queries so UI updates
      queryClient.invalidateQueries({ queryKey: ["deliveries"] });
    },
    onError: (error: unknown) => {
      // Optionally handle/log error
      console.error("Failed to delete delivery:", error);
    },
  });
}

// Legacy functions for backwards compatibility (using the api service directly)
export const updateDeliveryStatus = async (
  trackingCode: string,
  status: string
) => {
  try {
    const response = await api.patch(`/deliveries/${trackingCode}/status`, {
      status,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update delivery status:", error);
    throw error;
  }
};

export const addLocationUpdate = async (
  trackingCode: string,
  locationUpdate: LocationUpdatePayload
) => {
  try {
    const response = await api.post(
      `/deliveries/${trackingCode}/location`,
      locationUpdate
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add location update:", error);
    throw error;
  }
};

export const updateStatusAndLocation = async (
  deliveryId: string,
  payload: UpdateStatusAndLocationPayload
) => {
  try {
    const response = await api.put(
      `/deliveries/${deliveryId}/update-combined`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update status and location:", error);
    throw error;
  }
};

export const getDeliveryDetails = async (trackingCode: string) => {
  try {
    const response = await api.get(`/deliveries/track/${trackingCode}/full`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch delivery details:", error);
    throw error;
  }
};

// Fetch delivery by ID
export const getDeliveryById = async (id: string) => {
  const response = await api.get(`/deliveries/${id}`);
  return response.data;
};

// Edit/update delivery by ID
export const editDeliveryById = async (id: string, updatedData: object) => {
  const response = await api.put(`/deliveries/${id}`, updatedData);
  return response.data;
};

// You can put this in a utils or service file
export async function deleteDeliveryById(id: string) {
  const token = localStorage.getItem("adminToken");
  const response = await fetch(`/api/deliveries/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to delete delivery");
  return true;
}

// Example usage in a React component:
/*
import { 
  useDeliveryDetails, 
  useUpdateStatusAndLocation,
  useUpdateDeliveryStatus 
} from './api/deliveryService';

function DeliveryTracker({ trackingCode, deliveryId }: { trackingCode: string; deliveryId: string }) {
  const { 
    data: delivery, 
    isLoading, 
    error,
    refetch
  } = useDeliveryDetails(trackingCode);

  const updateStatusMutation = useUpdateDeliveryStatus();
  const updateLocationMutation = useUpdateStatusAndLocation();

  const handleStatusUpdate = (status: string) => {
    updateStatusMutation.mutate({ trackingCode, status });
  };

  const handleLocationUpdate = (payload: UpdateStatusAndLocationPayload) => {
    updateLocationMutation.mutate({ deliveryId, payload });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!delivery) return <div>No delivery found</div>;

  return (
    <div>
      <h2>Tracking: {delivery.trackingCode}</h2>
      <p>Status: {delivery.status}</p>
      <button 
        onClick={() => handleStatusUpdate('shipped')}
        disabled={updateStatusMutation.isPending}
      >
        Mark as Shipped
      </button>
      <button
        onClick={() => handleLocationUpdate({
          status: "Processing",
          description: "Package delivered to recipient at home",
          city: "Lagos",
          country: "Nigeria",
          lat: 6.5244,
          lng: 3.3792,
          checkEmail: true
        })}
        disabled={updateLocationMutation.isPending}
      >
        Update Location & Status
      </button>
      // ... rest of your component
    </div>
  );
}
*/

// Backend route handlers you'll need to implement
/*
// Example Express.js routes for your backend:

// PATCH /api/deliveries/:trackingCode/status
app.patch('/api/deliveries/:trackingCode/status', async (req, res) => {
  try {
    const { trackingCode } = req.params;
    const { status } = req.body;
    
    const delivery = await Delivery.findOneAndUpdate(
      { trackingCode },
      { 
        status,
        updatedAt: new Date()
      },
      { new: true }
    );
    
    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }
    
    res.json(delivery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/deliveries/:trackingCode/location
app.post('/api/deliveries/:trackingCode/location', async (req, res) => {
  try {
    const { trackingCode } = req.params;
    const locationUpdate = req.body;
    
    const delivery = await Delivery.findOneAndUpdate(
      { trackingCode },
      { 
        $push: { 
          history: {
            description: locationUpdate.description,
            date: new Date(locationUpdate.date),
            city: locationUpdate.city,
            country: locationUpdate.country,
            location: locationUpdate.location
          }
        },
        updatedAt: new Date()
      },
      { new: true }
    );
    
    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }
    
    res.json(delivery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/deliveries/:trackingCode/update-combined
app.put('/api/deliveries/:trackingCode/update-combined', async (req, res) => {
  try {
    const { trackingCode } = req.params;
    const { status, description, city, country, location } = req.body;
    
    const delivery = await Delivery.findOneAndUpdate(
      { trackingCode },
      { 
        status,
        $push: { 
          history: {
            description,
            date: new Date(),
            city,
            country,
            location
          }
        },
        updatedAt: new Date()
      },
      { new: true }
    );
    
    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }
    
    res.json(delivery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/deliveries/track/:trackingCode/full
app.get('/api/deliveries/track/:trackingCode/full', async (req, res) => {
  try {
    const { trackingCode } = req.params;
    
    const delivery = await Delivery.findOne({ trackingCode });
    
    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }
    
    // Generate dynamic timeline based on current status and history
    const timeline = generateTimelineFromDelivery(delivery);
    
    const response = {
      ...delivery.toObject(),
      timeline
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Helper function to generate timeline
function generateTimelineFromDelivery(delivery) {
  const timeline = [];
  
  // Always add "Package Received" as first step
  timeline.push({
    id: 'pending',
    title: 'Package Received',
    location: `${delivery.sender.address}, ${delivery.sender.country}`,
    date: delivery.dateSent,
    completed: true
  });
  
  // Add status-based timeline items
  const statusOrder = ['pending', 'processing', 'shipped', 'in transit', 'on hold', 'delivered'];
  const currentStatusIndex = statusOrder.indexOf(delivery.status.toLowerCase());
  
  // Add intermediate status steps
  for (let i = 1; i <= currentStatusIndex && i < statusOrder.length - 1; i++) {
    const status = statusOrder[i];
    timeline.push({
      id: status,
      title: status.charAt(0).toUpperCase() + status.slice(1),
      location: `${delivery.sender.address}, ${delivery.sender.country}`,
      date: new Date().toISOString(),
      completed: true
    });
  }
  
  // Add history items
  delivery.history.forEach((item, index) => {
    timeline.push({
      id: `history-${index}`,
      title: item.description,
      location: `${item.city}, ${item.country}`,
      date: item.date,
      completed: true,
      coordinates: item.location
    });
  });
  
  // Always add "Delivered" as last step
  timeline.push({
    id: 'delivered',
    title: 'Delivered',
    location: `${delivery.receiver.address}, ${delivery.receiver.country}`,
    date: delivery.deliveryDate,
    completed: delivery.status.toLowerCase() === 'delivered'
  });
  
  return timeline;
}
*/
