<script setup lang="ts">

</script>

<template>
  <h1>Welcome to My Awesome App</h1>

  <section class="auth">
    <h2>Auth</h2>

    <div class="sign-in">
      <input id="sign-in-login" type="text" title="Логин" />
      <input id="sign-in-password" type="password" title="Пароль" />
      <button id="sign-in">Войти</button>
    </div>

    <button id="sign-out" class="sign-out">Выйти</button>

    <pre id="account-details" />
  </section>
</template>

<style>
.auth {
  border: 2px solid black;
  border-radius: 4px
}

.sign-in {
  display: flex;
  flex-direction: column;
  width: 200px;
  margin: 0 auto;
}

.sign-out {
  width: 200px;
}
</style>
