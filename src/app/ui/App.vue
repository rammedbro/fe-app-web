<script setup lang="ts">

</script>

<template>
  <section>
    <h4>Navigation</h4>
    <nav class="nav">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/auth">Auth</RouterLink>
      <RouterLink to="/help/privacy-policy">Privacy policy</RouterLink>
      <RouterLink to="/help/terms-of-service">Terms of service</RouterLink>
    </nav>
  </section>

  <main>
    <RouterView />
  </main>
</template>

<style>
.nav {
  display: flex;
  flex-direction: column;
}
</style>
