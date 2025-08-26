import { useState, useMemo } from "react";
import type { Shipment } from "../types/shipment";
import { mockShipments, calculateStats } from "../assets/data/mockData";

export const useShipmentData = () => {
  const [shipments] = useState<Shipment[]>(mockShipments);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const filteredShipments = useMemo(() => {
    return shipments.filter((shipment) => {
      const matchesSearch =
        searchTerm === "" ||
        shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipment.trackingNumber
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        shipment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipment.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shipment.destination.toLowerCase().includes(searchTerm.toLowerCase());

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
  };
};
