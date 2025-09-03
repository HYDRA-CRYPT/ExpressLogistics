import React from "react";
import { getStatusIcon } from "../utils/getIcon";
import type { CardDelivery } from "@/types/shipment";
import ShipmentActionCard from "./ShipmentActionCard";

interface ShipmentCardProps {
  shipment: CardDelivery;
  onDelete?: (id: string) => void;
}

const ShipmentCard: React.FC<ShipmentCardProps> = ({ shipment, onDelete }) => {
  // Defensive fallback for nested data
  const receiver = shipment.receiver?.name || "N/A";
  const sender = shipment.sender?.name || "N/A";
  const origin = shipment.sender?.city || "N/A";
  const destination = shipment.receiver?.city || "N/A";
  const packageName = shipment.shipmentType || "N/A";
  const weight = Array.isArray(shipment.items)
    ? shipment.items.reduce((sum, i) => sum + (i.weight || 0), 0)
    : 0;
  const status = shipment.status || "N/A";
  const trackingCode = shipment.trackingCode || "N/A";
  const id = shipment._id || shipment.id || "N/A";

  return (
    <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-xl p-6 hover:bg-zinc-800/70 transition-all duration-300 min-w-[260px] sm:min-w-[300px] md:min-w-[320px]">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-white text-lg font-semibold truncate">
            {packageName}
          </h3>
          <p className="text-zinc-400 text-sm truncate">{trackingCode}</p>
        </div>
        <ShipmentActionCard
          shipment={shipment}
          onDelete={onDelete || ((id) => console.log("Delete:", id))}
          onEdit={(shipment) => console.log("Edit:", shipment)}
          onUpdateLocation={(code) => console.log("Update location:", code)}
        />
      </div>

      {/* Status */}
      <div className="mb-4">
        <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md border text-xs font-medium bg-zinc-700/30 text-white border-zinc-600">
          {getStatusIcon(status)}
          {status}
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div>
          <p className="text-zinc-400 mb-1">Receiver</p>
          <p className="text-white truncate">{receiver}</p>
        </div>
        <div>
          <p className="text-zinc-400 mb-1">Sender</p>
          <p className="text-white truncate">{sender}</p>
        </div>
        <div>
          <p className="text-zinc-400 mb-1">Origin</p>
          <p className="text-white truncate">{origin}</p>
        </div>
        <div>
          <p className="text-zinc-400 mb-1">Destination</p>
          <p className="text-white truncate">{destination}</p>
        </div>
        <div>
          <p className="text-zinc-400 mb-1">Weight (kg)</p>
          <p className="text-white">{weight}</p>
        </div>
        <div>
          <p className="text-zinc-400 mb-1">ID</p>
          <p className="text-white truncate">{id}</p>
        </div>
      </div>
    </div>
  );
};

export default ShipmentCard;
