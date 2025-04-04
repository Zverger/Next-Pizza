type FetchableState = {
  loading: boolean;
  error: Error | null | unknown;
  totalFetches: number;
};

type SetState<State> = {
  (
    partial: State | Partial<State> | ((state: State) => State | Partial<State>)
  ): void;
  (state: State | ((state: State) => State)): void;
};

export async function fetchStoreApi<State, DTO>(
  set: SetState<State | FetchableState>,
  get: () => State & FetchableState,
  api: Promise<DTO>,
  rawDataSetter: (data: DTO) => State | Partial<State>
) {
  try {
    set({ loading: true, error: null, totalFetches: get().totalFetches + 1 });
    const data = await api;

    set(rawDataSetter(data));
  } catch (error) {
    console.error(error);
    set({ error });
  } finally {
    const totalFetches = get().totalFetches - 1;
    if (get().totalFetches > 0) {
      set({ totalFetches });
    } else {
      set({ loading: false, totalFetches: 0 });
    }
  }
}
