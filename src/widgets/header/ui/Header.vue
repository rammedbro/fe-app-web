<template>
  <header class="bg-white">
    <div class="container mx-auto flex flex-wrap gap-4 py-6 lg:items-center lg:py-10">
      <RouterLink :to="{ name: HomeRouteName }" class="text-3xl font-bold text-primary uppercase">Morent</RouterLink>

      <HeaderProfile class="ml-auto lg:order-3" />

      <IconField class="w-full lg:order-2 lg:ml-16 lg:max-w-[500px]">
        <InputIcon class="pi pi-search" />
        <InputText
          v-model="searchInput"
          placeholder="Search something here"
          class="w-full rounded-full"
          @keyup.enter="search"
        />
        <InputIcon class="pi pi-sliders-h cursor-pointer" @click="search" />
      </IconField>
    </div>
  </header>
</template>

<script setup lang="ts">
import { CarListRouteName, HomeRouteName } from '@/shared/router/routes';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import { useRoute, useRouter } from 'vue-router';
import HeaderProfile from './HeaderProfile.vue';

const router = useRouter();
const route = useRoute();
const searchInput = computed({
  get: () => route.query.search as string | undefined,
  set: (value: string | undefined) => router.push({ path: route.path, query: { search: value } }),
});

function search() {
  router.push({ name: CarListRouteName, query: { search: searchInput.value } });
}
</script>
