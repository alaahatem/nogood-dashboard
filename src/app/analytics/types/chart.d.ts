import { RANGE_DAYS } from "../_components/charts/ChartCardComponent";

export type CampaignAd = {
  start_date: string;
  end_date: string;
  interest: number;
  impressions: number;
  clicks: number;
  spent: number;
  total_conversion: number;
  approved_conversion: number;
};

export type ChartCardProps = {
  title: string;
  children: ReactNode;
};

export type RangeKey = keyof typeof RANGE_DAYS;
