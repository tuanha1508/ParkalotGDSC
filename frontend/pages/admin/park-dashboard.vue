<template>
  <div class="bg-black min-h-screen">
    <div class="container mx-auto px-6 py-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
          </svg>
          Park Dashboard <span v-if="parkId" class="ml-2 text-white/70">ID: {{ parkId }}</span>
        </h1>
        <p class="text-white opacity-70 mt-1">
          Real-time monitoring and management of parking lot activity
        </p>
      </div>
      
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
          <div class="border border-white/30 rounded-lg overflow-hidden">
            <div class="p-4 border-b border-white/20">
              <h2 class="text-lg font-semibold text-white">Live Camera Feed</h2>
            </div>
            <div class="aspect-video bg-black/50 flex items-center justify-center">
              <div class="text-center p-8">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M23 7l-7 5 7 5V7z" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
                <p class="mt-4 text-white/70">Camera feed will be displayed here</p>
                <button class="mt-4 bg-white hover:bg-gray-200 text-black font-medium px-4 py-2 rounded-md transition-all">
                  Initialize Camera
                </button>
              </div>
            </div>
          </div>
          
          <!-- Parking History Table -->
          <div class="border border-white/30 rounded-lg overflow-hidden p-6">
            <h2 class="text-lg font-semibold text-white mb-4">Car Entry/Exit History</h2>
            
            <!-- Search and Filter Controls -->
            <div class="mb-4 flex flex-col sm:flex-row gap-3">
              <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="Search license plate..." 
                class="px-4 py-2 bg-black/50 border border-white/20 rounded-md text-white text-xs w-full"
              />
              
              <select 
                v-model="permitFilter" 
                class="px-4 py-2 bg-black/50 border border-white/20 rounded-md text-white text-xs pl-4 pr-8 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20fill%3D%22%23ffffff%22%20d%3D%22M4.5%206l3.5%204%203.5-4%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_0.5rem_center] bg-no-repeat bg-[length:1rem_1rem]"
              >
                <option value="all">All Permits</option>
                <option value="valid">Valid Permits</option>
                <option value="invalid">Invalid Permits</option>
              </select>
              
              <select 
                v-model="statusFilter" 
                class="px-4 py-2 bg-black/50 border border-white/20 rounded-md text-white text-xs pl-4 pr-8 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20fill%3D%22%23ffffff%22%20d%3D%22M4.5%206l3.5%204%203.5-4%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_0.5rem_center] bg-no-repeat bg-[length:1rem_1rem]"
              >
                <option value="all">All Status</option>
                <option value="in">Currently Parked</option>
                <option value="out">Exited</option>
              </select>
            </div>
            
            <!-- Table -->
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-white/10">
                <thead>
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">License Plate</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Entry Time</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Exit Time</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Duration</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Permit</th>
                    <th class="px-4 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-white/10">
                  <tr v-for="(car, index) in filteredCarHistory" :key="index" class="hover:bg-white/5">
                    <td class="px-4 py-3 text-xs text-white">{{ car.licensePlate }}</td>
                    <td class="px-4 py-3 text-xs text-white">{{ formatTime(car.entryTime) }}</td>
                    <td class="px-4 py-3 text-xs text-white">{{ car.exitTime ? formatTime(car.exitTime) : '—' }}</td>
                    <td class="px-4 py-3 text-xs text-white">{{ getDuration(car) }}</td>
                    <td class="px-4 py-3 text-xs">
                      <span 
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        :class="car.hasValidPermit ? 'bg-green-900/40 text-green-400' : 'bg-red-900/40 text-red-400'"
                      >
                        {{ car.hasValidPermit ? 'Valid' : 'Invalid' }}
                      </span>
                    </td>
                    <td class="px-4 py-3 text-xs text-white">
                      <button class="text-blue-400 hover:text-blue-300 mr-2">View</button>
                      <button v-if="!car.exitTime" class="text-red-400 hover:text-red-300">Mark Exit</button>
                    </td>
                  </tr>
                  
                  <!-- Empty State -->
                  <tr v-if="filteredCarHistory.length === 0">
                    <td colspan="6" class="px-4 py-8 text-center text-white/50">No car history records found.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- Pagination -->
            <div class="mt-4 flex justify-between items-center">
              <p class="text-xs text-white/50">Showing {{ filteredCarHistory.length }} of {{ carHistory.length }} entries</p>
              
              <div class="flex items-center space-x-2">
                <button 
                  class="px-3 py-1 border border-white/20 rounded-md text-white/70 hover:bg-white/10"
                  :disabled="currentPage === 1"
                  @click="currentPage--"
                >
                  Previous
                </button>
                <span class="text-white/70">{{ currentPage }} / {{ totalPages }}</span>
                <button 
                  class="px-3 py-1 border border-white/20 rounded-md text-white/70 hover:bg-white/10"
                  :disabled="currentPage === totalPages"
                  @click="currentPage++"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Right Column (1/3) -->
        <div class="space-y-6">
          <!-- Current Stats -->
          <div class="border border-white/30 rounded-lg overflow-hidden">
            <div class="p-4 border-b border-white/20">
              <h2 class="text-lg font-semibold text-white">Current Stats</h2>
            </div>
            <div class="flex flex-col h-[calc(100%-56px)] aspect-video bg-black/50">
              <div class="flex-1 flex flex-col justify-center p-4">
                <div class="grid grid-cols-2 gap-4 mb-auto">
                  <!-- Available Spots (most important) -->
                  <div class="col-span-2 p-3 bg-black/40 rounded-lg">
                    <p class="text-xs text-white/70 mb-1">Available Spots</p>
                    <div class="flex items-baseline">
                      <p class="text-lg font-bold text-white mr-2">{{ availableSpots }}</p>
                      <p class="text-xs text-white/50">/ {{ totalSpots }}</p>
                    </div>
                    <div class="mt-1 w-full bg-white/10 rounded-full h-1.5">
                      <div 
                        class="h-1.5 rounded-full" 
                        :class="availablePercentage > 20 ? 'bg-green-500' : 'bg-red-500'"
                        :style="{width: `${availablePercentage}%`}"
                      ></div>
                    </div>
                  </div>
                  
                  <!-- Vehicles Currently Parked -->
                  <div class="p-3 bg-black/40 rounded-lg">
                    <p class="text-xs text-white/70 mb-1">Vehicles Parked</p>
                    <p class="text-base font-bold text-white">{{ currentlyParked }}</p>
                  </div>
                  
                  <!-- Invalid Permits Today -->
                  <div class="p-3 bg-black/40 rounded-lg">
                    <p class="text-xs text-white/70 mb-1">Invalid Permits</p>
                    <p class="text-base font-bold text-red-400">{{ invalidPermitsToday }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Recent Permit Details -->
          <div class="border border-white/30 rounded-lg overflow-hidden p-6">
            <h2 class="text-lg font-semibold text-white mb-4">Recent Permits</h2>
            
            <div class="space-y-4">
              <div v-for="(permit, index) in recentPermits" :key="index" class="p-4 bg-black/40 rounded-lg">
                <div class="flex justify-between items-start">
                  <div>
                    <p class="text-white font-medium">{{ permit.licensePlate }}</p>
                    <p class="text-xs text-white/70">{{ permit.type }} Permit</p>
                    <p class="text-xs text-white/50">Issued: {{ formatDate(permit.issueDate) }}</p>
                    <p class="text-xs text-white/50">Expires: {{ formatDate(permit.expiryDate) }}</p>
                  </div>
                  <span 
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="isPermitValid(permit) ? 'bg-green-900/40 text-green-400' : 'bg-red-900/40 text-red-400'"
                  >
                    {{ isPermitValid(permit) ? 'Valid' : 'Expired' }}
                  </span>
                </div>
              </div>
              
              <!-- Empty State -->
              <div v-if="recentPermits.length === 0" class="py-6 text-center text-white/50">
                No recent permits to display.
              </div>
            </div>
            
            <button class="mt-4 w-full bg-white hover:bg-gray-200 text-black font-medium py-2 rounded-md transition-all">
              View All Permits
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useParkingData } from '../../composables/useParkingData'

