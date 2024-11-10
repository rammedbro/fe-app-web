<script setup lang="ts">
import type { PropType } from 'vue';

interface NavItem {
  text: string;
  href: string;
  icon?: string;
}

defineProps({
  item: {
    type: Object as PropType<NavItem>,
    required: true,
  },
});
</script>

<template>
  <RouterLink
    :to="item.href"
    active-class="!text-opacity-100"
    class="flex items-center gap-1 py-2 text-black text-opacity-30 hover:text-opacity-60"
  >
    <ion-icon v-if="item.icon" :name="item.icon" />
    {{ item.text }}
  </RouterLink>
</template>
