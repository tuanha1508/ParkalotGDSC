<template>
  <div class="border border-white/30 rounded-lg overflow-hidden">
    <div class="relative">
      <div class="absolute top-2 right-2 bg-black/80 rounded-full px-3 py-1 text-sm text-white">
        {{ lot.distanceInMiles.toFixed(1) }} miles
      </div>
      <img :src="lot.imageUrl || '/images/default-parking.jpg'" alt="Parking lot" class="w-full h-48 object-cover" />
    </div>
    
    <div class="p-5">
      <h3 class="text-xl font-semibold text-white">{{ lot.name }}</h3>
      
      <div class="mt-3 flex items-center text-white opacity-70">
        <UIcon name="i-heroicons-map-pin" class="h-5 w-5 mr-2 flex-shrink-0" />
        <span>{{ lot.address }}</span>
      </div>
      
      <div class="mt-3 text-white">
        <span class="text-lg font-semibold">
          {{ lot.availableSpots }}
        </span>
        <span class="opacity-70">
          / {{ lot.totalSpots }} spots available
        </span>
      </div>
      
      <div class="mt-4 w-full bg-white/10 rounded-full h-2">
        <div 
          class="h-2 rounded-full bg-white" 
          :style="{width: `${(lot.availableSpots / lot.totalSpots) * 100}%`}"
        ></div>
      </div>
      
      <div class="mt-4">
        <button 
          @click="$emit('select')" 
          class="bg-white hover:bg-gray-200 text-black font-medium px-4 py-1.5 rounded-full transition-all duration-200 shadow-sm text-center w-full"
        >
          Select
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ParkingLot } from '../../composables/useParkingData'

defineProps<{
  lot: ParkingLot
}>()

defineEmits<{
  select: []
}>()
</script> 