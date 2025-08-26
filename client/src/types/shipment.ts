export interface Shipment {
  id: string;
  trackingNumber: string;
  customer: string;
  origin: string;
  destination: string;
  departure: string;
  eta: string;
  status: "in-transit" | "delivered" | "pending" | "delayed";
  type: "road" | "air" | "sea";
  priority: "standard" | "express" | "economy";
  carrier: string;
  progress: number;
  weight: number;
  value: number;
  items: number;
}

export interface ShipmentStats {
  totalShipments: number;
  inTransit: number;
  delivered: number;
  delayed: number;
  totalWeight: number;
  avgWeight: number;
  totalValue: number;
  avgValue: number;
  totalItems: number;
  avgItems: number;
}
