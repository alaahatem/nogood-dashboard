import { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVICE_HOST } from '@/lib/constants';

interface ApiOptions {
  endpoint: string;
  params?: Record<string, any>;
  initialData?: any;
}

export function useApi<T>({ endpoint, params = {}, initialData = null }: ApiOptions) {
  const [data, setData] = useState<T | null>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<T>(`https://${SERVICE_HOST}${endpoint}`, { params });
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
        console.error(`Failed to fetch data from ${endpoint}`, err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint, JSON.stringify(params)]);

  return { data, isLoading, error };
}