import type { ShipmentItem } from "./shipment";

// export interface TrackingEvent {
//   id: string;
//   title: string;
//   location: string;
//   date: string;
//   time: string;
//   completed: boolean;
//   description?: string;
//   coordinates?: {
//     lat: number;
//     lng: number;
//   };
//   city?: string;
//   country?: string;
// }

// export interface TrackingHistoryEntry {
//   status: ShipmentStatus;
//   timestamp: string;
//   location: string | { lat: number; lng: number };
// }
// export type ShipmentStatus =
//   | "Pending"
//   | "Processing"
//   | "Shipped"
//   | "In Transit"
//   | "On Hold"
//   | "Delivered";

// export interface LocationUpdate {
//   _id?: string;
//   description?: string;
//   status?: ShipmentStatus;
//   time?: string | Date;
//   updateDate?: string; // "YYYY-MM-DD"
//   updateTime?: string; // "HH:MM"
//   location?: { lat: number; lng: number } | null;
//   city?: string;
//   country?: string;
// }

// export interface ShipmentItem {
//   description: string;
//   quantity: number;
//   weight?: number;
//   value?: number;
// }

// export interface Party {
//   name?: string;
//   email?: string;
//   phone?: string;
//   address?: string;
//   city?: string;
//   country?: string;
// }

// export interface ShipmentData {
//   _id?: string;
//   trackingCode: string;
//   // server model fields
//   sender?: Party;
//   receiver?: Party;
//   shipmentType?: "Document" | "Parcel" | "Freight" | "Other";
//   items?: ShipmentItem[];
//   deliveryFee?: number;
//   currency?: string;
//   status?: ShipmentStatus;
//   history?: LocationUpdate[];
//   dateSent?: string | Date;
//   deliveryDate?: string | Date;
//   checkEmail?: boolean;
//   invoiceUrl?: string;
//   updatedAt?: string | Date;

//   // optional UI / derived fields (kept optional)
//   trackingNumber?: string;
//   type?: string;
//   packageCount?: number;
//   estimatedDelivery?: string;
//   currentLocation?: string;
//   lastUpdated?: string;
//   progressPercentage?: number;
//   origin?: { city?: string; state?: string; country?: string; date?: string };
//   destination?: {
//     city?: string;
//     state?: string;
//     country?: string;
//     date?: string;
//   };
//   timeline?: Array<any>;
//   routeCoordinates?: Array<{ lat: number; lng: number }>;

//   // New optional fields for tracking
//   trackingHistory?: TrackingHistoryEntry[];
//   locationUpdates?: LocationUpdate[];
// }

// export function toShipmentStatus(status: string): ShipmentStatus {
//   const allowed: ShipmentStatus[] = [
//     "Pending",
//     "Processing",
//     "Shipped",
//     "In Transit",
//     "On Hold",
//     "Delivered",
//   ];
//   // Capitalize and match
//   const formatted = status
//     .split(" ")
//     .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
//     .join(" ");
//   return allowed.includes(formatted as ShipmentStatus)
//     ? (formatted as ShipmentStatus)
//     : "Pending";
// }
// types/tracking.ts

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Party {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  coordinates?: Coordinates;
}

// ShipmentItem is exported from shipment.ts - import from there to avoid conflicts

export interface LocationUpdate {
  _id?: string;
  location?: string;
  coordinates?: Coordinates;
  status?: string;
  description?: string;
  date?: string | number | Date;
  timestamp?: string | number | Date;
  isCompleted?: boolean;
  city?: string;
  country?: string;
  state?: string;
}

export type ShipmentStatus =
  | "pending"
  | "picked_up"
  | "in_transit"
  | "out_for_delivery"
  | "delivered"
  | "delayed"
  | "cancelled"
  | "returned";

export interface ShipmentData {
  _id?: string;
  trackingCode?: string;
  trackingNumber?: string;
  sender?: Party;
  receiver?: Party;
  shipmentType?: string;
  shipmentTypeDisplay?: string;
  items?: ShipmentItem[];
  deliveryFee?: number;
  currency?: string;
  status?: ShipmentStatus | string;
  history?: LocationUpdate[];
  dateSent?: string | number | Date;
  deliveryDate?: string | number | Date;
  [key: string]: unknown;
}
