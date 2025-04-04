import { useState } from "react";

import { useSearchParams } from "next/navigation";

type NamedFromTo<N extends string = ""> = {
  [K in
    | `${N}${N extends "" ? "f" : "F"}rom`
    | `${N}${N extends "" ? "t" : "T"}o`]: number;
};

export const useSearchParamsFromTo = <
  QueryFilters extends {},
  Name extends string = ""
>(
  searchParams: Map<keyof QueryFilters, string>,
  keyFrom: keyof QueryFilters,
  ketTo: keyof QueryFilters,
  defaultValues: [number, number] = [0, 0],
  name?: Name
) => {
  const from = name ? `${name}From` : "from";
  const to = name ? `${name}To` : "to";
  return useState<NamedFromTo<Name>>({
    [from]: Number(searchParams.get(keyFrom)) || defaultValues[0],
    [to]: Number(searchParams.get(ketTo)) || defaultValues[1],
  } as unknown as NamedFromTo<Name>);
};
