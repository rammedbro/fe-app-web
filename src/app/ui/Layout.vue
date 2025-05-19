<template>
  <Head />
  <Header />
  <main class="relative flex-1">
    <Suspense>
      <RouterView :key="$route.path" />
      <template #loading>
        <div class="absolute inset-0 p-8">
          <div class="p-skeleton size-full" />
        </div>
      </template>
    </Suspense>
  </main>
  <Footer />
  <Toast />
</template>

<script lang="ts" setup>
import '@/app/providers/style';
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';
import Toast from 'primevue/toast';
import Head from './Head.vue';
</script>
