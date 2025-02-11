import { shallowRef, ref, type Ref, type ShallowRef } from 'vue';

interface UseAsyncStateReturn<Data, Args> {
  state: ShallowRef<Data>;
  isReady: Ref<boolean>;
  isLoading: Ref<boolean>;
  error: Ref<Error | null>;
  execute: (...args: Args[]) => Promise<Data>;
}

interface UseAsyncStateOptions<Data> {
  immediate?: boolean;
  onSuccess?: (data: Data) => void;
  onError?: (e: Error | null) => void;
  resetOnExecute?: boolean;
}

export function useAsync<Data, Args>(
  promise: (...args: Args[]) => Promise<Data>,
  initialState: Data,
  options: UseAsyncStateOptions<Data> = {}
): UseAsyncStateReturn<Data, Args> {
  const { immediate = true, resetOnExecute = false, onSuccess, onError } = options;
  const state = shallowRef(initialState);
  const isReady = ref(false);
  const isLoading = ref(false);
  const error = ref<Error | null>(null);
  const execute = async (...args: Args[]): Promise<Data> => {
    isReady.value = false;
    isLoading.value = true;
    error.value = null;
    if (resetOnExecute) {
      state.value = initialState;
    }

    try {
      const data = await promise(...args);
      state.value = data;
      isReady.value = true;

      if (onSuccess) {
        onSuccess(data);
      }

      return data;
    } catch (e) {
      error.value = e instanceof Error ? e : typeof e === 'string' ? new Error(e) : null;

      if (onError) {
        onError(error.value);

        return state.value;
      } else {
        throw e;
      }
    } finally {
      isLoading.value = false;
    }
  };

  if (immediate) {
    execute();
  }

  return { state, isReady, isLoading, error, execute };
}
