import { useState } from "react";

type FetchableState = {
  error: Error | null | unknown;

  fetchesSet: Set<string>;
};

type SetState<State> = {
  (
    partial: State | Partial<State> | ((state: State) => State | Partial<State>)
  ): void;
  (state: State | ((state: State) => State)): void;
};

export type OnFetchType = {
  onStart?: VoidFunction;
  onError?: (e: Error) => void;
  onFinal?: VoidFunction;
};

export async function fetchApi<State, DTO>(
  set: SetState<State | FetchableState>,
  get: () => State & FetchableState,
  api: () => Promise<DTO>,
  rawDataSetter: (data: DTO) => State | Partial<State>,
  onFetch?: OnFetchType & {
    fetchId?: string;
  }
) {
  try {
    onFetch?.onStart?.();
    onFetch?.fetchId && get().fetchesSet.add(onFetch.fetchId);

    const data = await api();
    set(rawDataSetter(data));
  } catch (error) {
    onFetch?.onError?.(error as Error);
    set({ error });
  } finally {
    onFetch?.fetchId && get().fetchesSet.delete(onFetch.fetchId);
    onFetch?.onFinal?.();
  }
}

export function fetchStoreApi<State, DTO>(
  set: SetState<State | FetchableState>,
  get: () => State & FetchableState,
  api: () => Promise<DTO>,
  rawDataSetter: (data: DTO) => State | Partial<State>,
  onFinal?: VoidFunction
) {
  const fetchId = crypto.randomUUID();
  console.log(fetchId);
  fetchApi(set, get, api, rawDataSetter, { fetchId, onFinal });
  return fetchId;
}
