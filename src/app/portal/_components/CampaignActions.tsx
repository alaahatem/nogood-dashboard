import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw, X } from "lucide-react";
import FilterDropdown from "./FilterDropdown";

type CampaignActionsProps = {
  isLoading: boolean;
  onRefresh: () => void;
  onFilter: (filter: { [key: string]: number }) => void;
  appliedFilters: { key: string; operator: string; value: number }[];
  onRemoveFilter: (key: string) => void;
};

const CampaignActions: React.FC<CampaignActionsProps> = ({
  isLoading,
  onRefresh,
  onFilter,
  appliedFilters,
  onRemoveFilter,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0">
      <div className="flex space-x-2">
        <Button onClick={onRefresh}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          Refresh
        </Button>
      </div>
      <div className="flex space-x-2 items-center">
        <FilterDropdown onApplyFilter={onFilter} />
        {/* Display applied filters */}
        {appliedFilters.map((filter, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-200 text-gray-800 rounded px-2 py-1 text-sm space-x-1"
          >
            <span>{`${filter.key} ${filter.operator} ${filter.value}`}</span>
            <button onClick={() => onRemoveFilter(filter.key)}>
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignActions;
