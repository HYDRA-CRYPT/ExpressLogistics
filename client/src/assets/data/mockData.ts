import type {
  ShipmentData,
  RecentTrackingNumber,
  ShipmentStatus,
  LocationUpdate,
} from "../../types/tracking";
import { updateShipmentStatus } from "../../services/trackingService";

export const mockRecentNumbers: RecentTrackingNumber[] = [
  {
    id: "1",
    trackingNumber: "TRK-2024-001234",
    createdAt: "2024-05-17T10:00:00Z",
  },
  {
    id: "2",
    trackingNumber: "TRK-2024-001235",
    createdAt: "2024-05-16T15:30:00Z",
  },
  {
    id: "3",
    trackingNumber: "TRK-2024-001236",
    createdAt: "2024-05-15T09:15:00Z",
  },
];

export const mockShipmentData: Record<string, ShipmentData> = {
  "TRK-2024-001234": {
    trackingNumber: "TRK-2024-001234",
    type: "LTL Shipment",
    packageCount: 3,
    status: "In Transit" as ShipmentStatus,
    estimatedDelivery: "Fri, May 19",
    currentLocation: "Columbus, OH",
    lastUpdated: "02:22 PM • May 17",
    progressPercentage: 75,
    origin: {
      city: "Los Angeles",
      state: "CA",
      date: "Monday, May 15, 2023",
      coordinates: { lat: 34.0522, lng: -118.2437 },
    },
    destination: {
      city: "New York",
      state: "NY",
      date: "Friday, May 19, 2023",
      coordinates: { lat: 40.7128, lng: -74.006 },
    },
    timeline: [
      {
        id: "1",
        title: "Picked up by carrier",
        location: "Los Angeles, CA",
        date: "Mon, May 14",
        time: "08:00 AM",
        completed: true,
      },
      {
        id: "2",
        title: "Departed origin facility",
        location: "Los Angeles, CA",
        date: "Mon, May 15",
        time: "06:30 AM",
        completed: true,
      },
      {
        id: "3",
        title: "Arrived at sort facility",
        location: "Phoenix, AZ",
        date: "Mon, May 15",
        time: "12:08 PM",
        completed: true,
      },
      {
        id: "4",
        title: "Departed sort facility",
        location: "Phoenix, AZ",
        date: "Tue, May 16",
        time: "06:15 AM",
        completed: true,
      },
      {
        id: "5",
        title: "In transit to destination",
        location: "Columbus, OH",
        date: "Wed, May 17",
        time: "02:22 PM",
        completed: true,
      },
      {
        id: "6",
        title: "Out for delivery",
        location: "New York, NY",
        date: "Fri, May 19",
        time: "Pending",
        completed: false,
      },
      {
        id: "7",
        title: "Delivered",
        location: "New York, NY",
        date: "Fri, May 19",
        time: "Pending",
        completed: false,
      },
    ],
    routeCoordinates: [
      {
        lat: 34.0522,
        lng: -118.2437,
        city: "Los Angeles",
        country: "USA",
        description: "Picked up from origin",
        date: "2024-05-15T08:00:00Z",
      },
      {
        lat: 33.4484,
        lng: -112.074,
        city: "Phoenix",
        country: "USA",
        description: "Arrived at sort facility",
        date: "2024-05-15T12:08:00Z",
      },
      {
        lat: 39.9612,
        lng: -82.9988,
        city: "Columbus",
        country: "USA",
        description: "In transit to destination",
        date: "2024-05-17T14:22:00Z",
      },
    ],
  },
  "TRK-2024-001235": {
    trackingNumber: "TRK-2024-001235",
    type: "Express Shipment",
    packageCount: 1,
    status: "Delivered" as ShipmentStatus,
    estimatedDelivery: "Thu, May 18",
    currentLocation: "Delivered",
    lastUpdated: "03:45 PM • May 18",
    progressPercentage: 100,
    origin: {
      city: "Chicago",
      state: "IL",
      date: "Tuesday, May 16, 2023",
      coordinates: { lat: 41.8781, lng: -87.6298 },
    },
    destination: {
      city: "Miami",
      state: "FL",
      date: "Thursday, May 18, 2023",
      coordinates: { lat: 25.7617, lng: -80.1918 },
    },
    timeline: [
      {
        id: "1",
        title: "Picked up by carrier",
        location: "Chicago, IL",
        date: "Tue, May 16",
        time: "09:00 AM",
        completed: true,
      },
      {
        id: "2",
        title: "In transit",
        location: "Atlanta, GA",
        date: "Wed, May 17",
        time: "11:30 AM",
        completed: true,
      },
      {
        id: "3",
        title: "Out for delivery",
        location: "Miami, FL",
        date: "Thu, May 18",
        time: "08:00 AM",
        completed: true,
      },
      {
        id: "4",
        title: "Delivered",
        location: "Miami, FL",
        date: "Thu, May 18",
        time: "03:45 PM",
        completed: true,
      },
    ],
    routeCoordinates: [
      {
        lat: 41.8781,
        lng: -87.6298,
        city: "Chicago",
        country: "USA",
        description: "Picked up by carrier",
        date: "2024-05-16T09:00:00Z",
      },
      {
        lat: 33.749,
        lng: -84.388,
        city: "Atlanta",
        country: "USA",
        description: "In transit",
        date: "2024-05-17T11:30:00Z",
      },
      {
        lat: 25.7617,
        lng: -80.1918,
        city: "Miami",
        country: "USA",
        description: "Delivered",
        date: "2024-05-18T15:45:00Z",
      },
    ],
  },
  "TRK-2024-001236": {
    trackingNumber: "TRK-2024-001236",
    type: "Standard Shipment",
    packageCount: 2,
    status: "Processing" as ShipmentStatus,
    estimatedDelivery: "Mon, May 22",
    currentLocation: "Seattle, WA",
    lastUpdated: "08:15 AM • May 17",
    progressPercentage: 20,
    origin: {
      city: "Seattle",
      state: "WA",
      date: "Wednesday, May 17, 2023",
      coordinates: { lat: 47.6062, lng: -122.3321 },
    },
    destination: {
      city: "Boston",
      state: "MA",
      date: "Monday, May 22, 2023",
      coordinates: { lat: 42.3601, lng: -71.0589 },
    },
    timeline: [
      {
        id: "1",
        title: "Order processed",
        location: "Seattle, WA",
        date: "Wed, May 17",
        time: "08:15 AM",
        completed: true,
      },
      {
        id: "2",
        title: "Ready for pickup",
        location: "Seattle, WA",
        date: "Wed, May 17",
        time: "Pending",
        completed: false,
      },
      {
        id: "3",
        title: "In transit",
        location: "Denver, CO",
        date: "Thu, May 18",
        time: "Pending",
        completed: false,
      },
      {
        id: "4",
        title: "Out for delivery",
        location: "Boston, MA",
        date: "Mon, May 22",
        time: "Pending",
        completed: false,
      },
      {
        id: "5",
        title: "Delivered",
        location: "Boston, MA",
        date: "Mon, May 22",
        time: "Pending",
        completed: false,
      },
    ],
    routeCoordinates: [
      {
        lat: 47.6062,
        lng: -122.3321,
        city: "Seattle",
        country: "USA",
        description: "Order processed",
        date: "2024-05-17T08:15:00Z",
      },
    ],
  },
};

