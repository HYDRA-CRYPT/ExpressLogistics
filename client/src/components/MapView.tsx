import React from "react";
import { MapPin, Navigation, Route } from "lucide-react";
import { type ShipmentData } from "../types/tracking";

interface MapViewProps {
  shipment: ShipmentData;
}

const MapView: React.FC<MapViewProps> = ({ shipment }) => {
  const routePoints = shipment.routeCoordinates || [];

  // Calculate bounds for the map view
  const bounds = routePoints.reduce(
    (acc, point) => ({
      minLat: Math.min(acc.minLat, point.lat),
      maxLat: Math.max(acc.maxLat, point.lat),
      minLng: Math.min(acc.minLng, point.lng),
      maxLng: Math.max(acc.maxLng, point.lng),
    }),
    {
      minLat: routePoints[0]?.lat || 0,
      maxLat: routePoints[0]?.lat || 0,
      minLng: routePoints[0]?.lng || 0,
      maxLng: routePoints[0]?.lng || 0,
    }
  );

  const centerLat = (bounds.minLat + bounds.maxLat) / 2;
  const centerLng = (bounds.minLng + bounds.maxLng) / 2;

  return (
    <div>
      <h3 className="text-xl font-semibold text-white mb-6">Route Map</h3>
      <p className="text-zinc-400 mb-8">
        Track your shipment's journey from origin to destination
      </p>

      {/* Map Container */}
      <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-6 mb-6">
        <div className="relative h-96 bg-zinc-900/50 rounded-lg overflow-hidden">
          {/* Simulated Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900">
            <div className="absolute inset-0 opacity-10">
              <svg
                width="100%"
                height="100%"
                viewBox={`${centerLng - 50} ${centerLat - 50} 100 100`}
              >
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
          </div>

          {/* Route Line */}
          {routePoints.length > 1 && (
            <svg className="absolute inset-0 w-full h-full">
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
                  .map((point) => {
                    const x =
                      ((point.lng - bounds.minLng) /
                        (bounds.maxLng - bounds.minLng)) *
                      100;
                    const y =
                      ((bounds.maxLat - point.lat) /
                        (bounds.maxLat - bounds.minLat)) *
                      100;
                    return `${x}%,${y}%`;
                  })
                  .join(" ")}
                fill="none"
                stroke="url(#routeGradient)"
                strokeWidth="3"
                strokeDasharray="5,5"
                className="animate-pulse"
              />
            </svg>
          )}

          {/* Route Points */}
          {routePoints.map((point, index) => {
            const x =
              ((point.lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) *
              100;
            const y =
              ((bounds.maxLat - point.lat) / (bounds.maxLat - bounds.minLat)) *
              100;
            const isOrigin = index === 0;
            const isDestination = index === routePoints.length - 1;
            const isCurrent =
              index === routePoints.length - 1 &&
              shipment.status !== "Delivered";

            return (
              <div
                key={index}
                className="absolute transform -tranzinc-x-1/2 -tranzinc-y-1/2"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <div className={`relative ${isCurrent ? "animate-pulse" : ""}`}>
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

                  {/* Tooltip */}
                  <div className="absolute bottom-6 left-1/2 transform -tranzinc-x-1/2 bg-zinc-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="font-medium">{point.city}</div>
                    <div className="text-zinc-400">{point.description}</div>
                    <div className="absolute top-full left-1/2 transform -tranzinc-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-zinc-800"></div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button className="w-8 h-8 bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-600 rounded text-zinc-300 hover:text-white transition-colors duration-200 flex items-center justify-center">
              <span className="text-lg font-bold">+</span>
            </button>
            <button className="w-8 h-8 bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-600 rounded text-zinc-300 hover:text-white transition-colors duration-200 flex items-center justify-center">
              <span className="text-lg font-bold">−</span>
            </button>
          </div>

          {/* Current Location Indicator */}
          {shipment.status !== "Delivered" && (
            <div className="absolute bottom-4 left-4 bg-zinc-800/90 border border-zinc-600 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="text-white font-medium">Current Location</span>
              </div>
              <div className="text-zinc-400 text-xs">
                {typeof shipment.currentLocation === "string"
                  ? shipment.currentLocation
                  : `${shipment.currentLocation.lat}, ${shipment.currentLocation.lng}`}
              </div>
            </div>
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
              {shipment.origin.city}, {shipment.origin.state}
            </p>
            <p className="text-zinc-400 text-sm">
              Shipped on {shipment.origin.date}
            </p>
            {shipment.origin.coordinates && (
              <p className="text-zinc-500 text-xs font-mono">
                {shipment.origin.coordinates.lat.toFixed(4)},{" "}
                {shipment.origin.coordinates.lng.toFixed(4)}
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
              {shipment.destination.city}, {shipment.destination.state}
            </p>
            <p className="text-zinc-400 text-sm">
              Expected {shipment.destination.date}
            </p>
            {shipment.destination.coordinates && (
              <p className="text-zinc-500 text-xs font-mono">
                {shipment.destination.coordinates.lat.toFixed(4)},{" "}
                {shipment.destination.coordinates.lng.toFixed(4)}
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
          {routePoints.map((point, index) => (
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
                    {point.city}, {point.country}
                  </span>
                  <span className="text-zinc-400 text-sm">
                    {new Date(point.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-zinc-400 text-sm">{point.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapView;
