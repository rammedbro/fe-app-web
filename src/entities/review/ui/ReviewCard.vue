<template>
  <div class="flex gap-4">
    <Avatar :image="user.avatar ?? undefined" circle size="large" />

    <div class="flex-1">
      <div class="mb-3 flex items-center justify-between">
        <div>
          <div class="mb-1 text-xl font-bold">{{ title }}</div>
          <div class="text-sm text-surface-400">{{ user.name }} {{ user.lastname }}</div>
        </div>

        <div>
          <div class="mb-2 text-right text-sm text-surface-400">
            {{ new Date(createdAt).toLocaleDateString() }}
          </div>
          <Rating :model-value="rating" readonly />
        </div>
      </div>

      <p>{{ content }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Review } from '@/entities/review/model/types';
import Avatar from 'primevue/avatar';
import Rating from 'primevue/rating';

defineProps<Review>();
</script>
