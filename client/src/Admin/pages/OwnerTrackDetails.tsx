import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ShipmentDetails from "@/Admin/pages/ShipmentDetails";
import { trackShipment } from "../../assets/data/mockData";
import { type ShipmentData } from "@/types/tracking";
import LoadingSpinner from "@/components/LoadingSpinner";

const OwnerTrackDetails = () => {
  const { code } = useParams<{ code: string }>();
  const [shipment, setShipment] = useState<ShipmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!code) return;

    setLoading(true);
    setError(null);

    trackShipment(code)
      .then((data) => setShipment(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [code]);

  if (loading) return <LoadingSpinner />;

  if (error)
    return <div className="text-center text-red-500 p-10">{error}</div>;

  if (!shipment)
    return (
      <div className="text-center text-red-500 p-10">
        No shipment found for tracking number: {code}
      </div>
    );

  return (
    <ShipmentDetails
      shipment={shipment}
      onShipmentUpdate={setShipment} // Correct setter for updating this shipment
    />
  );
};

export default OwnerTrackDetails;
