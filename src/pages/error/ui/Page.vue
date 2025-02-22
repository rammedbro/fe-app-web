<template>
  <div class="h-[50vh] flex flex-col items-center justify-center text-center">
    <h1 class="text-4xl font-bold">Oops! Something went wrong 😢</h1>
    <p class="text-lg mt-2">{{ errorMessage || 'An unexpected error occurred.' }}</p>
    <router-link :to="{ name: HomeRouteName }" class="mt-4 text-blue-600 underline">Go Back Home</router-link>
  </div>
</template>

<script setup lang="ts">
import { HomeRouteName } from '@/shared/router/routes.ts';

defineProps<{ errorMessage?: string }>();
</script>
