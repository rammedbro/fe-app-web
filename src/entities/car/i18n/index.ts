import type { Locales } from '@/shared/model/locales';
import type { LocaleMessages } from 'vue-i18n';
import messages from './messages.json';

export { messages };
export const mergeCarMessages = <T>(to: LocaleMessages<T, Locales, string>) => {
  return {
    en: { ...messages.en, ...to.en },
    ru: { ...messages.ru, ...to.ru },
  };
};
