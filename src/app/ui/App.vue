<template>
  <Header />
  <ProgressBar />
  <main class="flex-1">
    <RouterView :key="$route.path" />
  </main>
  <Footer />
  <Toast />
</template>

<script lang="ts" setup>
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import Toast from 'primevue/toast';
import { ProgressBar } from '@/widgets/progress-bar';
</script>
