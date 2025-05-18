export type Locales = 'en' | 'ru';
export const locales = {
  EN: 'en',
  RU: 'ru',
} as const;
export const defaultLocale = locales.EN;
