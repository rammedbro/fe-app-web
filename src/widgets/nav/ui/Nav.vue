<script setup lang="ts">
import NavItem from '@/widgets/nav/ui/NavItem.vue';

defineOptions({
  name: 'Navigation',
});

const navItems = [
  { text: 'Home', href: '/', icon: 'create-outline' },
  { text: 'Login', href: '/auth', icon: 'arrow-forward-circle-outline' },
  { text: 'Sign up', href: '/auth' },
];
</script>

<template>
  <nav class="navbar">
    <div class="container flex items-center mx-auto p-2">
      <RouterLink to="/" class="font-logo text-primary text-2xl">conduit</RouterLink>

      <ul class="nav flex items-center ml-auto gap-2">
        <li
          v-for="item in navItems"
          :key="item.text"
        >
          <NavItem :item="item" />
        </li>
      </ul>
    </div>
  </nav>
</template>
