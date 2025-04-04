import { useSet } from "react-use";
import { useSearchParams } from "next/navigation";

export const useSearchParamsSet = <QueryFilters extends {}>(
  searchParams: Map<keyof QueryFilters, string>,
  key: keyof QueryFilters
) => {
  return useSet(new Set<string>(searchParams.get(key)?.split(",") || []));
};
