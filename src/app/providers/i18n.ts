import { datetimeFormats, messages, numberFormats } from '@/shared/i18n';
import { defaultLocale } from '@/shared/model/locales';
import { createI18n } from 'vue-i18n';

export const i18n = createI18n({
  legacy: false,
  globalInjection: false,
  fallbackLocale: defaultLocale,
  fallbackWarn: false,
  missingWarn: false,
  messages,
  datetimeFormats,
  numberFormats,
});
