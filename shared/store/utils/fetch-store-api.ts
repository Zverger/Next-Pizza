type FetchableState = {
  error: Error | null | unknown;
  totalFetches: number;
  fetchesSet: Set<number>;
};

type SetState<State> = {
  (
    partial: State | Partial<State> | ((state: State) => State | Partial<State>)
  ): void;
  (state: State | ((state: State) => State)): void;
};

async function fetchApi<State, DTO>(
  set: SetState<State | FetchableState>,
  get: () => State & FetchableState,
  api: () => Promise<DTO>,
  rawDataSetter: (data: DTO) => State | Partial<State>,
  fetchId: number
) {
  try {
    set({ error: null, totalFetches: get().totalFetches + 1 });
    const data = await api();
    console.log(data);
    set(rawDataSetter(data));
  } catch (error) {
    console.error(error);
    set({ error });
  } finally {
    get().fetchesSet.delete(fetchId);
  }
}

export function fetchStoreApi<State, DTO>(
  set: SetState<State | FetchableState>,
  get: () => State & FetchableState,
  api: () => Promise<DTO>,
  rawDataSetter: (data: DTO) => State | Partial<State>
) {
  const fetchId = get().totalFetches;
  // set({ totalFetches: fetchId + 1})
  set({ totalFetches: get().fetchesSet.size ? fetchId + 1 : 0 });
  get().fetchesSet.add(fetchId);

  fetchApi(set, get, api, rawDataSetter, fetchId);
  return fetchId;
}
