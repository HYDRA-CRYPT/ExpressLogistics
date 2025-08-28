export type TableDelivery = {
  id: number; // numeric for table
  _id: string; // use for Delete/Edit/Update
  Package: string; // description of first item
  Weight: number; // weight of first item
  status: string;
  receiver: string;
  sender: string;
  origin: string;
  destination: string;
  trackingCode: string;
};

// types/shipment.ts
export interface ShipmentItem {
  description: string;
  quantity: number;
  weight: number;
  value?: number;
}

export interface ShipmentBase {
  id?: number; // optional numeric ID for tables
  _id: string; // MongoDB delivery ID
  trackingCode: string;
  status: string;
  sender: {
    name: string;
    city?: string;
    country?: string;
    phone?: string;
    email?: string;
  };
  receiver: {
    name: string;
    city?: string;
    country?: string;
    phone?: string;
    email?: string;
  };
  shipmentType?: string;
  items?: ShipmentItem[];
  pickupDate?: string;
  deliveryDate?: string;
  deliveryFee?: number;
  currency?: { code: string; symbol: string; name: string };
  checkEmail?: boolean;
}

// CardDelivery type - optimized for card display
export type CardDelivery = {
  _id: string; // for actions (delete/edit/update)
  id?: number; // optional fallback
  trackingCode: string; // displayed in header
  status: string; // for status badge

  // Sender info (displayed as "Sender: name (city)")
  sender: {
    name: string;
    city?: string;
  };

  // Receiver info (displayed as "name (city)" in header)
  receiver: {
    name: string;
    city?: string;
  };

  // Shipment details
  shipmentType?: string; // displayed as main title
  pickupDate?: string | Date; // pickup date display
  deliveryDate?: string | Date; // delivery date display

  // Items for weight/quantity calculation
  items?: Array<{
    weight: number;
    quantity: number;
  }>;
};
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
