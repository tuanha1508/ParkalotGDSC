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
          Parking now
        </h1>
        <p class="text-white opacity-70 mt-1">Tell us where you're heading</p>
      </div>
      
      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Destination Input Form -->
        <DestinationInput
          v-model:destinationText="destinationText"
          v-model:vehicleTypeText="vehicleTypeText"
          v-model:durationText="durationText"
          :vehicle-options="vehicleOptions"
          :duration-options="durationOptions"
          @change="handleAddressChange"
          @submit="handleSubmit"
        />
        
        <!-- Sidebar with Tips and Actions -->
        <ParkingInfoSidebar @view-map="viewParkingMap" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useParkingData } from '../composables/useParkingData'
import type { PlacePrediction } from '../composables/useGooglePlaces'

// Import components
import DestinationInput from '../components/parking/DestinationInput.vue'
import ParkingInfoSidebar from '../components/parking/ParkingInfoSidebar.vue'

definePageMeta({
  layout: 'default',
})

// Use composables
const parkingData = useParkingData()
const { destination, selectedVehicleType, selectedDuration } = parkingData

// Create plain string refs for v-model compatibility
const destinationText = ref('')
const vehicleTypeText = ref('')
const durationText = ref('')

// Use computed properties to safely access reactive values
const vehicleOptions = computed(() => parkingData.vehicleTypes.value)
const durationOptions = computed(() => parkingData.durationOptions.value)

// Initialize with current values
destinationText.value = destination.value
vehicleTypeText.value = selectedVehicleType.value
durationText.value = selectedDuration.value

// Sync from composable to local refs
watch(destination, (newVal) => {
  destinationText.value = newVal
})

watch(selectedVehicleType, (newVal) => {
  vehicleTypeText.value = newVal
})

watch(selectedDuration, (newVal) => {
  durationText.value = newVal
})

// Sync from local refs to composable
watch(destinationText, (newVal) => {
  destination.value = newVal
})

watch(vehicleTypeText, (newVal) => {
  selectedVehicleType.value = newVal
})

watch(durationText, (newVal) => {
  selectedDuration.value = newVal
})

const router = useRouter()

const handleAddressChange = (suggestion: PlacePrediction) => {
  console.log('Selected address:', suggestion)
}

const viewParkingMap = () => {
  // Open a PDF file in a new tab
  window.open('/parking-map.pdf', '_blank')
}

const handleSubmit = () => {
  if (!destinationText.value) return
  
  router.push({
    path: '/parking-lots',
    query: { 
      destination: destinationText.value,
      vehicleType: vehicleTypeText.value,
      duration: durationText.value
    }
  })
}
</script>

<style>
/* Global styles */
.overflow-visible {
  overflow: visible !important;
}
</style> 