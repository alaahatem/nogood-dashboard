import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type CampaignTableProps = {
  data: any[];
  onSort: (column: string) => void;
};

const CampaignTable: React.FC<CampaignTableProps> = ({ data, onSort }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {data.length > 0 &&
              Object.keys(data[0]).map((key) => (
                <TableHead key={key} className="font-semibold text-sm">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-full justify-start">
                        {key.replace(/_/g, " ")}
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onSort(key)}>Sort</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableHead>
              ))}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {Object.values(row).map((value, cellIndex) => (
                <TableCell key={cellIndex}>{value as React.ReactNode}</TableCell>
              ))}
              <TableCell>
                <Button variant="ghost" size="sm">Edit</Button>
                <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CampaignTable;
