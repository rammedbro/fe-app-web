import { locales } from '@/shared/model/locales';

const numberFormat = {
  currency: {
    style: 'currency',
    currency: 'USD',
    notation: 'standard',
  },
  decimal: {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  },
  percent: {
    style: 'percent',
    useGrouping: false,
  },
} as const;

export const numberFormats = {
  [locales.EN]: numberFormat,
  [locales.RU]: numberFormat,
};
