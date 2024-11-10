import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
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
import { Filter, Plus } from 'lucide-react';

type FilterDropdownProps = {
  onApplyFilter: (filter: { [key: string]: number }) => void;
};

const FilterDropdown: React.FC<FilterDropdownProps> = ({ onApplyFilter }) => {
  const [key, setKey] = useState<string>('');
  const [operator, setOperator] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const resetForm = () => {
    setKey('');
    setOperator('');
    setValue('');
  };

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
        setIsOpen(false);
        resetForm();
      }
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 p-4">
        <DropdownMenuLabel className="text-lg font-semibold mb-2">Filter Campaigns</DropdownMenuLabel>
        <DropdownMenuSeparator className="mb-4" />
        <div className="space-y-4">
          <Select value={key} onValueChange={setKey}>
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
          <Select value={operator} onValueChange={setOperator}>
            <SelectTrigger>
              <SelectValue placeholder="Select operator" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gt">Greater than</SelectItem>
              <SelectItem value="lt">Less than</SelectItem>
              <SelectItem value="eq">Equal to</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="number"
            placeholder="Enter value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button 
            onClick={handleApplyFilter} 
            className="w-full"
            disabled={!key || !operator || !value}
          >
            <Plus className="mr-2 h-4 w-4" /> Apply Filter
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;