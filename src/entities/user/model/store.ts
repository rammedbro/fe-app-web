import type { Notification } from '@/entities/notification';
import { getUser } from '@/entities/user/api';
import type { User } from '@/entities/user/model/types';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const user = ref<User>();
  const notifications = ref<Notification[]>([]);

  async function fetchUser() {
    const { data } = await getUser({ withCredentials: true, throwOnError: true });

    user.value = data;
    notifications.value = user.value.notifications.concat();
  }

  return {
    user,
    notifications,
    fetchUser,
  };
});