// Simulate admin status update
export const updateShipmentStatusAPI = async (
  trackingNumber: string,
  newStatus: ShipmentStatus,
  locationUpdates: LocationUpdate[] = []
): Promise<ShipmentData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shipment = mockShipmentData[trackingNumber];
      if (!shipment) {
        reject(new Error("Shipment not found"));
        return;
      }

      const updatedShipment = updateShipmentStatus(
        shipment,
        newStatus,
        locationUpdates
      );
      mockShipmentData[trackingNumber] = updatedShipment;
      resolve(updatedShipment);
    }, 1000);
  });
};

// Simulate adding location update
export const addLocationUpdate = async (
  trackingNumber: string,
  locationUpdate: LocationUpdate
): Promise<ShipmentData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shipment = mockShipmentData[trackingNumber];
      if (!shipment) {
        reject(new Error("Shipment not found"));
        return;
      }

      // Add to route coordinates
      const newRoutePoint = {
        lat: locationUpdate.location.lat,
        lng: locationUpdate.location.lng,
        city: locationUpdate.city,
        country: locationUpdate.country,
        description: locationUpdate.description,
        date: locationUpdate.time,
      };

      const updatedShipment = {
        ...shipment,
        currentLocation: `${locationUpdate.city}, ${locationUpdate.country}`,
        lastUpdated: new Date(locationUpdate.time).toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          month: "short",
          day: "numeric",
        }),
        routeCoordinates: [...(shipment.routeCoordinates || []), newRoutePoint],
      };

      mockShipmentData[trackingNumber] = updatedShipment;
      resolve(updatedShipment);
    }, 500);
  });
};
// Simulate API calls
export const fetchRecentTrackingNumbers = async (): Promise<
  RecentTrackingNumber[]
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRecentNumbers);
    }, 500);
  });
};

