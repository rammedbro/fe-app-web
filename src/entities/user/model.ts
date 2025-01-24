import { defineStore } from 'pinia';
import type { User } from '@/shared/model';

export type { User };
export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);

  function setUser(payload: User) {
    user.value = payload;
  }

  function unsetUser() {
    user.value = null;
  }

  return {
    user,
    setUser,
    unsetUser,
  };
});
