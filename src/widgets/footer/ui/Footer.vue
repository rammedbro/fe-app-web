<template>
  <footer class="bg-white py-8 lg:py-16 dark:bg-surface-800 dark:text-surface-0">
    <div class="container mx-auto">
      <div class="flex flex-wrap justify-between gap-8">
        <div class="max-w-72">
          <RouterLink :to="{ name: HomeRouteName }" class="mb-4 block text-3xl font-bold text-primary uppercase">
            Morent
          </RouterLink>
          <p class="font-medium text-black/60 dark:text-white/60">{{ t('widgets.footer.text') }}</p>
        </div>

        <div class="flex flex-wrap gap-8 lg:gap-28">
          <div v-for="[title, items] in menus" :key="title">
            <div class="mb-6 text-lg font-semibold">{{ title }}</div>
            <ul class="font-medium text-black/60 dark:text-white/60">
              <li v-for="item in items" :key="item" class="mb-4">
                <RouterLink to="#">{{ item }}</RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="p-divider-horizontal my-8" />

      <div class="flex flex-col-reverse gap-8 md:flex-row md:items-center">
        <div>{{ t('widgets.footer.bottom.all-rights-reserved', { year: new Date().getFullYear() }) }}</div>

        <div class="flex justify-between gap-4 md:ml-auto md:gap-8">
          <RouterLink :to="{ name: PrivacyPolicyRouteName }">
            {{ t('widgets.footer.bottom.privacy-policy') }}
          </RouterLink>
          <RouterLink :to="{ name: TermsOfServiceRouteName }">
            {{ t('widgets.footer.bottom.terms-and-conditions') }}
          </RouterLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { HomeRouteName, PrivacyPolicyRouteName, TermsOfServiceRouteName } from '@/shared/model/routes';
import messages from '@/widgets/footer/i18n/messages.json';
import { useI18n } from 'vue-i18n';

const { t } = useI18n({ messages });
const menus = computed<[string, string[]][]>(() => [
  [
    t('widgets.footer.menus.about.title'),
    [
      t('widgets.footer.menus.about.items.how-it-works'),
      t('widgets.footer.menus.about.items.features'),
      t('widgets.footer.menus.about.items.partnership'),
      t('widgets.footer.menus.about.items.business'),
    ],
  ],
  [
    t('widgets.footer.menus.community.title'),
    [
      t('widgets.footer.menus.community.items.events'),
      t('widgets.footer.menus.community.items.blog'),
      t('widgets.footer.menus.community.items.podcast'),
      t('widgets.footer.menus.community.items.invite-a-friend'),
    ],
  ],
  [
    t('widgets.footer.menus.socials.title'),
    [
      t('widgets.footer.menus.socials.items.discord'),
      t('widgets.footer.menus.socials.items.instagram'),
      t('widgets.footer.menus.socials.items.twitter'),
      t('widgets.footer.menus.socials.items.facebook'),
    ],
  ],
]);
</script>
