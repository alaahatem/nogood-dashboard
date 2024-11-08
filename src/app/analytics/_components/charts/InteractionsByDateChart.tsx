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
import { RangeKey } from "../../types/chart";

type DataType = {
  startDate: string;
  interest: number;
  Impressions: number;
  clicks: number;
  Spent: number;
  Total_Conversion: number;
  Approved_Conversion: number;
};

type InteractionsByDateChartProps = {
  data: DataType[];
  searchParams: string | undefined;
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
  searchParams,
}: InteractionsByDateChartProps) {
  const [selectedKeys, setSelectedKeys] = useState<string[]>(["interest"]);

  const handleCheckBoxChange = (key: string) => {
    setSelectedKeys((prevKeys) =>
      prevKeys.includes(key)
        ? prevKeys.filter((item) => item !== key)
        : [...prevKeys, key]
    );
  };
  const [filteredData, setFilteredData] = useState<DataType[]>(data);

  useEffect(() => {
    console.log({ searchParams });
    const rangeKey = searchParams
    console.log(rangeKey);
    if (rangeKey && RANGE_DAYS[rangeKey as RangeKey]) {
      const { startDate, endDate } = RANGE_DAYS[rangeKey as RangeKey];

      const filtered = data.filter((item) => {
        const itemDate = new Date(item.startDate);
        return itemDate >= startDate && itemDate <= endDate;
      });
      setFilteredData(filtered);
    } else {
      // Reset to original data if no range is selected
      setFilteredData(data);
    }
  }, [searchParams]);

  const dataKeys = Object.keys(data[0]).filter((key) => key !== "startDate");

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
        <LineChart data={filteredData}>
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
