import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShipmentForm from "../../components/ShipmentForm";
import type { ShipmentData } from "@/types/tracking";
import { mockShipmentData } from "../../assets/data/mockData";

const EditShipmentPage = () => {
  const { id } = useParams<{ id: string }>();
  const [shipmentData, setShipmentData] =
    useState<Partial<ShipmentData> | null>(null);

  useEffect(() => {
    // Fetch from mock data
    if (id && mockShipmentData[id]) {
      setShipmentData(mockShipmentData[id]);
    }
  }, [id]);

  const handleUpdate = (updatedData: ShipmentData) => {
    // For mock, just log the updated data
    console.log("Updated shipment:", updatedData);
    alert("Shipment updated!");

    // If you want to update the state for immediate UI reflection:
    setShipmentData(updatedData);
  };

  if (!shipmentData) return <div>Loading...</div>;

  return <ShipmentForm initialData={shipmentData} onSubmit={handleUpdate} />;
};

export default EditShipmentPage;
