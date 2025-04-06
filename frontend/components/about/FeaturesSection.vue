<template>
  <section class="py-20 border-t border-white/20">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-3xl font-bold mb-12 text-center">Key Features</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h3 class="text-xl font-medium mb-4">Live Parking Slot Tracking</h3>
          <p class="text-white/60 mb-8">See exactly how many parking spots are available in each lot or garage in real-time, eliminating guesswork.</p>
          <div class="rounded-lg border border-white/20 bg-black overflow-hidden h-64">
            <ParkingSlotsEmbed />
          </div>
        </div>
        <div>
          <h3 class="text-xl font-medium mb-4">Nearest Parking Finder</h3>
          <p class="text-white/60 mb-8">Locate the closest available parking to your destination with turn-by-turn directions to get you there fast.</p>
          <div class="rounded-lg border border-white/20 h-64 bg-black overflow-hidden">
            <NearestParkingMap />
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-16 mt-16">
        <div>
          <h3 class="text-xl font-medium mb-4">Permit Type Filtering</h3>
          <p class="text-white/60 mb-8">Filter parking options by the permits you hold, ensuring you only see relevant parking spaces that you can actually use.</p>
          <div class="rounded-lg border border-white/20 bg-black overflow-hidden p-4 h-64">
            <PermitTypeFilter />
          </div>
        </div>
        <div>
          <h3 class="text-xl font-medium mb-4">Parking Space Details</h3>
          <p class="text-white/60 mb-8">Get important information about each space including size, height restrictions, pricing, and amenities before you arrive.</p>
          <div class="rounded-lg border border-white/20 h-64 bg-black overflow-hidden">
            <SpaceDetails />
          </div>
        </div>
      </div>
      
      <div class="mt-16">
        <div class="max-w-xl mx-auto">
          <h3 class="text-xl font-medium mb-4 text-center">Parking Management Dashboard</h3>
          <p class="text-white/60 mb-8 text-center">For parking administrators: Track vehicles in your facility, verify permits, and monitor license plates in real-time as cars enter and exit.</p>
          <div class="rounded-lg border border-white/20 h-64 bg-black flex items-center justify-center">
            <p class="text-white/60">Admin Console</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Features section component for the About page
import ParkingSlotsEmbed from '~/components/about/ParkingSlotsEmbed.vue'
import PermitTypeFilter from '../../components/parking/PermitTypeFilter.vue'
import SpaceDetails from '../../components/parking/SpaceDetails.vue'
import NearestParkingMap from '../../components/parking/NearestParkingMap.vue'

// Initialize the parking store data when the component is mounted
import { onMounted, onUnmounted, ref } from 'vue'
import { useParkingStore } from '~/stores/parking'

const parkingStore = useParkingStore()
const refreshInterval = ref<number | null>(null)

function updateWithRandomData() {
  // Get the current sections
  const sections = Object.keys(parkingStore.sectionStats)
  
  // Update each slot with random occupancy
  parkingStore.slots.forEach(slot => {
    // 30-70% chance of being occupied (random)
    slot.isOccupied = Math.random() > 0.3 + (Math.random() * 0.4)
    
    if (slot.isOccupied) {
      // Update car info if occupied
      slot.carInfo = {
        licensePlate: parkingStore.generateRandomLicensePlate(),
        entryTime: new Date(Date.now() - Math.floor(Math.random() * 8 * 60 * 60 * 1000)).toISOString(),
        type: (['student', 'staff', 'visitor'][Math.floor(Math.random() * 3)] as 'student' | 'staff' | 'visitor')
      }
    }
  })
}

onMounted(() => {
  // Initialize parking data if not already loaded
  if (parkingStore.slots.length === 0) {
    parkingStore.initializeData()
  }
  
  // Set up a refresh interval (every 3 seconds) for the demo
  refreshInterval.value = window.setInterval(updateWithRandomData, 3000)
})

onUnmounted(() => {
  // Clear interval when component is destroyed
  if (refreshInterval.value) {
    clearInterval(refreshInterval.value)
  }
})
</script> 