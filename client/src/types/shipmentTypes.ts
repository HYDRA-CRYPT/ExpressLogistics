export interface EditShipmentData {
  shipmentType: string;
  pickupDate: string;
  deliveryDate: string;
  sender: {
    name: string;
    city: string;
    country: string;
    phone: string;
    address: string;
    email: string;
  };
  receiver: {
    name: string;
    city: string;
    country: string;
    phone: string;
    address: string;
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

export interface CreateShipmentData {
  shipmentType: string;
  pickupDate: string;
  deliveryDate: string;
  sender: {
    name: string;
    city: string;
    country: string;
    phone: string;
    address: string;
    email: string;
  };
  receiver: {
    name: string;
    city: string;
    country: string;
    phone: string;
    address: string;
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
