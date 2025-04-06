<template>
  <section class="py-20 border-t border-white/20">
    <div class="max-w-6xl mx-auto px-4">
      <div
        ref="headerRef"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 500 } }"
        class="mb-12 text-center"
      >
        <h2 class="text-3xl font-bold mb-4">Key Features</h2>
        <p class="text-white/60 max-w-2xl mx-auto">
          Discover the innovative tools that make Parkalot the most advanced parking management system available today.
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        <div
          ref="feature1Ref"
          v-motion
          :initial="{ opacity: 0, x: -40 }"
          :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 600 } }"
        >
          <h3 class="text-xl font-medium mb-4">Live Parking Slot Tracking</h3>
          <p class="text-white/60 mb-8">See exactly how many parking spots are available in each lot or garage in real-time, eliminating guesswork and reducing time spent searching for parking.</p>
          <div class="rounded-lg border border-white/20 bg-black overflow-hidden h-64">
            <ParkingSlotsEmbed />
          </div>
        </div>
        <div
          ref="feature2Ref"
          v-motion
          :initial="{ opacity: 0, x: 40 }"
          :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 600 } }"
        >
          <h3 class="text-xl font-medium mb-4">Nearest Parking Finder</h3>
          <p class="text-white/60 mb-8">Locate the closest available parking to your destination with turn-by-turn directions to get you there fast. Factor in walking distance to your final destination.</p>
          <div class="rounded-lg border border-white/20 h-64 bg-black overflow-hidden">
            <NearestParkingMap />
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mt-16">
        <div
          ref="feature3Ref"
          v-motion
          :initial="{ opacity: 0, x: -40 }"
          :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 600 } }"
        >
          <h3 class="text-xl font-medium mb-4">Permit Type Filtering</h3>
          <p class="text-white/60 mb-8">Filter parking options by the permits you hold, ensuring you only see relevant parking spaces that you can actually use. Save favorites for frequently visited locations.</p>
          <div class="rounded-lg border border-white/20 bg-black overflow-hidden p-4 h-64">
            <PermitTypeFilter />
          </div>
        </div>
        <div
          ref="feature4Ref"
          v-motion
          :initial="{ opacity: 0, x: 40 }"
          :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 600 } }"
        >
          <h3 class="text-xl font-medium mb-4">Parking Space Details</h3>
          <p class="text-white/60 mb-8">Get information about each space including size, height restrictions, pricing, and amenities before you arrive. View photos of the parking area for easier navigation.</p>
          <div class="rounded-lg border border-white/20 h-64 bg-black overflow-hidden">
            <SpaceDetails />
          </div>
        </div>
      </div>
      
      <div class="mt-16">
        <div 
          ref="dashboardRef"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="max-w-xl mx-auto"
        >
          <h3 class="text-xl font-medium mb-4 text-center">Parking Management Dashboard</h3>
          <p class="text-white/60 mb-8 text-center">For parking administrators: Track vehicles in your facility, verify permits, and monitor license plates in real-time as cars enter and exit. Generate detailed reports and optimize utilization.</p>
          <div class="rounded-lg border border-white/20 overflow-hidden bg-black">
            <img src="/admin_dashboard.png" alt="Parking Management Dashboard" class="w-full h-auto" />
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

// Import motion module
import { useMotion } from '@vueuse/motion'

// Initialize the parking store data when the component is mounted
import { onMounted, onUnmounted, ref } from 'vue'
import { useParkingStore } from '~/stores/parking'

// Refs for motion animations
const headerRef = ref(null)
const feature1Ref = ref(null)
const feature2Ref = ref(null)
const feature3Ref = ref(null)
const feature4Ref = ref(null)
const dashboardRef = ref(null)

// Set up motion animations
useMotion(headerRef)
useMotion(feature1Ref)
useMotion(feature2Ref)
useMotion(feature3Ref)
useMotion(feature4Ref)
useMotion(dashboardRef)

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