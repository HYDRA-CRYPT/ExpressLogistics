import React from "react";
import type { NavigateFunction } from "react-router-dom";
import { Search } from "lucide-react";
interface TrackingInputProps {
  onTrack: (trackingNumber: string) => void;
  isLoading: boolean;
  trackingNumber: string;
  setTrackingNumber: (value: string) => void;
  navigate: NavigateFunction;
}

const TrackingInput: React.FC<TrackingInputProps> = ({
  onTrack,
  isLoading,
  trackingNumber,
  setTrackingNumber,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      onTrack(trackingNumber.trim());
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Enter tracking code"
            className="w-full pl-12 pr-4 py-4 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-400 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !trackingNumber.trim()}
          className="px-8 py-4 bg-white text-zinc-900 font-semibold rounded-xl hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-lg"
        >
          {isLoading ? "Tracking..." : "Track Shipment"}
        </button>
      </form>
    </div>
  );
};

export default TrackingInput;
