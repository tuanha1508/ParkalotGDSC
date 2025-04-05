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
          Available Parking
        </h1>
        <p class="text-white opacity-70 mt-1">
          {{ filters.destination.value ? `Near ${filters.destination.value}` : 'Showing all parking lots' }}
        </p>
      </div>
      
      <!-- Filters Section -->
      <div class="border border-white/30 rounded-lg p-4 mb-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center flex-wrap gap-3">
            <div class="flex items-center shrink-0">
              <UIcon name="i-heroicons-funnel" class="h-5 w-5 text-white mr-2" />
              <span class="text-white font-medium">Filters:</span>
            </div>
            
            <div
              v-if="filters.vehicleType.value"
              class="flex items-center bg-black border border-white/30 rounded-full py-1 px-3 text-sm"
            >
              <span class="text-white">{{ filters.vehicleTypeLabel.value }}</span>
              <button @click="handleClearVehicleType" class="ml-2 text-white opacity-70 hover:opacity-100">
                <UIcon name="i-heroicons-x-mark" class="h-4 w-4" />
              </button>
            </div>
            
            <div
              v-if="filters.duration.value"
              class="flex items-center bg-black border border-white/30 rounded-full py-1 px-3 text-sm"
            >
              <span class="text-white">{{ filters.durationLabel.value }}</span>
              <button @click="handleClearDuration" class="ml-2 text-white opacity-70 hover:opacity-100">
                <UIcon name="i-heroicons-x-mark" class="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <UButton
            v-if="filters.hasFilters.value"
            color="gray"
            variant="ghost"
            @click="handleClearAll"
            class="text-white shrink-0"
          >
            Clear All
          </UButton>
        </div>
      </div>
      
      <!-- Parking Lots List -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ParkingLotCard
          v-for="lot in search.parkingLots.value"
          :key="lot.id"
          :lot="lot"
          @select="selectParkingLot(lot)"
        />
      </div>
      
      <!-- Loading State -->
      <div v-if="search.isLoading.value" class="flex flex-col items-center justify-center py-20">
        <UIcon name="i-heroicons-arrow-path" class="h-16 w-16 text-white mb-4 animate-spin" />
        <h3 class="text-xl font-semibold text-white">Finding Parking Lots...</h3>
        <p class="text-white opacity-70 mt-2 text-center">Please wait while we search for parking options.</p>
      </div>
      
      <!-- Empty State -->
      <div v-if="!search.isLoading.value && search.parkingLots.value.length === 0" class="flex flex-col items-center justify-center py-20">
        <UIcon name="i-heroicons-face-frown" class="h-16 w-16 text-white opacity-50 mb-4" />
        <h3 class="text-xl font-semibold text-white">No parking lots found</h3>
        <p class="text-white opacity-70 mt-2 text-center">Try adjusting your filters or searching for a different location.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { ParkingLot } from '../composables/useParkingData'
import { useParkingFilters } from '../composables/useParkingFilters'
import { useParkingSearch } from '../composables/useParkingSearch'

// Import components
import ParkingLotCard from '../components/parking/ParkingLotCard.vue'

definePageMeta({
  layout: 'default',
})

const router = useRouter()
const filters = useParkingFilters()
const search = useParkingSearch()

// Event handlers for filter actions
const handleClearVehicleType = () => {
  filters.clearVehicleType()
  refreshParkingLots()
}

const handleClearDuration = () => {
  filters.clearDuration()
  refreshParkingLots()
}

const handleClearAll = () => {
  filters.clearAllFilters()
  refreshParkingLots()
}

// Refresh parking lots data
const refreshParkingLots = () => {
  search.fetchParkingLots(
    filters.destination.value,
    filters.vehicleType.value,
    filters.duration.value
  )
}

// User actions
const selectParkingLot = (lot: ParkingLot) => {
  router.push({
    path: '/dashboard',
    query: { 
      selectedLot: lot.id,
      destination: filters.destination.value,
      vehicleType: filters.vehicleType.value,
      duration: filters.duration.value
    }
  })
}

// Initialize the page
onMounted(() => {
  refreshParkingLots()
})
</script>

<style>
/* Add the overflow-visible style from park.vue if needed */
.overflow-visible {
  overflow: visible !important;
}
</style> 