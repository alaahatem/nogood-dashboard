import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CampaignAd } from '@/app/types/chart'; // Adjust the import path as necessary
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface CampaignTableProps {
  data: CampaignAd[];
  onSort: (column: string) => void;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

const CampaignTable: React.FC<CampaignTableProps> = ({ data, onSort, sortBy, sortOrder }) => {
  const renderSortIcon = (column: string) => {
    if (sortBy === column) {
      return sortOrder === 'asc' ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" />;
    }
    return <ArrowUpDown className="ml-2 h-4 w-4" />;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Button variant="ghost" onClick={() => onSort('ad_id')}>
              Ad ID {renderSortIcon('ad_id')}
            </Button>
          </TableHead>
          <TableHead>
            <Button variant="ghost" onClick={() => onSort('impressions')}>
              Impressions {renderSortIcon('impressions')}
            </Button>
          </TableHead>
          <TableHead>
            <Button variant="ghost" onClick={() => onSort('clicks')}>
              Clicks {renderSortIcon('clicks')}
            </Button>
          </TableHead>
          <TableHead>
            <Button variant="ghost" onClick={() => onSort('spent')}>
              Spent {renderSortIcon('spent')}
            </Button>
          </TableHead>
          <TableHead>
            <Button variant="ghost" onClick={() => onSort('total_conversion')}>
              Total Conversions {renderSortIcon('total_conversion')}
            </Button>
          </TableHead>
          <TableHead>
            <Button variant="ghost" onClick={() => onSort('approved_conversion')}>
              Approved Conversions {renderSortIcon('approved_conversion')}
            </Button>
          </TableHead>
          <TableHead>
            <Button variant="ghost" onClick={() => onSort('interest')}>
              Interests {renderSortIcon('interest')}
            </Button>
          </TableHead>
          <TableHead>
            <Button variant="ghost" onClick={() => onSort('start_date')}>
              Start Date {renderSortIcon('start_date')}
            </Button>
          </TableHead>
          <TableHead>
            <Button variant="ghost" onClick={() => onSort('end_date')}>
              End Date {renderSortIcon('end_date')}
            </Button>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((campaign) => (
          <TableRow key={campaign.ad_id}>
            <TableCell>{campaign.ad_id}</TableCell>
            <TableCell>{campaign.impressions}</TableCell>
            <TableCell>{campaign.clicks}</TableCell>
            <TableCell>{campaign.spent.toFixed(2)}</TableCell>
            <TableCell>{campaign.total_conversion}</TableCell>
            <TableCell>{campaign.approved_conversion}</TableCell>
            <TableCell>{campaign.interest}</TableCell>
            <TableCell>{new Date(campaign.start_date).toLocaleDateString()}</TableCell>
            <TableCell>{new Date(campaign.end_date).toLocaleDateString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CampaignTable;