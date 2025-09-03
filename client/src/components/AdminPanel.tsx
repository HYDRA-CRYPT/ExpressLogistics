import React, { useState, useEffect, useCallback } from "react";
import { Settings, MapPin, Send } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { getStatusIcon } from "@/utils/getIcon";
import { useDeliveryStore } from "@/stores/deliveryStore"; // Import your store
import LocationAutocomplete from "./LocationAutocomplete";

/**
 * Local/internal types (drop external type dependencies here)
 */
type ShipmentStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "In Transit"
  | "On Hold"
  | "Delivered";

interface AdminPanelProps {
  trackingNumber: string;
  deliveryId?: string;
  currentStatus: ShipmentStatus;
  // onUpdate?: (updatedShipment: any) => void;
}

interface CombinedUpdatePayload {
  status: ShipmentStatus | string;
  description: string;
  location: string; // city, country as a single string
  lat: number;
  lng: number;
  checkEmail: boolean;
}

// Map service integration functions
const geocodeAddress = async (
  address: string
): Promise<{ lat: number; lng: number; displayName: string }> => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    address
  )}&limit=1`;

  const response = await fetch(url, {
    headers: { "User-Agent": "LogisticsApp/1.0" },
  });

  const data = await response.json();

  if (!data.length) {
    throw new Error(`Address not found: ${address}`);
  }

  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
    displayName: data[0].display_name,
  };
};

const AdminPanel: React.FC<AdminPanelProps> = ({
  trackingNumber,
  deliveryId,
  currentStatus,
  // onUpdate,
}) => {
  const { updateStatusAndLocation } = useDeliveryStore(); // Use the store

  const [selectedStatus, setSelectedStatus] =
    useState<ShipmentStatus>(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoadingDeliveryId, setIsLoadingDeliveryId] = useState(false);
  const [resolvedDeliveryId, setResolvedDeliveryId] = useState<string | null>(
    deliveryId || null
  );
  const [updateData, setUpdateData] = useState<CombinedUpdatePayload>({
    status: currentStatus,
    description: "",
    location: "",
    lat: 0,
    lng: 0,
    checkEmail: true,
  });
  const [useManualCoords, setUseManualCoords] = useState(false);
  const [apiMessage, setApiMessage] = useState<string>("");

  const statusOptions: ShipmentStatus[] = [
    "Pending",
    "Processing",
    "Shipped",
    "In Transit",
    "On Hold",
    "Delivered",
  ];

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "text-yellow-400";
      case "processing":
        return "text-blue-400";
      case "shipped":
        return "text-purple-400";
      case "in transit":
        return "text-indigo-400";
      case "on hold":
        return "text-orange-400";
      case "delivered":
        return "text-green-400";
      default:
        return "text-gray-400";
    }
  };

  // Function to fetch delivery details and extract deliveryId
  const fetchDeliveryId = useCallback(
    async (trackingNumber: string): Promise<string> => {
      setIsLoadingDeliveryId(true);
      try {
        const token = localStorage.getItem("adminToken");
        const response = await fetch(
          `http://localhost:5000/api/deliveries/track/${trackingNumber}/full`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch delivery details: ${response.status}`
          );
        }

        const deliveryData = await response.json();
        const deliveryId = deliveryData._id || deliveryData.id;
        console.log(deliveryId);
        console.log(deliveryData);
        if (!deliveryId) {
          throw new Error("DeliveryId not found in response");
        }

        setResolvedDeliveryId(deliveryId);
        return deliveryId;
      } catch (error) {
        console.error("Failed to fetch deliveryId:", error);
        throw error;
      } finally {
        setIsLoadingDeliveryId(false);
      }
    },
    []
  );

  // Helper function to parse location string into city and country
  const parseLocation = (location: string) => {
    const [city = "", country = ""] = location.split(",").map((s) => s.trim());
    return { city, country };
  };

  // Handle location change from LocationAutocomplete
  const handleLocationChange = (location: string) => {
    setUpdateData((prev) => ({
      ...prev,
      location,
    }));
  };

  const handleCombinedUpdate = async () => {
    setApiMessage("");
    setIsUpdating(true);

    // Parse location into city and country
    const { city, country } = parseLocation(updateData.location);

    // Defensive: Ensure all required fields
    if (!updateData.description || !updateData.location || !city || !country) {
      setApiMessage("Please fill in all required fields including location.");
      setIsUpdating(false);
      setTimeout(() => setApiMessage(""), 3000);
      return;
    }

    // Defensive: Ensure delivery ID is resolved
    let currentDeliveryId = deliveryId;
    if (!currentDeliveryId) {
      try {
        currentDeliveryId = await fetchDeliveryId(trackingNumber);
      } catch {
        setApiMessage("Could not resolve delivery ID.");
        setIsUpdating(false);
        return;
      }
    }
    if (!currentDeliveryId) {
      setApiMessage("No delivery ID found.");
      setIsUpdating(false);
      return;
    }

    // Geocode if needed
    let coordinates = { lat: updateData.lat, lng: updateData.lng };
    if (!useManualCoords && (coordinates.lat === 0 || coordinates.lng === 0)) {
      try {
        const fullAddress = updateData.location;
        const geocoded = await geocodeAddress(fullAddress);
        coordinates = {
          lat: geocoded.lat,
          lng: geocoded.lng,
        };
      } catch (geocodeError) {
        console.log("Error getting GeoCode", geocodeError);
        // Continue without coordinates
      }
    }

    // Build payload as expected by backend
    const payload = {
      status: selectedStatus,
      description: updateData.description,
      city: city,
      country: country,
      lat: coordinates.lat,
      lng: coordinates.lng,
      checkEmail: updateData.checkEmail,
      time: new Date().toISOString(),
    };

    try {
      await updateStatusAndLocation(currentDeliveryId, payload);
      console.log(currentDeliveryId);

      setUpdateData({
        status: selectedStatus,
        description: "",
        location: "",
        lat: 0,
        lng: 0,
        checkEmail: true,
      });
      setUseManualCoords(false);
      setApiMessage("Shipment updated successfully!");
    } catch (error) {
      setApiMessage(
        `Failed to update shipment: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsUpdating(false);
      setTimeout(() => setApiMessage(""), 5000);
    }
  };

  const handleAutoGeocode = async () => {
    if (!updateData.location) {
      setApiMessage("Please enter location first");
      setTimeout(() => setApiMessage(""), 3000);
      return;
    }

    try {
      const geocoded = await geocodeAddress(updateData.location);

      setUpdateData((prev) => ({
        ...prev,
        lat: geocoded.lat,
        lng: geocoded.lng,
      }));

      setApiMessage(
        `Coordinates found: ${geocoded.lat.toFixed(4)}, ${geocoded.lng.toFixed(
          4
        )}`
      );
      setTimeout(() => setApiMessage(""), 5000);
    } catch (error) {
      console.error("Geocoding failed:", error);
      setApiMessage(
        "Could not find coordinates for this location. Please enter manually."
      );
      setTimeout(() => setApiMessage(""), 3000);
    }
  };

  // Update status in form data when status is selected
  const handleStatusChange = (status: ShipmentStatus) => {
    setSelectedStatus(status);
    setUpdateData((prev) => ({
      ...prev,
      status: status,
    }));
  };

  // Always resolve deliveryId on mount if not set
  useEffect(() => {
    if (!resolvedDeliveryId && trackingNumber) {
      fetchDeliveryId(trackingNumber);
    }
  }, [resolvedDeliveryId, trackingNumber, fetchDeliveryId]);

  return (
    <div className="bg-zinc-800/30 border border-zinc-700 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-semibold text-white">Admin Panel</h3>
        <span className="text-zinc-400 text-sm">({trackingNumber})</span>
      </div>

      {/* API Status Messages */}
      {apiMessage && (
        <div
          className={`mb-4 p-3 rounded-lg text-sm ${
            apiMessage.includes("successfully")
              ? "bg-green-900/50 border border-green-700 text-green-300"
              : apiMessage.includes("Failed") ||
                apiMessage.includes("Could not")
              ? "bg-red-900/50 border border-red-700 text-red-300"
              : "bg-blue-900/50 border border-blue-700 text-blue-300"
          }`}
        >
          {apiMessage}
        </div>
      )}

      <div className="space-y-6">
        {/* Combined Update Form */}
        <div>
          <h4 className="text-white font-medium mb-4 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Update Status & Location
          </h4>

          {/* Status Selection */}
          <div className="mb-4">
            <label className="block text-zinc-400 text-sm mb-3">
              Select New Status *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    selectedStatus === status
                      ? "bg-blue-600 border-blue-500 text-white"
                      : "bg-zinc-700/50 border-zinc-600 text-zinc-300 hover:bg-zinc-700 hover:text-white"
                  } ${
                    status === currentStatus
                      ? "ring-2 ring-green-500 ring-opacity-50"
                      : ""
                  }`}
                >
                  <span className={getStatusColor(status)}>
                    {getStatusIcon(status)}
                  </span>
                  {status}
                  {status === currentStatus && (
                    <span className="ml-1 text-xs text-green-400">●</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-zinc-400 text-sm mb-2">
                Update Description *
              </label>
              <input
                type="text"
                value={updateData.description}
                onChange={(e) =>
                  setUpdateData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="e.g., Package picked up from sender"
                className="w-full px-3 py-2 bg-zinc-700/50 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-zinc-400 text-sm mb-2">
                Location (City, Country) *
              </label>
              <LocationAutocomplete
                value={updateData.location}
                onChange={handleLocationChange}
                placeholder="Search city, country..."
                className="w-full px-3 py-2 bg-zinc-700/50 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Coordinate Options */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={handleAutoGeocode}
                  disabled={!updateData.location}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-zinc-600 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  Auto-Find Coordinates
                </button>
                <span className="text-zinc-400 text-sm">or</span>
                <label className="flex items-center gap-2 text-zinc-400 text-sm">
                  <input
                    type="checkbox"
                    checked={useManualCoords}
                    onChange={(e) => setUseManualCoords(e.target.checked)}
                    className="rounded border-zinc-600 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                  />
                  Enter manually
                </label>
              </div>

              {useManualCoords && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 text-sm mb-2">
                      Latitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={updateData.lat || ""}
                      onChange={(e) =>
                        setUpdateData((prev) => ({
                          ...prev,
                          lat: parseFloat(e.target.value) || 0,
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
                      value={updateData.lng || ""}
                      onChange={(e) =>
                        setUpdateData((prev) => ({
                          ...prev,
                          lng: parseFloat(e.target.value) || 0,
                        }))
                      }
                      placeholder="e.g., 3.3792"
                      className="w-full px-3 py-2 bg-zinc-700/50 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              {!useManualCoords &&
                (updateData.lat !== 0 || updateData.lng !== 0) && (
                  <div className="text-xs text-zinc-400">
                    Current coordinates: {updateData.lat.toFixed(4)},{" "}
                    {updateData.lng.toFixed(4)}
                  </div>
                )}
            </div>

            {/* Email Notification Checkbox */}
            <div className="flex items-center gap-2 p-4 bg-zinc-700/30 border border-zinc-600 rounded-lg">
              <Checkbox
                id="checkEmail"
                checked={updateData.checkEmail}
                onCheckedChange={(checked) => {
                  const value = !!checked;
                  setUpdateData((prev) => ({ ...prev, checkEmail: value }));
                }}
                className="border-zinc-500 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="checkEmail"
                className="text-zinc-300 text-sm font-medium cursor-pointer"
              >
                Send Auto Email Notification
              </label>
              <span className="text-xs text-zinc-400 ml-2">
                (Notify customer of this update)
              </span>
            </div>

            {/* Single Submit Button */}
            <button
              onClick={handleCombinedUpdate}
              disabled={
                !updateData.description ||
                !updateData.location ||
                isUpdating ||
                isLoadingDeliveryId ||
                selectedStatus === currentStatus ||
                !resolvedDeliveryId
              }
              className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              {isLoadingDeliveryId
                ? "Getting Delivery ID..."
                : isUpdating
                ? "Updating Shipment..."
                : "Update Shipment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
