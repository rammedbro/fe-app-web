import { useIntersectionObserver, type UseIntersectionObserverOptions } from '@vueuse/core';
import type { ObjectDirective } from 'vue';
import { ensureArray } from './objects';

type BindingValueFunction = IntersectionObserverCallback;
type BindingValueArray = [BindingValueFunction, UseIntersectionObserverOptions];

export const vIntersectionObserver: ObjectDirective<HTMLElement, BindingValueFunction | BindingValueArray> = {
  mounted(el, binding) {
    const [fn, options] = ensureArray(binding.value) as BindingValueArray;
    const { stop } = useIntersectionObserver(
      el,
      ([entry]: IntersectionObserverEntry[], observer) => {
        fn([entry], observer);

        if (binding.modifiers.once && entry.isIntersecting) {
          stop();
        }
      },
      options
    );
  },
};
