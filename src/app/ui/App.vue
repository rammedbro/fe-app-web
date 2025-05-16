<template>
  <Header />
  <main class="flex-1">
    <RouterView :key="$route.path" />
  </main>
  <Footer />
  <Toast />
</template>

<script lang="ts" setup>
import '@/app/providers/style';
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';
import Toast from 'primevue/toast';
</script>
