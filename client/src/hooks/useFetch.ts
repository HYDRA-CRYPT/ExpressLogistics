// src/hooks/useFetch.ts
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { api } from "../services/api";
import { Product, FetchOptions } from "@/types";

export function useFetch<T = unknown>({
  url,
  queryKey = ["data", url],
  enabled = true,
}: FetchOptions<T>): UseQueryResult<T, Error> {
  return useQuery<T, Error>({
    queryKey,
    queryFn: async () => {
      try {
        const res = await api.get<T>(url);
        return res.data;
      } catch (error: any) {
        throw new Error(
          error.response?.data?.message || error.message || "Fetch failed"
        );
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
    enabled,
  });
}
// This hook can be used to fetch data from an API endpoint using React Query and Axios.
// It allows you to specify the URL, query key, and whether the query should be enabled
// based on the component's state or props. The hook returns the query result, which includes
// the data, loading state, and error handling. The data is cached for 5 minutes and
// will not refetch when the window is focused, unless specified otherwise.
