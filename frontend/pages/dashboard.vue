<template>
  <div class="bg-black min-h-screen">
    <div class="container mx-auto px-6 py-8">
      <!-- Page Header -->
      <div class="mb-10">
        <h1 class="text-4xl font-bold text-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
          </svg>
          Dashboard
        </h1>
        <p class="text-white opacity-70 mt-1">
          {{ selectedParkingLot ? selectedParkingLot.name + ' - ' + selectedParkingLot.location : 'Monitor and manage parking status' }}
        </p>
        
        <div class="flex mt-4 space-x-4">
          <button 
            @click="refreshData"
            class="bg-white text-black px-4 py-2 rounded-full text-sm font-medium flex items-center"
            :disabled="isRefreshing"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" :class="{ 'animate-spin': isRefreshing }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {{ isRefreshing ? 'Refreshing...' : 'Refresh Data' }}
          </button>
          <a 
            v-if="selectedParkingLot"
            :href="googleMapsUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-white text-black px-4 py-2 rounded-full text-sm font-medium flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            Open in Maps
          </a>
          <button
            v-if="!selectedParkingLot"
            @click="goToParkingLots"
            class="border border-white/30 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Choose Parking Lot
          </button>
        </div>
      </div>
      
      <!-- Stats Section -->
      <div class="border border-white/30 rounded-lg mb-8">
        <ParkingStats :selected-parking-lot="selectedParkingLot" />
      </div>
      
      <!-- Parking Information Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Slots Information -->
        <ParkingSlots :selected-parking-lot="selectedParkingLot" />
        
        <!-- Operating Hours -->
        <OperatingHours :hours="parkingHours" />
        
        <!-- Occupancy Rate -->
        <OccupancyRate 
          :occupied-slots="totalOccupiedSlots" 
          :total-slots="totalSlots"
          :peak-info="peakInfo"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useParkingDashboard } from '~/composables/useParkingDashboard'
import ParkingStats from '~/components/dashboard/ParkingStats.vue'
import ParkingSlots from '~/components/dashboard/ParkingSlots.vue'
import OperatingHours from '~/components/dashboard/OperatingHours.vue'
import OccupancyRate from '~/components/dashboard/OccupancyRate.vue'

definePageMeta({
  layout: 'default'
})

const router = useRouter()
const {
  isRefreshing,
  parkingHours,
  peakInfo,
  totalSlots,
  totalOccupiedSlots,
  refreshData,
  selectedParkingLot,
  googleMapsUrl
} = useParkingDashboard()

// Navigate to parking lots page
const goToParkingLots = () => {
  router.push('/parking-lots')
}

// Initialize data when component mounts
onMounted(() => {
  // Force initialize data on mount
  refreshData()
})
</script> 