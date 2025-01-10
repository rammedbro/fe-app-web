<template>
<div v-if="user" class="flex items-center gap-4">
  <Button
    as="router-link"
    to="#"
    icon="pi pi-heart-fill"
    rounded
    variant="outlined"
  />
  <Button
    as="router-link"
    to="#"
    icon="pi pi-bell"
    rounded
    variant="outlined"
  />
  <Button
    as="router-link"
    to="#"
    icon="pi pi-cog"
    rounded
    variant="outlined"
  />
  <Button
    as="router-link"
    :to="routes.find(i => i.name === 'sign-in')!"
    icon="pi pi-user"
    rounded
    variant="outlined"
  />
</div>
<Button
  v-else
  as="router-link"
  :to="routes.find(i => i.name === 'sign-in')!"
  icon="pi pi-sign-in"
  rounded
  variant="outlined"
/>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/entities/user';

const { user } = storeToRefs(useUserStore());
const router = useRouter();
const routes = router.getRoutes();
</script>
