<template>
  <div class="border border-white/30 rounded-lg overflow-hidden">
    <div class="p-4 border-b border-white/20">
      <h2 class="text-lg font-semibold text-white">Current Stats</h2>
    </div>
    <div class="flex flex-col h-[calc(100%-56px)] aspect-video bg-black/50">
      <div class="flex-1 flex flex-col justify-center p-4">
        <div class="grid grid-cols-2 gap-4 mb-auto">
          <!-- Available Spots (most important) -->
          <div class="col-span-2 p-3 bg-black/40 rounded-lg">
            <p class="text-xs text-white/70 mb-1">Available Spots</p>
            <div class="flex items-baseline">
              <p class="text-lg font-bold text-white mr-2">{{ availableSpots }}</p>
              <p class="text-xs text-white/50">/ {{ totalSpots }}</p>
            </div>
            <div class="mt-1 w-full bg-white/10 rounded-full h-1.5">
              <div 
                class="h-1.5 rounded-full" 
                :class="availablePercentage > 20 ? 'bg-green-500' : 'bg-red-500'"
                :style="{width: `${availablePercentage}%`}"
              ></div>
            </div>
          </div>
          
          <!-- Vehicles Currently Parked -->
          <div class="p-3 bg-black/40 rounded-lg">
            <p class="text-xs text-white/70 mb-1">Vehicles Parked</p>
            <p class="text-base font-bold text-white">{{ currentlyParked }}</p>
          </div>
          
          <!-- Invalid Permits Today -->
          <div class="p-3 bg-black/40 rounded-lg">
            <p class="text-xs text-white/70 mb-1">Invalid Permits</p>
            <p class="text-base font-bold text-red-400">{{ invalidPermitsToday }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useParkingStats } from '../../composables/useParkingStats'
import { type ParkingLot } from '../../composables/useParkingData'

const props = defineProps<{
  selectedLot: ParkingLot | null
}>()

const {
  totalSpots,
  availableSpots,
  availablePercentage,
  currentlyParked,
  invalidPermitsToday
} = useParkingStats(props.selectedLot)
</script> 