import { useFetchApi } from "./useFetchApi";
import { Api } from "@/shared/services/api-client";

import { ConditionalKeysOf } from "../types";

type GetAllType = {
  getAll: () => {};
};

export const useFetchAllItems = <
  T extends ConditionalKeysOf<typeof Api, GetAllType>
>(
  table: T
) => {
  const [items, loading, error] = useFetchApi(table, "getAll", [] as any);
  return [items || [], loading, error] as const;
};
