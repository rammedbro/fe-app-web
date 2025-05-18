<template>
  <Button
    icon="pi pi-bell"
    rounded
    :title="t('header.buttons.notifications.tooltip')"
    variant="outlined"
    @click="togglePopover"
  >
    <template v-if="badge > 0" #icon>
      <OverlayBadge>
        <i class="pi pi-bell" />
      </OverlayBadge>
    </template>
  </Button>

  <Popover ref="popoverRef" class="z-(--z-sticky)! w-[320px]">
    <div class="mb-4 font-bold">{{ t('header.buttons.notifications.popover.title') }}</div>
    <NotificationList :items="notifications" class="max-h-[320px]" />
  </Popover>
</template>

<script setup lang="ts">
import { NotificationList } from '@/entities/notification';
import { userSocket, useUserStore } from '@/entities/user';
import messages from '@/widgets/header/i18n/messages.json';
import { storeToRefs } from 'pinia';
import Button from 'primevue/button';
import OverlayBadge from 'primevue/overlaybadge';
import Popover, { type PopoverMethods } from 'primevue/popover';
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';

const { t } = useI18n({ messages });
const toast = useToast();
const userStore = useUserStore();
const { notifications } = storeToRefs(userStore);
const popoverRef = ref<PopoverMethods | null>(null);
const badge = ref<number>(0);

userSocket.on('addNotification', (notification) => {
  notifications.value.push(notification);
  toast.add({ severity: 'info', summary: t('header.buttons.notifications.toast.title'), life: 5000 });
  badge.value += 1;
});

onMounted(() => {
  window.addEventListener('scroll', hidePopover);
});

onUnmounted(() => {
  window.removeEventListener('scroll', hidePopover);
});

function togglePopover(evt: Event) {
  badge.value = 0;
  popoverRef.value?.toggle(evt);
}

function hidePopover() {
  popoverRef.value?.hide();
}
</script>
