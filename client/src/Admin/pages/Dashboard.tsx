import { DataTable } from "@/components/data-table";
import { useFetch } from "@/hooks/useFetch";
import LoadingSpinner from "@/components/LoadingSpinner";
import BeautifulErrorUI from "@/components/BeautifulErrorUI";
import type { TableDelivery } from "@/types/shipment";
import { StatsGrid } from "@/components/StatsGrid";
import { TrendingUp, BarChart3 } from "lucide-react";

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
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            {/* Custom StatsGrid Design Container */}
            <div className="relative mx-4">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 rounded-2xl"></div>
              <div className="absolute top-4 right-4 w-16 h-16 bg-zinc-300/30 dark:bg-zinc-600/30 rounded-full blur-xl"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-zinc-400/20 dark:bg-zinc-500/20 rounded-full blur-lg"></div>

              {/* Main container */}
              <div className="relative bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm border border-zinc-200/60 dark:border-zinc-700/60 rounded-2xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 bg-gradient-to-r from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-700 border-b border-zinc-200/50 dark:border-zinc-600/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-zinc-700 dark:bg-zinc-600 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                        Performance Analytics
                      </h2>
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                        Key metrics and insights
                      </p>
                    </div>
                    <div className="ml-auto">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                          Live
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* StatsGrid Content */}
                <div className="p-6">
                  <StatsGrid />
                </div>
              </div>
            </div>

            <div className="px-6">
              {/* Custom Dashboard Header */}
              <div className="relative mb-8">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-100/50 to-zinc-200/50 dark:from-zinc-800/30 dark:to-zinc-700/30 rounded-xl"></div>
                <div className="absolute top-2 right-2 w-12 h-12 bg-zinc-300/20 dark:bg-zinc-600/20 rounded-full blur-lg"></div>

                {/* Header content */}
                <div className="relative bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border border-zinc-200/50 dark:border-zinc-700/50 rounded-xl shadow-md overflow-hidden">
                  <div className="px-6 py-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-zinc-700 to-zinc-900 dark:from-zinc-600 dark:to-zinc-800 rounded-lg flex items-center justify-center shadow-lg">
                          <BarChart3 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                            Dashboard
                          </h1>
                          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                            Real-time data and tracking overview
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="px-3 py-2 bg-zinc-100 dark:bg-zinc-700 rounded-lg border border-zinc-200 dark:border-zinc-600">
                          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            {data?.total || 0} Records
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                            Active
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="">
                <DataTable data={data?.items || []} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
