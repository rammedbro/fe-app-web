import type { Map } from 'leaflet';
import type { InjectionKey } from 'vue';

export const MapInjectionKey: InjectionKey<(cb: (map: Map) => void) => void> = Symbol('map');
