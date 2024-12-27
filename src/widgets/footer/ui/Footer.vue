<template>
<footer class="bg-white py-8 lg:py-16">
  <div class="container mx-auto">
    <div class="flex flex-wrap justify-between gap-8">
      <div class="max-w-72">
        <RouterLink to="/" class="block text-3xl font-bold text-primary uppercase mb-4">Morent</RouterLink>
        <p class="text-[#131313] text-opacity-60 font-medium">
          Our vision is to provide convenience and help increase your sales business.
        </p>
      </div>

      <div class="flex flex-wrap gap-8 lg:gap-28">
        <div v-for="[title, items] in menus" :key="title">
          <div class="text-lg font-semibold mb-6">{{ title }}</div>
          <ul class="text-[#131313] text-opacity-60 font-medium">
            <li v-for="item in items" :key="item" class="mb-4">
              <RouterLink to="#">{{ item }}</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <Divider class="my-8" />

    <div class="flex flex-col-reverse md:flex-row md:items-center gap-8">
      <div>{{ new Date().getFullYear() }} MORENT. All rights reserved</div>

      <div class="flex justify-between gap-4 md:gap-8 md:ml-auto">
        <RouterLink :to="routes.find(i => i.name === 'privacy-policy')!">Privacy & Policy</RouterLink>
        <RouterLink :to="routes.find(i => i.name === 'terms-of-service')!">
          Terms & Conditions
        </RouterLink>
      </div>
    </div>
  </div>
</footer>
</template>

<script setup lang="ts">
import Divider from 'primevue/divider';
import { useRouter } from 'vue-router';

const menus: [string, string[]][] = [
  ['About', ['How it works', 'Featured', 'Partnership', 'Business Relation']],
  ['Community', ['Events', 'Blog', 'Podcast', 'Invite a friend']],
  ['Socials', ['Discord', 'Instagram', 'Twitter', 'Facebook']],
];
const router = useRouter();
const routes = router.getRoutes();
</script>
