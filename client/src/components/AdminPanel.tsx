import React, { useState } from "react";
import { Settings, MapPin, Clock, Send } from "lucide-react";
import type { ShipmentStatus, LocationUpdate } from "../types/tracking";
import {
  updateShipmentStatusAPI,
  addLocationUpdate,
} from "../assets/data/mockData";

interface AdminPanelProps {
  trackingNumber: string;
  currentStatus: ShipmentStatus;
  onUpdate: (updatedShipment: any) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({
  trackingNumber,
  currentStatus,
  onUpdate,
}) => {
  const [selectedStatus, setSelectedStatus] =
    useState<ShipmentStatus>(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);
  const [locationUpdate, setLocationUpdate] = useState<Partial<LocationUpdate>>(
    {
      description: "",
      city: "",
      country: "",
      location: { lat: 0, lng: 0 },
    }
  );
  const [isAddingLocation, setIsAddingLocation] = useState(false);

  const statusOptions: ShipmentStatus[] = [
    "Pending",
    "Processing",
    "Shipped",
    "In Transit",
    "On Hold",
    "Delivered",
  ];

  const handleStatusUpdate = async () => {
    if (selectedStatus === currentStatus) return;

    setIsUpdating(true);
    try {
      const updatedShipment = await updateShipmentStatusAPI(
        trackingNumber,
        selectedStatus
      );
      onUpdate(updatedShipment);
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLocationAdd = async () => {
    if (
      !locationUpdate.description ||
      !locationUpdate.city ||
      !locationUpdate.country
    ) {
      return;
    }

    setIsAddingLocation(true);
    try {
      const update: LocationUpdate = {
        description: locationUpdate.description!,
        time: new Date().toISOString(),
        location: locationUpdate.location!,
        city: locationUpdate.city!,
        country: locationUpdate.country!,
      };

      const updatedShipment = await addLocationUpdate(trackingNumber, update);
      onUpdate(updatedShipment);

      // Reset form
      setLocationUpdate({
        description: "",
        city: "",
        country: "",
        location: { lat: 0, lng: 0 },
      });
    } catch (error) {
      console.error("Failed to add location update:", error);
    } finally {
      setIsAddingLocation(false);
    }
  };

  return (
    <div className="bg-zinc-800/30 border border-zinc-700 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-semibold text-white">Admin Panel</h3>
        <span className="text-zinc-400 text-sm">({trackingNumber})</span>
      </div>

      <div className="space-y-6">
        {/* Status Update Section */}
        <div>
          <h4 className="text-white font-medium mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Update Status
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            {statusOptions.map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
                  selectedStatus === status
                    ? "bg-blue-600 border-blue-500 text-white"
                    : "bg-zinc-700/50 border-zinc-600 text-zinc-300 hover:bg-zinc-700 hover:text-white"
                } ${
                  status === currentStatus
                    ? "ring-2 ring-green-500 ring-opacity-50"
                    : ""
                }`}
              >
                {status}
                {status === currentStatus && (
                  <span className="ml-1 text-xs text-green-400">●</span>
                )}
              </button>
            ))}
          </div>
          <button
            onClick={handleStatusUpdate}
            disabled={selectedStatus === currentStatus || isUpdating}
            className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors duration-200"
          >
            {isUpdating ? "Updating..." : "Update Status"}
          </button>
        </div>

        {/* Location Update Section */}
        <div className="border-t border-zinc-700 pt-6">
          <h4 className="text-white font-medium mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Add Location Update
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-zinc-400 text-sm mb-2">
                Description
              </label>
              <input
                type="text"
                value={locationUpdate.description || ""}
                onChange={(e) =>
                  setLocationUpdate((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="e.g., Left Abuja warehouse"
                className="w-full px-3 py-2 bg-zinc-700/50 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-400 text-sm mb-2">City</label>
                <input
                  type="text"
                  value={locationUpdate.city || ""}
                  onChange={(e) =>
                    setLocationUpdate((prev) => ({
                      ...prev,
                      city: e.target.value,
                    }))
                  }
                  placeholder="e.g., Abuja"
                  className="w-full px-3 py-2 bg-zinc-700/50 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-2">
                  Country
                </label>
                <input
                  type="text"
                  value={locationUpdate.country || ""}
                  onChange={(e) =>
                    setLocationUpdate((prev) => ({
                      ...prev,
                      country: e.target.value,
                    }))
                  }
                  placeholder="e.g., Nigeria"
                  className="w-full px-3 py-2 bg-zinc-700/50 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-400 text-sm mb-2">
                  Latitude
                </label>
                <input
                  type="number"
                  step="any"
                  value={locationUpdate.location?.lat || ""}
                  onChange={(e) =>
                    setLocationUpdate((prev) => ({
                      ...prev,
                      location: {
                        ...prev.location!,
                        lat: parseFloat(e.target.value) || 0,
                      },
                    }))
                  }
                  placeholder="e.g., 6.5244"
                  className="w-full px-3 py-2 bg-zinc-700/50 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-2">
                  Longitude
                </label>
                <input
                  type="number"
                  step="any"
                  value={locationUpdate.location?.lng || ""}
                  onChange={(e) =>
                    setLocationUpdate((prev) => ({
                      ...prev,
                      location: {
                        ...prev.location!,
                        lng: parseFloat(e.target.value) || 0,
                      },
                    }))
                  }
                  placeholder="e.g., 3.3792"
                  className="w-full px-3 py-2 bg-zinc-700/50 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              onClick={handleLocationAdd}
              disabled={
                !locationUpdate.description ||
                !locationUpdate.city ||
                !locationUpdate.country ||
                isAddingLocation
              }
              className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-zinc-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              {isAddingLocation ? "Adding Location..." : "Add Location Update"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
