import { getUser } from '@/shared/api';
import { defineStore } from 'pinia';
import type { User } from './types';

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);

  async function fetchUser() {
    const { data } = await getUser({ throwOnError: true });
    user.value = data;
  }

  return {
    user,
    fetchUser,
  };
});
