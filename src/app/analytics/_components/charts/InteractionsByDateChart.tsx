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
import { useState } from "react";
import ChartCheckboxDropdown from "./ChartCheckboxDropdown";
import { InteractionsByDateChartProps } from "@/app/types/chart";
import { CHART_DATA_KEYS, COLORS } from "@/lib/constants";

export default function InteractionsByDateCharts({
  data,
}: InteractionsByDateChartProps) {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([
    "interest",
    "clicks",
  ]);

  const handleCheckBoxChange = (key: string) => {
    setSelectedKeys((prevKeys) =>
      prevKeys.includes(key)
        ? prevKeys.filter((item) => item !== key)
        : [...prevKeys, key]
    );
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <ChartCheckboxDropdown
          keys={CHART_DATA_KEYS}
          selectedKeys={selectedKeys}
          onChange={handleCheckBoxChange}
        />
      </div>

      <ResponsiveContainer width="100%" minHeight={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="hsl(var(--muted))" />
          <XAxis dataKey="start_date" />
          <YAxis />
          <Tooltip />
          <Legend />
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
