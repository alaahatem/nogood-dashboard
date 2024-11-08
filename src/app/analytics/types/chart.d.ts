import { RANGE_DAYS } from "../_components/charts/ChartCardComponent";

export type DataType = {
    startDate: string;
    interest: number;
    Impressions: number;
    clicks: number;
    Spent: number;
    Total_Conversion: number;
    Approved_Conversion: number;
  };

  export type ChartCardProps = {
    title: string;
    children: ReactNode;
  };

  export type RangeKey = keyof typeof RANGE_DAYS;
