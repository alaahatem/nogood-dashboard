"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartCardProps } from "../../types/chart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { format, subDays } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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

  const handleRangeSelect = (value: DateRangeValue) => {
    const { startDate, endDate } = value;
    const currentSearchParams = new URLSearchParams(searchParams.toString());
    currentSearchParams.set("from", format(new Date(startDate),"yyyy-MM-dd"));
    currentSearchParams.set("to", format(new Date(endDate),"yyyy-MM-dd"));
    router.push(`${pathname}?${currentSearchParams.toString()}`);
  };
  return (
    <Card>
      <CardHeader className="p-4 bg-gray-100">
        <div className=" flex gap-4 justify-between">
          <CardTitle>{title}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"}>Select Range</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {Object.entries(RANGE_DAYS).map(([key, value]) => {
                return (
                  <DropdownMenuItem
                    key={key}
                    onClick={() => handleRangeSelect(value as DateRangeValue)}
                  >
                    {value.label}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-4">{children}</CardContent>
    </Card>
  );
}
