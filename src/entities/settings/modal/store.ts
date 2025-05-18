import { getBrowserDarkMode, getBrowserLang } from '@/shared/lib/browser';
import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { useI18n } from 'vue-i18n';

export const useSettingsStore = defineStore('settings', () => {
  const darkMode = useLocalStorage('dark', getBrowserDarkMode());
  const stickyHeader = useLocalStorage('stickyHeader', true);
  const locale = useLocalStorage('locale', getBrowserLang());
  const i18n = useI18n({ useScope: 'global' });

  watch(
    darkMode,
    (value) => {
      if (value) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    },
    { immediate: true }
  );

  watch(
    locale,
    (value) => {
      i18n.locale.value = value;
      document.head.setAttribute('lang', value);
    },
    { immediate: true }
  );

  function toggleDarkMode() {
    darkMode.value = !darkMode.value;
  }

  function toggleStickyHeader() {
    stickyHeader.value = !stickyHeader.value;
  }

  return { darkMode, stickyHeader, locale, toggleDarkMode, toggleStickyHeader };
});
