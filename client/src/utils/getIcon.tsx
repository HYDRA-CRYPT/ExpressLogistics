import {
  Clock,
  Package,
  Send,
  Truck,
  Pause,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export function getStatusIcon(status: string | undefined) {
  switch (status?.toLowerCase()) {
    case "pending":
      return <Clock className="w-4 h-4" />;
    case "processing":
      return <Package className="w-4 h-4" />;
    case "shipped":
      return <Send className="w-4 h-4" />;
    case "in transit":
    case "in-transit":
      return <Truck className="w-4 h-4" />;
    case "on hold":
      return <Pause className="w-4 h-4" />;
    case "delivered":
      return <CheckCircle className="w-4 h-4" />;
    default:
      return <AlertCircle className="w-4 h-4" />;
  }
}
