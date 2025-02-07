import { useRoute, useRouter, type RouteParamValueRaw } from 'vue-router';

interface UseRouteQueryOptions<T, R> {
  transform?: (value: T) => R;
  replace?: boolean;
}

type RouteQueryValueRaw = RouteParamValueRaw | string[];

export function useRouteQuery<T extends RouteQueryValueRaw = RouteQueryValueRaw, R = T>(
  name: string,
  defaultValue?: R,
  options: UseRouteQueryOptions<T, R> = {}
) {
  const route = useRoute();
  const router = useRouter();
  const { transform = (value: T) => value as unknown as R, replace } = options;

  return computed<R>({
    get: () => {
      const value = route.query[name];

      return value ? transform(route.query[name] as T) : (defaultValue as R);
    },
    set: (value: R) => {
      return router.push({
        path: route.path,
        query: {
          ...route.query,
          [name]: Array.isArray(value) ? value.map(String) : String(value),
        },
        replace,
      });
    },
  });
}
