// src/hooks/useMutate.ts
import {
  useMutation,
  type UseMutationResult,
  type UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { api } from "../services/api";

interface MutateVariables<TData = unknown> {
  url: string;
  data?: TData;
  headers?: Record<string, string>; // <-- Add this
  method?: "POST" | "PUT" | "PATCH" | "DELETE";
}

interface MutateOptions<TData, TVariables, TError = Error>
  extends Partial<
    UseMutationOptions<TData, TError, MutateVariables<TVariables>>
  > {
  invalidateQueries?: string[] | string; // Query keys to invalidate after success
}

export function useMutate<
  TData = unknown,
  TVariables = unknown,
  TError = Error
>({
  invalidateQueries,
  onSuccess,
  ...mutationOptions
}: MutateOptions<TData, TVariables, TError> = {}): UseMutationResult<
  TData,
  TError,
  MutateVariables<TVariables>
> {
  const queryClient = useQueryClient();

  return useMutation<TData, TError, MutateVariables<TVariables>>({
    mutationFn: async ({ url, data, headers, method = "POST" }) => {
      let response;

      switch (method) {
        case "POST":
          response = await api.post<TData>(url, data, { headers });
          break;
        case "PUT":
          response = await api.put<TData>(url, data, { headers });
          break;
        case "PATCH":
          response = await api.patch<TData>(url, data, { headers });
          break;
        case "DELETE":
          response = await api.delete<TData>(url, { headers });
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }

      return response.data;
    },

    onSuccess: (data, variables, context) => {
      // Invalidate queries to refetch fresh data
      if (invalidateQueries) {
        const queries = Array.isArray(invalidateQueries)
          ? invalidateQueries
          : [invalidateQueries];
        queries.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey: [queryKey] });
        });
      }

      // Call custom onSuccess if provided
      onSuccess?.(data, variables, context);
    },
    ...mutationOptions,
  });
}
