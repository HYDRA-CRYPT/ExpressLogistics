import React from "react";
import type { NavigateFunction } from "react-router-dom";
import { Search } from "lucide-react";
import type { RecentTrackingNumber } from "../types/tracking";

interface TrackingInputProps {
  onTrack: (trackingNumber: string) => void;
  isLoading: boolean;
  recentNumbers: RecentTrackingNumber[];
  trackingNumber: string;
  setTrackingNumber: (value: string) => void;
  navigate: NavigateFunction;
}

const TrackingInput: React.FC<TrackingInputProps> = ({
  onTrack,
  isLoading,
  recentNumbers,
  trackingNumber,
  setTrackingNumber,
  navigate,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      onTrack(trackingNumber.trim());
    }
  };

  const handleRecentClick = (number: string) => {
    navigate(`/owner/shipments/track/${number}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Enter tracking number (e.g., TRK-2024-001234)"
            className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !trackingNumber.trim()}
          className="px-8 py-4 bg-white text-slate-900 font-semibold rounded-xl hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-lg"
        >
          {isLoading ? "Tracking..." : "Track Shipment"}
        </button>
      </form>

      {recentNumbers.length > 0 && (
        <div>
          <h3 className="text-slate-400 text-lg mb-4">
            Recent Tracking Numbers
          </h3>
          <div className="flex flex-wrap gap-3">
            {recentNumbers.map((recent) => (
              <button
                key={recent.id}
                onClick={() => handleRecentClick(recent.trackingNumber)}
                className="px-4 py-2 bg-slate-800/50 border border-slate-700 text-slate-300 rounded-lg hover:bg-slate-700/50 hover:text-white transition-all duration-200 text-sm font-medium"
              >
                {recent.trackingNumber}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackingInput;
