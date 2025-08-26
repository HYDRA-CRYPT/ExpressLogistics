export interface TrackingEvent {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  completed: boolean;
  description?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  city?: string;
  country?: string;
}

export interface TrackingHistoryEntry {
  status: ShipmentStatus;
  timestamp: string;
  location: string | { lat: number; lng: number };
}
export interface ShipmentData {
  trackingNumber: string;
  type: string;
  packageCount: number;
  status: ShipmentStatus; // use your defined ShipmentStatus
  estimatedDelivery: string;
  currentLocation: string | { lat: number; lng: number }; // updated to support both
  lastUpdated: string;

  origin: {
    city: string;
    state: string;
    date: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  destination: {
    city: string;
    state: string;
    date: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };

  timeline: TrackingEvent[];
  progressPercentage: number;

  routeCoordinates?: Array<{
    lat: number;
    lng: number;
    city: string;
    country: string;
    description: string;
    date: string;
  }>;

  // New optional fields for tracking
  trackingHistory?: TrackingHistoryEntry[];
  locationUpdates?: LocationUpdate[];
}

export interface RecentTrackingNumber {
  id: string;
  trackingNumber: string;
  createdAt: string;
}

export type ShipmentStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "In Transit"
  | "On Hold"
  | "Delivered";

export interface LocationUpdate {
  description: string;
  time: string;
  location: {
    lat: number;
    lng: number;
  };
  city: string;
  country: string;
}
