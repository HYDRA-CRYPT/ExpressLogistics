export interface DeliveryItem {
  description: string;
  value: number;
  quantity: number;
  weight?: number;
}

export interface ContactInfo {
  name: string;
  address: string;
  city: string;
  country: string;
  email: string;
  phone: string;
}

export interface DeliveryData {
  trackingCode: string;
  status: string;
  shipmentType?: string;
  dateSent?: string;
  deliveryDate?: string;
  deliveryFee?: number;
  currency?: string;
  sender?: ContactInfo;
  receiver?: ContactInfo;
  items?: DeliveryItem[];
}
