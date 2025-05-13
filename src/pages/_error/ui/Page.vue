<template>
  <div class="flex h-[50vh] flex-col items-center justify-center text-center">
    <h1 class="text-4xl font-bold">Oops! {{ status }} 😢</h1>
    <p class="mt-2 text-lg">{{ msg }}</p>
    <RouterLink :to="{ name: HomeRouteName }" class="mt-4 text-blue-600 underline">Go Back Home</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { HomeRouteName } from '@/shared/model/routes';

const props = defineProps<{ status: number }>();
const msg = props.status === 404 ? "This page doesn't exist." : 'An unexpected error occurred.';
</script>
