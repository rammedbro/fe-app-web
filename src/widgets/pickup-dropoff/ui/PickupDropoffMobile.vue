<template>
  <div class="flex flex-col">
    <Form layout="vertical" class="pb-12">
      <template #title>
        <div class="mb-6 flex justify-between gap-4">
          <label class="flex items-center font-semibold">
            <RadioButton v-model="currentForm" value="pick-up" class="mr-2" />
            Pick - Up
          </label>

          <label class="flex items-center font-semibold">
            Drop - Off
            <RadioButton v-model="currentForm" value="drop-off" class="ml-2" />
          </label>
        </div>
      </template>
    </Form>

    <Button class="-mt-10 h-16 w-16 self-center drop-shadow-xl">
      <i class="pi pi-arrow-right-arrow-left rotate-90 text-2xl" />
    </Button>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import RadioButton from 'primevue/radiobutton';
import Form from './PickupDropoffForm.vue';

const currentForm = ref('pick-up');
</script>
