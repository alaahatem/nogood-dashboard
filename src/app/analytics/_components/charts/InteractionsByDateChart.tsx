"use client";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import ChartCheckboxDropdown from "./ChartCheckboxDropdown";
import { RANGE_DAYS } from "./ChartCardComponent";
import { CampaignAd, RangeKey } from "../../types/chart";


type DateSearchParams = {
  from : string
  date: string
}
type InteractionsByDateChartProps = {
  data: CampaignAd[];
};
const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#00C49F",
  "#FFBB28",
];

export default function InteractionsByDateCharts({
  data,
}: InteractionsByDateChartProps) {
  const [selectedKeys, setSelectedKeys] = useState<string[]>(["interest"]);

  const handleCheckBoxChange = (key: string) => {
    setSelectedKeys((prevKeys) =>
      prevKeys.includes(key)
        ? prevKeys.filter((item) => item !== key)
        : [...prevKeys, key]
    );
  };

  const dataKeys = ['impressions', 'clicks' ,'interests']

  return (
    <>
      {/* Metric Selection Dropdown */}
      <div className="flex justify-end mb-4">
        <ChartCheckboxDropdown
          keys={dataKeys}
          selectedKeys={selectedKeys}
          onChange={handleCheckBoxChange}
        />
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" minHeight={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="hsl(var(--muted))" />
          <XAxis dataKey="startDate" />
          <YAxis />
          <Tooltip />
          <Legend />
          {/* Dynamically render Line components based on selected keys */}
          {selectedKeys.map((key, index) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={COLORS[index % COLORS.length]}
              dot={false}
              strokeWidth={2}
              name={key}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
