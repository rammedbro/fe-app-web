<template>
<Header />

<main class="flex-1">
  <RouterView :key="$route.path" />
</main>

<Footer />
</template>

<script lang="ts" setup>
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
</script>
