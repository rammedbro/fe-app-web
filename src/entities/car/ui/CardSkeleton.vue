<template>
  <div class="block w-full max-w-[340px] rounded-lg bg-white p-3 md:p-6">
    <div class="mb-4 flex items-start justify-between gap-4">
      <div class="w-full">
        <Skeleton height="18px" class="mb-2" />
        <Skeleton height="12px" />
      </div>

      <Skeleton size="40px" />
    </div>
    <Skeleton height="160px" class="mb-4" />
    <div class="mb-6 grid grid-cols-3 gap-2">
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
    </div>
    <div class="mt-auto flex items-center justify-between gap-4">
      <Skeleton width="60%" height="30px" />
      <Skeleton width="40%" height="44px" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Skeleton from 'primevue/skeleton';
</script>
