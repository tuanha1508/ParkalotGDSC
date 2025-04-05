<template>
  <div class="border border-white/30 rounded-lg overflow-hidden">
    <div class="border-b border-white/20 px-6 py-4">
      <h3 class="text-xl font-semibold text-white flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
        Parking Slots
      </h3>
    </div>
    <div class="p-5 space-y-4">
      <div v-for="(value, section) in parkingStore.sectionStats" :key="section" class="flex justify-between">
        <span class="text-white">Section {{ section }}</span>
        <div>
          <span class="text-green-400">{{ value.total - value.occupied }}</span>
          <span class="text-white/70">/</span>
          <span class="text-white">{{ value.total }}</span>
          <span class="text-white/70 ml-1">slots</span>
        </div>
      </div>
      
      <div class="pt-3 border-t border-white/20">
        <div class="flex justify-between text-lg font-medium">
          <span class="text-white">Total Available</span>
          <div>
            <span class="text-green-400">{{ totalAvailableSlots }}</span>
            <span class="text-white/70">/</span>
            <span class="text-white">{{ totalSlots }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useParkingStore } from '~/stores/parking'

const parkingStore = useParkingStore()

// Calculate total slots and available slots
const totalSlots = computed(() => {
  return parkingStore.slots.length
})

const totalAvailableSlots = computed(() => {
  return parkingStore.slots.filter(slot => !slot.isOccupied).length
})
</script> 