<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <ParkingLotCard
      v-for="lot in parkingLots"
      :key="lot.id"
      :lot="lot"
      @select="$emit('select', lot)"
    />
  </div>
</template>

<script setup lang="ts">
import { type ParkingLot } from '../../composables/useParkingData'
import ParkingLotCard from './ParkingLotCard.vue'

defineProps<{
  parkingLots: ParkingLot[]
}>()

defineEmits<{
  (e: 'select', lot: ParkingLot): void
}>()
</script> 