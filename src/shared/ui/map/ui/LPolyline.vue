<template></template>

<script setup lang="ts">
import { MapInjectionKey } from '@/shared/ui/map/model/symbols';
import type { LatLngExpression, PolylineOptions } from 'leaflet';
import { polyline } from 'leaflet';

const props = withDefaults(defineProps<PolylineOptions>(), {
  stroke: true,
  opacity: 1,
  weight: 3,
});
const model = defineModel<LatLngExpression[]>({ required: true });
const Map = inject(MapInjectionKey);
const layer = polyline(model.value, props);

onMounted(() => {
  Map?.((map) => map.addLayer(layer));
});

onUnmounted(() => {
  Map?.((map) => map.removeLayer(layer));
});
</script>
