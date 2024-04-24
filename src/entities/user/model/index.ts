import { defineStore } from 'pinia';

export interface User {
  uid: string;
  name: string | null;
  email: string | null;
}

export const useUserStore = defineStore('user', () => {
  const uid = ref<string | null>(null);
  const name = ref<string | null>(null);
  const email = ref<string | null>(null);

  function setUser(user: User) {
    uid.value = user.uid;
    name.value = user.name;
    email.value = user.email;
  }

  function unsetUser() {
    uid.value = null;
    name.value = null;
    email.value = null;
  }

  return {
    uid,
    name,
    email,
    setUser,
    unsetUser,
  };
});
