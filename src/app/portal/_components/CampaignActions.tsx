import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, RefreshCw, Download } from "lucide-react";
import FilterDropdown from "./FilterDropdown";

type CampaignActionsProps = {
  isLoading: boolean;
  search: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRefresh: () => void;
  onFilter: (filter: { [key: string]: number }) => void;
};

const CampaignActions: React.FC<CampaignActionsProps> = ({
  isLoading,
  search,
  onSearchChange,
  onRefresh,
  onFilter,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0">
      <div className="flex space-x-2">
        <Button onClick={onRefresh}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
          Refresh
        </Button>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Campaign
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Export
        </Button>
      </div>
      <div className="flex space-x-2">
        <Input
          placeholder="Search..."
          value={search}
          onChange={onSearchChange}
          className="max-w-sm"
        />
        <FilterDropdown onApplyFilter={onFilter} />
      </div>
    </div>
  );
};

export default CampaignActions;