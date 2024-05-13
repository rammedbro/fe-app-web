<script setup lang="ts">
defineOptions({
  name: 'Navigation',
});
defineProps({
  title: {
    type: String,
    default: 'Navigation',
  },
});
</script>

<template>
  <h4>
    <slot name="title" v-bind="{ title }">{{ title }}</slot>
  </h4>

  <nav :class="$style.nav">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/auth">Auth</RouterLink>
    <RouterLink to="/help/privacy-policy">Privacy policy</RouterLink>
    <RouterLink to="/help/terms-of-service">Terms of service</RouterLink>
  </nav>
</template>

<style module src="./Nav.module.css" />
