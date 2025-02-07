<template>
  <header class="bg-white py-6 lg:py-10">
    <div class="container flex flex-wrap lg:items-center gap-4 mx-auto">
      <RouterLink to="/" class="text-3xl font-bold text-primary uppercase">Morent</RouterLink>

      <HeaderProfile class="lg:order-3 ml-auto" />

      <IconField class="w-full lg:max-w-[500px] lg:order-2 lg:ml-16">
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
  router.push({ name: 'car-list', query: { search: searchInput.value } });
}
</script>
