import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
// Install leaflet via npm: npm i leaflet && npm i -D @types/leaflet
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Navigation, MapPin, Route } from "lucide-react";

// Fix marker icon paths for many bundlers (Vite compatible)
import markerIcon2xUrl from "leaflet/dist/images/marker-icon-2x.png";
import markerIconUrl from "leaflet/dist/images/marker-icon.png";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";

/* === types === */
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Party {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  coordinates?: Coordinates;
  date?: string;
}

export interface LocationUpdate {
  _id?: string;
  location?: string;
  coordinates?: Coordinates;
  status?: string;
  description?: string;
  date?: string | number | Date;
  timestamp?: string | number | Date;
  time?: string | number | Date;
  isCompleted?: boolean;
  city?: string;
  country?: string;
  state?: string;
  updateDate?: string;
  updateTime?: string;
}

export type ShipmentStatus =
  | "pending"
  | "picked_up"
  | "in_transit"
  | "out_for_delivery"
  | "delivered"
  | "delayed"
  | "cancelled"
  | "returned";

export interface ShipmentData {
  _id?: string;
  trackingCode?: string;
  trackingNumber?: string;
  sender?: Party;
  receiver?: Party;
  origin?: Party;
  destination?: Party;
  shipmentType?: string;
  shipmentTypeDisplay?: string;
  items?: any[];
  deliveryFee?: number;
  currency?: string;
  status?: ShipmentStatus | string;
  currentLocation?: string | Coordinates; // Added this property
  history?: LocationUpdate[];
  dateSent?: string | number | Date;
  deliveryDate?: string | number | Date;
  routeCoordinates?: Array<{
    lat: number;
    lng: number;
    city?: string;
    country?: string;
    description?: string;
    date?: string;
  }>;
  [key: string]: unknown;
}

/* Make leaflet accessible on window for any legacy code */
declare global {
  interface Window {
    L: typeof L;
  }
}

/* === props and helpers === */
interface MapViewProps {
  shipment: ShipmentData;
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
}

interface GeocodeResult {
  lat: number;
  lng: number;
}

const DEFAULT_COORDS: GeocodeResult = { lat: 6.5244, lng: 3.3792 }; // Lagos, Nigeria
const GEOCODING_DELAY = 1000;
const MAX_GEOCODING_RETRIES = 2;
const GEOCODING_TIMEOUT = 10000;

/* Enhanced geocoding with better error handling */
const geocodeCache = new Map<string, GeocodeResult>();

const geocodeAddress = async (
  address: string,
  retries: number = MAX_GEOCODING_RETRIES
): Promise<GeocodeResult> => {
  const cacheKey = address.toLowerCase().trim();

  // Return cached result if available
  if (geocodeCache.has(cacheKey)) {
    console.log(`MapView: Using cached coordinates for ${address}`);
    return geocodeCache.get(cacheKey)!;
  }

  // Validate input
  if (!address || address.trim().length === 0) {
    console.warn("MapView: Empty address provided, using default coordinates");
    return DEFAULT_COORDS;
  }

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    address
  )}&limit=1`;

  console.log(`MapView: Geocoding address: ${address}`);

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), GEOCODING_TIMEOUT);

      const response = await fetch(url, {
        headers: {
          "User-Agent": "LogisticsApp/1.0",
          Accept: "application/json",
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (!data || !Array.isArray(data) || data.length === 0) {
        throw new Error(`No results found for address: ${address}`);
      }

      const firstResult = data[0];
      if (!firstResult.lat || !firstResult.lon) {
        throw new Error("Invalid coordinate data received");
      }

      const result: GeocodeResult = {
        lat: parseFloat(firstResult.lat),
        lng: parseFloat(firstResult.lon),
      };

      if (isNaN(result.lat) || isNaN(result.lng)) {
        throw new Error("Invalid coordinates received");
      }

      console.log(`MapView: Successfully geocoded ${address}:`, result);
      geocodeCache.set(cacheKey, result);
      return result;
    } catch (error) {
      const isLastAttempt = attempt === retries;
      console.warn(
        `MapView: Geocoding attempt ${attempt + 1}/${
          retries + 1
        } failed for ${address}:`,
        error
      );

      if (isLastAttempt) {
        console.error(
          `MapView: All geocoding attempts failed for ${address}, using default coordinates`
        );
        return DEFAULT_COORDS;
      }

      // Exponential backoff
      const delay = GEOCODING_DELAY * Math.pow(2, attempt);
      console.log(`MapView: Waiting ${delay}ms before retry...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  return DEFAULT_COORDS;
};

