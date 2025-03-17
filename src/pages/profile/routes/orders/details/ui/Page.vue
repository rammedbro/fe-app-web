<template>
  <div v-if="order" class="rounded-lg bg-white p-6">
    <div class="mb-4 text-xl font-bold">Order #{{ order.id }}</div>
    <p>Design is not implemented yet but hey here's your order's number :D</p>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onBeforeRouteUpdate } from 'vue-router';
import { useOrderStore } from '../model/store';

const orderStore = useOrderStore();
const { order } = storeToRefs(orderStore);

onBeforeRouteUpdate((to) => orderStore.fetchOrder(Number(to.params.id)));
</script>
