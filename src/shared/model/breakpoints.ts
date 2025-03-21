import { breakpointsTailwind } from '@vueuse/core';

export const defaultCarouselResponsiveOptions = [
  { breakpoint: `${breakpointsTailwind['2xl'] - 1}px`, numVisible: 3, numScroll: 1 },
  { breakpoint: `${breakpointsTailwind.lg - 1}px`, numVisible: 2, numScroll: 1 },
  { breakpoint: `${breakpointsTailwind.sm - 1}px`, numVisible: 1, numScroll: 1 },
];
