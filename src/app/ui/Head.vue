<template>
  <Head>
    <title>Morent — Affordable & Reliable Car Rental Service</title>
    <meta
      name="description"
      content="Rent a car quickly and easily with Morent. Affordable prices, flexible plans, and a wide selection of vehicles for any trip."
    />
    <meta name="author" content="Ramil Sharipov | rammedbro@yandex.ru" />

    <meta property="og:type" content="website" />
    <meta property="og:title" content="Morent — Affordable & Reliable Car Rental Service" />
    <meta
      property="og:description"
      content="Rent a car easily with Morent. Great prices, flexible rentals, and a wide vehicle selection."
    />
    <!-- <meta property="og:image" content="https://morent.fun/og-image.jpg" /> -->
    <meta property="og:url" content="https://morent.fun" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Morent — Affordable & Reliable Car Rental Service" />
    <meta name="twitter:description" content="Fast and flexible car rentals made easy. Drive with Morent." />
    <!-- <meta name="twitter:image" content="https://morent.fun/twitter-card.jpg" /> -->

    <link rel="canonical" href="https://morent.fun/" />
  </Head>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/entities/settings';
import { useHead } from '@unhead/vue';
import { Head } from '@unhead/vue/components';
import { storeToRefs } from 'pinia';

const settingsStore = useSettingsStore();
const { darkMode, locale } = storeToRefs(settingsStore);

useHead({
  titleTemplate: '%s | Morent',
  htmlAttrs: {
    lang: locale,
  },
  bodyAttrs: {
    class: {
      dark: darkMode,
    },
  },
});
</script>
