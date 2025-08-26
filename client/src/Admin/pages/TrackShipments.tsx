import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Send } from "lucide-react";
import TrackingInput from "../../components/TrackingInput";
import LoadingSpinner from "../../components/LoadingSpinner";
import ShipmentDetails from "./ShipmentDetails";
import type { ShipmentData, RecentTrackingNumber } from "../../types/tracking";
import {
  fetchRecentTrackingNumbers,
  trackShipment,
  addToRecentTracking,
} from "../../assets/data/mockData";

function TrackShipments() {
  const { code } = useParams<{ code?: string }>();
  const navigate = useNavigate();

  const [trackingNumber, setTrackingNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shipmentData, setShipmentData] = useState<ShipmentData | null>(null);
  const [recentNumbers, setRecentNumbers] = useState<RecentTrackingNumber[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRecentNumbers();

    // If there is a code in URL, track it automatically
    if (code && code !== trackingNumber) {
      setTrackingNumber(code);
      handleTrack(code, true); // Skip navigation to avoid loop
    }
  }, [code]);

  const loadRecentNumbers = async () => {
    try {
      const recent = await fetchRecentTrackingNumbers();
      setRecentNumbers(recent);
    } catch (err) {
      console.error("Failed to load recent tracking numbers:", err);
    }
  };

  const handleTrack = async (number: string, skipNavigation = false) => {
    if (!number) return;

    setIsLoading(true);
    setError(null);
    setShipmentData(null);

    // Only update URL if not already set
    if (!skipNavigation && number !== code) {
      navigate(`/owner/shipments/track/${number}`, { replace: true });
    }

    try {
      const data = await trackShipment(number);
      setShipmentData(data);
      await addToRecentTracking(number);
      await loadRecentNumbers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to track shipment");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setTrackingNumber("");
    setShipmentData(null);
    setError(null);
    navigate("/owner/shipments/track", { replace: true });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-900 dark:text-white px-2">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4">
              <Send className="w-6 h-6 text-white transform rotate-45" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold">
              Track Your Shipment
            </h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-lg lg:text-xl max-w-2xl mx-auto">
            Enter your tracking number to get real-time updates on your shipment
          </p>
        </div>

        <div className="space-y-8">
          {/* Search Section */}
          <TrackingInput
            onTrack={handleTrack}
            isLoading={isLoading}
            recentNumbers={recentNumbers}
            trackingNumber={trackingNumber}
            setTrackingNumber={setTrackingNumber}
            navigate={navigate}
          />

          {isLoading && <LoadingSpinner />}

          {error && (
            <div className="w-full max-w-6xl mx-auto">
              <div className="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-200 dark:bg-red-900/50 rounded-full flex items-center justify-center">
                  <Send className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">
                  Tracking Error
                </h3>
                <p className="text-red-600 dark:text-red-300 mb-6">{error}</p>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white rounded-lg font-medium transition-colors duration-200"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {shipmentData && !isLoading && (
            <ShipmentDetails
              shipment={shipmentData}
              onShipmentUpdate={setShipmentData}
            />
          )}

          {!isLoading && !shipmentData && !error && trackingNumber === "" && (
            <div className="w-full max-w-6xl mx-auto text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center">
                <Send className="w-10 h-10 text-slate-600 dark:text-slate-400 transform rotate-45" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Ready to Track</h3>
              <p className="text-slate-600 dark:text-slate-400 text-lg max-w-md mx-auto">
                Enter a tracking number above or select from your recent
                searches to get started.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrackShipments;
