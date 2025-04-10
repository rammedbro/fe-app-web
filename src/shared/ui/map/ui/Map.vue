<template>
  <div :id="id" v-element-visibility="onVisibilityChange" class="z-0" />
</template>

<script setup lang="ts">
import type { LocationPoint } from '@/shared/ui/map/model/types';
import { vElementVisibility } from '@vueuse/components';
import type { LatLngLiteral, LeafletEvent, Map } from 'leaflet';
import leaflet from 'leaflet';
import { OpenStreetMapProvider, SearchControl } from 'leaflet-geosearch';
import type { SearchResult } from 'leaflet-geosearch/dist/providers/provider.d.ts';
import 'leaflet.fullscreen';
import { LocateControl } from 'leaflet.locatecontrol';

interface GeosearchShowLocationEvent extends LeafletEvent {
  location: SearchResult;
}

const props = withDefaults(
  defineProps<{
    fullscreen?: boolean;
    locate?: boolean;
    search?: boolean;
  }>(),
  {
    fullscreen: true,
    locate: true,
    search: false,
  }
);
const emit = defineEmits<{
  (e: 'update:modelValue', payload: LocationPoint): void;
}>();
const model = defineModel<LocationPoint>();
const id = useId();
const map = ref<Map>();
const marker = leaflet.marker([model.value?.lat || 0, model.value?.lng || 0]);

watch(model, (value) => {
  if (!value) return;

  const latlng: LatLngLiteral = {
    lat: value.lat || 0,
    lng: value.lng || 0,
  };
  map.value?.setView(latlng);
  marker.setLatLng(latlng);
});

onMounted(() => {
  init();
});

function onVisibilityChange(visible: boolean) {
  if (visible) map.value?.invalidateSize();
}

function setLatLng(latlng: LatLngLiteral) {
  emit('update:modelValue', latlng);
}

function init() {
  map.value = leaflet.map(id, {
    center: [model.value?.lat || 51.505, model.value?.lng || -0.09],
    zoom: 13,
    layers: [
      leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
      }),
      marker,
    ],
  });
  map.value.on('click', (event) => setLatLng(event.latlng));

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
</script>
