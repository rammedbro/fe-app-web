import { defineStore } from 'pinia';

export interface User {
  uid: string;
  name: string | null;
  email: string | null;
}

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
