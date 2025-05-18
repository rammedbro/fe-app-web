<template>
  <div class="container mx-auto py-8 lg:py-16">
    <div class="p-card mx-auto max-w-sm p-8">
      <h2 class="mb-6 text-2xl font-bold">{{ t('pages.sign-in.title') }}</h2>
      <form @submit="submit">
        <div class="mb-4">
          <div class="p-iftalabel mb-2">
            <label for="username">{{ t('pages.sign-in.form.inputs.login.label') }}</label>
            <InputText id="username" v-model="username" name="username" autocomplete="username" fluid />
          </div>
          <div v-if="errors.username" class="text-sm text-error">{{ errors.username }}</div>
        </div>

        <div class="mb-4">
          <div class="p-iftalabel mb-2">
            <label for="password">{{ t('pages.sign-in.form.inputs.password.label') }}</label>
            <InputText
              id="password"
              v-model="password"
              type="password"
              name="password"
              autocomplete="current-password"
              fluid
            />
          </div>
          <div v-if="errors.password" class="text-sm text-error">{{ errors.password }}</div>
        </div>

        <div class="grid gap-2">
          <Button type="submit" :label="t('pages.sign-in.form.buttons.submit')" :loading="isSubmitting" />
          <Button
            as="router-link"
            :to="{ name: SignUpRouteName }"
            :label="t('pages.sign-in.form.buttons.sign-up')"
            link
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/entities/auth';
import messages from '@/pages/sign-in/i18n/messages.json';
import { SignInValidationSchema } from '@/pages/sign-in/model/validation';
import { logError } from '@/shared/lib/log';
import { ProfileDashboardRouteName, SignUpRouteName } from '@/shared/model/routes';
import { toTypedSchema } from '@vee-validate/zod';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { useToast } from 'primevue/usetoast';
import { useForm } from 'vee-validate';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

const { t } = useI18n({ messages });
const router = useRouter();
const route = useRoute();
const toast = useToast();
const { login } = useAuthStore();
const { defineField, handleSubmit, isSubmitting, errors } = useForm({
  validationSchema: toTypedSchema(SignInValidationSchema),
});
const [username] = defineField('username');
const [password] = defineField('password');

const submit = handleSubmit(async (values) => {
  const { error, status } = await login(values.username, values.password);

  if (!error) {
    toast.add({
      severity: 'success',
      summary: t('pages.sign-in.form.messages.success.message'),
      detail: t('pages.sign-in.form.messages.success.details'),
      life: 5000,
    });
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : route.redirectedFrom;
    router.push(redirect || { name: ProfileDashboardRouteName });
    return;
  }

  if (status === 401) {
    toast.add({
      severity: 'error',
      summary: t('pages.sign-in.form.messages.error.401.message'),
      detail: t('pages.sign-in.form.messages.error.401.details'),
      life: 5000,
    });
    return;
  }

  logError(error);
  toast.add({
    severity: 'error',
    summary: t('pages.sign-in.form.messages.error.500.message'),
    detail: t('pages.sign-in.form.messages.error.500.details'),
    life: 5000,
  });
});
</script>
