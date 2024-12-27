<script lang="ts" setup>
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
</script>

<template>
<Header />

<main class="flex-1">
  <RouterView />
</main>

<Footer />
</template>