export const trackShipment = async (
  trackingNumber: string
): Promise<ShipmentData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shipment = mockShipmentData[trackingNumber];
      if (shipment) {
        resolve(shipment);
      } else {
        reject(new Error("Tracking number not found"));
      }
    }, 800);
  });
};

export const addToRecentTracking = async (
  trackingNumber: string
): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would save to database
      const existing = mockRecentNumbers.find(
        (item) => item.trackingNumber === trackingNumber
      );
      if (!existing) {
        mockRecentNumbers.unshift({
          id: Date.now().toString(),
          trackingNumber,
          createdAt: new Date().toISOString(),
        });
        // Keep only the 5 most recent
        if (mockRecentNumbers.length > 5) {
          mockRecentNumbers.splice(5);
        }
      }
      resolve();
    }, 100);
  });
};

// all shipments mock data
import type { Shipment, ShipmentStats } from "../../types/shipment";

export const mockShipments: ShipmentData[] = [
  {
    trackingNumber: "TRK78901234",
    type: "road",
    packageCount: 85,
    status: "In Transit",
    estimatedDelivery: "May 18, 2024",
    currentLocation: "Kansas City, MO",
    lastUpdated: "May 16, 2024",

    origin: {
      city: "New York",
      state: "NY",
      date: "May 15, 2024",
    },
    destination: {
      city: "Los Angeles",
      state: "CA",
      date: "May 18, 2024",
    },

    timeline: [],
    progressPercentage: 65,
  },
  // ...other shipments
];

export const calculateStats = (shipments: Shipment[]): ShipmentStats => {
  const totalShipments = shipments.length;
  const inTransit = shipments.filter((s) => s.status === "in-transit").length;
  const delivered = shipments.filter((s) => s.status === "delivered").length;
  const delayed = shipments.filter(
    (s) => s.status === "delayed" || s.status === "pending"
  ).length;

  const totalWeight = shipments.reduce((sum, s) => sum + s.weight, 0);
  const totalValue = shipments.reduce((sum, s) => sum + s.value, 0);
  const totalItems = shipments.reduce((sum, s) => sum + s.items, 0);

  return {
    totalShipments,
    inTransit,
    delivered,
    delayed,
    totalWeight,
    avgWeight: Math.round(totalWeight / totalShipments),
    totalValue,
    avgValue: Math.round(totalValue / totalShipments),
    totalItems,
    avgItems: Math.round(totalItems / totalShipments),
  };
};
