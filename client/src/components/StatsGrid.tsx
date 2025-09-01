import {
  TrendingUp,
  TrendingDown,
  Package,
  Truck,
  BarChart2,
} from "lucide-react";
import { useFetch } from "@/hooks/useFetch";

interface StatsData {
  totalRevenue: number;
  revenueTrend: number;
  growthRate: number;
  totalPackages: number;
  packageTrend: number;
  packagesThisMonth: number;
}

export function StatsGrid() {
  const { data, isLoading, error } = useFetch<StatsData>({
    url: "/deliveries/stats",
  });

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-8">
        <span className="text-zinc-400 dark:text-zinc-500">
          Loading stats...
        </span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="w-full flex justify-center items-center py-8">
        <span className="text-red-500 dark:text-red-400">
          Failed to load stats
        </span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 my-10 px-4">
      <div className="bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 flex items-center gap-4 shadow-sm">
        <BarChart2 className="w-10 h-10 text-blue-600 dark:text-blue-400" />
        <div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">
            ${data.totalRevenue.toLocaleString()}
          </div>
          <div className="text-zinc-500 dark:text-zinc-400 text-sm">
            Revenue This Month
          </div>
          <div
            className={`flex items-center gap-1 text-xs mt-1 ${
              data.revenueTrend >= 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {data.revenueTrend >= 0 ? <TrendingUp /> : <TrendingDown />}
            {Math.abs(data.revenueTrend)}% from last month
          </div>
        </div>
      </div>
      <div className="bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 flex items-center gap-4 shadow-sm">
        <Truck className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
        <div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">
            {data.totalPackages}
          </div>
          <div className="text-zinc-500 dark:text-zinc-400 text-sm">
            Total Deliveries
          </div>
          <div
            className={`flex items-center gap-1 text-xs mt-1 ${
              data.growthRate >= 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {data.growthRate >= 0 ? <TrendingUp /> : <TrendingDown />}
            {Math.abs(data.growthRate)}% growth
          </div>
        </div>
      </div>
      <div className="bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 flex items-center gap-4 shadow-sm">
        <Package className="w-10 h-10 text-green-600 dark:text-green-400" />
        <div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">
            {data.packagesThisMonth}
          </div>
          <div className="text-zinc-500 dark:text-zinc-400 text-sm">
            Packages This Month
          </div>
          <div
            className={`flex items-center gap-1 text-xs mt-1 ${
              data.packageTrend >= 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {data.packageTrend >= 0 ? <TrendingUp /> : <TrendingDown />}
            {Math.abs(data.packageTrend)}% from last month
          </div>
        </div>
      </div>
    </div>
  );
}
