<script setup lang="ts">
import {
  auth,
  signIgn,
  signOut,
  onAuthStateChanged,
} from '@/app/providers/firebase';
import { useUserStore } from '@/entities/user';

const { setUser, unsetUser } = useUserStore();
const login = ref<string | null>(null);
const password = ref<string | null>(null);
const details = ref<string | null>(null);

function onAuthSubmit() {
  if (login.value && password.value) {
    signIgn(login.value, password.value)
      .then(({ user: { displayName, email, uid } }) =>
        setUser({
          name: displayName,
          email,
          uid,
        }))
      .catch(() => alert('Invalid credentials!'));
  } else {
    alert('Please provide a login and password!');
  }
}

onAuthStateChanged(auth, user => {
  details.value = user
    ? JSON.stringify(user, null, 2)
    : null;
});
</script>

<template>
  <section>
    <h2>Auth</h2>

    <form
      v-if="details === null"
      :class="$style.signIn"
    >
      <label :class="$style.login">
        <span>Login</span>
        <input
          v-model="login"
          type="text"
          name="login"
          title="Логин"
        />
      </label>
      <label :class="$style.password">
        <span>Password</span>
        <input
          v-model="password"
          type="password"
          name="password"
          title="Пароль"
        />
      </label>

      <button
        type="submit"
        @click.prevent="onAuthSubmit"
      >
        Войти
      </button>
    </form>

    <button
      v-if="details"
      :class="$style.signOut"
      @click="() => signOut().then(unsetUser)"
    >
      Выйти
    </button>

    <h4>Account details</h4>
    <pre :class="$style.accountDetails">{{ details || 'null' }}</pre>
  </section>
</template>

<style module lang="scss">
.signIn {
  display: flex;
  flex-direction: column;
  width: 200px;
  margin: 0 auto 20px;

  & .login,
  & .password {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
}

.signOut {
  width: 200px;
  margin-bottom: 20px;
}

.accountDetails {
  text-align: left;
  overflow: auto;
}
</style>
