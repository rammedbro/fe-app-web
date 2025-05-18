<template>
  <Button
    icon="pi"
    :icon-class="{ 'pi-heart': !isFavorite, 'pi-heart-fill': isFavorite }"
    variant="text"
    :title="title"
    rounded
    size="large"
    @click="onClick"
  />
</template>

<script setup lang="ts">
import { useAuthStore } from '@/entities/auth';
import messages from '@/entities/favorite/i18n/messages.json';
import { useFavoriteStore } from '@/entities/favorite/model/store';
import { SignInRouteName } from '@/shared/model/routes';
import { storeToRefs } from 'pinia';
import Button from 'primevue/button';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const props = defineProps<{ carId: number }>();
const { t } = useI18n({ messages });
const router = useRouter();
const authStore = useAuthStore();
const favoriteStore = useFavoriteStore();
const { isAuthenticated } = storeToRefs(authStore);
const isFavorite = computed(() => favoriteStore.isFavorite(props.carId));
const title = computed(() =>
  isFavorite.value ? t('entities.favorite.buttons.del') : t('entities.favorite.buttons.add')
);

function onClick() {
  if (!isAuthenticated.value) {
    router.push({ name: SignInRouteName });
    return;
  }

  favoriteStore.toggleFavorite(props.carId);
}
</script>
