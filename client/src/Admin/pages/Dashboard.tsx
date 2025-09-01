import { DataTable } from "@/components/data-table";
import { useFetch } from "@/hooks/useFetch";
import LoadingSpinner from "@/components/LoadingSpinner";
import BeautifulErrorUI from "@/components/BeautifulErrorUI";
import type { TableDelivery } from "@/types/shipment";
import { StatsGrid } from "@/components/StatsGrid";

interface DeliveryResponse {
  page: number;
  limit: number;
  total: number;
  pages: number;
  items: TableDelivery[]; // Use the proper TableDelivery type
}

const AdminDashboard = () => {
  const { data, isLoading, error } = useFetch<DeliveryResponse>({
    url: "/deliveries",
  });

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <BeautifulErrorUI
        error={error}
        onRetry={() => window.location.reload()}
      />
    );

  return (
    <div className="dashboard px-0">
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <StatsGrid />

            <div className="px-6">
              <DataTable data={data?.items || []} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
