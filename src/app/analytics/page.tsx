"use client";
import { Suspense } from "react";
import InteractionsByDateCharts from "./_components/charts/InteractionsByDateChart";
import { ChartCard } from "./_components/charts/ChartCardComponent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity, BarChart, Users, Clock } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useApi } from "../hooks/useApi";
import { CampaignAd } from "@/app/types/chart";

export default function AnalyticsDashboard() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const { data, isLoading, error } = useApi<CampaignAd[]>({
    endpoint: '/campaigns',
    params: {
      start_date: from ?? undefined,
      end_date: to ?? undefined,
    },
  });

  const totalImpressions = data?.reduce((sum, item) => sum + item.impressions, 0) ?? 0;
  const totalClicks = data?.reduce((sum, item) => sum + item.clicks, 0) ?? 0;
  const totalSpent = data?.reduce((sum, item) => sum + item.spent, 0) ?? 0;
  const totalConversions = data?.reduce((sum, item) => sum + item.total_conversion, 0) ?? 0;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Analytics Dashboard
      </h1>

      {error && <div className="text-red-500 mb-4">Error: {error.message}</div>}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Impressions
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-24" /> : totalImpressions.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-24" /> : totalClicks.toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Spent Time
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-24" /> : totalSpent.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Conversions
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-24" /> : totalConversions}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        <ChartCard title="Interactions Line Chart">
          <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
            <InteractionsByDateCharts data={data || []} />
          </Suspense>
        </ChartCard>
      </div>
    </div>
  );
}