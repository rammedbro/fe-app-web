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
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';
import { ProgressBar } from '@/widgets/progress-bar';
import Toast from 'primevue/toast';
</script>
