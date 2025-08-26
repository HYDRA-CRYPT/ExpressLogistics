import React, { useState } from "react";
import { RefreshCw, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { StatsCard } from "../../components/StatsCard";
import { SearchAndFilters } from "../../components/SearchAndFilters";
import ShipmentCard, { type Shipment } from "../../components/ShipmentCard";
import { useShipmentData } from "../../hooks/useShipmentData";
import data from "../stores/data.json";
import { DataTable } from "@/components/data-table";

const SHIPMENTS_PER_PAGE = 6;

function AllShipments() {
  const {
    stats,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
  } = useShipmentData();

  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [visibleCount, setVisibleCount] = useState(SHIPMENTS_PER_PAGE);

  const handleRefresh = () => window.location.reload();

  // Apply search and filter
  const filteredShipments: Shipment[] = data.filter((shipment) => {
    const matchesSearch =
      shipment.Package.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.trackingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.receiver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.sender.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter
      ? shipment.status.toLowerCase() === statusFilter.toLowerCase()
      : true;

    const matchesPriority = priorityFilter
      ? shipment.priority?.toLowerCase() === priorityFilter.toLowerCase()
      : true;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Only show up to visibleCount shipments
  const visibleShipments = filteredShipments.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + SHIPMENTS_PER_PAGE);
  };

  return (
    <div className="min-h-full w-full max-w-full bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white">
      <div className="container mx-auto px-2 py-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">
              All Shipments
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg">
              Manage and track all shipments across your logistics network
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-200 border border-zinc-300 rounded-lg text-zinc-800 hover:text-white hover:bg-zinc-700 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white transition-colors"
            >
              <RefreshCw size={20} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Shipments"
            value={stats.totalShipments}
            icon="package"
            stats={[
              {
                label: "In Transit",
                value: stats.inTransit,
                color: "text-blue-500 dark:text-blue-400",
                icon: (
                  <Clock
                    size={14}
                    className="text-blue-500 dark:text-blue-400"
                  />
                ),
              },
              {
                label: "Delivered",
                value: stats.delivered,
                color: "text-green-600 dark:text-green-400",
                icon: (
                  <CheckCircle
                    size={14}
                    className="text-green-600 dark:text-green-400"
                  />
                ),
              },
              {
                label: "Delayed/Pending",
                value: stats.delayed,
                color: "text-orange-500 dark:text-orange-400",
                icon: (
                  <AlertTriangle
                    size={14}
                    className="text-orange-500 dark:text-orange-400"
                  />
                ),
              },
            ]}
          />
          <StatsCard
            title="Total Weight"
            value={`${stats.totalWeight.toLocaleString()} kg`}
            subtitle={`Average weight per shipment: ${stats.avgWeight.toLocaleString()} kg`}
            icon="weight"
          />
          <StatsCard
            title="Total Value"
            value={`$${stats.totalValue.toLocaleString()}`}
            subtitle={`Average value per shipment: $${stats.avgValue.toLocaleString()}`}
            icon="value"
          />
          <StatsCard
            title="Total Items"
            value={stats.totalItems.toLocaleString()}
            subtitle={`Average items per shipment: ${stats.avgItems}`}
            icon="items"
          />
        </div>

        {/* Search and Filters */}
        <SearchAndFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onRefresh={handleRefresh}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
        />

        {/* Content */}
        {viewMode === "card" ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {visibleShipments.map((shipment) => (
                <ShipmentCard key={shipment.id} shipment={shipment} />
              ))}
            </div>
            {visibleCount < filteredShipments.length && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleLoadMore}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400 transition-colors"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="w-full">
            <div className="inline-block w-[300px] min-w-full align-middle">
              <DataTable data={filteredShipments} />
            </div>
          </div>
        )}

        {filteredShipments.length === 0 && (
          <div className="text-center py-12">
            <div className="text-zinc-600 dark:text-zinc-400 text-lg mb-2">
              No shipments found
            </div>
            <div className="text-zinc-500 dark:text-zinc-500">
              Try adjusting your search or filters
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllShipments;
