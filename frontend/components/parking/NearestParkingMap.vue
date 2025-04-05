<template>
  <div class="nearest-parking-map relative h-full">
    <!-- Search Bar -->
    <div class="absolute top-3 left-3 right-3 z-10">
      <AddressAutocomplete
        v-model="destination"
        placeholder="Enter your destination..."
        @change="handleDestinationChange"
        @update:modelValue="onInputChange"
      />
    </div>
    
    <!-- Map Area -->
    <div class="bg-black h-full">
      <!-- Map Visualization -->
      <div class="relative h-full overflow-hidden bg-black p-4">
        <!-- Destination Marker -->
        <div v-if="showResults" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div class="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center border-2 border-white pulse-animation">
            <span class="i-heroicons-map-pin text-white text-xs"></span>
          </div>
          <div class="text-white text-xs mt-1 bg-black/60 px-2 py-1 rounded">Destination</div>
        </div>
        
        <!-- Map Grid Lines -->
        <div class="absolute inset-0 grid grid-cols-6 grid-rows-6">
          <div v-for="i in 36" :key="i" class="border-dashed border border-white/5"></div>
        </div>
        
        <!-- Nearest Parking Locations -->
        <div v-if="showResults" v-for="(lot, index) in nearbyParkingLots" :key="lot.id" 
             class="absolute z-10 transition-all duration-500"
             :class="getLotPositionClasses(index)">
          <div 
            class="relative w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center border-2 border-white cursor-pointer"
            @mouseenter="hoveredLot = lot"
            @mouseleave="hoveredLot = null"
          >
            <div class="text-white font-bold text-xs">{{ lot.id }}</div>
            
            <!-- Route Visualization (decorative) -->
            <div 
              class="route-line absolute border-2 border-dashed border-blue-400/30 opacity-70"
              :class="getRouteClasses(index)"
            ></div>
          </div>
          <div class="text-white text-xs mt-1 bg-black/60 px-2 py-1 rounded flex flex-col items-center">
            <span class="whitespace-nowrap font-medium">{{ lot.availableSpots }} spots</span>
            <span class="whitespace-nowrap text-white/70">{{ lot.distanceInKm }} km</span>
          </div>
        </div>
        
        <!-- Lot Detail Tooltip -->
        <div v-if="hoveredLot" class="absolute bottom-2 left-2 right-2 bg-black/90 border border-white/30 rounded-lg p-3 text-white text-sm z-20">
          <div class="flex justify-between items-start">
            <div>
              <h4 class="font-bold text-blue-400/90">{{ hoveredLot.name }}</h4>
              <div class="mt-1 flex items-center text-sm">
                <span class="i-heroicons-map-pin text-white/70 mr-1 w-4 h-4"></span>
                <p class="text-white/90">{{ hoveredLot.address }}</p>
              </div>
              <div class="flex items-center mt-2 text-xs">
                <span class="text-blue-400/90 font-medium">{{ hoveredLot.availableSpots }}</span>
                <span class="text-white/70 mx-1">of</span>
                <span>{{ hoveredLot.totalSpots }}</span>
                <span class="text-white/70 ml-1">spots available</span>
                <span class="ml-3 text-white/70">{{ hoveredLot.distanceInKm }} km</span>
              </div>
            </div>
            <button class="bg-blue-600/80 hover:bg-blue-700/80 px-3 py-1 rounded text-xs font-medium">
              Navigate
            </button>
          </div>
          <!-- Walking time indicator -->
          <div class="mt-2 flex items-center text-xs text-white/70">
            <span class="i-heroicons-clock mr-1"></span>
            <span v-if="hoveredLot.routeDuration">{{ hoveredLot.routeDuration }} {{ hoveredLot.travelMode }}</span>
            <span v-else>{{ Math.round(hoveredLot.distanceInKm * 12) }} min walk</span>
            <span class="mx-2">|</span>
            <span class="i-heroicons-car mr-1"></span>
            <span v-if="hoveredLot.travelMode === 'driving' && hoveredLot.routeDuration">{{ hoveredLot.routeDuration }}</span>
            <span v-else>{{ Math.round(hoveredLot.distanceInKm * 1.8) }} min drive</span>
          </div>
        </div>
        
        <!-- Search prompt state -->
        <div v-if="!showResults" class="flex flex-col items-center justify-center h-full">
          <div class="text-white/40 text-center px-4">
            <span class="i-heroicons-map-pin w-8 h-8 mb-2"></span>
            <p>Enter your destination above to find the nearest available parking</p>
          </div>
        </div>
        
        <!-- Loading state -->
        <div v-if="isLoading" class="absolute inset-0 bg-black/70 flex items-center justify-center z-30">
          <div class="animate-spin w-8 h-8 border-4 border-white/60 border-t-transparent rounded-full"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import AddressAutocomplete from '../AddressAutocomplete.vue'
import { useParkingSearch } from '~/composables/useParkingSearch'
import { type ParkingLot } from '~/composables/useParkingData'
import type { PlacePrediction } from '~/composables/useGooglePlaces'

const destination = ref('')
const hoveredLot = ref<ParkingLot | null>(null)
const { parkingLots, isLoading, fetchParkingLots } = useParkingSearch()

const showResults = computed(() => parkingLots.value.length > 0)
const nearbyParkingLots = computed(() => parkingLots.value.slice(0, 5))

// Clear results when destination is emptied
watch(destination, (newValue) => {
  if (!newValue || newValue.trim() === '') {
    clearResults()
  }
})

const handleDestinationChange = async (place: PlacePrediction) => {
  if (!place || !place.description) {
    parkingLots.value = []
    return
  }
  await fetchParkingLots(place.description)
}

// Add event handler for when input is cleared
const clearResults = () => {
  parkingLots.value = []
  hoveredLot.value = null
}

// Generate position classes for parking lots on the map
const getLotPositionClasses = (index: number) => {
  const positions = [
    'top-1/4 right-1/4', // Northeast
    'bottom-1/4 right-1/3', // Southeast 
    'bottom-1/3 left-1/4', // Southwest
    'top-1/3 left-1/3', // Northwest
    'top-2/3 right-1/2', // East
  ]
  return positions[index % positions.length]
}

// Generate route classes between destination and parking
const getRouteClasses = (index: number) => {
  const routes = [
    'h-20 w-20 -bottom-10 -left-10 rotate-45', // Northeast route
    'h-24 w-16 -top-12 -left-8 rotate-[135deg]', // Southeast route
    'h-16 w-24 -top-8 -right-12 rotate-[225deg]', // Southwest route
    'h-20 w-20 -bottom-10 -right-10 rotate-[315deg]', // Northwest route
    'h-12 w-32 -bottom-6 -left-16 rotate-0', // East route
  ]
  return routes[index % routes.length]
}

const onInputChange = (value: string) => {
  if (!value || value.trim() === '') {
    clearResults()
  }
}
</script>

<style scoped>
.pulse-animation {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
  }
}
</style> 