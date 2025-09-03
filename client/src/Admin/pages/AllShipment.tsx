import { useState } from "react";
import { RefreshCw, PlusCircle, Package, Grid, Users } from "lucide-react";
import { SectionCards } from "@/components/section-cards";
import { SearchAndFilters } from "../../components/SearchAndFilters";
import ShipmentCard from "../../components/ShipmentCard";
import { DataTable } from "@/components/data-table";
import { useFetch } from "../../hooks/useFetch";
import LoadingSpinner from "@/components/LoadingSpinner";
import BeautifulErrorUI from "@/components/BeautifulErrorUI";
import NoDataUI from "@/components/NoDataUI";
import type { CardDelivery, TableDelivery } from "@/types/shipment";

const SHIPMENTS_PER_PAGE = 6;

interface ShipmentResponse {
  page: number;
  limit: number;
  total: number;
  pages: number;
  items: Array<ShipmentAPIItem>;
}

type ShipmentAPIItem = {
  id: number;
  _id: string;
  name?: string;
  Package?: string;
  Weight?: number;
  status: string;
  receiver: string;
  sender: string;
  origin: string;
  destination: string;
  trackingCode: string;
  pickupDate?: string;
  createdAt?: string;
  deliveryDate?: string;
  expectedDelivery?: string;
};

