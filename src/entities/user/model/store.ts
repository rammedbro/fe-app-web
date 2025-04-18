import { useAuthStore } from '@/entities/auth';
import { addFavorite, delFavorite } from '@/entities/favorite';
import { getUser } from '@/entities/user/api';
import type { User } from '@/entities/user/model/types';
import { SignInRouteName } from '@/shared/model/routes';
import { defineStore, storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';

export const useUserStore = defineStore('user', () => {
  const user = ref<User>();
  const favorites = ref(new Set<number>());
  const notifications = computed(() => user.value?.notifications || []);
  const { isAuthenticated } = storeToRefs(useAuthStore());
  const route = useRoute();
  const router = useRouter();

  async function fetchUser() {
    const { data } = await getUser({ withCredentials: true, throwOnError: true });

    user.value = data;
    favorites.value = new Set(user.value.favorites.map((item) => item.carId));
  }

  async function toggleFavorite(carId: number) {
    if (!isAuthenticated.value) {
      await router.push({ name: SignInRouteName, query: { redirect: route.fullPath } });
      return;
    }

    if (favorites.value.has(carId)) {
      await delFavorite({ body: { carId } });
      favorites.value.delete(carId);
    } else {
      await addFavorite({ body: { carId } });
      favorites.value.add(carId);
    }
  }

  function $reset() {
    user.value = undefined;
    favorites.value.clear();
  }

  return {
    user,
    favorites,
    notifications,
    fetchUser,
    toggleFavorite,
    $reset,
  };
});
