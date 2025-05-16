import { bulkFavorite, type BulkFavoritePayload, getFavoriteList } from '@/entities/favorite/api';
import { useAsync } from '@/shared/lib/async/useAsync';
import { logError } from '@/shared/lib/log';
import debounce from 'lodash/debounce';
import { defineStore } from 'pinia';

export const useFavoriteStore = defineStore('favorite', () => {
  const favoritesId = ref(new Set<number>([]));
  const lastStableFavoritesId = ref(new Set<number>([]));
  const pendingFavorites = new Map<number, keyof BulkFavoritePayload>();
  const debouncedFlushFavorites = debounce(flushFavorites, 750);
  const {
    refetch: fetchFavorites,
    data,
    isSuccess,
    isPending,
    isError,
  } = useAsync(
    async () => {
      const { data } = await getFavoriteList<true>({
        query: {
          sortBy: ['createdAt'],
          sortDir: 'desc',
        },
        withCredentials: true,
      });

      favoritesId.value = new Set(data.map((item) => item.carId));

      return data;
    },
    [],
    {
      immediate: false,
      onError: logError,
    }
  );

  watch(favoritesId, () => {
    if (!pendingFavorites.size) {
      lastStableFavoritesId.value = new Set(favoritesId.value);
    }
  });

  async function toggleFavorite(carId: number) {
    const isPending = pendingFavorites.delete(carId);

    if (isFavorite(carId)) {
      if (!isPending) {
        pendingFavorites.set(carId, 'del');
      }

      favoritesId.value.delete(carId);
    } else {
      if (!isPending) {
        pendingFavorites.set(carId, 'add');
      }

      favoritesId.value.add(carId);
    }

    debouncedFlushFavorites();
  }

  async function flushFavorites() {
    if (!pendingFavorites.size) {
      return;
    }

    const payload: Required<BulkFavoritePayload> = { add: [], del: [] };

    for (const [id, action] of pendingFavorites.entries()) {
      if (action === 'add') {
        payload.add.push(id);
      } else {
        payload.del.push(id);
      }
    }

    const { error } = await bulkFavorite<false>({
      body: payload,
      throwOnError: false,
    });

    if (error) {
      favoritesId.value = new Set(lastStableFavoritesId.value);
      return;
    }

    pendingFavorites.clear();
    fetchFavorites();
  }

  function isFavorite(carId: number) {
    return favoritesId.value.has(carId);
  }

  return { fetchFavorites, data, isSuccess, isPending, isError, toggleFavorite, isFavorite };
});
