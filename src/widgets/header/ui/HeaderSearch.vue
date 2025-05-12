<template>
  <IconField>
    <InputIcon class="pi pi-search" />
    <InputText
      v-model="searchInput"
      placeholder="e.g. Audi A4 or BMW M5"
      class="w-full rounded-full"
      @keyup.enter="search"
    />
    <InputIcon v-if="searchInput" class="pi pi-times cursor-pointer" @click="clear" />
    <InputIcon v-else class="pi pi-sliders-h cursor-pointer" @click="search" />
  </IconField>
</template>

<script setup lang="ts">
import { CarListRouteName } from '@/shared/model/routes';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const searchInput = ref('');

function search() {
  router.push({
    name: CarListRouteName,
    query: {
      ...route.query,
      search: searchInput.value?.trim() || undefined,
    },
  });
}

function clear() {
  searchInput.value = '';
}
</script>
