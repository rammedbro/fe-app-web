<script setup lang="ts">
import 'firebaseui/dist/firebaseui.css';
import {
  auth,
  ui,
  EmailAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signIgn,
  signOut,
} from '@/app/providers/firebase';
import { useUserStore } from '@/entities/user';

const { setUser, unsetUser } = useUserStore();
const login = ref<string | null>(null);
const password = ref<string | null>(null);
const details = ref<string | null>(null);
const signInSafe = () => {
  if (login.value && password.value) {
    signIgn(login.value, password.value)
      .then(({ user: { displayName, email, uid } }) =>
        setUser({
          name: displayName,
          email,
          uid,
        }));
  } else {
    console.error('Please provide a login and password');
  }
};

onMounted(() => {
  onAuthStateChanged(auth, user => {
    details.value = user
      ? JSON.stringify(user, null, 2)
      : null;
  });

  if (ui.isPendingRedirect()) {
    ui.start('#firebaseui-auth-container', {
      signInSuccessUrl: '/',
      signInOptions: [
        EmailAuthProvider.PROVIDER_ID,
        GoogleAuthProvider.PROVIDER_ID,
      ],
      tosUrl: '/help/terms-of-service',
      privacyPolicyUrl: '/help/privacy-policy',
    });
  }
});
</script>

<template>
  <section>
    <h2>Auth</h2>

    <div
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
        id="sign-in"
        @click="signInSafe"
      >
        Войти
      </button>
    </div>

    <button
      v-if="details"
      id="sign-out"
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