definePageMeta({
  layout: 'default',
})

const route = useRoute()
const router = useRouter()
const parkingData = useParkingData()

// Get the ID from the URL query parameters
const parkId = computed(() => route.query.id as string)
const isLoading = ref(true)

// Mock data for demonstration
const carHistory = ref([
  {
    licensePlate: 'ABC123',
    entryTime: new Date(new Date().getTime() - 120 * 60000).toISOString(),
    exitTime: null,
    hasValidPermit: true,
    permitType: 'Staff'
  },
  {
    licensePlate: 'XYZ789',
    entryTime: new Date(new Date().getTime() - 180 * 60000).toISOString(),
    exitTime: null,
    hasValidPermit: true,
    permitType: 'Student'
  },
  {
    licensePlate: 'DEF456',
    entryTime: new Date(new Date().getTime() - 240 * 60000).toISOString(),
    exitTime: new Date(new Date().getTime() - 60 * 60000).toISOString(),
    hasValidPermit: false,
    permitType: 'Visitor'
  },
  {
    licensePlate: 'GHI789',
    entryTime: new Date(new Date().getTime() - 300 * 60000).toISOString(),
    exitTime: new Date(new Date().getTime() - 150 * 60000).toISOString(),
    hasValidPermit: true,
    permitType: 'Staff'
  },
  {
    licensePlate: 'JKL012',
    entryTime: new Date(new Date().getTime() - 360 * 60000).toISOString(),
    exitTime: new Date(new Date().getTime() - 200 * 60000).toISOString(),
    hasValidPermit: true,
    permitType: 'Student'
  }
])

