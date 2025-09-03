import React, { useEffect, useState, useRef, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons for Leaflet
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

/* === Types === */
interface Coordinates {
  lat: number;
  lng: number;
}

interface Party {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  coordinates?: Coordinates;
}

interface LocationUpdate {
  _id?: string;
  location?: string | Coordinates; // Can be string address or coordinates object
  coordinates?: Coordinates;
  status?: string;
  description?: string;
  date?: string | number | Date;
  time?: string | number | Date;
  city?: string;
  country?: string;
  updateDate?: string;
  updateTime?: string;
}

interface ShipmentData {
  _id?: string;
  trackingCode?: string;
  trackingNumber?: string;
  sender?: Party;
  receiver?: Party;
  origin?: Party;
  destination?: Party;
  status?: string;
  history?: LocationUpdate[];
  dateSent?: string | number | Date;
  deliveryDate?: string | number | Date;
  [key: string]: unknown;
}

interface MapViewProps {
  shipment?: ShipmentData;
  trackingCode?: string;
  className?: string;
}

interface RoutePoint {
  lat: number;
  lng: number;
  city: string;
  country: string;
  description: string;
  date: string;
  isOrigin?: boolean;
  isDestination?: boolean;
  isHistory?: boolean;
  status?: string;
}

/* === Constants === */
const DEFAULT_CENTER: [number, number] = [6.5244, 3.3792]; // Lagos, Nigeria
const DEFAULT_ZOOM = 6;

/* === Geocoding with caching === */
const geocodeCache = new Map<string, Coordinates | null>();

const geocodeAddress = async (address: string): Promise<Coordinates | null> => {
  const cacheKey = address.toLowerCase().trim();

  if (geocodeCache.has(cacheKey)) {
    const cached = geocodeCache.get(cacheKey);
    console.log("Geocoding: Using cached result for", address, "->", cached);
    return cached || null;
  }

  if (!address || address.trim().length === 0) {
    console.warn("Geocoding: Empty address provided");
    return null;
  }

  console.log("Geocoding address:", address);

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        address
      )}&limit=1`,
      {
        headers: {
          "User-Agent": "AegisExpressLogistics/1.0",
        },
      }
    );

    if (!response.ok) {
      console.warn(
        "Geocoding: HTTP error",
        response.status,
        response.statusText
      );
      return null;
    }

    const data = await response.json();
    console.log("Geocoding: API response for", address, "->", data);

    if (data && data.length > 0 && data[0].lat && data[0].lon) {
      const coords = {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
      };
      console.log("Geocoding successful:", address, "->", coords);
      geocodeCache.set(cacheKey, coords);
      return coords;
    } else {
      console.warn("Geocoding: No results found for address:", address);
      geocodeCache.set(cacheKey, null);
      return null;
    }
  } catch (error) {
    console.warn("Geocoding failed for:", address, error);
    geocodeCache.set(cacheKey, null);
    return null;
  }
};

/* === Custom Icons === */
// const createCustomIcon = (color: string, iconSymbol: string) => {
//   return L.divIcon({
//     className: "custom-div-icon",
//     html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; font-size: 14px; color: white; font-weight: bold;">${iconSymbol}</div>`,
//     iconSize: [30, 30],
//     iconAnchor: [15, 15],
//   });
// };

const createPulsingIcon = (color: string, iconSymbol: string) => {
  return L.divIcon({
    className: "custom-div-icon",
    html: `
      <div style="position: relative; width: 30px; height: 30px;">
        <div style="position: absolute; top: 0; left: 0; width: 30px; height: 30px; background-color: ${color}; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; font-size: 14px; color: white; font-weight: bold; z-index: 2;">${iconSymbol}</div>
        <div style="position: absolute; top: -10px; left: -10px; width: 50px; height: 50px; background-color: ${color}; border-radius: 50%; opacity: 0.3; animation: pulse 2s infinite;"></div>
      </div>
      <style>
        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.1; }
          100% { transform: scale(1.4); opacity: 0; }
        }
      </style>
    `,
    iconSize: [50, 50],
    iconAnchor: [25, 25],
  });
};

const receiverIcon = createPulsingIcon("#ef4444", "📥"); // Red with receive icon - PULSING

