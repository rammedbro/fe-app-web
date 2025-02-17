<template>
  <div class="container py-8 lg:py-16 mx-auto">
    <div class="bg-white rounded-lg max-w-sm p-8 mx-auto">
      <h2 class="text-2xl font-bold mb-6">Sign up</h2>
      <form @submit="submit">
        <div class="mb-4">
          <IftaLabel>
            <label for="email">Email</label>
            <InputText id="email" v-model="email" name="email" title="Email" fluid />
          </IftaLabel>
          <ul v-if="errorBag.email" class="grid gap-1 mt-2 ml-3">
            <li v-for="error in errorBag.email" :key="error" class="text-sm text-error">{{ error }}</li>
          </ul>
        </div>

        <div class="mb-4">
          <IftaLabel>
            <label for="password">Password</label>
            <InputText id="password" v-model="password" type="password" title="Password" fluid />
          </IftaLabel>
          <ul v-if="errorBag.password" class="grid gap-1 mt-2 ml-3">
            <li v-for="error in errorBag.password" :key="error" class="text-sm text-error">{{ error }}</li>
          </ul>
        </div>

        <div class="mb-12">
          <IftaLabel>
            <label for="confirm">Confirm</label>
            <InputText id="confirm" v-model="confirm" type="password" title="Confirm" fluid />
          </IftaLabel>
          <ul v-if="errorBag.confirm" class="grid gap-1 mt-2 ml-3">
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
import Button from 'primevue/button';
import IftaLabel from 'primevue/iftalabel';
import InputText from 'primevue/inputtext';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import { ProfileDashboardRouteName, SignInRouteName } from '@/shared/router/routes';
import { signUp } from '@/shared/api';
import { SignUpValidationSchema } from '@/pages/sign-up/model/validation';
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';

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

  console.error(error);
  toast.add({
    severity: 'error',
    summary: 'Account creation failed',
    detail: 'Something went wrong while creating your brand new account',
    life: 5000,
  });
});
</script>