function AllShipments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [visibleCount, setVisibleCount] = useState(SHIPMENTS_PER_PAGE);

  const { data, isLoading, error } = useFetch<ShipmentResponse>({
    url: "/deliveries",
  });

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <BeautifulErrorUI
        error={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  const allShipments = data?.items || [];

  const filteredShipments = allShipments.filter((shipment) => {
    const matchesSearch =
      searchTerm === "" ||
      shipment.trackingCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleRefresh = () => window.location.reload();

  const visibleShipments = filteredShipments.slice(0, visibleCount);

  const transformToCardData = (shipment: ShipmentAPIItem): CardDelivery => ({
    _id: shipment._id || shipment.id?.toString() || `temp-${Date.now()}`,
    id: shipment.id,
    trackingCode: shipment.trackingCode || "N/A",
    status: shipment.status || "pending",
    sender: {
      name: shipment.sender || "Unknown Sender",
      city: shipment.origin || "Unknown City",
    },
    receiver: {
      name: shipment.receiver || "Unknown Receiver",
      city: shipment.destination || "Unknown City",
    },
    shipmentType: shipment.Package || "Standard Package",
    pickupDate: shipment.pickupDate || shipment.createdAt,
    deliveryDate: shipment.deliveryDate || shipment.expectedDelivery,
    items: [
      {
        weight: shipment.Weight || 0,
        quantity: 1,
      },
    ],
  });

  const transformToTableData = (shipment: ShipmentAPIItem): TableDelivery => ({
    id: shipment.id || 0,
    _id: shipment._id || shipment.id?.toString(),
    Package: shipment.Package || "Standard Package",
    Weight: shipment.Weight || 0,
    status: shipment.status,
    receiver: shipment.receiver || "N/A",
    sender: shipment.sender || "N/A",
    origin: shipment.origin || "N/A",
    destination: shipment.destination || "N/A",
    trackingCode: shipment.trackingCode,
  });

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + SHIPMENTS_PER_PAGE);
  };

  return (
    <div className="min-h-full w-full max-w-full bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white">
      <div className="container mx-auto px-2 py-6">
        {/* Beautiful Custom Header */}
        <div className="relative mb-10">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-100/60 to-zinc-200/60 dark:from-zinc-800/40 dark:to-zinc-700/40 rounded-2xl"></div>
          <div className="absolute top-6 right-6 w-20 h-20 bg-zinc-300/20 dark:bg-zinc-600/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-6 left-6 w-16 h-16 bg-zinc-400/15 dark:bg-zinc-500/15 rounded-full blur-xl"></div>

          {/* Main header container */}
          <div className="relative bg-white/85 dark:bg-zinc-800/85 backdrop-blur-sm border border-zinc-200/60 dark:border-zinc-700/60 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-8 py-8">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 dark:from-zinc-600 dark:via-zinc-700 dark:to-zinc-800 rounded-2xl flex items-center justify-center shadow-2xl">
                    <Package className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-zinc-100 dark:to-zinc-300 bg-clip-text text-transparent">
                      All Shipments
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed max-w-2xl">
                      Manage and track all shipments across your logistics
                      network with real-time updates
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                        <span className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                          {filteredShipments.length} Active Shipments
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                          Live Tracking
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleRefresh}
                    className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-zinc-700 to-zinc-800 hover:from-zinc-800 hover:to-zinc-900 dark:from-zinc-600 dark:to-zinc-700 dark:hover:from-zinc-700 dark:hover:to-zinc-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
                  >
                    <RefreshCw size={18} />
                    <span>Refresh Data</span>
                  </button>
                  <div className="px-4 py-2 bg-zinc-100 dark:bg-zinc-700 rounded-lg border border-zinc-200 dark:border-zinc-600 text-center">
                    <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                      Total: {data?.total || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Search and Filters */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 rounded-xl"></div>
          <div className="relative bg-white/70 dark:bg-zinc-800/70 backdrop-blur-sm border border-zinc-200/50 dark:border-zinc-700/50 rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <SearchAndFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                viewMode={viewMode}
                setViewMode={setViewMode}
                onRefresh={handleRefresh}
              />
            </div>
          </div>
        </div>

        {/* Beautiful Card Grid Container */}
        {viewMode === "card" && (
          <div className="relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-50/80 to-zinc-100/80 dark:from-zinc-900/50 dark:to-zinc-800/50 rounded-2xl"></div>
            <div className="absolute top-8 left-8 w-24 h-24 bg-zinc-200/30 dark:bg-zinc-700/30 rounded-full blur-2xl"></div>
            <div className="absolute bottom-8 right-8 w-20 h-20 bg-zinc-300/20 dark:bg-zinc-600/20 rounded-full blur-xl"></div>

            {/* Main content container */}
            <div className="relative bg-white/60 dark:bg-zinc-800/60 backdrop-blur-sm border border-zinc-200/50 dark:border-zinc-700/50 rounded-2xl shadow-lg overflow-hidden">
              {/* Section Header */}
              <div className="px-8 py-6 bg-gradient-to-r from-zinc-50/80 via-zinc-100/80 to-zinc-50/80 dark:from-zinc-800/80 dark:via-zinc-700/80 dark:to-zinc-800/80 border-b border-zinc-200/50 dark:border-zinc-600/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-zinc-700 dark:bg-zinc-600 rounded-xl flex items-center justify-center">
                    <Grid className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                      Shipment Overview
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                      Interactive card view of all active shipments
                    </p>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <div className="px-3 py-1 bg-zinc-700 dark:bg-zinc-600 text-white rounded-full text-xs font-medium">
                      {visibleShipments.length} Displayed
                    </div>
                  </div>
                </div>
              </div>

              {/* Cards Grid */}
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                  <SectionCards />
                  {visibleShipments.map((shipment) => (
                    <ShipmentCard
                      key={shipment.id}
                      shipment={transformToCardData(shipment)}
                    />
                  ))}
                </div>

                {/* Enhanced Load More Button */}
                {visibleCount < filteredShipments.length && (
                  <div className="flex justify-center mt-10">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-zinc-700/20 to-zinc-900/20 rounded-xl blur-lg"></div>
                      <button
                        onClick={handleLoadMore}
                        className="relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-zinc-700 via-zinc-800 to-zinc-900 dark:from-zinc-600 dark:via-zinc-700 dark:to-zinc-800 text-white rounded-xl shadow-2xl hover:shadow-zinc-500/25 hover:scale-105 transition-all duration-300 font-semibold text-lg"
                      >
                        <PlusCircle className="w-6 h-6" />
                        <span>Load More Shipments</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Table View */}
        {viewMode === "table" && (
          <div className="w-full mt-6">
            <div className="inline-block w-[300px] min-w-full align-middle">
              <DataTable data={filteredShipments.map(transformToTableData)} />
            </div>
          </div>
        )}

        {filteredShipments.length === 0 && (
          <div className="py-12">
            <NoDataUI
              title="No Shipments Found"
              message="We couldn't find any shipments matching your search or filters."
              icon="search"
              onRefresh={handleRefresh}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default AllShipments;
