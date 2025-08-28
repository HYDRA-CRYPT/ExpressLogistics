// src/hooks/useFetch.ts
import {
  useQuery,
  type UseQueryResult,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { api } from "../services/api";

interface FetchOptions<T>
  extends Partial<UseQueryOptions<T, Error, T, readonly unknown[]>> {
  url: string;
}

export function useFetch<T = unknown>({
  url,
  queryKey,
  enabled = true,
}: FetchOptions<T>): UseQueryResult<T, Error> {
  return useQuery<T, Error, T>({
    queryKey: queryKey || ["data", url],
    queryFn: async () => {
      const res = await api.get<T>(url);
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
    enabled,
  });
}
