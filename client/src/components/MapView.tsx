import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
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
const GEOCODING_DELAY = 1000;

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
const createCustomIcon = (color: string, iconSymbol: string) => {
  return L.divIcon({
    className: "custom-div-icon",
    html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; font-size: 14px; color: white; font-weight: bold;">${iconSymbol}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

const senderIcon = createCustomIcon("#10b981", "📤"); // Green with send icon
const receiverIcon = createCustomIcon("#ef4444", "📥"); // Red with receive icon
const historyIcon = createCustomIcon("#3b82f6", "📍"); // Blue with location pin
const currentIcon = createCustomIcon("#f59e0b", "✈️"); // Orange with plane icon

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

  // Create route points from shipment data
  const createRoutePoints = useCallback(
    async (data: ShipmentData): Promise<RoutePoint[]> => {
      const points: RoutePoint[] = [];

      console.log("MapView: Creating route points for shipment data:", {
        sender: data.sender,
        receiver: data.receiver,
        history: data.history?.length || 0,
      });

      try {
        // Add origin (sender) point
        if (data.sender) {
          const senderLocation = parseLocation(
            data.sender.address || `${data.sender.city}, ${data.sender.country}`
          );

          let senderCoords: Coordinates | null = null;

          if (data.sender.coordinates) {
            senderCoords = data.sender.coordinates;
          } else {
            senderCoords = await geocodeAddress(
              senderLocation.city + ", " + senderLocation.country
            );
          }

          // Only add sender point if we have valid coordinates
          if (senderCoords) {
            points.push({
              lat: senderCoords.lat,
              lng: senderCoords.lng,
              city: senderLocation.city,
              country: senderLocation.country,
              description: `Origin: ${data.sender.name || "Sender"}`,
              date: safeDate(data.dateSent).toISOString(),
              isOrigin: true,
            });
          } else {
            console.warn(
              "MapView: Skipping sender point - no valid coordinates available"
            );
          }
        }

        // Add history points
        if (data.history && Array.isArray(data.history)) {
          console.log("MapView: Processing history entries:", data.history);

          for (const entry of data.history) {
            let coords: Coordinates | null = null;

            // Check for coordinates in different possible locations
            if (entry.coordinates) {
              coords = entry.coordinates;
            } else if (
              entry.location &&
              typeof entry.location === "object" &&
              "lat" in entry.location &&
              "lng" in entry.location
            ) {
              // Handle the case where location is an object with lat/lng (this is the new format)
              coords = entry.location as Coordinates;
              console.log(
                "MapView: Using coordinates from location object:",
                coords
              );
            } else if (typeof entry.location === "string") {
              // Handle string-based location
              const location = parseLocation(
                entry.location as string,
                entry.country
              );
              coords = await geocodeAddress(
                `${location.city}, ${location.country}`
              );
              console.log("MapView: Geocoded string location:", coords);
            } else {
              // Last resort - try to use city/country
              const location = parseLocation(
                `${entry.city}, ${entry.country}`,
                entry.country
              );
              coords = await geocodeAddress(
                `${location.city}, ${location.country}`
              );
              console.log("MapView: Geocoded city/country:", coords);
            }

            console.log("MapView: Processing history point:", {
              coords,
              city: entry.city,
              country: entry.country,
              description: entry.description,
              status: entry.status,
            });

            // Only add history point if we have valid coordinates
            if (coords) {
              points.push({
                lat: coords.lat,
                lng: coords.lng,
                city:
                  entry.city || parseLocation(entry.location as string).city,
                country:
                  entry.country ||
                  parseLocation(entry.location as string).country,
                description:
                  entry.description || entry.status || "Location Update",
                date: safeDate(entry.time || entry.date).toISOString(),
                isHistory: true,
                status: entry.status,
              });
            } else {
              console.warn(
                "MapView: Skipping history point - no valid coordinates available"
              );
            }

            // Add a small delay to avoid overwhelming the geocoding service
            await new Promise((resolve) =>
              setTimeout(resolve, GEOCODING_DELAY)
            );
          }
        }

        // Add destination (receiver) point - ALWAYS add this if receiver data exists
        if (data.receiver) {
          console.log("MapView: Processing receiver data:", data.receiver);

          // Build receiver location string with fallbacks
          let receiverLocationString = "";
          if (data.receiver.address) {
            receiverLocationString = data.receiver.address;
          } else if (data.receiver.city && data.receiver.country) {
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
            // Try multiple geocoding approaches
            const addressesToTry = [
              receiverLocationString,
              `${receiverLocation.city}, ${receiverLocation.country}`,
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

            // If all geocoding fails, use a reasonable default based on the most recent history location
            if (!receiverCoords && points.length > 0) {
              const lastHistoryPoint = points[points.length - 1];
              console.warn(
                "MapView: Using last history point as receiver fallback:",
                lastHistoryPoint
              );
              receiverCoords = {
                lat: lastHistoryPoint.lat + 0.1,
                lng: lastHistoryPoint.lng + 0.1,
              };
            }

            // Final fallback - use a neutral location
            if (!receiverCoords) {
              console.warn(
                "MapView: Using final fallback coordinates for receiver"
              );
              receiverCoords = { lat: 40.7128, lng: -74.006 }; // New York City
            }
          }

          // ALWAYS add receiver point
          points.push({
            lat: receiverCoords.lat,
            lng: receiverCoords.lng,
            city: receiverLocation.city || "Destination",
            country: receiverLocation.country || "Unknown",
            description: `Destination: ${data.receiver.name || "Receiver"}`,
            date: safeDate(data.deliveryDate || new Date()).toISOString(),
            isDestination: true,
          });

          console.log("MapView: Added receiver point:", {
            lat: receiverCoords.lat,
            lng: receiverCoords.lng,
            city: receiverLocation.city,
            country: receiverLocation.country,
          });
        } else {
          console.warn("MapView: No receiver data found in shipment");
        }

        return points.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
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

  // Effect to adjust map bounds when route points change
  useEffect(() => {
    if (routePoints.length > 0) {
      const lats = routePoints.map((p) => p.lat);
      const lngs = routePoints.map((p) => p.lng);

      if (lats.length > 1) {
        const centerLat = (Math.min(...lats) + Math.max(...lats)) / 2;
        const centerLng = (Math.min(...lngs) + Math.max(...lngs)) / 2;
        setMapCenter([centerLat, centerLng]);
        setMapZoom(6); // Adjusted zoom for better view of all points
      } else if (lats.length === 1) {
        setMapCenter([lats[0], lngs[0]]);
        setMapZoom(10);
      }
    }
  }, [routePoints]);

  // Effect to set initial map center to sender's location
  useEffect(() => {
    if (shipmentData && shipmentData.sender) {
      const setSenderAsCenter = async () => {
        let senderCoords: Coordinates | null = null;

        if (shipmentData.sender!.coordinates) {
          senderCoords = shipmentData.sender!.coordinates;
        } else {
          const senderLocation = parseLocation(
            shipmentData.sender!.address ||
              `${shipmentData.sender!.city}, ${shipmentData.sender!.country}`
          );
          senderCoords = await geocodeAddress(
            senderLocation.city + ", " + senderLocation.country
          );
        }

        // Only set if we haven't set route points yet (initial load) and we have valid coordinates
        if (routePoints.length === 0 && senderCoords) {
          setMapCenter([senderCoords.lat, senderCoords.lng]);
          setMapZoom(8);
        }
      };

      setSenderAsCenter();
    }
  }, [shipmentData, parseLocation, routePoints.length]);

  // Prepare polyline coordinates for route progression
  const { completedRoute, remainingRoute } = useMemo(() => {
    if (routePoints.length < 2) {
      return { completedRoute: [], remainingRoute: [] };
    }

    // Sort points by date to ensure proper order
    const sortedPoints = [...routePoints].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Find the last non-destination point (current location)
    let currentPointIndex = sortedPoints.findIndex(
      (point) => point.isDestination
    );
    if (currentPointIndex === -1) {
      currentPointIndex = sortedPoints.length;
    } else {
      currentPointIndex = currentPointIndex - 1; // Last point before destination
    }

    const completed: [number, number][] = [];
    const remaining: [number, number][] = [];

    sortedPoints.forEach((point, index) => {
      const coord: [number, number] = [point.lat, point.lng];

      if (index <= currentPointIndex) {
        completed.push(coord);
      }

      if (index >= currentPointIndex) {
        remaining.push(coord);
      }
    });

    return {
      completedRoute: completed,
      remainingRoute: remaining,
    };
  }, [routePoints]);

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

        {/* Polyline showing completed route (green/blue) */}
        {completedRoute.length > 1 && (
          <Polyline
            positions={completedRoute}
            color="#10b981"
            weight={4}
            opacity={0.8}
          />
        )}

        {/* Polyline showing remaining route (dashed gray) */}
        {remainingRoute.length > 1 && (
          <Polyline
            positions={remainingRoute}
            color="#9ca3af"
            weight={3}
            opacity={0.6}
            dashArray="10, 10"
          />
        )}

        {/* Markers for each route point */}
        {routePoints.map((point, index) => {
          let icon = historyIcon;
          if (point.isOrigin) {
            icon = senderIcon;
          } else if (point.isDestination) {
            icon = receiverIcon;
          } else if (point.status?.toLowerCase().includes("delivered")) {
            icon = receiverIcon; // Use receiver icon for delivered status
          } else if (
            point.status?.toLowerCase().includes("shipped") ||
            point.status?.toLowerCase().includes("transit") ||
            point.status?.toLowerCase().includes("on hold") ||
            index === routePoints.length - 2 // Second to last point (latest update before receiver)
          ) {
            icon = currentIcon;
          }

          return (
            <Marker key={index} position={[point.lat, point.lng]} icon={icon}>
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold text-gray-900">
                    {point.description}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {point.city}, {point.country}
                  </p>
                  {point.status && (
                    <p className="text-xs text-blue-600 mt-1">
                      Status: {point.status}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(point.date).toLocaleDateString()}
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapView;
