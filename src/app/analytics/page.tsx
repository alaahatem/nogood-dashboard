import InteractionsByDateCharts from "./_components/charts/InteractionsByDateChart";

import { ChartCard, RANGE_DAYS } from "./_components/charts/ChartCardComponent";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DataType, RangeKey } from "./types/chart";
type AnalyticsDashboardProps = {
  searchParams: { [key: string]: string | undefined };
};
export default async function AnalyticsDashboard({
  searchParams :{
    line_chart_range
  },
}: {
  searchParams:{
    line_chart_range?: string
  }
}) {
  const data = [
    {
      interest: 15,
      Impressions: 7350,
      clicks: 1,
      Spent: 1.429999948,
      Total_Conversion: 2,
      Approved_Conversion: 1,
      startDate: "2024-08-01",
    },
    {
      interest: 16,
      Impressions: 17861,
      clicks: 2,
      Spent: 1.820000023,
      Total_Conversion: 2,
      Approved_Conversion: 0,
      startDate: "2024-09-19",
    },
    {
      interest: 20,
      Impressions: 693,
      clicks: 0,
      Spent: 0,
      Total_Conversion: 1,
      Approved_Conversion: 0,
      startDate: "2024-08-13",
    },
    {
      interest: 28,
      Impressions: 4259,
      clicks: 1,
      Spent: 1.25,
      Total_Conversion: 1,
      Approved_Conversion: 0,
      startDate: "2024-08-19",
    },
    {
      interest: 28,
      Impressions: 4133,
      clicks: 1,
      Spent: 1.289999962,
      Total_Conversion: 1,
      Approved_Conversion: 1,
      startDate: "2024-11-04",
    },
  ];

  
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">
        Welcome to the Analytics Dashboard
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        <ChartCard title="Interactions Line Chart" queryKey="line_chart_range">
          <InteractionsByDateCharts data={data} searchParams={line_chart_range} />
        </ChartCard>
      </div>
    </>
  );
}
