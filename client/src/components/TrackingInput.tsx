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
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 sm:w-5 h-4 sm:h-5" />
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Enter tracking code"
            className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-white dark:bg-zinc-800/20 border border-zinc-300 dark:border-zinc-700 rounded-lg sm:rounded-xl text-zinc-900 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !trackingNumber.trim()}
          className="px-6 sm:px-8 py-3 sm:py-4 bg-zinc-900 hover:bg-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-white font-semibold rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-base sm:text-lg whitespace-nowrap"
        >
          {isLoading ? "Tracking..." : "Track Shipment"}
        </button>
      </form>
    </div>
  );
};

export default TrackingInput;
