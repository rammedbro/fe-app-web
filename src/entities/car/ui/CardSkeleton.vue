<template>
  <div class="block bg-white rounded-lg w-full max-w-[340px] p-3 md:p-6">
    <div class="flex items-start justify-between gap-4 mb-4">
      <div class="w-full">
        <Skeleton height="18px" class="mb-2" />
        <Skeleton height="12px" />
      </div>

      <Skeleton size="40px" />
    </div>
    <Skeleton height="160px" class="mb-4" />
    <div class="grid grid-cols-3 gap-2 mb-6">
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
    </div>
    <div class="flex items-center justify-between gap-4 mt-auto">
      <Skeleton width="60%" height="30px" />
      <Skeleton width="40%" height="44px" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Skeleton from 'primevue/skeleton';
</script>
