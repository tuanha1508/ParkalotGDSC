<template>
  <div class="bg-black min-h-screen">
    <div class="container mx-auto px-6 py-8">
      <!-- Page Header -->
      <ParkHeader :park-id="parkId" />
      
      <!-- Loading State -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-white mb-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        <h3 class="text-lg font-semibold text-white">Loading Park Information...</h3>
        <p class="text-white opacity-70 mt-2 text-center">Please wait while we fetch the parking lot data.</p>
      </div>
      
      <!-- Main Content -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column (2/3) -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Camera Feed Box -->
          <CameraFeed />
          
          <!-- Parking History Table -->
          <CarHistoryTable />
        </div>
        
        <!-- Right Column (1/3) -->
        <div class="space-y-6">
          <!-- Current Stats -->
          <CurrentStats :selected-lot="selectedLot" />
          
          <!-- Recent Permit Details -->
          <RecentPermits />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useParkingData, type ParkingLot } from '../../composables/useParkingData'
import { useParkingStore } from '../../stores/parking'

// Components
import ParkHeader from '../../components/dashboard/ParkHeader.vue'
import CameraFeed from '../../components/dashboard/CameraFeed.vue'
import CarHistoryTable from '../../components/dashboard/CarHistoryTable.vue'
import CurrentStats from '../../components/dashboard/CurrentStats.vue'
import RecentPermits from '../../components/dashboard/RecentPermits.vue'

definePageMeta({
  layout: 'default',
})

const route = useRoute()
const parkingData = useParkingData()
const parkingStore = useParkingStore()

// Get the ID from the URL query parameters
const parkId = computed(() => route.query.id as string)
const isLoading = ref(true)
const selectedLot = ref<ParkingLot | null>(null)

// Load parking lot data based on ID
const loadParkingLotData = async () => {
  if (!parkId.value) return
  
  isLoading.value = true
  try {
    // Fetch parking lots data
    const parkingLots = await parkingData.getParkingLots('', '', '')
    
    // Find the lot with matching ID
    const lot = parkingLots.find(lot => lot.id === parkId.value)
    
    if (lot) {
      selectedLot.value = lot
      
      // Initialize parking store with data for this lot
      parkingStore.initializeData()
      
      console.log(`Loaded data for parking lot ID: ${parkId.value}`)
    } else {
      console.error(`Parking lot with ID ${parkId.value} not found`)
    }
  } catch (error) {
    console.error('Error loading parking lot data:', error)
  } finally {
    isLoading.value = false
  }
}

// Watch for parkId changes to reload data
watch(parkId, loadParkingLotData)

onMounted(async () => {
  await loadParkingLotData()
})
</script> 