"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import CampaignTable from "./_components/CampaignTable";
import CampaignActions from "./_components/CampaignActions";
import Pagination from "./_components/Pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PortalPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState<{ [key: string]: number }>({});
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("ad_id");
  const [page, setPage] = useState(1);

  const fetchCampaigns = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://${process.env.NEXT_PUBLIC_SERVICE_HOST}/campaigns`,
        {
          params: {
            ...filters,
            sortBy,
            sortOrder,
            page,
            limit: 10,
          },
        }
      );
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch campaigns", error);
    } finally {
      setIsLoading(false);
    }
  }, [filters, sortBy, sortOrder, page]);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  const handleSort = (column: string) => {
    setSortBy(column);
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleFilter = (newFilter: { [key: string]: number }) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilter }));
  };

  const handleRefresh = () => {
    setFilters({});
    setSortOrder("asc");
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
          />
          <CampaignTable data={data} onSort={handleSort} />
          <Pagination page={page} onPageChange={setPage} />
        </CardContent>
      </Card>
    </div>
  );
};

export default PortalPage;
