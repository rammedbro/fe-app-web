import { locales } from '@/shared/model/locales';

const dateFormat = {
  short: {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  },
  long: {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
  },
} as const;

export const datetimeFormats = {
  [locales.EN]: dateFormat,
  [locales.RU]: dateFormat,
};
