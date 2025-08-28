import {
  IconTrendingDown,
  IconTrendingUp,
  IconPackage,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFetch } from "@/hooks/useFetch";
import LoadingSpinner from "./LoadingSpinner";
import BeautifulErrorUI from "./BeautifulErrorUI";
import NoDataUI from "./NoDataUI";

interface StatsData {
  totalRevenue: number;
  revenueTrend: number;
  growthRate: number;
  totalPackages: number;
  packageTrend: number;
  packagesThisMonth: number;
}

export function SectionCards() {
  const { data, isLoading, error } = useFetch<StatsData>({
    url: "/deliveries/stats",
  });

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <BeautifulErrorUI
        error={error}
        onRetry={() => window.location.reload()}
      />
    );

  // Add this check to ensure data and required fields exist
  if (!data || data.totalRevenue === undefined) {
    return <NoDataUI />;
  }

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* Total Revenue */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            ${data.totalRevenue.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {data.revenueTrend >= 0 ? (
                <IconTrendingUp />
              ) : (
                <IconTrendingDown />
              )}
              {Math.abs(data.revenueTrend).toFixed(2)}%
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>

      {/* Total Packages */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Packages</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl flex items-center gap-2">
            <IconPackage className="text-blue-500" />
            {data.totalPackages.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {data.packageTrend >= 0 ? (
                <IconTrendingUp />
              ) : (
                <IconTrendingDown />
              )}
              {Math.abs(data.packageTrend).toFixed(2)}%
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>

      {/* Deliveries Growth */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Delivery Growth</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data.growthRate >= 0 ? "+" : ""}
            {data.growthRate.toFixed(1)}%
          </CardTitle>
          <CardAction>
            <Badge variant={data.growthRate >= 0 ? "default" : "destructive"}>
              {data.growthRate >= 0 ? <IconTrendingUp /> : <IconTrendingDown />}
              Growth Rate
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>

      {/* Packages This Month */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Packages This Month</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data.packagesThisMonth.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge variant="secondary">
              <IconPackage />
              Monthly
            </Badge>
          </CardAction>
        </CardHeader>
      </Card>
    </div>
  );
}
