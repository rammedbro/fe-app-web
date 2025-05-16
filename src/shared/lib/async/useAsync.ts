import { ref, shallowRef, type Ref, type ShallowRef } from 'vue';

interface UseAsyncStateReturn<Data, Args> {
  data: ShallowRef<Data>;
  isSuccess: Ref<boolean>;
  isPending: Ref<boolean>;
  isError: Ref<boolean>;
  error: Ref<Error | null>;
  refetch: (...args: Args[]) => Promise<Data>;
}

interface UseAsyncStateOptions<Data> {
  immediate?: boolean;
  onSuccess?: (data: Data) => void;
  onError?: (e: Error | null) => void;
  resetOnRefetch?: boolean;
  throwOnError?: boolean;
}

export function useAsync<Data, Args>(
  promise: (...args: Args[]) => Promise<Data>,
  initialState: Data,
  options: UseAsyncStateOptions<Data> = {}
): UseAsyncStateReturn<Data, Args> {
  const { immediate = true, resetOnRefetch = false, throwOnError = true, onSuccess, onError } = options;
  const data = shallowRef(initialState);
  const isSuccess = ref(false);
  const isPending = ref(false);
  const error = ref<Error | null>(null);
  const isError = computed(() => Boolean(error.value));
  const execute = async (...args: Args[]): Promise<Data> => {
    isSuccess.value = false;
    isPending.value = true;
    error.value = null;

    if (resetOnRefetch) {
      data.value = initialState;
    }

    try {
      const response = await promise(...args);

      data.value = response;
      isSuccess.value = true;

      if (onSuccess) {
        onSuccess(response);
      }

      return response;
    } catch (e) {
      error.value = e instanceof Error ? e : typeof e === 'string' ? new Error(e) : null;
      isSuccess.value = false;

      if (onError) {
        onError(error.value);

        return data.value;
      }

      if (throwOnError) {
        throw e;
      } else {
        return data.value;
      }
    } finally {
      isPending.value = false;
    }
  };

  if (immediate) {
    execute();
  }

  return { data, isSuccess, isPending, isError, error, refetch: execute };
}
