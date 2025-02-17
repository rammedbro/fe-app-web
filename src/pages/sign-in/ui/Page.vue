<template>
  <div class="container py-8 lg:py-16 mx-auto">
    <div class="bg-white rounded-lg max-w-sm p-8 mx-auto">
      <h2 class="text-2xl font-bold mb-6">Sign in</h2>
      <form class="flex flex-col" @submit.prevent="submit">
        <IftaLabel>
          <label for="login">Login</label>
          <InputText id="login" v-model="login" name="login" title="Login" fluid class="mb-6" />
        </IftaLabel>
        <IftaLabel>
          <label for="password">Password</label>
          <InputText
            id="password"
            v-model="password"
            type="password"
            name="password"
            title="Password"
            fluid
            class="mb-6"
          />
        </IftaLabel>

        <div class="grid gap-2">
          <Button type="submit" label="Sign in" :loading="isLoading" />
          <Button as="router-link" :to="{ name: SignUpRouteName }" label="Sign up" link />
          <Message v-if="error" severity="error" variant="simple">{{ error }}</Message>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import IftaLabel from 'primevue/iftalabel';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/entities/user';
import { getUser, signIn } from '@/shared/api';
import { ProfileDashboardRouteName, SignUpRouteName } from '@/shared/router/routes';

const router = useRouter();
const { setUser } = useUserStore();
const login = ref<string | null>(null);
const password = ref<string | null>(null);
const isLoading = ref(false);
const error = ref<string | null>(null);

function validate() {
  if (!login.value) {
    error.value = 'Please provide login';
    return false;
  }

  if (!password.value) {
    error.value = 'Please provide password';
    return false;
  }

  return true;
}

async function submit() {
  try {
    error.value = null;
    if (!validate()) return;

    isLoading.value = true;
    await signIn(login.value!, password.value!);
    const { data } = await getUser<true>({ path: { id: 1 } });

    setUser(data);

    await router.push({ name: ProfileDashboardRouteName });
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    }
    error.value = 'Something went wrong! Its probably our fault, we are already working on it.';
  } finally {
    isLoading.value = false;
  }
}
</script>
