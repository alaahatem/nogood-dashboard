// src/components/ChartCheckboxDropdown.tsx
"use client";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type ChartCheckboxDropdownProps = {
  keys: string[];
  selectedKeys: string[];
  onChange: (key: string) => void;
};

export default function ChartCheckboxDropdown({
  keys,
  selectedKeys,
  onChange,
}: ChartCheckboxDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Select Metrics</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {keys.map((key) => (
          <DropdownMenuItem key={key} className="flex items-center space-x-2">
            <Checkbox
              id={key}
              checked={selectedKeys.includes(key)}
              onCheckedChange={() => onChange(key)}
            />
            <label htmlFor={key} className="text-sm font-medium cursor-pointer">
              {key}
            </label>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
