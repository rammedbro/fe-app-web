<template>
  <div class="container mx-auto py-8 lg:py-16">
    <div class="p-card mx-auto max-w-sm p-8">
      <h2 class="mb-6 text-2xl font-bold">Sign up</h2>
      <form @submit="submit">
        <div class="mb-4">
          <div class="p-iftalabel">
            <label for="email">Email</label>
            <InputText id="email" v-model="email" name="email" title="Email" fluid />
          </div>
          <ul v-if="errorBag.email" class="mt-2 ml-3 grid gap-1">
            <li v-for="error in errorBag.email" :key="error" class="text-sm text-error">{{ error }}</li>
          </ul>
        </div>

        <div class="mb-4">
          <div class="p-iftalabel">
            <label for="password">Password</label>
            <InputText
              id="password"
              v-model="password"
              type="password"
              autocomplete="new-password"
              title="Password"
              fluid
            />
          </div>
          <ul v-if="errorBag.password" class="mt-2 ml-3 grid gap-1">
            <li v-for="error in errorBag.password" :key="error" class="text-sm text-error">{{ error }}</li>
          </ul>
        </div>

        <div class="mb-12">
          <div class="p-iftalabel">
            <label for="confirm">Confirm</label>
            <InputText
              id="confirm"
              v-model="confirm"
              type="password"
              autocomplete="new-password"
              title="Confirm"
              fluid
            />
          </div>
          <ul v-if="errorBag.confirm" class="mt-2 ml-3 grid gap-1">
            <li v-for="error in errorBag.confirm" :key="error" class="text-sm text-error">{{ error }}</li>
          </ul>
        </div>

        <div class="grid gap-2">
          <Button type="submit" label="Sign up" :loading="isSubmitting" />
          <Button as="router-link" :to="{ name: SignInRouteName }" label="Sign in" link />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { signUp } from '@/entities/auth';
import { SignUpValidationSchema } from '@/pages/sign-up/model/validation';
import { logError } from '@/shared/lib/log';
import { ProfileDashboardRouteName, SignInRouteName } from '@/shared/model/routes';
import { toTypedSchema } from '@vee-validate/zod';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { useToast } from 'primevue/usetoast';
import { useField, useForm } from 'vee-validate';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();
const { handleSubmit, errorBag, isSubmitting, setErrors } = useForm({
  validationSchema: toTypedSchema(SignUpValidationSchema),
});
const { value: email } = useField<string>('email');
const { value: password } = useField<string>('password');
const { value: confirm } = useField<string>('confirm');

const submit = handleSubmit(async (values) => {
  const { error } = await signUp({
    body: { email: values.email, password: values.password },
    throwOnError: false,
  });

  if (!error) {
    toast.add({
      severity: 'success',
      summary: 'Account creation succeed',
      detail: 'Try to sign in to it right now',
      life: 5000,
    });
    await router.push({ name: ProfileDashboardRouteName });
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
        summary: 'Account creation failed',
        detail: `User with such unique fields as ${error.details.join(', ')} already exists`,
        life: 5000,
      });
      return;
    }
  }

  logError(error);
  toast.add({
    severity: 'error',
    summary: 'Account creation failed',
    detail: 'Something went wrong while creating your brand new account',
    life: 5000,
  });
});
</script>
