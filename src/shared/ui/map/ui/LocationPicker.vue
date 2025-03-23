<template>
  <div v-on-click-outside="() => popoverRef?.hide()" class="location-picker">
    <div class="p-iconfield" @click="popoverRef?.show">
      <AutoComplete
        v-bind="props"
        v-model="input"
        option-label="label"
        append-to="self"
        @complete="search($event.query)"
        @option-select="onOptionSelect($event.value)"
      />
      <i class="p-inputicon pi pi-map cursor-pointer" />
    </div>

    <Popover ref="popoverRef" :dismissable="false" append-to="self">
      <Map :model-value="model" class="h-80 w-80" @update:model-value="onMapSelect" />
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { Map } from '@/shared/ui/map';
import type { LocationPoint } from '@/shared/ui/map/model/types';
import { vOnClickOutside } from '@vueuse/components';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import type { SearchResult } from 'leaflet-geosearch/dist/providers/provider.d.ts';
import AutoComplete, { type AutoCompleteProps } from 'primevue/autocomplete';
import Popover, { type PopoverMethods } from 'primevue/popover';

type Props = Pick<AutoCompleteProps, 'size' | 'fluid' | 'inputClass' | 'placeholder'>;
const props = defineProps<Props>();
const provider = new OpenStreetMapProvider();
const model = defineModel<LocationPoint>();
const input = ref(model.value?.label);
const suggestions = ref<SearchResult[]>([]);
const popoverRef = ref<PopoverMethods>();

watch(model, (value) => {
  if (!value) return;

  input.value = value.label;
});

async function search(query: string) {
  suggestions.value = await provider.search({ query });
}

function onOptionSelect(result: SearchResult) {
  const { x, y, label } = result;
  model.value = { lat: y, lng: x, label };
}

async function onMapSelect(event: LocationPoint) {
  const query = Object.values(event).toString();
  const [result] = await provider.search({ query });

  onOptionSelect(result);
}
</script>
