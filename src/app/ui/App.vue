<script lang="ts" setup>
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';
</script>

<template>
<Header />

<main class="flex-1">
  <RouterView />
</main>

<Footer />
</template>
