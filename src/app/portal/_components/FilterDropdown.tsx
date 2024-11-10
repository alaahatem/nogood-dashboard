import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from 'lucide-react';

type FilterDropdownProps = {
  onApplyFilter: (filter: { [key: string]: number }) => void;
};

const FilterDropdown: React.FC<FilterDropdownProps> = ({ onApplyFilter }) => {
  const [key, setKey] = useState<string>('');
  const [operator, setOperator] = useState<string>('');
  const [value, setValue] = useState<string>('');

  const handleApplyFilter = () => {
    if (key && operator && value) {
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue)) {
        let filterKey = key.toLowerCase();
        if (operator === 'gt') {
          filterKey += '_gt';
        } else if (operator === 'lt') {
          filterKey += '_lt';
        }
        onApplyFilter({ [filterKey]: numericValue });
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filter Campaigns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="p-2">
          <Select onValueChange={setKey}>
            <SelectTrigger>
              <SelectValue placeholder="Select field" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Spent">Spent</SelectItem>
              <SelectItem value="Impressions">Impressions</SelectItem>
              <SelectItem value="Interest">Interest</SelectItem>
              <SelectItem value="Clicks">Clicks</SelectItem>
              <SelectItem value="Approved_Conversion">Approved Conversion</SelectItem>
              <SelectItem value="Total_Conversion">Total Conversion</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="p-2">
          <Select onValueChange={setOperator}>
            <SelectTrigger>
              <SelectValue placeholder="Select operator" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gt">Greater than</SelectItem>
              <SelectItem value="lt">Less than</SelectItem>
              <SelectItem value="eq">Equal to</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="p-2">
          <Input
            type="number"
            placeholder="Enter value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <DropdownMenuItem onSelect={handleApplyFilter}>
          Apply Filter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;