/* === Enhanced MapView Component === */
const MapView: React.FC<MapViewProps> = ({
  shipment: propShipment,
  trackingCode: propTrackingCode,
  className = "w-full h-96",
}) => {
  const [shipmentData, setShipmentData] = useState<ShipmentData | null>(
    propShipment || null
  );
  const [routePoints, setRoutePoints] = useState<RoutePoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>(DEFAULT_CENTER);
  const [mapZoom, setMapZoom] = useState(DEFAULT_ZOOM);
  const mapRef = useRef<L.Map | null>(null);

  // Fetch shipment data if not provided and tracking code is available
  const fetchShipmentData = useCallback(async (trackingCode: string) => {
    setIsLoading(true);
    setError(null);

    console.log(trackingCode);
    try {
      const response = await fetch(
        `/api/deliveries/track/${trackingCode}/full`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch shipment data: ${response.statusText}`
        );
      }

      const data = await response.json();
      setShipmentData(data);
    } catch (err) {
      console.error("Error fetching shipment:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load shipment data"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Parse location string into city/country
  const parseLocation = useCallback(
    (location?: string, fallbackState?: string) => {
      if (!location || location.trim() === "") {
        return { city: "Unknown", country: fallbackState || "Unknown" };
      }

      const cleanLocation = location.trim();
      const parts = cleanLocation
        .split(",")
        .map((part) => part.trim())
        .filter((part) => part.length > 0);

      if (parts.length === 0) {
        return { city: "Unknown", country: fallbackState || "Unknown" };
      } else if (parts.length === 1) {
        // Only one part, could be city or country
        return {
          city: parts[0],
          country: fallbackState || "Unknown",
        };
      } else {
        // Multiple parts - assume last is country, first is city
        return {
          city: parts[0],
          country: parts[parts.length - 1] || fallbackState || "Unknown",
        };
      }
    },
    []
  );

  // Format date safely
  const safeDate = useCallback((value: unknown): Date => {
    if (!value) return new Date();
    if (value instanceof Date) return value;
    return new Date(value as string | number);
  }, []);

  // Create route points from shipment data - ONLY RECEIVER LOCATION
  const createRoutePoints = useCallback(
    async (data: ShipmentData): Promise<RoutePoint[]> => {
      const points: RoutePoint[] = [];

      console.log(
        "MapView: Creating receiver-only route point for shipment data:",
        {
          receiver: data.receiver,
        }
      );

      try {
        // Only add destination (receiver) point
        if (data.receiver) {
          console.log("MapView: Processing receiver data:", data.receiver);

          // Use only city and country for receiver location (not address)
          let receiverLocationString = "";
          if (data.receiver.city && data.receiver.country) {
            receiverLocationString = `${data.receiver.city}, ${data.receiver.country}`;
          } else if (data.receiver.city) {
            receiverLocationString = data.receiver.city;
          } else if (data.receiver.country) {
            receiverLocationString = data.receiver.country;
          }

          const receiverLocation = parseLocation(receiverLocationString);
          console.log("MapView: Parsed receiver location:", receiverLocation);

          let receiverCoords: Coordinates | null = null;

          if (data.receiver.coordinates) {
            console.log(
              "MapView: Using receiver coordinates from data:",
              data.receiver.coordinates
            );
            receiverCoords = data.receiver.coordinates;
          } else {
            // Try geocoding city and country only
            const addressesToTry = [
              `${data.receiver.city}, ${data.receiver.country}`,
              receiverLocation.country,
              receiverLocation.city,
            ].filter(
              (addr) => addr && addr.trim() !== "" && addr !== "Unknown"
            );

            for (const addressToGeocode of addressesToTry) {
              console.log("MapView: Trying to geocode:", addressToGeocode);
              receiverCoords = await geocodeAddress(addressToGeocode);
              if (receiverCoords) {
                console.log(
                  "MapView: Successfully geocoded:",
                  addressToGeocode,
                  "->",
                  receiverCoords
                );
                break;
              }
            }

            // Final fallback - use a neutral location
            if (!receiverCoords) {
              console.warn(
                "MapView: Using final fallback coordinates for receiver"
              );
              receiverCoords = { lat: 52.52, lng: 13.405 }; // Berlin default
            }
          }

          // ALWAYS add receiver point
          points.push({
            lat: receiverCoords.lat,
            lng: receiverCoords.lng,
            city: data.receiver.city || "Destination",
            country: data.receiver.country || "Unknown",
            description: `Destination: ${data.receiver.name || "Receiver"}`,
            date: safeDate(data.deliveryDate || new Date()).toISOString(),
            isDestination: true,
          });

          console.log("MapView: Added receiver point:", {
            lat: receiverCoords.lat,
            lng: receiverCoords.lng,
            city: data.receiver.city,
            country: data.receiver.country,
          });
        } else {
          console.warn("MapView: No receiver data found in shipment");
        }

        return points;
      } catch (error) {
        console.error("Error creating route points:", error);
        return points;
      }
    },
    [parseLocation, safeDate]
  );

  // Effect to load data
  useEffect(() => {
    if (propShipment) {
      setShipmentData(propShipment);
    } else if (propTrackingCode && !shipmentData) {
      fetchShipmentData(propTrackingCode);
    }
  }, [propShipment, propTrackingCode, shipmentData, fetchShipmentData]);

  // Effect to create route points when shipment data changes
  useEffect(() => {
    if (shipmentData) {
      createRoutePoints(shipmentData).then(setRoutePoints);
    }
  }, [shipmentData, createRoutePoints]);

  // Effect to adjust map bounds when route points change - CENTER ON RECEIVER
  useEffect(() => {
    if (routePoints.length > 0) {
      const receiverPoint = routePoints.find((point) => point.isDestination);
      if (receiverPoint && mapRef.current) {
        // Center the map on the receiver location with appropriate zoom
        setMapCenter([receiverPoint.lat, receiverPoint.lng]);
        setMapZoom(10); // Good zoom level to see the city area

        // Also update the map view if it's already initialized
        const map = mapRef.current;
        map.setView([receiverPoint.lat, receiverPoint.lng], 10);

        console.log("MapView: Centered map on receiver location:", {
          lat: receiverPoint.lat,
          lng: receiverPoint.lng,
          city: receiverPoint.city,
          country: receiverPoint.country,
        });
      } else if (receiverPoint) {
        // Set center even if map ref not available yet
        setMapCenter([receiverPoint.lat, receiverPoint.lng]);
        setMapZoom(10);

        console.log("MapView: Set center to receiver location:", {
          lat: receiverPoint.lat,
          lng: receiverPoint.lng,
          city: receiverPoint.city,
          country: receiverPoint.country,
        });
      }
    }
  }, [routePoints]);

  // Effect to set initial map center to receiver's location
  useEffect(() => {
    if (shipmentData && shipmentData.receiver) {
      // If we have receiver data, prepare to center on receiver location
      const receiver = shipmentData.receiver;
      if (receiver.city && receiver.country) {
        console.log("MapView: Will center on receiver location:", {
          city: receiver.city,
          country: receiver.country,
        });
      }
    }
  }, [shipmentData]);

  // Loading state
  if (isLoading) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-gray-100 dark:bg-zinc-700 rounded-lg`}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Loading map...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-gray-100 dark:bg-zinc-700 rounded-lg`}
      >
        <div className="text-center">
          <div className="text-red-500 mb-2">⚠️</div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  // No data state
  if (!shipmentData || routePoints.length === 0) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-gray-100 dark:bg-zinc-700 rounded-lg`}
      >
        <div className="text-center">
          <div className="text-gray-400 mb-2">🗺️</div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Map data not available
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: "100%", width: "100%" }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Only show receiver destination marker with pulsing animation */}
        {routePoints.map((point, index) => {
          // Only render destination markers
          if (point.isDestination) {
            return (
              <Marker
                key={index}
                position={[point.lat, point.lng]}
                icon={receiverIcon}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold text-gray-900">
                      📦 Package Destination
                    </h3>
                    <p className="text-sm text-gray-600">
                      {point.city}, {point.country}
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      {point.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Expected: {new Date(point.date).toLocaleDateString()}
                    </p>
                  </div>
                </Popup>
              </Marker>
            );
          }
          return null;
        })}
      </MapContainer>
    </div>
  );
};

export default MapView;
