<template>
  <div class="bg-black min-h-screen">
    <div class="container mx-auto px-6 py-8">
      <!-- Page Header -->
      <ParkingLotsHeader :destination="filters.destination.value" />
      
      <!-- Error Message -->
      <ErrorMessage :message="errorMessage" />
      
      <!-- Results Summary -->
      <ResultsSummary 
        :count="search.parkingLots.value.length" 
        :destination="filters.destination.value" 
      />
      
      <!-- Parking Lots List -->
      <ParkingLotsList 
        :parking-lots="search.parkingLots.value" 
        @select="selectParkingLot" 
      />
      
      <!-- Loading State -->
      <LoadingState v-if="search.isLoading.value" />
      
      <!-- Empty State -->
      <EmptyState 
        v-if="!search.isLoading.value && search.parkingLots.value.length === 0" 
        @reset="handleClearAll" 
      />
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
import ParkingLotsHeader from '../components/parking/ParkingLotsHeader.vue'
import ErrorMessage from '../components/parking/ErrorMessage.vue'
import ResultsSummary from '../components/parking/ResultsSummary.vue'
import ParkingLotsList from '../components/parking/ParkingLotsList.vue'
import LoadingState from '../components/parking/LoadingState.vue'
import EmptyState from '../components/parking/EmptyState.vue'

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