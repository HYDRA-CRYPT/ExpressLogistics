import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Package,
  Clock,
  Truck,
  CheckCircle,
  Phone,
  HelpCircle,
  Info,
  Eye,
} from "lucide-react";

const Track = () => {
  const [trackingNumbers, setTrackingNumbers] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [recentTracking] = useState([
    { id: "AGL1234567890", status: "Delivered", date: "2024-12-15" },
    { id: "AGL1234567891", status: "In Transit", date: "2024-12-14" },
    { id: "AGL1234567892", status: "Out for Delivery", date: "2024-12-13" },
  ]);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numbers = trackingNumbers
      .trim()
      .split(/[\s,\n]+/)
      .filter((num) => num);
    if (numbers.length > 0) {
      setIsSearching(true);
      // Add a small delay to show loading state
      setTimeout(() => {
        navigate(`/track/${numbers[0]}`);
        setIsSearching(false);
      }, 500);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "Out for Delivery":
        return <Truck className="h-5 w-5 text-blue-500" />;
      case "In Transit":
        return <Package className="h-5 w-5 text-orange-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "text-green-600 bg-green-50 border-green-200";
      case "Out for Delivery":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "In Transit":
        return "text-orange-600 bg-orange-50 border-orange-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="pt-20 bg-white dark:bg-zinc-900 transition-colors">
      {/* Hero Section - Simplified and Focused */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 text-white py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Search className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Track Your Package
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Enter your tracking number to get real-time updates
          </p>
        </div>
      </section>

      {/* Main Tracking Form */}
      <section className="py-16 bg-white dark:bg-zinc-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tips Section */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Tracking Number Format
                </h3>
                <p className="text-blue-700 dark:text-blue-300 text-sm mb-2">
                  Your tracking number should look like:{" "}
                  <code className="bg-blue-100 dark:bg-blue-800 px-2 py-1 rounded text-xs">
                    AGL1234567890
                  </code>
                </p>
                <p className="text-blue-600 dark:text-blue-400 text-sm">
                  Multiple tracking numbers can be separated by commas or line
                  breaks.
                </p>
              </div>
            </div>
          </div>

          {/* Tracking Form */}
          <div className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="tracking"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Tracking Number(s)
                </label>
                <textarea
                  id="tracking"
                  rows={3}
                  value={trackingNumbers}
                  onChange={(e) => setTrackingNumbers(e.target.value)}
                  className="w-full px-4 py-4 border border-gray-300 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="AGL1234567890, AGL1234567891..."
                  required
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Enter one or multiple tracking numbers separated by commas,
                  spaces, or new lines
                </p>
              </div>

              <button
                type="submit"
                disabled={isSearching || !trackingNumbers.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                {isSearching ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5" />
                    <span>Track Package</span>
                  </>
                )}
              </button>
            </form>

            {/* Support Link */}
            <div className="mt-6 text-center">
              <button
                onClick={() => navigate("/contact")}
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
              >
                <HelpCircle className="h-4 w-4 mr-1" />
                Can't find your package? Contact Support
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Tracking History */}
      <section className="py-16 bg-gray-50 dark:bg-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Recent Searches
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Quick access to your recently tracked shipments
            </p>
          </div>

          <div className="grid gap-4">
            {recentTracking.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-zinc-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-200 dark:border-zinc-600"
                onClick={() => navigate(`/track/${item.id}`)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-100 dark:bg-zinc-600 p-3 rounded-lg">
                      {getStatusIcon(item.status)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {item.id}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Last updated: {item.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                        item.status
                      )} dark:bg-opacity-20 dark:border-opacity-30`}
                    >
                      {item.status}
                    </span>
                    <Eye className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 bg-white dark:bg-zinc-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Need Additional Help?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Our support team is available 24/7 to assist with any tracking
            issues.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 dark:bg-zinc-800 p-6 rounded-xl hover:shadow-lg transition-shadow">
              <Phone className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Phone Support
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                Speak directly with our experts
              </p>
              <p className="text-blue-600 dark:text-blue-400 font-semibold">
                +1 (555) 123-4567
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-zinc-800 p-6 rounded-xl hover:shadow-lg transition-shadow">
              <Package className="h-8 w-8 text-teal-600 dark:text-teal-400 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Live Chat
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                Get instant help online
              </p>
              <button
                onClick={() => navigate("/contact")}
                className="text-teal-600 dark:text-teal-400 font-semibold hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
              >
                Start Chat
              </button>
            </div>

            <div className="bg-gray-50 dark:bg-zinc-800 p-6 rounded-xl hover:shadow-lg transition-shadow">
              <Clock className="h-8 w-8 text-orange-600 dark:text-orange-400 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                24/7 Availability
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                Round-the-clock assistance
              </p>
              <p className="text-orange-600 dark:text-orange-400 font-semibold">
                Always Here
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Track;
