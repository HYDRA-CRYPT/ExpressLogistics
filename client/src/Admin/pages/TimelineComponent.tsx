import React from "react";
import {
  Clock,
  Package,
  Send,
  Truck,
  Pause,
  CheckCircle,
  AlertCircle,
  MapPin,
} from "lucide-react";

interface LocationUpdate {
  _id?: string;
  description?: string;
  status?: string;
  time: Date;
  updateDate?: string;
  updateTime?: string;
  location?: {
    lat: number;
    lng: number;
  };
  city?: string;
  country?: string;
}

interface ShipmentData {
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
  history: LocationUpdate[];
  dateSent: Date;
  deliveryDate: Date;
}

interface TimelineEvent {
  id: string;
  title: string;
  location: string;
  date: string;
  time?: string;
  status: string;
  completed: boolean;
  icon?: React.ReactNode;
  statusColor?: string;
  isFixed?: boolean; // To identify pending and delivery events
}

interface TimelineComponentProps {
  shipment: ShipmentData;
}

const TimelineComponent: React.FC<TimelineComponentProps> = ({ shipment }) => {
  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "processing":
        return <Package className="w-4 h-4" />;
      case "shipped":
        return <Send className="w-4 h-4" />;
      case "in transit":
        return <Truck className="w-4 h-4" />;
      case "on hold":
        return <Pause className="w-4 h-4" />;
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "pending-delivery":
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  // Get status colors
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "text-yellow-400 bg-yellow-500";
      case "processing":
        return "text-blue-400 bg-blue-500";
      case "shipped":
        return "text-purple-400 bg-purple-500";
      case "in transit":
        return "text-indigo-400 bg-indigo-500";
      case "on hold":
        return "text-orange-400 bg-orange-500";
      case "delivered":
        return "text-green-400 bg-green-500";
      case "pending-delivery":
        return "text-gray-400 bg-gray-500";
      default:
        return "text-gray-400 bg-gray-500";
    }
  };

  // Format date for display
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format time for display
  const formatTime = (date: Date | string) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const STATUS_LABELS: Record<string, string> = {
    pending: "Order Confirmed & Pending",
    processing: "Processing",
    shipped: "Shipped",
    "in transit": "In Transit",
    "on hold": "On Hold",
    delivered: "Delivered",
  };

  // Build timeline events - chronological order based on actual history
  const buildTimeline = (): TimelineEvent[] => {
    const events: TimelineEvent[] = [];
    const sentDate = new Date(shipment.dateSent);
    const deliveryDate = new Date(shipment.deliveryDate);

    // Always start with creation/pending event
    events.push({
      id: "created",
      title: "Order Created & Confirmed",
      location: `${shipment.sender?.city || "Unknown"}, ${
        shipment.sender?.country || "Unknown"
      }`,
      date: formatDate(sentDate),
      time: formatTime(sentDate),
      status: "pending",
      completed: true,
      isFixed: true,
    });

    // Add all history entries in chronological order
    if (Array.isArray(shipment.history) && shipment.history.length > 0) {
      // Sort history by time (chronological order)
      const sortedHistory = [...shipment.history].sort(
        (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
      );

      sortedHistory.forEach((entry, index) => {
        if (entry.status) {
          const entryTime = new Date(entry.time);
          events.push({
            id: `history-${index}`,
            title: STATUS_LABELS[entry.status.toLowerCase()] || entry.status,
            location:
              entry.city && entry.country
                ? `${entry.city}, ${entry.country}`
                : entry.location
                ? `${entry.location.lat?.toFixed(2) ?? ""}, ${
                    entry.location.lng?.toFixed(2) ?? ""
                  }`
                : entry.description || "Unknown",
            date: formatDate(entryTime),
            time: formatTime(entryTime),
            status: entry.status.toLowerCase(),
            completed: true,
            isFixed: false,
          });
        }
      });
    }

    // Add delivery event (only if status is delivered)
    if (shipment.status?.toLowerCase() === "delivered") {
      events.push({
        id: "delivered",
        title: STATUS_LABELS["delivered"],
        location: `${shipment.receiver?.city || "Unknown"}, ${
          shipment.receiver?.country || "Unknown"
        }`,
        date: formatDate(deliveryDate),
        time: formatTime(deliveryDate),
        status: "delivered",
        completed: true,
        isFixed: true,
      });
    } else {
      // Add expected delivery as pending event
      events.push({
        id: "expected-delivery",
        title: "Expected Delivery",
        location: `${shipment.receiver?.city || "Unknown"}, ${
          shipment.receiver?.country || "Unknown"
        }`,
        date: formatDate(deliveryDate),
        time: formatTime(deliveryDate),
        status: "pending-delivery",
        completed: false,
        isFixed: true,
      });
    }

    return events;
  };

  const timeline = buildTimeline();

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Shipment Timeline
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Track the journey of your shipment from origin to destination
      </p>

      <div className="space-y-6">
        {timeline.map((event, index) => {
          const statusIcon = event.icon || getStatusIcon(event.status);
          const statusColors =
            event.statusColor || getStatusColor(event.status);
          const [, bgColor] = statusColors.split(" ");
          const isLastEvent = index === timeline.length - 1;

          // Show date/time if they exist and are not empty
          const showDateTime = event.date && event.date.trim() !== "";

          return (
            <div key={event.id} className="relative flex items-start space-x-4">
              {/* Timeline Line */}
              {!isLastEvent && (
                <div className="absolute left-5 top-10 w-0.5 h-8 bg-gray-200 dark:bg-zinc-700"></div>
              )}

              {/* Status Icon */}
              <div className="flex-shrink-0">
                <div
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    event.completed
                      ? `${bgColor} border-current shadow-lg`
                      : "bg-gray-200 dark:bg-zinc-700 border-gray-300 dark:border-zinc-600"
                  } ${
                    event.isFixed && !event.completed
                      ? "ring-2 ring-gray-300 dark:ring-zinc-500 ring-opacity-50"
                      : ""
                  }`}
                >
                  <div
                    className={`transition-colors duration-300 ${
                      event.completed
                        ? "text-white"
                        : "text-gray-400 dark:text-zinc-400"
                    }`}
                  >
                    {statusIcon}
                  </div>
                </div>
              </div>

              {/* Event Content */}
              <div className="flex-1 pb-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4
                      className={`text-lg font-semibold transition-colors duration-300 ${
                        event.completed
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      {event.title}
                    </h4>

                    {event.location && (
                      <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {event.location}
                      </p>
                    )}

                    {/* Show date and time for completed and current events */}
                    {showDateTime && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        {event.date}
                        {event.time && ` at ${event.time}`}
                      </p>
                    )}

                    {/* Show status for pending items without dates */}
                    {!showDateTime && !event.completed && (
                      <p className="text-gray-500 dark:text-gray-400 text-sm italic mt-1">
                        {event.status === "delivered"
                          ? "Awaiting delivery..."
                          : "Processing..."}
                      </p>
                    )}
                  </div>

                  {/* Status indicator for fixed events */}
                  {event.isFixed && (
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        event.completed
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
                          : "bg-gray-100 dark:bg-zinc-700/50 text-gray-600 dark:text-zinc-400 border border-gray-200 dark:border-zinc-600"
                      }`}
                    >
                      {event.completed ? "Completed" : "Pending"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Timeline Summary */}
      <div className="mt-8 p-4 bg-gray-50 dark:bg-zinc-800/30 border border-gray-200 dark:border-zinc-700 rounded-lg">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 dark:text-zinc-400">
            Total Updates: {timeline.filter((event) => !event.isFixed).length}{" "}
            {/* Exclude fixed creation/delivery events */}
          </span>
          <span className="text-gray-600 dark:text-zinc-400">
            Current Status:{" "}
            <span className="text-gray-900 dark:text-white font-medium capitalize">
              {shipment.status}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TimelineComponent;
