<template>
  <div class="p-iconfield">
    <span class="p-inputicon pi pi-search" />
    <InputText
      v-model="searchInput"
      :placeholder="t('header.search.placeholder')"
      class="w-full rounded-full"
      @keyup.enter="search"
    />
    <span v-if="searchInput" class="p-inputicon pi pi-times cursor-pointer" @click="clear" />
    <span v-else class="p-inputicon pi pi-sliders-h cursor-pointer" @click="search" />
  </div>
</template>

<script setup lang="ts">
import { CarListRouteName } from '@/shared/model/routes';
import messages from '@/widgets/header/i18n/messages.json';
import InputText from 'primevue/inputtext';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

const { t } = useI18n({ messages });
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
