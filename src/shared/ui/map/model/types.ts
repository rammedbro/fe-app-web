import type { LeafletEvent, Map, MapOptions } from 'leaflet';
import type { SearchResult } from 'leaflet-geosearch/dist/providers/provider.d.ts';

export interface LocationPoint {
  lat: number;
  lng: number;
  label?: string;
}

export interface MapProps extends MapOptions {
  fullscreen?: boolean;
  locate?: boolean;
  search?: boolean;
}

export interface GeosearchShowLocationEvent extends LeafletEvent {
  location: SearchResult;
}

export type MapCallback = (map: Map) => void;
