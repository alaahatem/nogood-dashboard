import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";
import FilterDropdown from "./FilterDropdown";

type CampaignActionsProps = {
  isLoading: boolean;
  onRefresh: () => void;
  onFilter: (filter: { [key: string]: number }) => void;
};

const CampaignActions: React.FC<CampaignActionsProps> = ({
  isLoading,
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
      </div>
      <div className="flex space-x-2">

        <FilterDropdown onApplyFilter={onFilter} />
      </div>
    </div>
  );
};

export default CampaignActions;