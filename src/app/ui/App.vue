<template>
  <div :class="$style.app">
    <nav :class="$style.nav">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/auth">Auth</RouterLink>
      <RouterLink to="/help/privacy-policy">Privacy policy</RouterLink>
      <RouterLink to="/help/terms-of-service">Terms of service</RouterLink>
    </nav>

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

.nav {
  display: flex;
  flex-direction: column;
}
</style>
