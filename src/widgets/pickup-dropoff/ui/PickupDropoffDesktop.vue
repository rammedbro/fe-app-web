<template>
<div class="flex flex-col xl:flex-row items-center gap-4 xl:gap-8">
  <Form>
    <template #title>
      <div class="flex items-center gap-4 mb-4">
        <div class="flex items-center justify-center bg-primary/30 w-4 h-4 rounded-full">
          <div class="bg-primary w-2 h-2 rounded-full" />
        </div>

        <div class="font-semibold">Pick - Up</div>
      </div>
    </template>
  </Form>

  <Button class="w-16 h-16 drop-shadow-xl -my-8 -mx-12">
    <i class="pi pi-arrow-right-arrow-left text-2xl rotate-90" />
  </Button>

  <Form>
    <template #title>
      <div class="flex items-center gap-4 mb-4">
        <div class="flex items-center justify-center bg-primary/30 w-4 h-4 rounded-full">
          <div class="bg-primary w-2 h-2 rounded-full" />
        </div>

        <div class="font-semibold">Drop - Off</div>
      </div>
    </template>
  </Form>
</div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Form from './PickupDropoffForm.vue';
</script>
