<template>
  <ProgressBar v-if="isVisible" mode="indeterminate" class="h-1" />
</template>

<script setup lang="ts">
import { useProgressBarStore } from '@/widgets/progress-bar/model/store';
import { storeToRefs } from 'pinia';
import ProgressBar from 'primevue/progressbar';

const { isVisible } = storeToRefs(useProgressBarStore());
</script>
