<template>
  <Head>
    <title>{{ t('pages.profile/settings.head.title') }}</title>
    <meta name="description" :content="t('pages.profile/settings.head.description')" />
  </Head>
  <div class="p-card mx-auto grid gap-4 p-8 lg:container">
    <h1 class="mb-12 text-3xl font-bold">{{ t('pages.profile/settings.h1') }}</h1>

    <div class="flex items-center justify-between">
      <label class="text-lg">{{ t('pages.profile/settings.inputs.dark-mode.label') }}</label>
      <ToggleSwitch v-model="darkMode" />
    </div>
    <div class="flex items-center justify-between">
      <label class="text-lg">{{ t('pages.profile/settings.inputs.sticky-header.label') }}</label>
      <ToggleSwitch v-model="stickyHeader" />
    </div>
    <div class="flex items-center justify-between">
      <label class="text-lg">{{ t('pages.profile/settings.inputs.language.label') }}</label>
      <Select v-model="locale" :options="Object.values(locales)" class="w-60" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/entities/settings';
import messages from '@/pages/profile/routes/settings/i18n/messages.json';
import { locales } from '@/shared/model/locales';
import { Head } from '@unhead/vue/components';
import { storeToRefs } from 'pinia';
import Select from 'primevue/select';
import ToggleSwitch from 'primevue/toggleswitch';
import { useI18n } from 'vue-i18n';

const { t } = useI18n({ messages });
const settingsStore = useSettingsStore();
const { darkMode, stickyHeader, locale } = storeToRefs(settingsStore);
</script>
