<template>
  <Head>
    <title>{{ t('pages.sign-up.head.title') }}</title>
    <meta name="description" :content="t('pages.sign-up.head.description')" />
  </Head>
  <div class="container mx-auto py-8 lg:py-16">
    <div class="p-card mx-auto max-w-sm p-8">
      <h1 class="mb-6 text-2xl font-bold">{{ t('pages.sign-up.h1') }}</h1>
      <form @submit="submit">
        <div class="mb-4">
          <div class="p-iftalabel">
            <label for="email">{{ t('pages.sign-up.form.inputs.email.label') }}</label>
            <InputText id="email" v-model="email" name="email" fluid />
          </div>
          <ul v-if="errorBag.email" class="mt-2 ml-3 grid gap-1">
            <li v-for="error in errorBag.email" :key="error" class="text-sm text-error">{{ error }}</li>
          </ul>
        </div>

        <div class="mb-4">
          <div class="p-iftalabel">
            <label for="password">{{ t('pages.sign-up.form.inputs.password.label') }}</label>
            <InputText id="password" v-model="password" type="password" autocomplete="new-password" fluid />
          </div>
          <ul v-if="errorBag.password" class="mt-2 ml-3 grid gap-1">
            <li v-for="error in errorBag.password" :key="error" class="text-sm text-error">{{ error }}</li>
          </ul>
        </div>

        <div class="mb-12">
          <div class="p-iftalabel">
            <label for="confirm">{{ t('pages.sign-up.form.inputs.confirm.label') }}</label>
            <InputText id="confirm" v-model="confirm" type="password" autocomplete="new-password" fluid />
          </div>
          <ul v-if="errorBag.confirm" class="mt-2 ml-3 grid gap-1">
            <li v-for="error in errorBag.confirm" :key="error" class="text-sm text-error">{{ error }}</li>
          </ul>
        </div>

        <div class="grid gap-2">
          <Button type="submit" :label="t('pages.sign-up.form.buttons.submit')" :loading="isSubmitting" />
          <Button
            as="router-link"
            :to="{ name: SignInRouteName }"
            :label="t('pages.sign-up.form.buttons.sign-in')"
            link
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { signUp } from '@/entities/auth';
import messages from '@/pages/sign-up/i18n/messages.json';
import { SignUpValidationSchema } from '@/pages/sign-up/model/validation';
import { logError } from '@/shared/lib/log';
import { ProfileDashboardRouteName, SignInRouteName } from '@/shared/model/routes';
import { Head } from '@unhead/vue/components';
import { toTypedSchema } from '@vee-validate/zod';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { useToast } from 'primevue/usetoast';
import { useForm } from 'vee-validate';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { t } = useI18n({ messages });
const router = useRouter();
const toast = useToast();
const { defineField, handleSubmit, errorBag, isSubmitting, setErrors } = useForm({
  validationSchema: toTypedSchema(SignUpValidationSchema),
});
const [email] = defineField('email');
const [password] = defineField('password');
const [confirm] = defineField('confirm');

const submit = handleSubmit(async (values) => {
  const { error } = await signUp({
    body: { email: values.email, password: values.password },
    throwOnError: false,
  });

  if (!error) {
    toast.add({
      severity: 'success',
      summary: t('pages.sign-up.form.messages.success.message'),
      detail: t('pages.sign-up.form.messages.success.details'),
      life: 5000,
    });
    router.push({ name: ProfileDashboardRouteName });
    return;
  }

  if (typeof error === 'object') {
    if (error.code === 'SCHEMA_VALIDATION_ERROR') {
      setErrors(error.details);
      return;
    }

    if (error.code === 'UNIQUENESS_CONSTRAINT_ERROR') {
      toast.add({
        severity: 'error',
        summary: t('pages.sign-up.form.messages.error.409.message'),
        detail: t('pages.sign-up.form.messages.error.409.details', { fields: error.details.join(', ') }),
        life: 5000,
      });
      return;
    }
  }

  logError(error);
  toast.add({
    severity: 'error',
    summary: t('pages.sign-up.form.messages.error.500.message'),
    detail: t('pages.sign-up.form.messages.error.500.details'),
    life: 5000,
  });
});
</script>
