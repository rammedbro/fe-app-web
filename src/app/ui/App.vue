<script lang="ts" setup>
import { Nav } from '@/widgets/nav';
</script>

<template>
  <div :class="$style.app">
    <Nav />

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style module>
.app {
  max-width: 1280px;
  height: 100vh;
  margin: 0 auto;
  padding: 2rem;
  box-sizing: border-box;
  text-align: center;
}
</style>
