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
          Admin: All Parking Lots
        </h1>
        <p class="text-white opacity-70 mt-1">
          Showing all parking lots with their availability and permits
        </p>
      </div>
      
      <!-- Parking Lots List -->
      <div class="mb-4">
        <h2 class="text-white text-lg font-medium">
          {{ parkingLots.length }} parking lots available
        </h2>
      </div>
      
      <!-- Loading State -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
        <UIcon name="i-heroicons-arrow-path" class="h-16 w-16 text-white mb-4 animate-spin" />
        <h3 class="text-xl font-semibold text-white">Loading Parking Lots...</h3>
        <p class="text-white opacity-70 mt-2 text-center">Please wait while we fetch all parking options.</p>
      </div>
      
      <!-- Park Cards Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div 
          v-for="lot in parkingLots" 
          :key="lot.id"
          class="border border-white/30 rounded-lg overflow-hidden"
        >
          <div class="p-5">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-xl font-semibold text-white">
                ID: {{ lot.id }}
              </h3>
              <span 
                class="inline-block px-3 py-1 text-sm rounded-full"
                :class="lot.availableSpots > 0 ? 'bg-black/80 text-green-400' : 'bg-black/80 text-red-400'"
              >
                {{ lot.availableSpots > 0 ? 'Available' : 'Full' }}
              </span>
            </div>
            
            <div class="text-white mb-4">
              <div class="flex justify-between items-center">
                <div>
                  <span class="text-green-400 text-lg font-semibold">{{ lot.availableSpots }}</span>
                  <span class="text-white/70">/</span>
                  <span class="text-white">{{ lot.totalSpaces }}</span>
                  <span class="text-white/70 ml-1">spots</span>
                </div>
              </div>
            </div>
            
            <!-- Last Car Permit Status -->
            <div class="mb-4 flex items-center">
              <span class="text-white/70 text-xs mr-2">Last car permit:</span>
              <span 
                class="inline-flex items-center text-xxs px-1.5 py-0.5 rounded-full"
                :class="lot.lastCarValidPermit ? 'bg-green-900/40 text-green-400' : 'bg-red-900/40 text-red-400'"
              >
                <UIcon 
                  :name="lot.lastCarValidPermit ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'" 
                  class="h-3 w-3 mr-0.5" 
                />
                {{ lot.lastCarValidPermit ? 'Valid' : 'Invalid' }}
              </span>
            </div>
            
            <!-- Availability Progress Bar -->
            <div class="mt-4 w-full bg-white/10 rounded-full h-2">
              <div 
                class="h-2 rounded-full bg-white" 
                :style="{width: `${(lot.availableSpots / lot.totalSpaces) * 100}%`}"
              ></div>
            </div>
            
            <!-- Permit Types -->
            <div class="mt-3">
              <div class="text-white/70 mb-2">Permit Types:</div>
              <div class="flex flex-wrap gap-1">
                <span 
                  v-for="(permitType, index) in lot.permitTypes" 
                  :key="index"
                  class="inline-block text-xs bg-white/10 text-white px-2 py-1 rounded-full"
                >
                  {{ permitType }}
                </span>
              </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="mt-4">
              <button 
                class="bg-white hover:bg-gray-200 text-black font-medium px-4 py-1.5 rounded-full transition-all duration-200 shadow-sm text-center w-full"
                @click="navigateToParkDashboard(lot.id)"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-if="!isLoading && parkingLots.length === 0" class="flex flex-col items-center justify-center py-20">
        <UIcon name="i-heroicons-face-frown" class="h-16 w-16 text-white opacity-50 mb-4" />
        <h3 class="text-xl font-semibold text-white">No parking lots available</h3>
        <p class="text-white opacity-70 mt-2 text-center">There seems to be an issue with the parking data.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useParkingData } from '../../composables/useParkingData'
import { useRouter } from 'vue-router'

definePageMeta({
  layout: 'default',
})

const router = useRouter()
const parkingData = useParkingData()
const parkingLots = ref<any[]>([])
const isLoading = ref(true)

// Navigate to park dashboard with lot ID
const navigateToParkDashboard = (lotId: string | number) => {
  router.push(`/admin/park-dashboard?id=${lotId}`)
}

// Load all parking lots without filtering
const loadAllParkingLots = async () => {
  isLoading.value = true
  try {
    // Empty location to get all lots without filtering by distance
    const lots = await parkingData.getParkingLots('', '', '')
    
    // Add simulated last car permit status to each lot
    parkingLots.value = lots.map(lot => ({
      ...lot,
      lastCarValidPermit: Math.random() > 0.3 // 70% chance of having valid permit
    }))
  } catch (error) {
    console.error('Error loading parking lots:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await loadAllParkingLots()
})
</script> 