import React from "react";
import { Clock, CheckCircle, AlertTriangle } from "lucide-react";
import type { CardDelivery } from "@/types/shipment";
import ShipmentActionCard from "./ShipmentActionCard";

interface ShipmentCardProps {
  shipment: CardDelivery; // instead of ShipmentBase
}

const statusConfig = {
  "in-transit": {
    label: "In Transit",
    color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    icon: Clock,
  },
  delivered: {
    label: "Delivered",
    color: "bg-green-500/10 text-green-400 border-green-500/20",
    icon: CheckCircle,
  },
  pending: {
    label: "Pending",
    color: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    icon: AlertTriangle,
  },
  delayed: {
    label: "Delayed",
    color: "bg-red-500/10 text-red-400 border-red-500/20",
    icon: AlertTriangle,
  },
};

const ShipmentCard: React.FC<ShipmentCardProps> = ({ shipment }) => {
  type StatusKey = keyof typeof statusConfig;
  const statusKey = (shipment.status || "pending")
    .toLowerCase()
    .replace(/\s/g, "-") as StatusKey;

  const StatusInfo = statusConfig[statusKey] || statusConfig.pending;
  const StatusIcon = StatusInfo.icon;

  const totalWeight =
    shipment.items?.reduce((sum, i) => sum + i.weight, 0) || 0;
  const totalItems =
    shipment.items?.reduce((sum, i) => sum + i.quantity, 0) || 0;

  return (
    <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-xl p-6 hover:bg-zinc-800/70 transition-all duration-300 min-w-[260px] sm:min-w-[300px] md:min-w-[320px]">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-white text-lg font-semibold truncate">
            {shipment.shipmentType}
          </h3>
          <p className="text-zinc-400 text-sm truncate">
            {shipment.trackingCode}
          </p>
        </div>

        {/* Actions Dropdown */}
        <ShipmentActionCard
          shipment={shipment}
          onDelete={(id) => console.log("Delete:", id)}
          onEdit={(shipment) => console.log("Edit:", shipment)}
          onUpdateLocation={(code) => console.log("Update location:", code)}
        />
      </div>

      {/* Sender & Receiver & Status */}
      <div className="mb-6">
        <h4 className="text-white font-medium mb-2 truncate">
          {shipment.receiver.name} ({shipment.receiver.city})
        </h4>
        <p className="text-zinc-400 text-sm mb-1 truncate">
          Sender: {shipment.sender.name} ({shipment.sender.city})
        </p>
        <div
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border text-xs font-medium ${StatusInfo.color}`}
        >
          <StatusIcon size={12} />
          {StatusInfo.label}
        </div>
      </div>

      {/* Pickup & Delivery Dates */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <p className="text-zinc-400 mb-1">Pickup</p>
          <p className="text-white truncate">
            {shipment.pickupDate
              ? new Date(shipment.pickupDate).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
        <div>
          <p className="text-zinc-400 mb-1">Delivery</p>
          <p className="text-white truncate">
            {shipment.deliveryDate
              ? new Date(shipment.deliveryDate).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      </div>

      {/* Weight & Items */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <p className="text-zinc-400 mb-1">Weight</p>
          <p className="text-white">{totalWeight} kg</p>
        </div>
        <div>
          <p className="text-zinc-400 mb-1">Items</p>
          <p className="text-white">{totalItems}</p>
        </div>
      </div>
    </div>
  );
};

export default ShipmentCard;
