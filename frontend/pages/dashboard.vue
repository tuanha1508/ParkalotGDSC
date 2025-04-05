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
        <p class="text-white opacity-70 mt-1">Monitor and manage parking status</p>
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
        </div>
      </div>
      
      <!-- Stats Section -->
      <div class="border border-white/30 rounded-lg mb-8">
        <ParkingStats />
      </div>
      
      <!-- Parking Information Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Slots Information -->
        <ParkingSlots />
        
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
  refreshData
} = useParkingDashboard()

// Initialize data when component mounts
onMounted(() => {
  // Force initialize data on mount
  refreshData()
})
</script> 