/* === Coordinate conversion utility === */
const toPercent = (lat: number, lng: number): { x: number; y: number } => {
  // Simple linear mapping for demonstration - in real implementation, you'd use proper projection
  // These values assume a rough world coordinate system
  const minLat = -90;
  const maxLat = 90;
  const minLng = -180;
  const maxLng = 180;

  const x = ((lng - minLng) / (maxLng - minLng)) * 100;
  const y = ((maxLat - lat) / (maxLat - minLat)) * 100; // Invert Y axis for screen coordinates

  return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
};

/* === Enhanced resource loader === */
const loadLeafletResources = async (): Promise<void> => {
  try {
    // Ensure L is exposed on window for other code expecting window.L
    (window as any).L = L;

    // Fix default icon URLs so markers show up in builds
    delete (L.Icon.Default as any).prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: markerIcon2xUrl,
      iconUrl: markerIconUrl,
      shadowUrl: markerShadowUrl,
    });

    console.log("MapView: Leaflet resources loaded successfully");
  } catch (error) {
    console.error("MapView: Failed to load Leaflet resources:", error);
    throw error;
  }
};

/* === Enhanced MapView component === */
const MapView: React.FC<MapViewProps> = ({ shipment }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const mountedRef = useRef<boolean>(true);
  const [routePoints, setRoutePoints] = useState<RoutePoint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>("");

  console.log(routePoints);
  const cleanup = useCallback(() => {
    if (mapInstanceRef.current) {
      try {
        console.log("MapView: Cleaning up map instance");
        mapInstanceRef.current.remove();
      } catch (e) {
        console.warn("MapView: Error removing map instance:", e);
      }
      mapInstanceRef.current = null;
    }
  }, []);

  const parseLocation = useCallback(
    (location?: string, fallbackState?: string) => {
      if (!location) {
        return {
          city: "Unknown",
          country: fallbackState || "Unknown",
        };
      }
      const parts = location.split(",").map((part) => part.trim());
      return {
        city: parts[0] || location,
        country: parts[parts.length - 1] || fallbackState || "Unknown",
      };
    },
    []
  );

  const safeDate = useCallback((value: unknown): Date => {
    if (!value) return new Date();
    const date = new Date(value as string | number | Date);
    return isNaN(date.getTime()) ? new Date() : date;
  }, []);

  const formatDate = useCallback((dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Invalid date";
    }
  }, []);

  const createRoutePoints = useCallback(
    async (shipmentData: ShipmentData): Promise<RoutePoint[]> => {
      console.log("MapView: Creating route points from shipment data:", {
        hasOrigin: !!(shipmentData.origin || shipmentData.sender),
        hasDestination: !!(shipmentData.destination || shipmentData.receiver),
        hasHistory: !!(shipmentData.history && shipmentData.history.length > 0),
        hasRouteCoordinates: !!(
          shipmentData.routeCoordinates &&
          shipmentData.routeCoordinates.length > 0
        ),
        originCity: (shipmentData.origin || shipmentData.sender)?.city,
        destinationCity: (shipmentData.destination || shipmentData.receiver)
          ?.city,
        historyCount: shipmentData.history?.length || 0,
        routeCoordinatesCount: shipmentData.routeCoordinates?.length || 0,
      });

      const points: RoutePoint[] = [];
      const debugSteps: string[] = [];

      try {
        // Step 1: Process origin
        const originParty = shipmentData.origin || shipmentData.sender;
        if (originParty?.city) {
          debugSteps.push(`Processing origin: ${originParty.city}`);
          const originLocation = parseLocation(
            originParty.city,
            originParty.state
          );

          let originCoords: GeocodeResult;
          if (originParty.coordinates?.lat && originParty.coordinates?.lng) {
            originCoords = originParty.coordinates;
            debugSteps.push(
              `Using existing origin coordinates: ${originCoords.lat}, ${originCoords.lng}`
            );
          } else {
            debugSteps.push(`Geocoding origin city: ${originParty.city}`);
            originCoords = await geocodeAddress(originParty.city);
            debugSteps.push(
              `Origin geocoded to: ${originCoords.lat}, ${originCoords.lng}`
            );
          }

          if (!mountedRef.current) return [];

          points.push({
            lat: originCoords.lat,
            lng: originCoords.lng,
            city: originLocation.city,
            country: originLocation.country,
            description: "Package origin",
            date:
              originParty.date || safeDate(shipmentData.dateSent).toISOString(),
            isOrigin: true,
          });
          debugSteps.push(
            `Added origin point: ${points[points.length - 1].city}`
          );
        } else {
          debugSteps.push("No origin city found");
        }

        // Step 2: Process route coordinates (preferred over history for intermediate points)
        if (
          shipmentData.routeCoordinates &&
          Array.isArray(shipmentData.routeCoordinates)
        ) {
          debugSteps.push(
            `Processing ${shipmentData.routeCoordinates.length} route coordinates`
          );
          // Skip first and last (they should be origin/destination)
          for (let i = 1; i < shipmentData.routeCoordinates.length - 1; i++) {
            const point = shipmentData.routeCoordinates[i];
            if (point.lat && point.lng && mountedRef.current) {
              points.push({
                lat: point.lat,
                lng: point.lng,
                city: point.city || "Unknown",
                country: point.country || "Unknown",
                description: point.description || "Transit point",
                date: point.date || new Date().toISOString(),
                isHistory: true,
              });
              debugSteps.push(
                `Added route coordinate point: ${point.city || "Unknown"}`
              );
            }
          }
        }

        // Step 3: Process history if no route coordinates (fallback)
        if (
          (!shipmentData.routeCoordinates ||
            shipmentData.routeCoordinates.length === 0) &&
          shipmentData.history &&
          Array.isArray(shipmentData.history)
        ) {
          debugSteps.push(
            `Processing ${shipmentData.history.length} history entries`
          );
          for (const entry of shipmentData.history) {
            if (
              entry.coordinates?.lat &&
              entry.coordinates?.lng &&
              mountedRef.current
            ) {
              points.push({
                lat: entry.coordinates.lat,
                lng: entry.coordinates.lng,
                city: entry.city || "Unknown",
                country: entry.country || "Unknown",
                description:
                  entry.description || entry.status || "Transit point",
                date: safeDate(
                  entry.date || entry.time || entry.timestamp
                ).toISOString(),
                isHistory: true,
              });
              debugSteps.push(
                `Added history point: ${entry.city || "Unknown"}`
              );
            } else if (entry.city && !entry.coordinates) {
              // Geocode history entries that have city but no coordinates
              debugSteps.push(`Geocoding history entry: ${entry.city}`);
              try {
                const coords = await geocodeAddress(entry.city);
                if (mountedRef.current) {
                  points.push({
                    lat: coords.lat,
                    lng: coords.lng,
                    city: entry.city,
                    country: entry.country || "Unknown",
                    description:
                      entry.description || entry.status || "Transit point",
                    date: safeDate(
                      entry.date || entry.time || entry.timestamp
                    ).toISOString(),
                    isHistory: true,
                  });
                  debugSteps.push(
                    `Added geocoded history point: ${entry.city}`
                  );
                }
              } catch (geocodeError) {
                console.warn(
                  `Failed to geocode history entry ${entry.city}:`,
                  geocodeError
                );
                debugSteps.push(
                  `Failed to geocode history entry: ${entry.city}`
                );
              }
            }
          }
        }

        // Step 4: Process destination
        const destinationParty =
          shipmentData.destination || shipmentData.receiver;
        if (destinationParty?.city && mountedRef.current) {
          debugSteps.push(`Processing destination: ${destinationParty.city}`);
          const destLocation = parseLocation(
            destinationParty.city,
            destinationParty.state
          );

          let destCoords: GeocodeResult;
          if (
            destinationParty.coordinates?.lat &&
            destinationParty.coordinates?.lng
          ) {
            destCoords = destinationParty.coordinates;
            debugSteps.push(
              `Using existing destination coordinates: ${destCoords.lat}, ${destCoords.lng}`
            );
          } else {
            debugSteps.push(
              `Geocoding destination city: ${destinationParty.city}`
            );
            destCoords = await geocodeAddress(destinationParty.city);
            debugSteps.push(
              `Destination geocoded to: ${destCoords.lat}, ${destCoords.lng}`
            );
          }

          if (!mountedRef.current) return points;

          points.push({
            lat: destCoords.lat,
            lng: destCoords.lng,
            city: destLocation.city,
            country: destLocation.country,
            description: "Final destination",
            date:
              destinationParty.date ||
              safeDate(shipmentData.deliveryDate).toISOString(),
            isDestination: true,
          });
          debugSteps.push(
            `Added destination point: ${points[points.length - 1].city}`
          );
        } else {
          debugSteps.push("No destination city found");
        }

        debugSteps.push(`Total points created: ${points.length}`);
        setDebugInfo(debugSteps.join(" → "));
        console.log("MapView: Route points created:", points);
        return points;
      } catch (error) {
        console.error("MapView: Error creating route points:", error);
        debugSteps.push(
          `Error: ${error instanceof Error ? error.message : "Unknown error"}`
        );
        setDebugInfo(debugSteps.join(" → "));
        throw error;
      }
    },
    [parseLocation, safeDate]
  );

  const initializeMap = useCallback(
    async (points: RoutePoint[]) => {
      if (!mapRef.current || !mountedRef.current) {
        console.log("MapView: Cannot initialize - ref not available");
        return;
      }

      // Ensure Leaflet is available
      if (typeof L === "undefined" || !L.map) {
        const msg = "Leaflet not loaded";
        console.error("MapView:", msg);
        setError(msg);
        return;
      }

      console.log(`MapView: Initializing map with ${points.length} points`);

      try {
        cleanup();

        // Determine center and zoom based on points
        const center =
          points.length > 0
            ? [points[0].lat, points[0].lng]
            : [DEFAULT_COORDS.lat, DEFAULT_COORDS.lng];
        const initialZoom = points.length > 1 ? 6 : 8;

        console.log(
          `MapView: Creating map centered at [${center[0]}, ${center[1]}] with zoom ${initialZoom}`
        );

        const map = L.map(mapRef.current, {
          zoomControl: true,
          scrollWheelZoom: true,
          doubleClickZoom: true,
          boxZoom: true,
          keyboard: true,
          dragging: true,
          touchZoom: true,
        }).setView(center as [number, number], initialZoom);

        if (!mountedRef.current) {
          console.log("MapView: Component unmounted during map creation");
          return;
        }

        // Add tile layer
        const tileLayer = L.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            attribution: "© OpenStreetMap contributors",
            maxZoom: 18,
            errorTileUrl:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
          }
        );

        tileLayer.addTo(map);
        console.log("MapView: Tile layer added");

        // If no points, just show the map
        if (points.length === 0) {
          console.log("MapView: No points to display, showing empty map");
          mapInstanceRef.current = map;
          return;
        }

        const markers: L.Marker[] = [];
        const bounds = L.latLngBounds([]);

        // Add markers for each point
        points.forEach((point, index) => {
          if (!mountedRef.current) return;

          console.log(
            `MapView: Adding marker ${index + 1}/${points.length} at [${
              point.lat
            }, ${point.lng}]`
          );

          let iconHtml =
            '<div style="background-color: #fbbf24; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>';

          if (point.isOrigin) {
            iconHtml =
              '<div style="background-color: #3b82f6; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(59,130,246,0.5);"></div>';
          } else if (point.isDestination) {
            iconHtml =
              '<div style="background-color: #10b981; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(16,185,129,0.5);"></div>';
          }

          const customIcon = L.divIcon({
            html: iconHtml,
            className: "custom-div-icon",
            iconSize: [20, 20],
            iconAnchor: [10, 10],
          });

          const popupContent = `
            <div style="padding: 12px; min-width: 200px;">
              <div style="font-weight: 600; font-size: 16px; margin-bottom: 6px; color: #1f2937;">
                ${point.city}, ${point.country}
              </div>
              <div style="font-size: 14px; color: #6b7280; margin-bottom: 6px;">
                ${point.description}
              </div>
              <div style="font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; padding-top: 6px; margin-top: 6px;">
                ${new Date(point.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          `;

          try {
            const latLng = L.latLng(point.lat, point.lng);
            const marker = L.marker(latLng, {
              icon: customIcon,
            })
              .addTo(map)
              .bindPopup(popupContent);

            markers.push(marker);
            bounds.extend(latLng);
            console.log(`MapView: Marker ${index + 1} added successfully`);
          } catch (error) {
            console.warn(
              `MapView: Failed to create marker ${index + 1}:`,
              error
            );
          }
        });

        if (!mountedRef.current) return;

        // Add route line if multiple points
        if (points.length > 1) {
          const routeCoordinates = points.map(
            (p) => [p.lat, p.lng] as [number, number]
          );

          try {
            const polyline = L.polyline(routeCoordinates, {
              color: "#3b82f6",
              weight: 3,
              opacity: 0.8,
              dashArray: "10, 10",
              lineJoin: "round",
              lineCap: "round",
            });
            polyline.addTo(map);
            console.log("MapView: Route line added");
          } catch (error) {
            console.warn("MapView: Failed to draw route line:", error);
          }
        }

        // Fit map bounds to show all markers
        if (markers.length > 0 && bounds.isValid()) {
          try {
            map.fitBounds(bounds, { padding: [20, 20] });
            console.log("MapView: Map bounds fitted to markers");
          } catch (error) {
            console.warn("MapView: Failed to fit map bounds:", error);
            map.setView([points[0].lat, points[0].lng], 8);
          }
        }

        mapInstanceRef.current = map;
        console.log("MapView: Map initialization completed successfully");
      } catch (error) {
        console.error("MapView: Error initializing map:", error);
        throw error;
      }
    },
    [cleanup]
  );

  // Memoize shipment info to prevent unnecessary re-renders
  const { originInfo, destinationInfo, currentLocationText } = useMemo(() => {
    const origin = (shipment.origin as Party) || shipment.sender;
    const destination = (shipment.destination as Party) || shipment.receiver;

    let currentLocation = "Unknown";
    if (typeof shipment.currentLocation === "string") {
      currentLocation = shipment.currentLocation;
    } else if (
      shipment.currentLocation &&
      typeof shipment.currentLocation === "object"
    ) {
      currentLocation = `${shipment.currentLocation.lat}, ${shipment.currentLocation.lng}`;
    }

    return {
      originInfo: origin,
      destinationInfo: destination,
      currentLocationText: currentLocation,
    };
  }, [shipment]);

  useEffect(() => {
    let cancelled = false;

    const initialize = async () => {
      if (!mountedRef.current) return;

      try {
        console.log("MapView: Starting initialization");
        setIsLoading(true);
        setError(null);
        setDebugInfo("Initializing...");

        // Load Leaflet resources
        await loadLeafletResources();
        if (cancelled || !mountedRef.current) return;

        setDebugInfo("Creating route points...");

        // Create route points with timeout
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error("Route creation timeout")), 30000);
        });

        const points = await Promise.race([
          createRoutePoints(shipment),
          timeoutPromise,
        ]);

        if (cancelled || !mountedRef.current) return;

        console.log("MapView: Route points created, setting state");
        setRoutePoints(points);
        setDebugInfo("Initializing map...");

        await initializeMap(points);
        if (cancelled || !mountedRef.current) return;

        setDebugInfo("Map ready");
        console.log("MapView: Initialization completed");
      } catch (error) {
        console.error("MapView: Initialization failed:", error);
        if (!cancelled && mountedRef.current) {
          const errorMessage =
            error instanceof Error ? error.message : "Failed to initialize map";
          setError(errorMessage);
          setDebugInfo(`Error: ${errorMessage}`);
        }
      } finally {
        if (!cancelled && mountedRef.current) {
          setIsLoading(false);
        }
      }
    };

    initialize();

    return () => {
      cancelled = true;
    };
  }, [shipment, createRoutePoints, initializeMap]);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      cleanup();
    };
  }, [cleanup]);

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-400 mb-4">Error loading map: {error}</div>
        <div className="text-zinc-500 text-sm">{debugInfo}</div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-semibold text-white mb-6">Route Map</h3>
      <p className="text-zinc-400 mb-8">
        Track your shipment's journey from origin to destination
      </p>

      {/* Map Container */}
      <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6 mb-6">
        <div className="relative h-96 bg-zinc-900/50 rounded-lg overflow-hidden">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/50">
              <div className="text-zinc-400">Loading map...</div>
            </div>
          ) : (
            <>
              {/* Leaflet Map Container */}
              <div ref={mapRef} className="w-full h-full" />

              {/* Fallback UI when Leaflet is not available */}
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900" />
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg width="100%" height="100%">
                  <defs>
                    <pattern
                      id="grid"
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 20 0 L 0 0 0 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.5"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Route Line (SVG) */}
              {routePoints.length > 1 && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <defs>
                    <linearGradient
                      id="routeGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                  <polyline
                    points={routePoints
                      .map((p) => {
                        const { x, y } = toPercent(p.lat, p.lng);
                        return `${x}%,${y}%`;
                      })
                      .join(" ")}
                    fill="none"
                    stroke="url(#routeGradient)"
                    strokeWidth={3}
                    strokeDasharray="5,5"
                    className="animate-pulse"
                  />
                </svg>
              )}

              {/* Route Points */}
              {routePoints.map((point, index) => {
                const { x, y } = toPercent(point.lat, point.lng);
                const isOrigin = index === 0;
                const isDestination = index === routePoints.length - 1;
                const isCurrent =
                  index === routePoints.length - 1 &&
                  shipment.status !== "delivered";

                return (
                  <div
                    key={index}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <div
                      className={`relative ${isCurrent ? "animate-pulse" : ""}`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          isOrigin
                            ? "bg-blue-500 border-blue-400"
                            : isDestination
                            ? "bg-green-500 border-green-400"
                            : "bg-yellow-500 border-yellow-400"
                        }`}
                      >
                        {isCurrent && (
                          <div className="absolute inset-0 w-4 h-4 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
                        )}
                      </div>

                      {/* Tooltip (hover) */}
                      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-zinc-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                        <div className="font-medium">{point.city}</div>
                        <div className="text-zinc-400">{point.description}</div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-zinc-800"></div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Current Location Indicator */}
              {shipment.status !== "delivered" && (
                <div className="absolute bottom-4 left-4 bg-zinc-800/90 border border-zinc-600 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    <span className="text-white font-medium">
                      Current Location
                    </span>
                  </div>
                  <div className="text-zinc-400 text-xs">
                    {currentLocationText}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Route Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Origin */}
        <div className="bg-zinc-800/30 border border-zinc-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500/20 border border-blue-500 rounded-full flex items-center justify-center">
              <Navigation className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h4 className="text-white font-semibold">Origin</h4>
              <p className="text-zinc-400 text-sm">Starting point</p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-white font-medium">
              {originInfo?.city ?? "Unknown"}, {originInfo?.state ?? ""}
            </p>
            <p className="text-zinc-400 text-sm">
              Shipped on{" "}
              {originInfo?.date ??
                formatDate(safeDate(shipment.dateSent).toISOString())}
            </p>
            {originInfo?.coordinates && (
              <p className="text-zinc-500 text-xs font-mono">
                {originInfo.coordinates.lat.toFixed(4)},{" "}
                {originInfo.coordinates.lng.toFixed(4)}
              </p>
            )}
          </div>
        </div>

        {/* Destination */}
        <div className="bg-zinc-800/30 border border-zinc-700 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-500/20 border border-green-500 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h4 className="text-white font-semibold">Destination</h4>
              <p className="text-zinc-400 text-sm">Final delivery point</p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-white font-medium">
              {destinationInfo?.city ?? "Unknown"},{" "}
              {destinationInfo?.state ?? ""}
            </p>
            <p className="text-zinc-400 text-sm">
              Expected{" "}
              {destinationInfo?.date ??
                formatDate(safeDate(shipment.deliveryDate).toISOString())}
            </p>
            {destinationInfo?.coordinates && (
              <p className="text-zinc-500 text-xs font-mono">
                {destinationInfo.coordinates.lat.toFixed(4)},{" "}
                {destinationInfo.coordinates.lng.toFixed(4)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Route Summary */}
      <div className="mt-6 bg-zinc-800/30 border border-zinc-700 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Route className="w-5 h-5 text-zinc-400" />
          <h4 className="text-white font-semibold">Route Summary</h4>
        </div>
        <div className="space-y-3">
          {routePoints.length === 0 ? (
            <div className="text-center py-8 text-zinc-400">
              <p>No route data available</p>
              <p className="text-sm mt-1">
                Missing origin/destination or route coordinates
              </p>
              {debugInfo && (
                <p className="text-xs mt-2 text-zinc-500">Debug: {debugInfo}</p>
              )}
            </div>
          ) : (
            routePoints.map((point, index) => (
              <div key={index} className="flex items-center gap-3 py-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    index === 0
                      ? "bg-blue-500"
                      : index === routePoints.length - 1
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }`}
                ></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">
                      {point.city ?? "Unknown"}, {point.country ?? ""}
                    </span>
                    <span className="text-zinc-400 text-sm">
                      {formatDate(point.date)}
                    </span>
                  </div>
                  <p className="text-zinc-400 text-sm">{point.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MapView;
