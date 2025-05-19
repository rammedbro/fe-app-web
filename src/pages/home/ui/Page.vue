<template>
  <Head>
    <title>{{ t('pages.home.head.title') }}</title>
    <meta name="description" :content="t('pages.home.head.description')" />
  </Head>
  <div class="container mx-auto py-8">
    <Carousel
      :value="banners"
      :num-visible="2"
      :show-navigators="false"
      :show-indicators="false"
      :autoplay-interval="0"
      circular
      :responsive-options="[{ breakpoint: `${defaultBreakpoints.xl - 1}px`, numVisible: 1, numScroll: 1 }]"
      content-class="-mx-4"
      container-class="overflow-hidden"
      class="mb-8"
    >
      <template #item="{ data: item, index }">
        <div class="relative mx-4 overflow-hidden rounded-xl">
          <img :src="item.img" :alt="`benner-${index}`" />
          <div class="absolute inset-y-0 right-0 left-0 p-4 text-white md:p-6">
            <template v-if="breakpoints.xl.value">
              <div class="mb-4 text-3xl font-semibold">{{ item.title }}</div>
              <p class="mb-8 w-3/4 text-xl font-medium">{{ item.desc }}</p>
              <Button as="router-link" :to="{ name: item.route }" :label="item.button" size="large" class="w-2/4" />
            </template>
            <div
              v-else
              class="flex h-full w-full items-center justify-center text-lg font-semibold md:text-4xl lg:text-5xl"
            >
              {{ item.title }}
            </div>
          </div>
        </div>
      </template>
    </Carousel>

    <PickupDropoff v-if="breakpoints.md.value" class="mb-8" />

    <CarCarousel :title="t('pages.home.sections.popular-cars.title')" :query="{ sortBy: ['rating'], limit: 10 }" />

    <CarCarousel :title="t('pages.home.sections.cheap-cars.title')" :query="{ sortBy: ['price'], limit: 10 }" />
  </div>
</template>

<script setup lang="ts">
import { CarCarousel } from '@/entities/car';
import messages from '@/pages/home/i18n/messages.json';
import { banner1ImgUrl, banner2ImgUrl } from '@/shared/assets/images';
import { defaultBreakpoints } from '@/shared/model/breakpoints';
import { CarListRouteName } from '@/shared/model/routes';
import { PickupDropoff } from '@/widgets/pickup-dropoff';
import { Head } from '@unhead/vue/components';
import { useBreakpoints } from '@vueuse/core';
import Button from 'primevue/button';
import Carousel from 'primevue/carousel';
import { useI18n } from 'vue-i18n';

const { t } = useI18n({ messages });
const breakpoints = useBreakpoints(defaultBreakpoints);
const banners = computed(() => [
  {
    title: t('pages.home.sections.banners.items[0].title'),
    desc: t('pages.home.sections.banners.items[0].desc'),
    button: t('pages.home.sections.banners.items[0].button'),
    route: CarListRouteName,
    img: banner1ImgUrl,
  },
  {
    title: t('pages.home.sections.banners.items[1].title'),
    desc: t('pages.home.sections.banners.items[1].desc'),
    button: t('pages.home.sections.banners.items[1].button'),
    route: CarListRouteName,
    img: banner2ImgUrl,
  },
]);
</script>
