<template>
  <Button icon="pi pi-bell" rounded variant="outlined" @click="toggle">
    <template v-if="badge > 0" #icon>
      <OverlayBadge>
        <i class="pi pi-bell" />
      </OverlayBadge>
    </template>
  </Button>

  <Popover ref="popoverRef" class="z-(--z-sticky)! w-[320px]">
    <div class="mb-4 font-bold">Notifications</div>
    <NotificationList :items="notifications" class="max-h-[320px]" />
  </Popover>
</template>

<script setup lang="ts">
import { NotificationList } from '@/entities/notification';
import { userSocket, useUserStore } from '@/entities/user';
import { storeToRefs } from 'pinia';
import Button from 'primevue/button';
import OverlayBadge from 'primevue/overlaybadge';
import Popover, { type PopoverMethods } from 'primevue/popover';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const userStore = useUserStore();
const { notifications } = storeToRefs(userStore);
const popoverRef = ref<PopoverMethods | null>(null);
const badge = ref<number>(0);

userSocket.on('addNotification', (notification) => {
  notifications.value.push(notification);
  toast.add({ severity: 'info', summary: 'You have a new notification', life: 5000 });
  badge.value += 1;
});

onMounted(() => {
  window.addEventListener('scroll', hide);
});

onUnmounted(() => {
  window.removeEventListener('scroll', hide);
});

function toggle(evt: Event) {
  badge.value = 0;
  popoverRef.value?.toggle(evt);
}

function hide() {
  popoverRef.value?.hide();
}
</script>
