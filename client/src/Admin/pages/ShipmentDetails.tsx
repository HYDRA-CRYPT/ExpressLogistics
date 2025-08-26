import React, { useState } from "react";
import {
  Copy,
  Printer as Print,
  Share2,
  Package,
  Calendar,
  MapPin,
  Clock,
} from "lucide-react";
import { type ShipmentData } from "../../types/tracking";
import MapView from "../../components/MapView";
import AdminPanel from "../../components/AdminPanel";

interface ShipmentDetailsProps {
  shipment: ShipmentData;
  onShipmentUpdate?: (updatedShipment: ShipmentData) => void;
}

const ShipmentDetails: React.FC<ShipmentDetailsProps> = ({
  shipment,
  onShipmentUpdate,
}) => {
  const [activeTab, setActiveTab] = useState<"timeline" | "map" | "admin">(
    "timeline"
  );
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shipment.trackingNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `Shipment ${shipment.trackingNumber}`,
        text: `Track shipment status: ${shipment.status}`,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      {/* Shipment Header */}
      <div className="bg-zinc-800/30 border border-zinc-700 rounded-2xl p-8 mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Shipment {shipment.trackingNumber}
            </h2>
            <div className="flex items-center text-zinc-400 text-lg">
              <Package className="w-5 h-5 mr-2" />
              {shipment.type} • {shipment.packageCount} packages
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-700/50 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-600 rounded-lg transition-all duration-200"
            >
              <Copy className="w-4 h-4" />
              {copied ? "Copied!" : "Copy"}
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-700/50 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-600 rounded-lg transition-all duration-200"
            >
              <Print className="w-4 h-4" />
              Print
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-700/50 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-600 rounded-lg transition-all duration-200"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>

        {/* Status Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h4 className="text-zinc-400 text-sm font-medium mb-2">Status</h4>
            <div className="inline-flex px-3 py-1 bg-blue-900/30 text-blue-300 border border-blue-800 rounded-full text-sm font-medium">
              {shipment.status}
            </div>
          </div>
          <div>
            <h4 className="text-zinc-400 text-sm font-medium mb-2">
              Estimated Delivery
            </h4>
            <div className="flex items-center text-white">
              <Calendar className="w-4 h-4 mr-2" />
              {shipment.estimatedDelivery}
            </div>
          </div>
          <div>
            <h4 className="text-zinc-400 text-sm font-medium mb-2">
              Current Location
            </h4>
            <div className="flex items-center text-white">
              <MapPin className="w-4 h-4 mr-2" />
              {typeof shipment.currentLocation === "string"
                ? shipment.currentLocation
                : `${shipment.currentLocation.lat}, ${shipment.currentLocation.lng}`}
            </div>
          </div>
          <div>
            <h4 className="text-zinc-400 text-sm font-medium mb-2">
              Last Updated
            </h4>
            <div className="flex items-center text-white">
              <Clock className="w-4 h-4 mr-2" />
              {shipment.lastUpdated}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-zinc-800/30 border border-zinc-700 rounded-2xl p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">
            Shipment Progress
          </h3>
          <span className="text-zinc-400">
            {shipment.progressPercentage}% Complete
          </span>
        </div>

        <div className="relative mb-4">
          <div className="w-full h-2 bg-zinc-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-1000 ease-out"
              style={{ width: `${shipment.progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="text-zinc-400 text-sm font-medium mb-1">From</h4>
            <p className="text-white font-medium">
              {shipment.origin.city}, {shipment.origin.state}
            </p>
            <p className="text-zinc-400 text-sm">
              Shipped on {shipment.origin.date}
            </p>
          </div>
          <div className="text-right">
            <h4 className="text-zinc-400 text-sm font-medium mb-1">To</h4>
            <p className="text-white font-medium">
              {shipment.destination.city}, {shipment.destination.state}
            </p>
            <p className="text-zinc-400 text-sm">
              Expected {shipment.destination.date}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-zinc-800/30 border border-zinc-700 rounded-2xl overflow-hidden">
        <div className="border-b border-zinc-700">
          <div className="flex">
            {[
              { key: "timeline", label: "Timeline" },
              { key: "map", label: "Map View" },
              { key: "admin", label: "Admin Panel" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-6 py-4 text-sm font-medium transition-colors duration-200 border-b-2 ${
                  activeTab === tab.key
                    ? "text-blue-400 border-blue-400 bg-zinc-800/50"
                    : "text-zinc-400 border-transparent hover:text-zinc-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-8">
          {activeTab === "timeline" && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-6">
                Shipment Timeline
              </h3>
              <p className="text-zinc-400 mb-8">
                Track the journey of your shipment from origin to destination
              </p>

              <div className="space-y-6">
                {shipment.timeline.map((event, index) => (
                  <div key={event.id} className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                          event.completed
                            ? "bg-green-500 border-green-500"
                            : "bg-zinc-700 border-zinc-600"
                        }`}
                      >
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      {index < shipment.timeline.length - 1 && (
                        <div
                          className={`w-0.5 h-8 mx-auto mt-2 ${
                            event.completed ? "bg-green-500" : "bg-zinc-700"
                          }`}
                        ></div>
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <h4 className="text-white font-medium mb-1">
                        {event.title}
                      </h4>
                      <p className="text-zinc-400 text-sm mb-1">
                        {event.location}
                      </p>
                      <p className="text-zinc-500 text-sm">
                        {event.date} at {event.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "map" && <MapView shipment={shipment} />}

          {activeTab === "admin" && onShipmentUpdate && (
            <AdminPanel
              trackingNumber={shipment.trackingNumber}
              currentStatus={shipment.status as any}
              onUpdate={onShipmentUpdate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ShipmentDetails;
