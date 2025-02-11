import type { GetCarListOptions } from '@/shared/model/models';
import type { CarouselProps } from 'primevue/carousel';

export interface CarCarouselBlockProps {
  title?: string;
  query?: GetCarListOptions;
  carousel?: CarouselProps;
}
