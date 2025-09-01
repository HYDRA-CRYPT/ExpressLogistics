import React, { useState, useMemo } from "react";
import { Copy, Share2, Package, Calendar, MapPin, Clock } from "lucide-react";
import MapView from "../../components/MapView";
import AdminPanel from "../../components/AdminPanel";
import TimelineComponent from "./TimelineComponent";

/**
 * Core shipment status enumeration
 */
type ShipmentStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "In Transit"
  | "On Hold"
  | "Delivered";

/**
 * Coordinates interface for consistency
 */
interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * Location update interface compatible with MapView expectations
 */
interface LocationUpdate {
  _id?: string;
  description?: string;
  status?: ShipmentStatus | string;
  time?: string | number | Date;
  updateDate?: string;
  updateTime?: string;
  location?: string; // For address/city string
  coordinates?: Coordinates; // For lat/lng coordinates
  city?: string;
  country?: string;
  state?: string;
  date?: string;
  [key: string]: unknown;
}

/**
 * Party information (sender/receiver)
 */
interface Party {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  coordinates?: Coordinates;
  date?: string;
  [key: string]: unknown;
}

/**
 * Shipment item details
 */
interface ShipmentItem {
  description?: string;
  quantity?: number;
  weight?: number;
  value?: number;
  [key: string]: unknown;
}

/**
 * Enhanced ShipmentData interface with better MapView compatibility
 */
export interface ShipmentData {
  _id?: string;
  trackingCode?: string;
  trackingNumber?: string;
  sender?: Party;
  receiver?: Party;
  origin?: Party; // MapView compatibility
  destination?: Party; // MapView compatibility
  shipmentType?: string;
  shipmentTypeDisplay?: string;
  items?: ShipmentItem[];
  deliveryFee?: number;
  currency?: string;
  status?: ShipmentStatus | string;
  history?: LocationUpdate[];
  routeCoordinates?: Array<{
    lat: number;
    lng: number;
    city?: string;
    country?: string;
    description?: string;
    date?: string;
  }>; // MapView compatibility
  dateSent?: string | number | Date;
  deliveryDate?: string | number | Date;
  [key: string]: unknown;
}

/**
 * Processed shipment data with computed fields
 */
export interface ProcessedShipmentData extends ShipmentData {
  trackingNumberDisplay: string;
  packageCount: number;
  estimatedDelivery: string;
  currentLocation: string;
  lastUpdated: string;
  progressPercentage: number;
  origin: {
    city: string;
    state: string;
    country: string;
    date: string;
    coordinates?: Coordinates;
  };
  destination: {
    city: string;
    state: string;
    country: string;
    date: string;
    coordinates?: Coordinates;
  };
  timeline: TimelineEntry[];
  totalItems: number;
  totalWeight: number;
  totalValue: number;
}

/**
 * Timeline entry for processed display
 */
interface TimelineEntry {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  completed: boolean;
  description?: string;
  coordinates?: Coordinates;
  city?: string;
  country?: string;
  status?: string;
}

/**
 * Normalized interfaces for component compatibility
 */
interface TimelineComponentShipment {
  trackingCode: string;
  sender: {
    name: string;
    city: string;
    country: string;
    address: string;
  };
  receiver: {
    name: string;
    city: string;
    country: string;
    address: string;
  };
  status: string;
  history: Array<{
    _id?: string;
    description?: string;
    status?: string;
    time: Date;
    updateDate?: string;
    updateTime?: string;
    location?: { lat: number; lng: number };
    city?: string;
    country?: string;
  }>;
  dateSent: Date;
  deliveryDate: Date;
}

interface AdminPanelShipment {
  trackingNumber: string;
  currentStatus: ShipmentStatus;
  deliveryId?: string;
  onUpdate?: (updatedShipment: ShipmentData) => void;
}

/**
 * Component props interface
 */
