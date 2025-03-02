import { useCarStore } from '@/entities/car';
import { useProgressBarStore } from '@/widgets/progress-bar';
import { useToast } from 'primevue/usetoast';
import type { NavigationGuard } from 'vue-router';

export const beforeEnter: NavigationGuard = async (to, _, next) => {
  const carStore = useCarStore();
  const progressBarStore = useProgressBarStore();
  const toast = useToast();

  try {
    progressBarStore.show();
    await carStore.getCar(Number(to.params.id));
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
    toast.add({
      severity: 'error',
      summary: 'Fetch error',
      detail: 'Something went wrong while fetching data',
    });
  } finally {
    progressBarStore.hide();
    next();
  }
};
