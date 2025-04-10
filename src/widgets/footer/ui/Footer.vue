<template>
  <footer class="bg-white py-8 lg:py-16 dark:bg-surface-800 dark:text-surface-0">
    <div class="container mx-auto">
      <div class="flex flex-wrap justify-between gap-8">
        <div class="max-w-72">
          <RouterLink :to="{ name: HomeRouteName }" class="mb-4 block text-3xl font-bold text-primary uppercase">
            Morent
          </RouterLink>
          <p class="font-medium text-black/60 dark:text-white/60">
            Our vision is to provide convenience and help increase your sales business.
          </p>
        </div>

        <div class="flex flex-wrap gap-8 lg:gap-28">
          <div v-for="[title, items] in menus" :key="title">
            <div class="mb-6 text-lg font-semibold">{{ title }}</div>
            <ul class="font-medium text-black/60 dark:text-white/60">
              <li v-for="item in items" :key="item" class="mb-4">
                <RouterLink to="#">{{ item }}</RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="p-divider-horizontal my-8" />

      <div class="flex flex-col-reverse gap-8 md:flex-row md:items-center">
        <div>{{ new Date().getFullYear() }} MORENT. All rights reserved</div>

        <div class="flex justify-between gap-4 md:ml-auto md:gap-8">
          <RouterLink :to="{ name: PrivacyPolicyRouteName }">Privacy & Policy</RouterLink>
          <RouterLink :to="{ name: TermsOfServiceRouteName }">Terms & Conditions</RouterLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { HomeRouteName, PrivacyPolicyRouteName, TermsOfServiceRouteName } from '@/shared/model/routes';

const menus: [string, string[]][] = [
  ['About', ['How it works', 'Featured', 'Partnership', 'Business Relation']],
  ['Community', ['Events', 'Blog', 'Podcast', 'Invite a friend']],
  ['Socials', ['Discord', 'Instagram', 'Twitter', 'Facebook']],
];
</script>
