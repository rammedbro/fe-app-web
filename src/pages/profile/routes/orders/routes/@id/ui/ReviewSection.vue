<template>
  <section
    id="review"
    v-intersection-observer.once="([e]: IntersectionObserverEntry[]) => e.isIntersecting && reviewsAsync.refetch()"
    class="p-card p-6"
  >
    <div class="mb-8 text-2xl font-bold">{{ title }}</div>

    <template v-if="reviewsAsync.isSuccess.value">
      <ReviewCard v-if="review" v-bind="review" />
      <ReviewForm v-else :car-id="carId" @success="reviewsAsync.refetch()" />
    </template>

    <template v-if="reviewsAsync.isPending.value">
      <ProgressSpinner />
    </template>

    <div v-if="reviewsAsync.isError.value" class="text-center">
      <p class="mb-4">{{ t('shared.messages.error.fetch') }}</p>
      <Button :label="t('shared.buttons.reload')" class="w-60" @click="reviewsAsync.refetch()" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { getReviewList, ReviewCard, ReviewForm } from '@/entities/review';
import { useAsync } from '@/shared/lib/async/useAsync';
import { vIntersectionObserver } from '@/shared/lib/dom';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
import { useI18n } from 'vue-i18n';

const props = defineProps<{ title: string; carId: number }>();
const { t } = useI18n();
const reviewsAsync = useAsync(
  async () => {
    const { data } = await getReviewList<true>({
      query: { carId: props.carId },
      withCredentials: true,
    });

    return data;
  },
  [],
  { immediate: false }
);
const review = computed(() => reviewsAsync.data.value[0]);
</script>
