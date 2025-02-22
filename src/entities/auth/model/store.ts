import type { Session } from './types';
import { defineStore } from 'pinia';
import { getSession, signIn, signOut } from '@/shared/api';

export const useAuthStore = defineStore('auth', () => {
  const session = ref<Session | null>(null);
  const isAuthenticated = computed(() => session.value !== null);
  const isLoaded = ref(false);

  async function fetchSession() {
    const { data, error, status } = await getSession<false>({
      withCredentials: true,
      throwOnError: false,
    });

    if (data) {
      session.value = data.session;
    }

    isLoaded.value = true;

    return { error, status };
  }

  async function login(username: string, password: string) {
    const { data, error, status } = await signIn<false>({
      body: { username, password },
      throwOnError: false,
    });

    if (data) {
      session.value = data.session;
    }

    isLoaded.value = true;

    return { error, status };
  }

  async function logout() {
    const { data, error, status } = await signOut<false>({ throwOnError: false });

    if (data) {
      session.value = data.session;
    }

    isLoaded.value = true;

    return { error, status };
  }

  return {
    session,
    isAuthenticated,
    isLoaded,
    fetchSession,
    login,
    logout,
  };
});
