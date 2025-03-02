<template>
  <div class="rounded-lg bg-white p-8">
    <div class="flex justify-between">
      <label>Dark Mode</label>
      <ToggleSwitch v-model="darkMode">
        <template #handle="{ checked }">
          <i class="pi" :class="{ 'pi-sun': !checked, 'pi-moon': checked }" />
        </template>
      </ToggleSwitch>
    </div>
  </div>
</template>

<script setup lang="ts">
import ToggleSwitch from 'primevue/toggleswitch';

const darkMode = ref(false);
</script>
