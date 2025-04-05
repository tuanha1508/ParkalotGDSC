<template>
  <div class="border border-white/30 rounded-lg overflow-hidden">
    <div class="relative">
      <div class="absolute top-2 right-2 bg-black/80 rounded-full px-3 py-1 text-sm text-white">
        {{ lot.distanceInKm.toFixed(1) }} km
      </div>
      <div class="absolute top-2 left-2 bg-black/80 rounded-full px-3 py-1 text-sm text-white">
        ID: {{ lot.id }}
      </div>
      <img :src="lot.imageUrl || '/images/default-parking.jpg'" alt="Parking lot" class="w-full h-48 object-cover" />
    </div>
    
    <div class="p-5">
      <h3 class="text-xl font-semibold text-white">{{ lot.name }}</h3>
      
      <div class="mt-2 text-white opacity-70 text-sm line-clamp-2">
        {{ lot.location }}
      </div>
      
      <!-- Distance and Duration Info -->
      <div v-if="lot.routeDistance && lot.routeDuration" class="mt-3 flex items-center text-white gap-3">
        <div class="flex items-center">
          <UIcon :name="lot.travelMode === 'walking' ? 'i-heroicons-user-circle' : 'i-heroicons-truck'" class="h-4 w-4 mr-1" />
          <span class="text-sm">{{ lot.routeDistance }}</span>
        </div>
        <div class="flex items-center">
          <UIcon name="i-heroicons-clock" class="h-4 w-4 mr-1" />
          <span class="text-sm">{{ lot.routeDuration }}</span>
        </div>
      </div>
      
      <!-- Straight-line distance if route information is not available -->
      <div v-else class="mt-3 flex items-center text-white gap-3">
        <div class="flex items-center">
          <UIcon name="i-heroicons-map-pin" class="h-4 w-4 mr-1" />
          <span class="text-sm">{{ lot.distanceInKm }} km</span>
        </div>
        <div class="flex items-center" v-if="lot.distanceInMiles">
          <UIcon name="i-heroicons-map" class="h-4 w-4 mr-1" />
          <span class="text-sm">{{ lot.distanceInMiles }} mi</span>
        </div>
      </div>
      
      <div class="mt-3 text-white">
        <span class="text-lg font-semibold">
          {{ lot.availableSpots }}
        </span>
        <span class="opacity-70">
          / {{ lot.totalSpaces }} spots available
        </span>
      </div>
      
      <div class="mt-4 w-full bg-white/10 rounded-full h-2">
        <div 
          class="h-2 rounded-full bg-white" 
          :style="{width: `${(lot.availableSpots / lot.totalSpaces) * 100}%`}"
        ></div>
      </div>
      
      <div class="mt-3 flex flex-wrap gap-1">
        <span 
          v-for="(permitType, index) in lot.permitTypes" 
          :key="index"
          class="inline-block text-xs bg-white/10 text-white px-2 py-1 rounded-full"
        >
          {{ permitType }}
        </span>
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

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 2.4em; /* Fallback for non-webkit browsers */
}
</style> 