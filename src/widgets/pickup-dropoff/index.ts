import { default as PickupDropoffSkeleton } from './ui/PickupDropoffSkeleton.vue';

export const PickupDropoff = defineAsyncComponent({
  loader: () => import('./ui/PickupDropoff.vue'),
  loadingComponent: PickupDropoffSkeleton,
});
