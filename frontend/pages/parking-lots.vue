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
      
      <!-- Error Message -->
      <div v-if="errorMessage" class="mb-6 p-3 bg-red-900/50 border border-red-700 rounded-lg text-white">
        <div class="flex items-start">
          <UIcon name="i-heroicons-exclamation-triangle" class="h-5 w-5 mr-2 flex-shrink-0 text-red-500" />
          <p>{{ errorMessage }}</p>
        </div>
      </div>
      
      <!-- Results Summary -->
      <div v-if="search.parkingLots.value.length > 0" class="mb-4">
        <h2 class="text-white text-lg font-medium">
          Found {{ search.parkingLots.value.length }} parking lots
          <span v-if="filters.destination.value">
            near {{ filters.destination.value }}
          </span>
        </h2>
        <p class="text-white/60 text-sm">
          Sorted by driving distance from your destination
        </p>
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
        <div class="mt-4">
          <UButton @click="handleClearAll" color="white" variant="outline" class="rounded-full">
            Reset Filters
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { ParkingLot } from '../composables/useParkingData'
import { useParkingFilters } from '../composables/useParkingFilters'
import { useParkingSearch } from '../composables/useParkingSearch'
import { useParkingData } from '../composables/useParkingData'

// Import components
import ParkingLotCard from '../components/parking/ParkingLotCard.vue'

definePageMeta({
  layout: 'default',
})

const router = useRouter()
const filters = useParkingFilters()
const search = useParkingSearch()
const parkingData = useParkingData()
const destinationInput = ref('')
const travelMode = computed(() => parkingData.selectedTravelMode.value)
const errorMessage = ref('')

// Initialize with route params if available
onMounted(() => {
  if (filters.destination.value) {
    destinationInput.value = filters.destination.value
  }
  
  // Set travel mode to driving by default
  parkingData.setTravelMode('driving')
})

// Set travel mode and refresh results
const setTravelMode = (mode: 'walking' | 'driving') => {
  parkingData.setTravelMode(mode)
  if (filters.destination.value) {
    refreshParkingLots()
  }
}

// Event handlers for filter actions
const handleClearVehicleType = () => {
  filters.clearVehicleType()
  refreshParkingLots()
}

const handleClearDuration = () => {
  filters.clearDuration()
  refreshParkingLots()
}

const handleClearDestination = () => {
  filters.destination.value = ''
  destinationInput.value = ''
  refreshParkingLots()
}

const handleClearAll = () => {
  filters.clearAllFilters()
  destinationInput.value = ''
  refreshParkingLots()
}

// Search based on destination input
const handleDestinationSearch = () => {
  errorMessage.value = ''
  if (destinationInput.value) {
    filters.destination.value = destinationInput.value
    filters.updateRouteQuery()
    refreshParkingLots()
  }
}

// Refresh parking lots data
const refreshParkingLots = async () => {
  errorMessage.value = ''
  try {
    await search.fetchParkingLots(
      filters.destination.value,
      filters.vehicleType.value,
      filters.duration.value
    )
    
    if (search.parkingLots.value.length === 0 && filters.destination.value) {
      errorMessage.value = 'No parking lots found near your destination. Try another location or change your filters.'
    }
  } catch (error) {
    console.error('Error fetching parking lots:', error)
    errorMessage.value = 'There was an error finding parking lots. Please try again.'
  }
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

// Watch for travel mode changes to refresh results
watch(() => parkingData.selectedTravelMode.value, () => {
  if (filters.destination.value) {
    refreshParkingLots()
  }
})

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