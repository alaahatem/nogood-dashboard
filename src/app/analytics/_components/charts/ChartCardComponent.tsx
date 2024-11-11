"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartCardProps } from "@/app/types/chart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { format, subDays } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "./DateRangePicker";
import { useState } from "react";

export const RANGE_DAYS = {
  last_7_days: {
    label: "Last 7 days",
    startDate: subDays(new Date(), 6),
    endDate: new Date(),
  },
  last_2_weeks: {
    label: "Last 2 weeks",
    startDate: subDays(new Date(), 13),
    endDate: new Date(),
  },
};

type DateRangeValue = {
  label: string;
  startDate: Date;
  endDate: Date;
};

export function ChartCard({ title, children }: ChartCardProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const [date, setDate] = useState<DateRange | undefined>({
    from: from ? new Date(from) : undefined,
    to: to ? new Date(to) : undefined,
  });

  const handleRangeSelect = (value: DateRangeValue) => {
    const { startDate, endDate } = value;
    updateDateRange(startDate, endDate);
  };

  const updateDateRange = (start: Date, end: Date) => {
    const currentSearchParams = new URLSearchParams(searchParams.toString());
    currentSearchParams.set("from", format(new Date(start), "yyyy-MM-dd"));
    currentSearchParams.set("to", format(new Date(end), "yyyy-MM-dd"));
    router.push(`${pathname}?${currentSearchParams.toString()}`);
  };

  const handleDateChange = (newDate: DateRange | undefined) => {
    setDate(newDate);
    if (newDate?.from && newDate?.to) {
      updateDateRange(newDate.from, newDate.to);
    }
  };

  return (
    <Card>
      <CardHeader className="p-4 bg-gray-100">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <CardTitle>{title}</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2">
            <DateRangePicker
              date={date}
              onDateChange={handleDateChange}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Presets</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {Object.entries(RANGE_DAYS).map(([key, value]) => (
                  <DropdownMenuItem
                    key={key}
                    onClick={() => handleRangeSelect(value as DateRangeValue)}
                  >
                    {value.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">{children}</CardContent>
    </Card>
  );
}