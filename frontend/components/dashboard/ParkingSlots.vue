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
      <!-- Show sections from parkingStore if no selected parking lot -->
      <div v-if="!selectedParkingLot">
        <div v-for="(value, section) in parkingStore.sectionStats" :key="section" class="flex justify-between">
          <span class="text-white">Section {{ section }}</span>
          <div>
            <span class="text-green-400">{{ value.total - value.occupied }}</span>
            <span class="text-white/70">/</span>
            <span class="text-white">{{ value.total }}</span>
            <span class="text-white/70 ml-1">slots</span>
          </div>
        </div>
      </div>
      
      <!-- If selected parking lot, show parking lot sections (simulated) -->
      <div v-if="selectedParkingLot">
        <div v-for="(section, index) in parkingLotSections" :key="index" class="flex justify-between">
          <span class="text-white">{{ section.name }}</span>
          <div>
            <span class="text-green-400">{{ section.available }}</span>
            <span class="text-white/70">/</span>
            <span class="text-white">{{ section.total }}</span>
            <span class="text-white/70 ml-1">slots</span>
          </div>
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
import type { ParkingLot } from '~/composables/useParkingData'

const props = defineProps<{
  selectedParkingLot: ParkingLot | null
}>()

const parkingStore = useParkingStore()

// Generate simulated sections for the selected parking lot
const parkingLotSections = computed(() => {
  if (!props.selectedParkingLot) return []
  
  // Create 3 sections with random distribution of spots
  const totalSpaces = props.selectedParkingLot.totalSpaces
  const availableSpots = props.selectedParkingLot.availableSpots
  
  // Calculate spaces per section
  const section1Total = Math.floor(totalSpaces * 0.4)
  const section2Total = Math.floor(totalSpaces * 0.35)
  const section3Total = totalSpaces - section1Total - section2Total
  
  // Calculate available spaces per section (distribute the available spots)
  let remainingAvailable = availableSpots
  const section1Available = Math.min(Math.floor(remainingAvailable * 0.5), section1Total)
  remainingAvailable -= section1Available
  
  const section2Available = Math.min(Math.floor(remainingAvailable * 0.7), section2Total)
  remainingAvailable -= section2Available
  
  const section3Available = Math.min(remainingAvailable, section3Total)
  
  return [
    { name: 'Main Level', total: section1Total, available: section1Available },
    { name: 'Upper Level', total: section2Total, available: section2Available },
    { name: 'Lower Level', total: section3Total, available: section3Available }
  ]
})

// Calculate total slots
const totalSlots = computed(() => {
  if (props.selectedParkingLot) {
    return props.selectedParkingLot.totalSpaces
  }
  return parkingStore.slots.length
})

// Calculate available slots
const totalAvailableSlots = computed(() => {
  if (props.selectedParkingLot) {
    return props.selectedParkingLot.availableSpots
  }
  return parkingStore.slots.filter(slot => !slot.isOccupied).length
})
</script> 