<template>
  <div class="container mx-auto py-8 lg:py-16">
    <div class="mx-auto max-w-sm rounded-lg bg-white p-8">
      <h2 class="mb-6 text-2xl font-bold">Sign in</h2>
      <form @submit="submit">
        <div class="mb-4">
          <IftaLabel class="mb-2">
            <label for="username">Login</label>
            <InputText id="username" v-model="username" name="username" autocomplete="username" title="Login" fluid />
          </IftaLabel>
          <div v-if="errors.username" class="text-sm text-error">{{ errors.username }}</div>
        </div>

        <div class="mb-4">
          <IftaLabel class="mb-2">
            <label for="password">Password</label>
            <InputText
              id="password"
              v-model="password"
              type="password"
              name="password"
              autocomplete="password"
              title="Password"
              fluid
            />
          </IftaLabel>
          <div v-if="errors.password" class="text-sm text-error">{{ errors.password }}</div>
        </div>

        <div class="grid gap-2">
          <Button type="submit" label="Sign in" :loading="isSubmitting" />
          <Button as="router-link" :to="{ name: SignUpRouteName }" label="Sign up" link />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/entities/auth';
import { SignInValidationSchema } from '@/pages/sign-in/model/validation.ts';
import { ProfileDashboardRouteName, SignUpRouteName } from '@/shared/router/routes';
import { toTypedSchema } from '@vee-validate/zod';
import Button from 'primevue/button';
import IftaLabel from 'primevue/iftalabel';
import InputText from 'primevue/inputtext';
import { useToast } from 'primevue/usetoast';
import { useField, useForm } from 'vee-validate';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();
const { login } = useAuthStore();
const { handleSubmit, isSubmitting, errors } = useForm({
  validationSchema: toTypedSchema(SignInValidationSchema),
});
const { value: username } = useField<string>('username');
const { value: password } = useField<string>('password');

const submit = handleSubmit(async (values) => {
  const { error, status } = await login(values.username, values.password);

  switch (status) {
    case 200:
      await router.push({ name: ProfileDashboardRouteName });
      toast.add({
        severity: 'success',
        summary: 'Login successful',
        detail: 'Lets go to the dashboard',
        life: 5000,
      });
      break;
    case 401:
      toast.add({
        severity: 'error',
        summary: 'Login failed',
        detail: 'Invalid login or password',
        life: 5000,
      });
      break;
    default:
      console.error(error);
      toast.add({
        severity: 'error',
        summary: 'Login failed',
        detail: 'Something went wrong while letting you in',
        life: 5000,
      });
  }
});
</script>
