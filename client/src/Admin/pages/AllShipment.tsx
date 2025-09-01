import { useState } from "react";
import { RefreshCw, PlusCircle } from "lucide-react";
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

        {/* Search and Filters */}
        <SearchAndFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onRefresh={handleRefresh}
        />

        {/* Content */}
        {viewMode === "card" ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
              <SectionCards />
              {visibleShipments.map((shipment) => (
                <ShipmentCard
                  key={shipment.id}
                  shipment={transformToCardData(shipment)}
                />
              ))}
            </div>
            {visibleCount < filteredShipments.length && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleLoadMore}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400 transition-colors font-semibold text-lg"
                >
                  <PlusCircle className="w-5 h-5" />
                  Load More Shipments
                </button>
              </div>
            )}
          </>
        ) : (
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
