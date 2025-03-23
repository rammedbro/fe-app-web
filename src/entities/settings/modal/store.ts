import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', () => {
  const darkMode = useLocalStorage('dark', false);

  watch(
    darkMode,
    (value) => {
      if (value) {
        document.body.classList.toggle('dark');
      } else {
        document.body.classList.remove('dark');
      }
    },
    { immediate: true }
  );

  return { darkMode };
});
