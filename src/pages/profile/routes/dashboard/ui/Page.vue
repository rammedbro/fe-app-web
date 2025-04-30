<template>
  <div class="mx-auto flex flex-col gap-4 lg:container lg:flex-row lg:gap-8">
    <CurrentOrderSection class="p-card p-4 xl:p-8" />

    <div class="grid gap-4 lg:w-[450px] lg:gap-9">
      <TopRentalSection class="p-card p-4 xl:p-8" />
      <RecentRentalSection class="p-card p-4 xl:p-8" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CurrentOrderSection from './CurrentOrderSection.vue';
import RecentRentalSection from './RecentRentalSection.vue';
import TopRentalSection from './TopRentalSection.vue';
</script>
