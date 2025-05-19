<template>
  <Head>
    <title>{{ t('pages._error.head.title') }}</title>
    <meta name="description" :content="t('pages._error.head.description')" />
  </Head>
  <div class="flex h-[50vh] flex-col items-center justify-center text-center">
    <h1 class="text-4xl font-bold">{{ t('pages._error.h1', { status: props.status }) }}</h1>
    <p class="mt-2 text-lg">{{ message }}</p>
    <RouterLink :to="{ name: HomeRouteName }" class="mt-4 text-blue-600 underline">
      {{ t('pages._error.link') }}
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import messages from '@/pages/_error/i18n/messages.json';
import { HomeRouteName } from '@/shared/model/routes';
import { Head } from '@unhead/vue/components';
import { useI18n } from 'vue-i18n';

const props = defineProps<{ status: number }>();
const { t } = useI18n({ messages });
const is404 = computed(() => props.status === 404);
const message = computed(() => (is404.value ? t('pages._error.messages.404') : t('pages._error.messages.500')));
</script>
