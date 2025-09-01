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

  const STATUS_ORDER = [
    "pending",
    "processing",
    "shipped",
    "in transit",
    "on hold",
    "delivered",
  ];

  const STATUS_LABELS: Record<string, string> = {
    pending: "Order Confirmed & Pending",
    processing: "Processing",
    shipped: "Shipped",
    "in transit": "In Transit",
    "on hold": "On Hold",
    delivered: "Delivered",
  };

  // Build timeline events
  const buildTimeline = (): TimelineEvent[] => {
    const events: TimelineEvent[] = [];
    const sentDate = new Date(shipment.dateSent);
    const deliveryDate = new Date(shipment.deliveryDate);

    // Group history by status (case-insensitive)
    const historyByStatus: Record<string, LocationUpdate[]> = {};
    (Array.isArray(shipment.history) ? shipment.history : []).forEach(
      (entry) => {
        const status = entry.status?.toLowerCase() || "pending";
        if (!historyByStatus[status]) historyByStatus[status] = [];
        historyByStatus[status].push(entry);
      }
    );

    // Always add Pending (first)
    events.push({
      id: "pending",
      title: STATUS_LABELS["pending"],
      location: `${shipment.sender?.city || "Unknown"}, ${
        shipment.sender?.country || "Unknown"
      }`,
      date: formatDate(sentDate),
      time: formatTime(sentDate),
      status: "pending",
      completed: true,
      isFixed: true,
    });

    // Add only statuses that exist in history (except pending/delivered)
    STATUS_ORDER.slice(1, -1).forEach((status) => {
      const entries = historyByStatus[status] || [];
      if (entries.length > 0) {
        // Use the latest entry for this status
        const latest = entries.reduce((a, b) =>
          new Date(a.time).getTime() > new Date(b.time).getTime() ? a : b
        );
        events.push({
          id: status,
          title:
            STATUS_LABELS[status] +
            (latest.description ? ` - ${latest.description}` : ""),
          location:
            latest.city && latest.country
              ? `${latest.city}, ${latest.country}`
              : latest.location
              ? `${latest.location.lat?.toFixed(2) ?? ""}, ${
                  latest.location.lng?.toFixed(2) ?? ""
                }`
              : "Unknown",
          date: latest.time ? formatDate(latest.time) : "",
          time: latest.time ? formatTime(latest.time) : "",
          status,
          completed: true,
          isFixed: false,
        });
      }
    });

    // Always add Delivered (last)
    events.push({
      id: "delivered",
      title: STATUS_LABELS["delivered"],
      location: `${shipment.receiver?.city || "Unknown"}, ${
        shipment.receiver?.country || "Unknown"
      }`,
      date: formatDate(deliveryDate),
      time: formatTime(deliveryDate),
      status: "delivered",
      completed: shipment.status?.toLowerCase() === "delivered",
      isFixed: true,
    });

    return events;
  };

  const timeline = buildTimeline();

  return (
    <div>
      <h3 className="text-xl font-semibold text-white mb-6">
        Shipment Timeline
      </h3>
      <p className="text-zinc-400 mb-8">
        Track the journey of your shipment from origin to destination
      </p>

      <div className="space-y-6">
        {timeline.map((event, index) => {
          const statusIcon = event.icon || getStatusIcon(event.status);
          const statusColors =
            event.statusColor || getStatusColor(event.status);
          const [, bgColor] = statusColors.split(" ");

          // Show date/time if they exist and are not empty
          const showDateTime = event.date && event.date.trim() !== "";

          return (
            <div key={event.id} className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    event.completed
                      ? `${bgColor} border-current shadow-lg`
                      : "bg-zinc-700 border-zinc-600"
                  } ${
                    event.isFixed && !event.completed
                      ? "ring-2 ring-zinc-500 ring-opacity-50"
                      : ""
                  }`}
                >
                  <div
                    className={`transition-colors duration-300 ${
                      event.completed ? "text-white" : "text-zinc-400"
                    }`}
                  >
                    {statusIcon}
                  </div>
                </div>

                {/* Timeline connector line */}
                {index < timeline.length - 1 && (
                  <div
                    className={`w-0.5 h-8 mx-auto mt-2 transition-colors duration-300 ${
                      event.completed
                        ? bgColor.replace("bg-", "bg-")
                        : "bg-zinc-700"
                    }`}
                  />
                )}
              </div>

              <div className="flex-1 pb-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4
                      className={`font-semibold mb-1 text-lg transition-colors duration-300 ${
                        event.completed ? "text-white" : "text-zinc-400"
                      } ${event.isFixed ? "font-bold" : ""}`}
                    >
                      {event.title}
                    </h4>

                    <p className="text-zinc-400 text-sm mb-2 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {event.location}
                    </p>

                    {/* Date and time display */}
                    {showDateTime && (
                      <p className="text-zinc-500 text-sm">
                        {event.date}
                        {event.time &&
                          event.time.trim() !== "" &&
                          ` at ${event.time}`}
                      </p>
                    )}

                    {/* Show status for pending items without dates */}
                    {!showDateTime && !event.completed && (
                      <p className="text-zinc-500 text-sm italic">
                        {event.status === "delivered"
                          ? "Awaiting delivery..."
                          : "Processing..."}
                      </p>
                    )}
                  </div>

                  {/* Status indicator for fixed events */}
                  {event.isFixed && (
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        event.completed
                          ? "bg-green-900/30 text-green-400 border border-green-800"
                          : "bg-zinc-700/50 text-zinc-400 border border-zinc-600"
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
      <div className="mt-8 p-4 bg-zinc-800/30 border border-zinc-700 rounded-lg">
        <div className="flex justify-between items-center text-sm">
          <span className="text-zinc-400">
            Total Updates: {timeline.length - 2}{" "}
            {/* Exclude fixed pending/delivery */}
          </span>
          <span className="text-zinc-400">
            Status:{" "}
            <span className="text-white font-medium capitalize">
              {shipment.status}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TimelineComponent;
