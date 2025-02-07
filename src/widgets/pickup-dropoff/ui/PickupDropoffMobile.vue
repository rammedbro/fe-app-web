<template>
  <div class="flex flex-col">
    <Form layout="vertical" class="pb-12">
      <template #title>
        <div class="flex justify-between gap-4 mb-6">
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

    <Button class="w-16 h-16 drop-shadow-xl self-center -mt-10">
      <i class="pi pi-arrow-right-arrow-left text-2xl rotate-90" />
    </Button>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import RadioButton from 'primevue/radiobutton';
import Form from './PickupDropoffForm.vue';

const currentForm = ref('pick-up');
</script>
