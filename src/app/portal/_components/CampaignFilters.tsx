import { Input } from "@/components/ui/input";

type CampaignFiltersProps = {
  filters: Record<string, any>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CampaignFilters: React.FC<CampaignFiltersProps> = ({ filters, onChange }) => {
  return (
    <div className="flex space-x-4 mb-4">
      <Input
        placeholder="Impressions >"
        name="impressions_gt"
        value={filters.impressions_gt}
        onChange={onChange}
      />
      <Input
        placeholder="Clicks >"
        name="clicks_gt"
        value={filters.clicks_gt}
        onChange={onChange}
      />
      <Input
        placeholder="Spent <"
        name="spent_lt"
        value={filters.spent_lt}
        onChange={onChange}
      />
    </div>
  );
};

export default CampaignFilters;
