import React from "react";
import { Search, List, Grid3x3 } from "lucide-react";

interface SearchAndFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  viewMode: "card" | "table";
  setViewMode: (mode: "card" | "table") => void;
  onRefresh: () => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  priorityFilter: string;
  setPriorityFilter: (priority: string) => void;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  viewMode,
  setViewMode,
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8 w-full">
      {/* Search Box */}
      <div className="flex-1 relative w-full">
        <Search
          size={20}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          placeholder="Search by ID, tracking number, customer, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-zinc-800/60 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      {/* Filters & Actions */}
      <div className="flex flex-wrap gap-3 md:gap-2 items-center">
        {/* Status & Priority Filters */}
        <div className="flex flex-wrap gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-zinc-800/60 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="in-transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="pending">Pending</option>
            <option value="delayed">Delayed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2 bg-zinc-800/60 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Priority</option>
            <option value="standard">Standard</option>
            <option value="express">Express</option>
            <option value="economy">Economy</option>
          </select>
        </div>

        {/* View Toggle */}
        <div className="flex border border-zinc-700 rounded-lg overflow-hidden bg-zinc-800/60">
          <button
            onClick={() => setViewMode("table")}
            className={`px-3 py-2 transition-colors flex items-center justify-center ${
              viewMode === "table"
                ? "bg-blue-600 text-white"
                : "text-zinc-400 hover:text-white hover:bg-zinc-700/50"
            }`}
          >
            <List size={18} />
          </button>
          <button
            onClick={() => setViewMode("card")}
            className={`px-3 py-2 transition-colors flex items-center justify-center ${
              viewMode === "card"
                ? "bg-blue-600 text-white"
                : "text-zinc-400 hover:text-white hover:bg-zinc-700/50"
            }`}
          >
            <Grid3x3 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
