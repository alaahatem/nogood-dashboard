"use client";

import { useState } from "react";
import CampaignTable from "./_components/CampaignTable";
import CampaignActions from "./_components/CampaignActions";
import Pagination from "./_components/Pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApi } from "@/app/hooks/useApi";
import { CampaignAd } from "@/app/types/chart";

const PortalPage = () => {
  const [filters, setFilters] = useState<{ [key: string]: number }>({});
  const [appliedFilters, setAppliedFilters] = useState<
    { key: string; operator: string; value: number }[]
  >([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortBy, setSortBy] = useState("ad_id");
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useApi<CampaignAd[]>({
    endpoint: '/campaigns',
    params: {
      ...filters,
      sortBy,
      sortOrder,
      page,
      limit: 10,
    },
  });

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleFilter = (newFilter: { [key: string]: number }) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilter }));

    const [key, value] = Object.entries(newFilter)[0];
    const [field, operator] = key.split("_");

    setAppliedFilters((prev) => [
      ...prev,
      { key: field, operator, value: value as number },
    ]);
  };

  const handleRemoveFilter = (filterKey: string) => {
    setAppliedFilters((prev) =>
      prev.filter((filter) => filter.key !== filterKey)
    );
    const updatedFilters = { ...filters };
    delete updatedFilters[`${filterKey}_gt`];
    delete updatedFilters[`${filterKey}_lt`];
    delete updatedFilters[`${filterKey}_eq`];
    setFilters(updatedFilters);
  };

  const handleRefresh = () => {
    setFilters({});
    setAppliedFilters([]);
    setSortOrder('asc');
    setSortBy("ad_id");
    setPage(1);
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Campaign Management Portal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CampaignActions
            isLoading={isLoading}
            onRefresh={handleRefresh}
            onFilter={handleFilter}
            appliedFilters={appliedFilters}
            onRemoveFilter={handleRemoveFilter}
          />
          {error && <div className="text-red-500 mb-4">Error: {error.message}</div>}
          <CampaignTable 
            data={data ?? []} 
            onSort={handleSort} 
            sortBy={sortBy} 
            sortOrder={sortOrder}
          />
          <Pagination page={page} onPageChange={setPage} />
        </CardContent>
      </Card>
    </div>
  );
};

export default PortalPage;