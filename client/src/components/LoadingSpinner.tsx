import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-slate-600 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-slate-400 text-lg">Tracking shipment...</p>
    </div>
  );
};

export default LoadingSpinner;