const recentPermits = ref([
  {
    licensePlate: 'ABC123',
    type: 'Staff',
    issueDate: new Date(new Date().getTime() - 60 * 24 * 60 * 60000).toISOString(), // 60 days ago
    expiryDate: new Date(new Date().getTime() + 305 * 24 * 60 * 60000).toISOString() // 305 days from now
  },
  {
    licensePlate: 'XYZ789',
    type: 'Student',
    issueDate: new Date(new Date().getTime() - 30 * 24 * 60 * 60000).toISOString(), // 30 days ago
    expiryDate: new Date(new Date().getTime() + 150 * 24 * 60 * 60000).toISOString() // 150 days from now
  },
  {
    licensePlate: 'DEF456',
    type: 'Visitor',
    issueDate: new Date(new Date().getTime() - 10 * 24 * 60 * 60000).toISOString(), // 10 days ago
    expiryDate: new Date(new Date().getTime() - 1 * 24 * 60 * 60000).toISOString() // 1 day ago (expired)
  }
])

// Pagination and filtering
const searchQuery = ref('')
const permitFilter = ref('all')
const statusFilter = ref('all')
const currentPage = ref(1)
const itemsPerPage = 5

// Statistics
const totalSpots = 50
const availableSpots = computed(() => {
  return totalSpots - currentlyParked.value
})
const availablePercentage = computed(() => {
  return (availableSpots.value / totalSpots) * 100
})
const currentlyParked = computed(() => {
  return carHistory.value.filter(car => !car.exitTime).length
})
const invalidPermitsToday = computed(() => {
  return carHistory.value.filter(car => !car.hasValidPermit).length
})

// Filtered car history based on search and filters
const filteredCarHistory = computed(() => {
  return carHistory.value
    .filter(car => {
      // Filter by search query
      if (searchQuery.value && !car.licensePlate.toLowerCase().includes(searchQuery.value.toLowerCase())) {
        return false
      }
      
      // Filter by permit status
      if (permitFilter.value === 'valid' && !car.hasValidPermit) {
        return false
      }
      if (permitFilter.value === 'invalid' && car.hasValidPermit) {
        return false
      }
      
      // Filter by parking status
      if (statusFilter.value === 'in' && car.exitTime) {
        return false
      }
      if (statusFilter.value === 'out' && !car.exitTime) {
        return false
      }
      
      return true
    })
    .sort((a, b) => new Date(b.entryTime).getTime() - new Date(a.entryTime).getTime())
})

// Pagination
const totalPages = computed(() => {
  return Math.ceil(filteredCarHistory.value.length / itemsPerPage)
})

// Format timestamps
const formatTime = (timestamp: string) => {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true
  })
}

const formatDate = (timestamp: string) => {
  const date = new Date(timestamp)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Calculate duration between entry and exit
const getDuration = (car: any) => {
  const startTime = new Date(car.entryTime)
  const endTime = car.exitTime ? new Date(car.exitTime) : new Date()
  
  const diffMs = endTime.getTime() - startTime.getTime()
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
  
  return `${diffHrs}h ${diffMins}m`
}

// Check if permit is valid
const isPermitValid = (permit: any) => {
  const now = new Date()
  const expiryDate = new Date(permit.expiryDate)
  return expiryDate > now
}

// Load parking lot data based on ID
const loadParkingLotData = async () => {
  if (!parkId.value) return
  
  isLoading.value = true
  try {
    // In a real application, you would fetch the specific parking lot data
    // For now, we'll just set a timeout to simulate loading
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Here you would fetch real data from your API using the parkId
    console.log(`Loading data for parking lot ID: ${parkId.value}`)
    
  } catch (error) {
    console.error('Error loading parking lot data:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await loadParkingLotData()
})
</script> 