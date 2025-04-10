<template>
  <div class="flex h-[50vh] flex-col items-center justify-center text-center">
    <h1 class="text-4xl font-bold">Oops! Something went wrong 😢</h1>
    <p class="mt-2 text-lg">{{ errorMessage || 'An unexpected error occurred.' }}</p>
    <RouterLink :to="{ name: HomeRouteName }" class="mt-4 text-blue-600 underline">Go Back Home</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { HomeRouteName } from '@/shared/model/routes';

defineProps<{ errorMessage?: string }>();
</script>
