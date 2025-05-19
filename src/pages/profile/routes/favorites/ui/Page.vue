<template>
  <Head>
    <title>{{ t('pages.profile/favorites.head.title') }}</title>
    <meta name="description" :content="t('pages.profile/favorites.head.description')" />
  </Head>
  <div class="mx-auto lg:container">
    <h1 class="mb-12 text-3xl font-bold">{{ t('pages.profile/favorites.h1') }}</h1>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      <template v-if="favorites.isSuccess.value">
        <template v-if="favorites.data.value.length">
          <CarCard v-for="item in favorites.data.value" :key="item.car.id" v-bind="item.car" />
        </template>
        <div v-else class="col-span-full text-center">
          <p class="mb-4">{{ t('pages.profile/favorites.list.slots.empty.text') }}</p>
          <Button
            as="router-link"
            :to="{ name: CarListRouteName }"
            :label="t('pages.profile/favorites.list.slots.empty.button')"
            class="w-60"
          />
        </div>
      </template>

      <template v-if="favorites.isPending.value">
        <CarCardSkeleton v-for="n in 10" v-if="favorites.isPending" :key="n" />
      </template>

      <div v-if="favorites.isError.value" class="col-span-full text-center">
        <p class="mb-4">{{ t('shared.messages.error.fetch') }}</p>
        <Button :label="t('shared.buttons.reload')" class="w-60" @click="favoriteStore.fetchFavorites()" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CarCard, CarCardSkeleton } from '@/entities/car';
import { useFavoriteStore } from '@/entities/favorite';
import messages from '@/pages/profile/routes/favorites/i18n/messages.json';
import { CarListRouteName } from '@/shared/model/routes';
import { Head } from '@unhead/vue/components';
import { storeToRefs } from 'pinia';
import Button from 'primevue/button';
import { useI18n } from 'vue-i18n';

const { t } = useI18n({ messages });
const favoriteStore = useFavoriteStore();
const favorites = storeToRefs(favoriteStore);
</script>
