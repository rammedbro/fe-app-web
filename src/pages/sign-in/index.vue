<template>
<div class="container py-8 lg:py-16 mx-auto">
  <div
    v-if="user"
    class="bg-white rounded-lg min-w-sm p-8 mx-auto"
  >
    <h2 class="text-2xl font-bold mb-6">Account details</h2>
    <pre class="overflow-scroll mb-6">{{ user }}</pre>

    <Button label="Logout" @click="signOut().then(unsetUser)" />
  </div>
  <div
    v-else
    class="bg-white rounded-lg max-w-sm p-8 mx-auto"
  >
    <h2 class="text-2xl font-bold mb-6">Sign in</h2>
    <Form
      class="flex flex-col"
      @submit="onAuthSubmit"
    >
      <IftaLabel>
        <label for="login">Login</label>
        <InputText
          id="login"
          v-model="login"
          name="login"
          title="Login"
          fluid
          class="mb-6"
        />
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

      <Button type="submit" label="Login" />
    </Form>
  </div>
</div>
</template>

<script setup lang="ts">
import Form from '@primevue/forms/form';
import { storeToRefs } from 'pinia';
import Button from 'primevue/button';
import IftaLabel from 'primevue/iftalabel';
import InputText from 'primevue/inputtext';
import { useUserStore } from '@/entities/user';
import { getUser, signIn, signOut } from '@/shared/api';
const { setUser, unsetUser } = useUserStore();
const { user } = storeToRefs(useUserStore());
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
  } catch (e) {
    console.error(e);
  }
}
</script>
