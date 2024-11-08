"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartCardProps, RangeKey } from "../../types/chart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { subDays } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation"
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
export function ChartCard({
  title,
  children,
  queryKey,
}: ChartCardProps & { queryKey: string }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  console.log(pathname)
  console.log(searchParams)

  const handleRangeSelect = (key: RangeKey) => {
    const currentSearchParams = new URLSearchParams(searchParams.toString());
    currentSearchParams.set(queryKey, key); 

    router.push(`${pathname}?${currentSearchParams.toString()}`)
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
                    onClick={() => handleRangeSelect(key as RangeKey)}
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
