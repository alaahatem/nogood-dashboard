"use client";
import { Suspense, useEffect, useState } from "react";
import InteractionsByDateCharts from "./_components/charts/InteractionsByDateChart";
import { ChartCard, RANGE_DAYS } from "./_components/charts/ChartCardComponent";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity, BarChart, DollarSign, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import axios from "axios"; // Import axios
import { CampaignAd } from "./types/chart";

export default function AnalyticsDashboard() {
  const router = useRouter(); // Get access to the router

  const searchParams = useSearchParams(); // Use useSearchParams hook to get query params
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const [data, setData] = useState<CampaignAd[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const buildQueryParams = (from?: string, to?: string) => {
    const params: Record<string, string> = {};

    if (from) params.start_date = from;
    if (to) params.end_date = to;
    
    return params;
  };

  const fetchCampaigns = async (params: Record<string, string>) => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      const response = await axios.get("http://localhost:3000/campaigns", {
        params,
      });
      setData(response.data); // Store fetched data in state
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch campaign data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const params = buildQueryParams(from ?? undefined, to ?? undefined); // Convert null to undefined
    console.log({params})
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
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
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

      <div className="grid gap-6 md:grid-cols-2">
        <ChartCard title="Interactions Line Chart">
          <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
            <InteractionsByDateCharts data={data} />
          </Suspense>
        </ChartCard>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>You have 3 unread messages</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                <span className="text-sm">
                  New campaign "Summer Sale" started
                </span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                <span className="text-sm">Conversion rate increased by 2%</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-yellow-600 rounded-full mr-2"></span>
                <span className="text-sm">
                  Daily budget limit reached for "Brand Awareness" campaign
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
