import { defineStore } from 'pinia';

export const useProgressBarStore = defineStore('progressBar', () => {
  const isVisible = ref(false);

  function show() {
    isVisible.value = true;
  }

  function hide() {
    isVisible.value = false;
  }

  return {
    isVisible,
    show,
    hide,
  };
});
