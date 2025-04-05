<template>
  <div class="text-white h-full flex flex-col">
    <div class="bg-black rounded-lg h-full flex flex-col p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold">Parking Space Information</h2>
        <div class="flex items-center">
          <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-1"></div>
          <span class="text-xs text-white/70">Live</span>
        </div>
      </div>
      
      <div class="flex-grow flex flex-col space-y-5">
        <!-- Dimensions -->
        <div class="flex items-center justify-between border-b border-white/10 pb-5">
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <span class="text-lg">Dimensions</span>
          </div>
          <span class="text-lg text-white">9' x 18'</span>
        </div>
        
        <!-- Height Restriction -->
        <div class="flex items-center justify-between border-b border-white/10 pb-5">
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7l4-4m0 0l4 4m-4-4v18" />
            </svg>
            <span class="text-lg">Height Limit</span>
          </div>
          <span class="text-lg text-white">7' clearance</span>
        </div>
        
        <!-- Pricing -->
        <div class="flex items-center justify-between border-b border-white/10 pb-5">
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-lg">Pricing</span>
          </div>
          <span 
            class="text-lg text-white transition-all duration-500"
            :class="{ 'text-green-400': priceChanged }"
          >${{ spacePrice.toFixed(2) }}/hour</span>
        </div>
        
        <!-- Additional Information Section -->
        <div v-if="showDetails" class="mt-2">
          <!-- Availability Stats -->
          <div class="mb-6">
            <h3 class="text-lg font-medium mb-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Current Availability
            </h3>
            
            <div class="space-y-2">
              <div v-for="(value, section) in parkingStore.sectionStats" :key="section" class="flex justify-between text-sm">
                <span class="text-white/80">Section {{ section }}</span>
                <div>
                  <span 
                    :class="['font-medium transition-all duration-500', 
                    statsChanged[section] ? 'text-yellow-400' : 'text-green-400']"
                  >{{ value.total - value.occupied }}</span>
                  <span class="text-white/70">/</span>
                  <span class="text-white/80">{{ value.total }}</span>
                </div>
              </div>
              
              <div class="flex justify-between pt-3 border-t border-white/10 mt-1 font-medium">
                <span>Total Available</span>
                <div>
                  <span 
                    :class="['transition-all duration-500', 
                    availabilityChanged ? 'text-yellow-400' : 'text-green-400']"
                  >{{ totalAvailableSlots }}</span>
                  <span class="text-white/70">/</span>
                  <span class="text-white">{{ totalSlots }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Occupancy Meter -->
          <div class="mb-6">
            <div class="flex justify-between items-center mb-2">
              <h3 class="text-lg font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Occupancy Rate
              </h3>
              <span 
                :class="['font-medium transition-all duration-500', 
                availabilityChanged ? 'text-yellow-400' : 'text-white']"
              >{{ occupancyPercentage }}%</span>
            </div>
            <div class="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <div 
                class="h-full rounded-full bg-green-500 transition-all duration-1000"
                :style="{width: `${occupancyPercentage}%`}"
              ></div>
            </div>
          </div>
          
          <!-- Amenities -->
          <div>
            <h3 class="text-lg font-medium mb-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              Amenities
            </h3>
            
            <div class="grid grid-cols-2 gap-3">
              <div class="flex items-center">
                <div class="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span class="text-white/80">CCTV Surveillance</span>
              </div>
              <div class="flex items-center">
                <div class="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span class="text-white/80">Lighting</span>
              </div>
              <div class="flex items-center">
                <div class="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span class="text-white/80">EV Charging</span>
              </div>
              <div class="flex items-center">
                <div class="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <span class="text-white/80">Covered Parking</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Toggle Button -->
        <div class="mt-auto">
          <button 
            @click="showDetails = !showDetails" 
            class="w-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <span>{{ showDetails ? 'Show Less' : 'Show More Details' }}</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="h-4 w-4 ml-1 transition-transform"
              :class="{ 'rotate-180': showDetails }"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch, onUnmounted } from 'vue'
import { useParkingStore } from '~/stores/parking'

const parkingStore = useParkingStore()
const showDetails = ref(false)
const refreshInterval = ref<number | null>(null)

// Visual indicators for changes
const priceChanged = ref(false)
const availabilityChanged = ref(false)
const statsChanged = ref<Record<string, boolean>>({})

// Initialize statsChanged with all sections
Object.keys(parkingStore.sectionStats).forEach(section => {
  statsChanged.value[section] = false
})

// Generate a random number for the parking space price
const generateRandomPrice = () => {
  return Math.floor(Math.random() * 3) + 2
}

// Previous values to track changes
const prevAvailable = ref(0)
const prevSectionStats = ref<Record<string, number>>({})
const prevPrice = ref(0)

// Set up reactive data with computed properties
const totalSlots = computed(() => parkingStore.slots.length)
const totalAvailableSlots = computed(() => parkingStore.slots.filter(slot => !slot.isOccupied).length)
const spacePrice = ref(generateRandomPrice())
const occupancyPercentage = computed(() => {
  return totalSlots.value ? Math.round((totalAvailableSlots.value / totalSlots.value) * 100) : 0
})

// Reset visual indicators after a delay
const resetIndicators = () => {
  setTimeout(() => {
    priceChanged.value = false
    availabilityChanged.value = false
    
    Object.keys(statsChanged.value).forEach(section => {
      statsChanged.value[section] = false
    })
  }, 1500)
}

// Update the price randomly to simulate real-time changes
const updateData = () => {
  // Store previous values to detect changes
  prevAvailable.value = totalAvailableSlots.value
  
  Object.keys(parkingStore.sectionStats).forEach(section => {
    prevSectionStats.value[section] = parkingStore.sectionStats[section].total - parkingStore.sectionStats[section].occupied
  })
  
  prevPrice.value = spacePrice.value
  
  // Update price with small variations to simulate dynamic pricing
  const priceChange = Math.random() > 0.7 ? (Math.random() > 0.5 ? 0.5 : -0.5) : 0
  if (priceChange !== 0) {
    const newPrice = Math.max(1.5, spacePrice.value + priceChange)
    spacePrice.value = Math.round(newPrice * 2) / 2 // Round to nearest 0.5
    priceChanged.value = true
  }
}

// Check for data changes and update visual indicators
const checkForChanges = () => {
  // Check total availability change
  if (prevAvailable.value !== totalAvailableSlots.value) {
    availabilityChanged.value = true
  }
  
  // Check section changes
  Object.keys(parkingStore.sectionStats).forEach(section => {
    const current = parkingStore.sectionStats[section].total - parkingStore.sectionStats[section].occupied
    if (prevSectionStats.value[section] !== current) {
      statsChanged.value[section] = true
    }
  })
  
  resetIndicators()
}

onMounted(() => {
  // Make sure the store is initialized
  if (parkingStore.slots.length === 0) {
    parkingStore.initializeData()
  }
  
  // Initialize previous values
  prevAvailable.value = totalAvailableSlots.value
  
  Object.keys(parkingStore.sectionStats).forEach(section => {
    prevSectionStats.value[section] = parkingStore.sectionStats[section].total - parkingStore.sectionStats[section].occupied
  })
  
  prevPrice.value = spacePrice.value
  
  // Set up an interval to update the data
  refreshInterval.value = window.setInterval(updateData, 3000)
})

onUnmounted(() => {
  // Clean up the interval
  if (refreshInterval.value) {
    clearInterval(refreshInterval.value)
  }
})

// Watch for changes in the parking store to reflect updates
watch(() => parkingStore.slots, () => {
  checkForChanges()
}, { deep: true })
</script> 