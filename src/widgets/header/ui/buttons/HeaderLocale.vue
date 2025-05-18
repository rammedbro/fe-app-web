<template>
  <Button rounded icon="pi pi-globe" :title="t('header.buttons.locale.tooltip')" @click="popoverRef?.toggle" />
  <Popover ref="popoverRef" class="z-(--z-sticky)!">
    <Listbox v-model="locale" :options="Object.values(locales)" class="border-0 shadow-none" />
  </Popover>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/entities/settings';
import { locales } from '@/shared/model/locales';
import messages from '@/widgets/header/i18n/messages.json';
import { storeToRefs } from 'pinia';
import Button from 'primevue/button';
import Listbox from 'primevue/listbox';
import type { PopoverMethods } from 'primevue/popover';
import Popover from 'primevue/popover';
import { useI18n } from 'vue-i18n';

const { t } = useI18n({ messages });
const settingsStore = useSettingsStore();
const { locale } = storeToRefs(settingsStore);
const popoverRef = ref<PopoverMethods>();

onMounted(() => {
  window.addEventListener('scroll', hidePopover);
});

onUnmounted(() => {
  window.removeEventListener('scroll', hidePopover);
});

function hidePopover() {
  popoverRef.value?.hide();
}
</script>
