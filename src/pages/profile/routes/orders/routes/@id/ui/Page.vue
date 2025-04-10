<template>
  <div v-if="order" class="p-card mx-auto p-6 lg:container">
    <div class="mb-4 text-xl font-bold">Order #{{ order.id }}</div>
    <p>Design is not implemented yet but hey here's your order's number :D</p>
  </div>
</template>

<script setup lang="ts">
import { useOrderStore } from '@/pages/profile/routes/orders/routes/@id/model/store';
import { storeToRefs } from 'pinia';
import { onBeforeRouteUpdate } from 'vue-router';

const orderStore = useOrderStore();
const { order } = storeToRefs(orderStore);

onBeforeRouteUpdate((to) => orderStore.fetchOrder(Number(to.params.id)));
</script>
