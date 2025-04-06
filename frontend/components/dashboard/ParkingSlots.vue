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
      
      <!-- If selected parking lot, show parking lot sections based on floors data -->
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

// Generate sections based on floors data for the selected parking lot
const parkingLotSections = computed(() => {
  if (!props.selectedParkingLot) return []
  
  // Get the floors value from the raw data
  const floors = props.selectedParkingLot.floors || 0
  const totalSpaces = props.selectedParkingLot.totalSpaces
  const availableSpots = props.selectedParkingLot.availableSpots
  
  // If floors is 0, it means the parking lot has only one level
  if (floors === 0) {
    return [
      { name: 'Level 1', total: totalSpaces, available: availableSpots }
    ]
  }
  
  // For multi-level parkings, create a level for each floor
  const sections = []
  
  // Calculate total floors to display
  const totalFloors = Math.max(floors, 1)
  
  // Distribute spaces evenly across all floors
  const floorTotals = []
  let remainingTotal = totalSpaces
  
  // First floor gets slightly more spaces (30%)
  const firstFloorTotal = Math.floor(totalSpaces * 0.3)
  floorTotals.push(firstFloorTotal)
  remainingTotal -= firstFloorTotal
  
  // Distribute remaining spaces evenly across other floors
  const remainingFloors = totalFloors - 1
  if (remainingFloors > 0) {
    const spacePerFloor = Math.floor(remainingTotal / remainingFloors)
    
    // Add spaces for each remaining floor
    for (let i = 0; i < remainingFloors; i++) {
      if (i === remainingFloors - 1) {
        // Last floor gets whatever is left to ensure total adds up
        floorTotals.push(remainingTotal)
      } else {
        floorTotals.push(spacePerFloor)
        remainingTotal -= spacePerFloor
      }
    }
  }
  
  // Distribute available spots proportionally
  let remainingAvailable = availableSpots
  const availableDistribution = []
  
  for (let i = 0; i < floorTotals.length; i++) {
    const proportion = floorTotals[i] / totalSpaces
    const floorAvailable = Math.min(Math.floor(availableSpots * proportion), floorTotals[i])
    availableDistribution.push(floorAvailable)
    remainingAvailable -= floorAvailable
  }
  
  // Add any remaining available spots to the first floor
  if (remainingAvailable > 0 && availableDistribution.length > 0) {
    availableDistribution[0] += remainingAvailable
  }
  
  // Create the sections with numeric level naming
  for (let i = 0; i < floorTotals.length; i++) {
    sections.push({
      name: `Level ${i + 1}`,
      total: floorTotals[i],
      available: availableDistribution[i]
    })
  }
  
  return sections
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