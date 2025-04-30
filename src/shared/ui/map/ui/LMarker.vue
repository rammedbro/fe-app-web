<template></template>

<script setup lang="ts">
import { MapInjectionKey } from '@/shared/ui/map/model/symbols';
import type { LatLngExpression, MarkerOptions, PopupOptions } from 'leaflet';
import { marker } from 'leaflet';

interface Props extends MarkerOptions {
  popup?: PopupOptions;
}

const props = defineProps<Props>();
const model = defineModel<LatLngExpression>({ required: true });
const Map = inject(MapInjectionKey);
const layer = marker(model.value);

onMounted(() => {
  const { content } = props.popup || {};

  if (content) {
    layer.bindPopup(content, props.popup);
    layer.on('click', () => layer.openPopup());
  }

  Map?.((map) => map.addLayer(layer));
});

onUnmounted(() => {
  Map?.((map) => map.removeLayer(layer));
});
</script>
