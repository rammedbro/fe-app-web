<template>
  <Button
    icon="pi"
    :icon-class="{ 'pi-heart': !isFavorite, 'pi-heart-fill': isFavorite }"
    variant="text"
    rounded
    size="large"
    @click="onClick"
  />
</template>

<script setup lang="ts">
import { useAuthStore } from '@/entities/auth';
import { useFavoriteStore } from '@/entities/favorite/model/store';
import { SignInRouteName } from '@/shared/model/routes';
import { storeToRefs } from 'pinia';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';

const props = defineProps<{ carId: number }>();
const router = useRouter();
const authStore = useAuthStore();
const favoriteStore = useFavoriteStore();
const { isAuthenticated } = storeToRefs(authStore);
const isFavorite = computed(() => favoriteStore.isFavorite(props.carId));

function onClick() {
  if (!isAuthenticated.value) {
    router.push({ name: SignInRouteName });
    return;
  }

  favoriteStore.toggleFavorite(props.carId);
}
</script>
