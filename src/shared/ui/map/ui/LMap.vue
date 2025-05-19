<template>
  <div :id="id" v-element-visibility="onVisibilityChange" class="z-0">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { markerImgUrl } from '@/shared/assets/images';
import { MapInjectionKey } from '@/shared/ui/map/model/symbols';
import type { GeosearchShowLocationEvent, LocationPoint, MapCallback, MapProps } from '@/shared/ui/map/model/types';
import { vElementVisibility } from '@vueuse/components';
import type { LatLngLiteral, Map } from 'leaflet';
import leaflet from 'leaflet';
import { OpenStreetMapProvider, SearchControl } from 'leaflet-geosearch';
import 'leaflet.fullscreen';
import { LocateControl } from 'leaflet.locatecontrol';

const props = withDefaults(defineProps<MapProps>(), {
  center: () => [51.505, -0.09],
  zoom: 13,
  fullscreen: true,
  locate: false,
  search: false,
});
const emit = defineEmits<{
  (e: 'update:modelValue', payload: LocationPoint): void;
}>();
const model = defineModel<LocationPoint>();
const id = useId();
const map = ref<Map>();
const marker = leaflet.marker(model.value || [0, 0], {
  icon: leaflet.icon({ iconUrl: markerImgUrl, iconSize: [24, 40] }),
});
const nestedCallbacks = ref<MapCallback[]>([]);

provide(MapInjectionKey, (cb) => nestedCallbacks.value.push(cb));

watch(model, (value) => {
  if (!value) return;

  map.value?.setView(value);
  marker.setLatLng(value);
});

onMounted(() => {
  initMap();
});

function onVisibilityChange(visible: boolean) {
  if (visible) map.value?.invalidateSize();
}

function setLatLng(latlng: LatLngLiteral) {
  emit('update:modelValue', latlng);
}

function initMap() {
  map.value = leaflet.map(id, {
    center: model.value || props.center,
    zoom: props.zoom,
    layers: [
      leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
      }),
      marker,
    ],
  });
  map.value.on('click', (event) => {
    setLatLng(event.latlng);
  });

  initCallbacks(map.value);

  if (props.fullscreen) {
    map.value.addControl(
      leaflet.control.fullscreen({
        position: 'topright',
        forceSeparateButton: true,
        forcePseudoFullscreen: true,
      })
    );
  }

  if (props.locate) {
    map.value.addControl(
      new LocateControl({
        setView: 'once',
        initialZoomLevel: props.zoom,
        drawCircle: false,
        drawMarker: false,
        locateOptions: {
          watch: false,
          setView: true,
        },
      })
    );
    map.value.on('locationfound', (event) => setLatLng(event.latlng));
  }

  if (props.search) {
    map.value.addControl(
      SearchControl({
        style: 'bar',
        provider: new OpenStreetMapProvider(),
      })
    );
    map.value.on('geosearch/showlocation', (event) => {
      const { location } = event as GeosearchShowLocationEvent;
      setLatLng({ lat: location.y, lng: location.x });
    });
  }
}

function initCallbacks(map: Map) {
  while (nestedCallbacks.value.length) {
    const [cb] = nestedCallbacks.value.splice(0, 1);
    cb(map);
  }
}
</script>
