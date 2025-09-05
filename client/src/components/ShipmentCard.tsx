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
    <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-xl p-3 sm:p-4 lg:p-6 hover:bg-zinc-800/70 transition-all duration-300 w-full max-w-sm mx-auto sm:max-w-none sm:mx-0">
      {/* Header */}
      <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-white text-base sm:text-lg font-semibold truncate">
            {packageName}
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm truncate">
            {trackingCode}
          </p>
        </div>
        <div className="shrink-0">
          <ShipmentActionCard
            shipment={shipment}
            onDelete={onDelete || ((id) => console.log("Delete:", id))}
            onEdit={(shipment) => console.log("Edit:", shipment)}
            onUpdateLocation={(code) => console.log("Update location:", code)}
          />
        </div>
      </div>

      {/* Status */}
      <div className="mb-3 sm:mb-4">
        <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md border text-xs font-medium bg-zinc-700/30 text-white border-zinc-600">
          {getStatusIcon(status)}
          <span className="hidden sm:inline">{status}</span>
          <span className="sm:hidden">
            {status.slice(0, 8)}
            {status.length > 8 ? "..." : ""}
          </span>
        </div>
      </div>

      {/* Info Grid - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm mb-3 sm:mb-4">
        <div className="space-y-2 sm:space-y-0">
          <div className="flex sm:block">
            <div className="w-20 sm:w-auto shrink-0">
              <p className="text-zinc-400 mb-1 text-xs sm:text-sm">Receiver</p>
            </div>
            <p className="text-white truncate flex-1 text-xs sm:text-sm">
              {receiver}
            </p>
          </div>

          <div className="flex sm:block">
            <div className="w-20 sm:w-auto shrink-0">
              <p className="text-zinc-400 mb-1 text-xs sm:text-sm">Sender</p>
            </div>
            <p className="text-white truncate flex-1 text-xs sm:text-sm">
              {sender}
            </p>
          </div>
        </div>

        <div className="space-y-2 sm:space-y-0">
          <div className="flex sm:block">
            <div className="w-20 sm:w-auto shrink-0">
              <p className="text-zinc-400 mb-1 text-xs sm:text-sm">Origin</p>
            </div>
            <p className="text-white truncate flex-1 text-xs sm:text-sm">
              {origin}
            </p>
          </div>

          <div className="flex sm:block">
            <div className="w-20 sm:w-auto shrink-0">
              <p className="text-zinc-400 mb-1 text-xs sm:text-sm">
                Destination
              </p>
            </div>
            <p className="text-white truncate flex-1 text-xs sm:text-sm">
              {destination}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Info Row - Mobile Optimized */}
      <div className="flex justify-between items-center pt-3 border-t border-zinc-700/50">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-zinc-400 text-xs">Weight</p>
            <p className="text-white text-sm font-medium">{weight} kg</p>
          </div>
          <div className="hidden sm:block">
            <p className="text-zinc-400 text-xs">ID</p>
            <p className="text-white text-sm font-medium truncate max-w-20">
              {id}
            </p>
          </div>
        </div>
        <div className="sm:hidden">
          <p className="text-zinc-400 text-xs">ID</p>
          <p className="text-white text-xs font-medium truncate max-w-16">
            {id}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShipmentCard;
