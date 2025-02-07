<template>
  <div class="container py-8 lg:py-16 mx-auto">
    <div class="bg-white rounded-lg max-w-sm p-8 mx-auto">
      <h2 class="text-2xl font-bold mb-6">Sign in</h2>
      <Form class="flex flex-col" @submit="onAuthSubmit">
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

        <Button type="submit" label="Sign In" />
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import Form from '@primevue/forms/form';
import Button from 'primevue/button';
import IftaLabel from 'primevue/iftalabel';
import InputText from 'primevue/inputtext';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/entities/user';
import { getUser, signIn } from '@/shared/api';

const router = useRouter();
const { setUser } = useUserStore();
const login = ref<string | null>(null);
const password = ref<string | null>(null);

async function onAuthSubmit() {
  if (!login.value || !password.value) {
    alert('Please provide a login and password!');
  }

  try {
    await signIn(login.value!, password.value!);
    const { data } = await getUser<true>({ path: { id: 1 } });

    setUser(data);

    await router.push({ name: 'profile-dashboard' });
  } catch (e) {
    console.error(e);
  }
}
</script>
