import type {
  ShipmentData,
  ShipmentStatus,
  LocationUpdate,
  TrackingEvent,
} from "../types/tracking";

export function updateShipmentStatus(
  shipment: ShipmentData,
  newStatus: ShipmentStatus,
  locationUpdates: LocationUpdate[] = []
): ShipmentData {
  // Calculate progress percentage based on status
  const statusProgress: Record<ShipmentStatus, number> = {
    Pending: 0,
    Processing: 20,
    Shipped: 40,
    "In Transit": 60,
    "On Hold": 60, // Same as In Transit
    Delivered: 100,
  };

  // Generate timeline based on status
  const generateTimeline = (status: ShipmentStatus): TrackingEvent[] => {
    const baseTimeline: Omit<TrackingEvent, "completed">[] = [
      {
        id: "1",
        title: "Order processed",
        location: `${shipment.origin.city}, ${shipment.origin.state}`,
        date: "Processing",
        time: "Pending",
        description: "Order has been received and is being processed",
      },
      {
        id: "2",
        title: "Ready for pickup",
        location: `${shipment.origin.city}, ${shipment.origin.state}`,
        date: "Shipped",
        time: "Pending",
        description: "Package is ready for carrier pickup",
      },
      {
        id: "3",
        title: "In transit",
        location: "Various locations",
        date: "In Transit",
        time: "Pending",
        description: "Package is on its way to destination",
      },
      {
        id: "4",
        title: "Out for delivery",
        location: `${shipment.destination.city}, ${shipment.destination.state}`,
        date: "Delivered",
        time: "Pending",
        description: "Package is out for final delivery",
      },
      {
        id: "5",
        title: "Delivered",
        location: `${shipment.destination.city}, ${shipment.destination.state}`,
        date: "Delivered",
        time: "Pending",
        description: "Package has been delivered successfully",
      },
    ];

    // Determine which steps should be completed based on current status
    const statusOrder: ShipmentStatus[] = [
      "Pending",
      "Processing",
      "Shipped",
      "In Transit",
      "On Hold",
      "Delivered",
    ];
    const currentStatusIndex = statusOrder.indexOf(status);

    return baseTimeline.map((event, index) => ({
      ...event,
      completed: index <= currentStatusIndex && status !== "Pending",
    }));
  };

  // Update current location based on latest location update or status
  let currentLocation = shipment.currentLocation;
  if (locationUpdates.length > 0) {
    const latestUpdate = locationUpdates[locationUpdates.length - 1];
    currentLocation = `${latestUpdate.city}, ${latestUpdate.country}`;
  }

  // Add location updates to route coordinates
  const newRoutePoints = locationUpdates.map((update) => ({
    lat: update.location.lat,
    lng: update.location.lng,
    city: update.city,
    country: update.country,
    description: update.description,
    date: update.time,
  }));

  return {
    ...shipment,
    status: newStatus,
    progressPercentage: statusProgress[newStatus],
    currentLocation,
    lastUpdated: new Date().toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      month: "short",
      day: "numeric",
    }),
    timeline: generateTimeline(newStatus),
    routeCoordinates: [...(shipment.routeCoordinates || []), ...newRoutePoints],
  };
}
