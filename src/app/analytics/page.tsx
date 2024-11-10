"use client";
import { Suspense, useEffect, useState } from "react";
import InteractionsByDateCharts from "./_components/charts/InteractionsByDateChart";
import { ChartCard } from "./_components/charts/ChartCardComponent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity, BarChart, Users, Clock } from "lucide-react";
import {useSearchParams } from "next/navigation";

import axios from "axios"; // Import axios
import { CampaignAd } from "./types/chart";

export default function AnalyticsDashboard() {


  const searchParams = useSearchParams(); // Use useSearchParams hook to get query params
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const [data, setData] = useState<CampaignAd[]>([]);
  const buildQueryParams = (from?: string, to?: string) => {
    const params: Record<string, string> = {};

    if (from) params.start_date = from;
    if (to) params.end_date = to;

    return params;
  };

  const fetchCampaigns = async (params: Record<string, string>) => {
    try {

      const response = await axios.get(
        `http://${process.env.NEXT_PUBLIC_SERVICE_HOST}:3000/campaigns`,
        {
          params,
        }
      );
      setData(response.data); // Store fetched data in state
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };
  useEffect(() => {
    const params = buildQueryParams(from ?? undefined, to ?? undefined); // Convert null to undefined
    console.log({ params });
    // Only fetch data if there are query parameters to send
    fetchCampaigns(params);
  }, [from, to]); // Re-fetch if 'from' or 'to' change

  const totalImpressions = data.reduce(
    (sum, item) => sum + item.impressions,
    0
  );
  const totalClicks = data.reduce((sum, item) => sum + item.clicks, 0);
  const totalSpent = data.reduce((sum, item) => sum + item.spent, 0);
  const totalConversions = data.reduce(
    (sum, item) => sum + item.total_conversion,
    0
  );

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Analytics Dashboard
      </h1>

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
              {totalImpressions.toLocaleString()}
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
              {totalClicks.toLocaleString()}
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
            <div className="text-2xl font-bold">{totalSpent.toFixed(2)}</div>
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
            <div className="text-2xl font-bold">{totalConversions}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        <ChartCard title="Interactions Line Chart">
          <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
            <InteractionsByDateCharts data={data} />
          </Suspense>
        </ChartCard>
      </div>
    </div>
  );
}
