<template>
  <form @submit="submit">
    <div class="mb-4 flex flex-col gap-6 md:flex-row">
      <div class="grid gap-2 md:order-2">
        <div class="text-lg font-semibold">{{ t('entities.review.form.inputs.rating.label') }}</div>
        <Rating
          v-model="rating"
          name="rating"
          on-icon="pi pi-star-fill text-4xl size-10"
          off-icon="pi pi-star text-4xl size-10"
        />
        <div v-if="errors.rating" class="text-sm text-error">{{ errors.rating }}</div>
      </div>

      <div class="grid flex-1 gap-2">
        <div class="text-lg font-semibold">{{ t('entities.review.form.inputs.title.label') }}</div>
        <InputText
          v-model="title"
          name="title"
          variant="filled"
          :placeholder="t('entities.review.form.inputs.title.placeholder')"
          class="w-full"
        />
        <div v-if="errors.title" class="text-sm text-error">{{ errors.title }}</div>
      </div>
    </div>

    <div class="mb-8 grid gap-2">
      <div class="text-lg font-semibold">{{ t('entities.review.form.inputs.text.label') }}</div>
      <Textarea
        v-model="content"
        name="content"
        variant="filled"
        :placeholder="t('entities.review.form.inputs.text.placeholder')"
        rows="5"
        class="w-full"
      />
      <div v-if="errors.content" class="text-sm text-error">{{ errors.content }}</div>
    </div>

    <Button
      type="submit"
      :label="t('entities.review.form.buttons.submit')"
      :loading="isSubmitting"
      size="large"
      class="w-full"
    />
  </form>
</template>

<script setup lang="ts">
import { addReview } from '@/entities/review/api';
import messages from '@/entities/review/i18n/messages.json';
import { AddReviewValidationSchema } from '@/entities/review/model/validation';
import { logError } from '@/shared/lib/log';
import { toTypedSchema } from '@vee-validate/zod';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Rating from 'primevue/rating';
import Textarea from 'primevue/textarea';
import { useToast } from 'primevue/usetoast';
import { useForm } from 'vee-validate';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  carId: number;
}>();
const emit = defineEmits<{
  (e: 'success', id: number): void;
}>();
const { t } = useI18n({ messages });
const toast = useToast();
const { defineField, handleSubmit, isSubmitting, errors, resetForm, setErrors } = useForm({
  validationSchema: toTypedSchema(AddReviewValidationSchema),
});
const [title] = defineField('title');
const [content] = defineField('content');
const [rating] = defineField('rating');

const submit = handleSubmit(async (values) => {
  const { data, error } = await addReview({
    body: { carId: props.carId, ...values },
    withCredentials: true,
    throwOnError: false,
  });

  if (typeof data === 'number') {
    toast.add({
      severity: 'success',
      summary: t('entities.review.form.messages.success.message'),
      detail: t('entities.review.form.messages.success.details'),
      life: 5000,
    });

    resetForm();
    emit('success', data);
    return;
  }

  if (typeof error === 'object') {
    if (error.code === 'SCHEMA_VALIDATION_ERROR') {
      setErrors(error.details);
      return;
    }
  }

  logError(error);
  toast.add({
    severity: 'error',
    summary: t('entities.review.form.messages.error.500.message'),
    detail: t('entities.review.form.messages.error.500.details'),
    life: 5000,
  });
});
</script>
