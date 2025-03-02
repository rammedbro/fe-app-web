<template>
  <div class="flex flex-col items-center gap-4 xl:flex-row xl:gap-8">
    <Form>
      <template #title>
        <div class="mb-4 flex items-center gap-4">
          <div class="flex h-4 w-4 items-center justify-center rounded-full bg-primary/30">
            <div class="h-2 w-2 rounded-full bg-primary" />
          </div>

          <div class="font-semibold">Pick - Up</div>
        </div>
      </template>
    </Form>

    <Button class="-mx-12 -my-8 h-16 w-16 drop-shadow-xl">
      <i class="pi pi-arrow-right-arrow-left rotate-90 text-2xl" />
    </Button>

    <Form>
      <template #title>
        <div class="mb-4 flex items-center gap-4">
          <div class="flex h-4 w-4 items-center justify-center rounded-full bg-primary/30">
            <div class="h-2 w-2 rounded-full bg-primary" />
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