export interface ShipmentDetailsProps {
  // Accept either the local ShipmentData shape OR any plain object from stores/APIs
  shipment: ShipmentData | Record<string, unknown>;
  isAdmin: boolean;
  onShipmentUpdate?: (updatedShipment: ShipmentData | null) => void;
}

/**
 * Enhanced utility functions for data processing
 */
class ShipmentProcessor {
  private static safeString(value: unknown): string {
    return value != null ? String(value) : "";
  }

  private static safeNumber(value: unknown): number {
    const num = Number(value);
    return isNaN(num) ? 0 : num;
  }

  private static safeDate(value: unknown): Date {
    if (!value) return new Date();
    const date = new Date(value as string | number | Date);
    return isNaN(date.getTime()) ? new Date() : date;
  }

  private static formatDate(date: Date): string {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  private static formatDateTime(date: Date): string {
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  private static getProgressPercentage(status?: string): number {
    const statusLower = this.safeString(status).toLowerCase();
    const progressMap: Record<string, number> = {
      pending: 10,
      processing: 25,
      shipped: 40,
      "in transit": 70,
      "on hold": 50,
      delivered: 100,
    };
    return progressMap[statusLower] || 10;
  }

  private static getCurrentLocation(shipment: ShipmentData): string {
    console.log("ShipmentProcessor: Getting current location from:", shipment);

    const history = Array.isArray(shipment.history) ? shipment.history : [];
    const latestUpdate = history[0]; // Assuming history is sorted by most recent first

    if (latestUpdate?.city && latestUpdate?.country) {
      return `${latestUpdate.city}, ${latestUpdate.country}`;
    }

    if (latestUpdate?.coordinates?.lat && latestUpdate?.coordinates?.lng) {
      return `${latestUpdate.coordinates.lat.toFixed(
        2
      )}, ${latestUpdate.coordinates.lng.toFixed(2)}`;
    }

    // Fall back to sender location
    const origin = shipment.origin || shipment.sender;
    const senderCity = this.safeString(origin?.city);
    const senderCountry = this.safeString(origin?.country);

    return senderCity && senderCountry
      ? `${senderCity}, ${senderCountry}`
      : "Unknown Location";
  }

  private static processTimeline(history?: LocationUpdate[]): TimelineEntry[] {
    if (!Array.isArray(history)) return [];

    return history.map((entry, index) => {
      const entryTime = this.safeDate(entry.time || entry.date);
      const status = this.safeString(entry.status);
      const description = this.safeString(entry.description);

      return {
        id: this.safeString(entry._id) || index.toString(),
        title: status
          ? `${status.charAt(0).toUpperCase() + status.slice(1)}${
              description ? ` - ${description}` : ""
            }`
          : description || "Update",
        location:
          entry.city && entry.country
            ? `${entry.city}, ${entry.country}`
            : entry.city || entry.country || entry.location || "Unknown",
        date: this.formatDate(entryTime),
        time: entryTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        completed: status.toLowerCase() === "delivered",
        description,
        coordinates: entry.coordinates,
        city: entry.city,
        country: entry.country,
        status: entry.status,
      };
    });
  }

  private static calculateTotals(items?: ShipmentItem[]) {
    if (!Array.isArray(items)) {
      return { totalItems: 0, totalWeight: 0, totalValue: 0 };
    }

    return {
      totalItems: items.length,
      totalWeight: items.reduce(
        (sum, item) => sum + this.safeNumber(item.weight),
        0
      ),
      totalValue: items.reduce(
        (sum, item) => sum + this.safeNumber(item.value),
        0
      ),
    };
  }

  /**
   * Enhanced route coordinates creation with better logging
   */
  private static createRouteCoordinates(shipment: ShipmentData): Array<{
    lat: number;
    lng: number;
    city?: string;
    country?: string;
    description?: string;
    date?: string;
  }> {
    console.log("ShipmentProcessor: Creating route coordinates from:", {
      hasOrigin: !!(shipment.origin || shipment.sender),
      hasDestination: !!(shipment.destination || shipment.receiver),
      hasHistory: !!(shipment.history && shipment.history.length > 0),
      hasExistingRoute: !!(
        shipment.routeCoordinates && shipment.routeCoordinates.length > 0
      ),
    });

    const routeCoordinates: Array<{
      lat: number;
      lng: number;
      city?: string;
      country?: string;
      description?: string;
      date?: string;
    }> = [];

    // If route coordinates already exist, use them
    if (shipment.routeCoordinates && Array.isArray(shipment.routeCoordinates)) {
      console.log("ShipmentProcessor: Using existing route coordinates");
      return shipment.routeCoordinates;
    }

    // Build route from available data
    const origin = shipment.origin || shipment.sender;
    const destination = shipment.destination || shipment.receiver;

    // Add origin coordinates if available
    if (origin?.coordinates?.lat && origin?.coordinates?.lng) {
      routeCoordinates.push({
        lat: origin.coordinates.lat,
        lng: origin.coordinates.lng,
        city: origin.city,
        country: origin.country,
        description: "Origin",
        date: this.safeString(shipment.dateSent || origin.date),
      });
      console.log("ShipmentProcessor: Added origin coordinates");
    } else if (origin?.city) {
      console.log(
        "ShipmentProcessor: Origin has city but no coordinates:",
        origin.city
      );
    }

    // Add intermediate points from history with coordinates
    if (Array.isArray(shipment.history)) {
      shipment.history.forEach((entry, index) => {
        if (entry.coordinates?.lat && entry.coordinates?.lng) {
          routeCoordinates.push({
            lat: entry.coordinates.lat,
            lng: entry.coordinates.lng,
            city: entry.city,
            country: entry.country,
            description: entry.description || entry.status,
            date: this.safeString(entry.time || entry.date),
          });
          console.log(
            `ShipmentProcessor: Added history coordinates ${index + 1}`
          );
        }
      });
    }

    // Add destination coordinates if available
    if (destination?.coordinates?.lat && destination?.coordinates?.lng) {
      routeCoordinates.push({
        lat: destination.coordinates.lat,
        lng: destination.coordinates.lng,
        city: destination.city,
        country: destination.country,
        description: "Destination",
        date: this.safeString(shipment.deliveryDate || destination.date),
      });
      console.log("ShipmentProcessor: Added destination coordinates");
    } else if (destination?.city) {
      console.log(
        "ShipmentProcessor: Destination has city but no coordinates:",
        destination.city
      );
    }

    console.log(
      `ShipmentProcessor: Created route with ${routeCoordinates.length} coordinate points`
    );
    return routeCoordinates;
  }

  static processShipmentData(shipment: ShipmentData): ProcessedShipmentData {
    console.log("ShipmentProcessor: Processing shipment data:", shipment);

    const sentDate = this.safeDate(shipment.dateSent);
    const deliveryDate = this.safeDate(shipment.deliveryDate);
    const history = Array.isArray(shipment.history) ? shipment.history : [];
    const latestUpdate = history[0];
    const totals = this.calculateTotals(shipment.items);

    // Ensure origin/destination are set for MapView compatibility
    const origin = shipment.origin || shipment.sender;
    const destination = shipment.destination || shipment.receiver;

    const processedData: ProcessedShipmentData = {
      ...shipment,
      // computed fields
      trackingNumberDisplay: this.safeString(
        shipment.trackingCode || shipment.trackingNumber
      ),
      packageCount: totals.totalItems || 1,
      estimatedDelivery: this.formatDate(deliveryDate),
      currentLocation: this.getCurrentLocation(shipment),
      lastUpdated: latestUpdate
        ? this.formatDateTime(
            this.safeDate(latestUpdate.time || latestUpdate.date)
          )
        : this.formatDateTime(sentDate),
      progressPercentage: this.getProgressPercentage(shipment.status),

      // Normalize origin/destination once (no duplicate keys)
      origin: {
        city: this.safeString(origin?.city),
        state: this.safeString(origin?.state),
        country: this.safeString(origin?.country),
        date: this.formatDate(sentDate),
        coordinates: origin?.coordinates,
      },
      destination: {
        city: this.safeString(destination?.city),
        state: this.safeString(destination?.state),
        country: this.safeString(destination?.country),
        date: this.formatDate(deliveryDate),
        coordinates: destination?.coordinates,
      },

      timeline: this.processTimeline(history),
      routeCoordinates: this.createRouteCoordinates(shipment),
      ...totals,
    };

    console.log("ShipmentProcessor: Processed shipment data:", processedData);
    return processedData;
  }

  /**
   * Transform processed shipment data to match MapView expectations
   */
  static transformForMapView(processed: ProcessedShipmentData): ShipmentData {
    console.log("ShipmentProcessor: Transforming for MapView:", processed);

    // Normalize history entries: support both `location:{lat,lng}` (DB) and `coordinates`
    const historyForMap =
      (processed.history || []).map((entry) => {
        const raw: any = entry as any;
        // prefer coordinates, otherwise look for legacy `location` object
        const loc = raw.coordinates ?? (raw.location as any) ?? raw.location;
        const coordinates =
          loc && typeof loc.lat === "number" && typeof loc.lng === "number"
            ? { lat: loc.lat, lng: loc.lng }
            : undefined;

        return {
          _id: raw._id ?? raw.id,
          description: raw.description,
          status: raw.status,
          time: raw.time ?? raw.date,
          updateDate: raw.updateDate,
          updateTime: raw.updateTime,
          // MapView.createRoutePoints expects `coordinates` property
          coordinates,
          // keep city/country for label & optional geocoding fallback
          city: raw.city ?? (raw.locationName as string) ?? undefined,
          country: raw.country ?? undefined,
          // keep original date string if present
          date:
            raw.date ??
            (raw.time ? new Date(raw.time).toISOString() : undefined),
        } as LocationUpdate;
      }) || [];

    const transformed: ShipmentData = {
      ...processed,
      // origin/destination keep their structure (coordinates preserved if present)
      origin: processed.origin
        ? {
            ...(processed.origin as any),
            coordinates: (processed.origin as any).coordinates,
          }
        : undefined,
      destination: processed.destination
        ? {
            ...(processed.destination as any),
            coordinates: (processed.destination as any).coordinates,
          }
        : undefined,
      // history normalized for MapView
      history: historyForMap,
      // ensure routeCoordinates is an array (MapView can fall back to history)
      routeCoordinates: Array.isArray(processed.routeCoordinates)
        ? processed.routeCoordinates
        : [],
    };

    console.log(
      "ShipmentProcessor: MapView transformation result:",
      transformed
    );
    return transformed;
  }

  /**
   * Transform processed shipment data to match TimelineComponent expectations
   */
  static transformForTimelineComponent(
    processed: ProcessedShipmentData
  ): TimelineComponentShipment {
    return {
      trackingCode: processed.trackingCode || processed.trackingNumber || "",
      sender: {
        name: processed.sender?.name || "",
        city: processed.sender?.city || "",
        country: processed.sender?.country || "",
        address: processed.sender?.address || "",
      },
      receiver: {
        name: processed.receiver?.name || "",
        city: processed.receiver?.city || "",
        country: processed.receiver?.country || "",
        address: processed.receiver?.address || "",
      },
      status: processed.status || "Unknown",
      history: (processed.history || []).map((entry) => ({
        ...entry,
        time: this.safeDate(entry.time || entry.date),
        location: entry.coordinates
          ? {
              lat: entry.coordinates.lat || 0,
              lng: entry.coordinates.lng || 0,
            }
          : undefined,
      })),
      dateSent: this.safeDate(processed.dateSent),
      deliveryDate: this.safeDate(processed.deliveryDate),
    };
  }

  /**
   * Transform processed shipment data to match AdminPanel expectations
   */
  static transformForAdminPanel(
    processed: ProcessedShipmentData
  ): AdminPanelShipment {
    return {
      trackingNumber: processed.trackingNumberDisplay,
      currentStatus: (processed.status as ShipmentStatus) || "Pending",
      deliveryId: processed._id,
    };
  }
}

/**
 * Status badge component for better organization
 */
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusStyles = (status: string) => {
    const statusLower = status.toLowerCase();
    const styleMap: Record<string, string> = {
      delivered:
        "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800",
      "in transit":
        "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
      shipped:
        "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
      "on hold":
        "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800",
    };

    return (
      styleMap[statusLower] ||
      "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800"
    );
  };

  return (
    <div
      className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyles(
        status
      )}`}
    >
      {status}
    </div>
  );
};

/**
 * Package items component
 */
const PackageItems: React.FC<{
  items: ShipmentItem[];
  currency: string;
  totalValue: number;
}> = ({ items, currency, totalValue }) => {
  if (!items.length) return null;

  return (
    <div className="bg-zinc-100 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 mb-6">
      <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
        Package Contents
      </h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-3 bg-zinc-50 dark:bg-zinc-700/30 rounded-lg"
          >
            <div>
              <p className="font-medium text-zinc-900 dark:text-white">
                {item.description || `Item ${index + 1}`}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Quantity: {item.quantity || 1}
                {item.weight && ` • Weight: ${item.weight}kg`}
              </p>
            </div>
            {item.value && (
              <div className="text-right">
                <p className="font-medium text-zinc-900 dark:text-white">
                  {currency}
                  {item.value.toFixed(2)}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      {totalValue > 0 && (
        <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-600">
          <div className="flex justify-between items-center">
            <span className="font-medium text-zinc-900 dark:text-white">
              Total Value:
            </span>
            <span className="font-bold text-zinc-900 dark:text-white">
              {currency}
              {totalValue.toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Main ShipmentDetails component
 */
const ShipmentDetails: React.FC<ShipmentDetailsProps> = ({
  shipment,
  isAdmin,
  // onShipmentUpdate,
}) => {
  const [activeTab, setActiveTab] = useState<"timeline" | "map" | "admin">(
    "timeline"
  );
  const [copied, setCopied] = useState(false);

  // Memoize processed shipment data to avoid recalculation on every render
  const processedShipment = useMemo(() => {
    console.log("ShipmentDetails: Processing shipment data:", shipment);
    return ShipmentProcessor.processShipmentData(shipment);
  }, [shipment]);

  // Memoize transformed data for child components
  const timelineShipment = useMemo(() => {
    return ShipmentProcessor.transformForTimelineComponent(processedShipment);
  }, [processedShipment]);

  const mapViewShipment = useMemo(() => {
    return ShipmentProcessor.transformForMapView(processedShipment);
  }, [processedShipment]);

  const adminPanelProps = useMemo(() => {
    return ShipmentProcessor.transformForAdminPanel(processedShipment);
  }, [processedShipment]);

  // Log the transformed data to help log MapView issues
  console.log("ShipmentDetails: MapView shipment data:", mapViewShipment);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        processedShipment.trackingNumberDisplay
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy tracking number:", error);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Shipment ${
            processedShipment.trackingCode || processedShipment.trackingNumber
          }`,
          text: `Track shipment status: ${processedShipment.status}`,
          url: window.location.href,
        });
      }
    } catch (error) {
      console.error("Failed to share:", error);
    }
  };

  const tabConfig = [
    { key: "timeline" as const, label: "Timeline" },
    { key: "map" as const, label: "Map View" },
    ...(isAdmin ? [{ key: "admin" as const, label: "Admin Panel" }] : []),
  ];

  return (
    <div className="min-h-full w-full max-w-full bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white">
      <div className="container mx-auto px-2 py-6">
        {/* Shipment Header */}
        <div className="bg-zinc-100 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-8 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
                Shipment{" "}
                {processedShipment.trackingCode ||
                  processedShipment.trackingNumber}
              </h2>
              <div className="flex items-center text-zinc-500 dark:text-zinc-400 text-lg">
                <Package className="w-5 h-5 mr-2" />
                {processedShipment.shipmentType || "Standard"} •{" "}
                {processedShipment.totalItems} item
                {processedShipment.totalItems !== 1 ? "s" : ""}
                {processedShipment.totalWeight > 0 &&
                  ` • ${processedShipment.totalWeight}kg`}
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
              <h4 className="text-zinc-500 dark:text-zinc-400 text-sm font-medium mb-2">
                Status
              </h4>
              <StatusBadge status={processedShipment.status || "Unknown"} />
            </div>
            <div>
              <h4 className="text-zinc-500 dark:text-zinc-400 text-sm font-medium mb-2">
                Estimated Delivery
              </h4>
              <div className="flex items-center text-zinc-900 dark:text-white">
                <Calendar className="w-4 h-4 mr-2" />
                {processedShipment.estimatedDelivery}
              </div>
            </div>
            <div>
              <h4 className="text-zinc-500 dark:text-zinc-400 text-sm font-medium mb-2">
                Current Location
              </h4>
              <div className="flex items-center text-zinc-900 dark:text-white">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="truncate">
                  {processedShipment.currentLocation}
                </span>
              </div>
            </div>
            <div>
              <h4 className="text-zinc-500 dark:text-zinc-400 text-sm font-medium mb-2">
                Last Updated
              </h4>
              <div className="flex items-center text-zinc-900 dark:text-white">
                <Clock className="w-4 h-4 mr-2" />
                <span className="truncate">
                  {processedShipment.lastUpdated}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-zinc-100 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
              Shipment Progress
            </h3>
            <span className="text-zinc-500 dark:text-zinc-400">
              {processedShipment.progressPercentage}% Complete
            </span>
          </div>

          <div className="relative mb-4">
            <div className="w-full h-2 bg-zinc-300 dark:bg-zinc-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-1000 ease-out"
                style={{ width: `${processedShipment.progressPercentage}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-zinc-500 dark:text-zinc-400 text-sm font-medium mb-1">
                From
              </h4>
              <p className="text-zinc-900 dark:text-white font-medium">
                {processedShipment.origin.city &&
                processedShipment.origin.country
                  ? `${processedShipment.origin.city}, ${processedShipment.origin.country}`
                  : "Unknown Origin"}
              </p>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                Shipped on {processedShipment.origin.date}
              </p>
            </div>
            <div className="text-right">
              <h4 className="text-zinc-500 dark:text-zinc-400 text-sm font-medium mb-1">
                To
              </h4>
              <p className="text-zinc-900 dark:text-white font-medium">
                {processedShipment.destination.city &&
                processedShipment.destination.country
                  ? `${processedShipment.destination.city}, ${processedShipment.destination.country}`
                  : "Unknown Destination"}
              </p>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                Expected {processedShipment.destination.date}
              </p>
            </div>
          </div>
        </div>

        {/* Package Details */}
        <PackageItems
          items={processedShipment.items || []}
          currency={processedShipment.currency || "$"}
          totalValue={processedShipment.totalValue}
        />

        {/* Tabs */}
        <div className="bg-zinc-100 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-700 rounded-2xl overflow-hidden">
          <div className="border-b border-zinc-200 dark:border-zinc-700">
            <div className="flex">
              {tabConfig.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-6 py-4 text-sm font-medium transition-colors duration-200 border-b-2 ${
                    activeTab === tab.key
                      ? "text-blue-400 border-blue-400 bg-zinc-50 dark:bg-zinc-800/50"
                      : "text-zinc-500 dark:text-zinc-400 border-transparent hover:text-zinc-700 dark:hover:text-zinc-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8">
            {activeTab === "timeline" && (
              <TimelineComponent shipment={timelineShipment} />
            )}

            {activeTab === "map" && <MapView shipment={mapViewShipment} />}

            {activeTab === "admin" && isAdmin && (
              <AdminPanel
                trackingNumber={adminPanelProps.trackingNumber}
                currentStatus={adminPanelProps.currentStatus}
                deliveryId={adminPanelProps.deliveryId}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentDetails;
