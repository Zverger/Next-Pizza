import { Api } from "@/shared/services/api-client";
import { MyParameters, UnpromiseReturnType } from "../types";
import { useEffect, useState } from "react";

export const useFetchApi = <
  Table extends keyof typeof Api,
  FN extends keyof (typeof Api)[Table],
  Params extends MyParameters<(typeof Api)[Table][FN]>
>(
  table: Table,
  apiFn: FN,
  params: Params
) => {
  const [items, setItems] = useState<UnpromiseReturnType<
    (typeof Api)[Table][FN]
  > | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchIngredients() {
      try {
        const items = await (Api[table][apiFn] as (...args: any[]) => any)(
          ...params
        );
        setItems(items);
      } catch (e: unknown) {
        e instanceof Error && setError(e);
      } finally {
        setLoading(false);
      }
    }

    fetchIngredients();

    return () => {
      setItems(null);
      setLoading(true);
      setError(null);
    };
  }, [table, apiFn]);

  return [items, loading, error] as const;
};
