import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { SERVICE_HOST } from '@/lib/constants';

interface ApiOptions<T> {
  endpoint: string;
  params?: Record<string, string | number | boolean | undefined>;
  initialData?: T;
}

export function useApi<T>({ endpoint, params = {}, initialData }: ApiOptions<T>) {
  const [data, setData] = useState<T | null>(initialData ?? null);
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
        const error = err as Error | AxiosError;
        setError(error instanceof Error ? error : new Error('An error occurred'));
        console.error(`Failed to fetch data from ${endpoint}`, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint, JSON.stringify(params)]);

  return { data, isLoading, error };
}