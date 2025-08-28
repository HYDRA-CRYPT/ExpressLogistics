import { useState, useMemo } from "react";
import { calculateStats } from "../assets/data/mockData";
import { useDeliveryList } from "@/hooks/useDelivery";

export interface Shipment {
  id: string;
  trackingCode: string;
  status: string;
  priority?: string; // optional if not in API
  shipmentType: string;
  pickupDate: string;
  deliveryDate: string;
  sender: {
    name: string;
    city: string;
    country: string;
    phone: string;
    email: string;
  };
  receiver: {
    name: string;
    city: string;
    country: string;
    phone: string;
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

export const useShipmentData = () => {
  const { deliveries, isLoading, error } = useDeliveryList();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const shipments: Shipment[] = useMemo(() => {
    return (deliveries || []).map((d) => ({
      id: d.id,
      trackingCode: d.trackingCode,
      status: d.status,
      priority: "Normal", // default
      shipmentType: "Standard", // default
      pickupDate: "", // unknown
      deliveryDate: "", // unknown
      sender: {
        // placeholders
        name: "",
        city: "",
        country: "",
        phone: "",
        email: "",
      },
      receiver: {
        // placeholders
        name: "",
        city: "",
        country: "",
        phone: "",
        email: "",
      },
      items: [], // empty
      deliveryFee: 0,
      currency: { code: "USD", symbol: "$", name: "USD" },
      checkEmail: false,
    }));
  }, [deliveries]);

  console.log("deliveries:", deliveries);

  const filteredShipments = useMemo(() => {
    return shipments.filter((shipment) => {
      const matchesSearch =
        searchTerm === "" ||
        shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipment.trackingCode
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        shipment.receiver.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        shipment.sender.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipment.receiver.city.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "" || shipment.status === statusFilter;
      const matchesPriority =
        priorityFilter === "" || shipment.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [shipments, searchTerm, statusFilter, priorityFilter]);

  const stats = useMemo(
    () => calculateStats(filteredShipments),
    [filteredShipments]
  );

  return {
    shipments: filteredShipments,
    stats,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    isLoading,
    error,
  };
};
