<script setup lang="ts">

</script>

<template>
  <h4>Navigation</h4>

  <nav :class="$style.nav">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/auth">Auth</RouterLink>
    <RouterLink to="/help/privacy-policy">Privacy policy</RouterLink>
    <RouterLink to="/help/terms-of-service">Terms of service</RouterLink>
  </nav>
</template>

<style module>
.nav {
  display: flex;
  flex-direction: column;
}
</style>
