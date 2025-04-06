import { ref, computed } from 'vue'
import { useParkingStore } from '../stores/parking'

export interface CarHistoryEntry {
  licensePlate: string
  entryTime: string
  exitTime?: string
  hasValidPermit: boolean
  permitType?: string
}

export const useCarHistory = () => {
  const parkingStore = useParkingStore()
  
  // Filtering and pagination
  const searchQuery = ref('')
  const permitFilter = ref('all')
  const statusFilter = ref('all')
  const currentPage = ref(1)
  const itemsPerPage = ref(5)

  // Helper functions for permit checking
  const isPermitValid = (permit: any) => {
    const now = new Date()
    const expiryDate = new Date(permit.expiryDate)
    return expiryDate > now
  }

  // Get car history
  const carHistory = computed(() => {
    // Convert from store history to dashboard format
    return parkingStore.history.map(entry => {
      // Check if there's a valid permit for this license plate
      const hasValidPermit = Math.random() > 0.2 // 80% chance of valid permit
      const permitType = 'Standard' // Default permit type
      
      return {
        licensePlate: entry.licensePlate,
        entryTime: entry.entryTime,
        exitTime: entry.exitTime,
        hasValidPermit,
        permitType 
      }
    })
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
    return Math.max(1, Math.ceil(filteredCarHistory.value.length / itemsPerPage.value))
  })

  // Paginated car history
  const paginatedCarHistory = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage.value
    return filteredCarHistory.value.slice(startIndex, startIndex + itemsPerPage.value)
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
  const getDuration = (car: CarHistoryEntry) => {
    const startTime = new Date(car.entryTime)
    const endTime = car.exitTime ? new Date(car.exitTime) : new Date()
    
    const diffMs = endTime.getTime() - startTime.getTime()
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    
    return `${diffHrs}h ${diffMins}m`
  }

  // Mark a car as exited
  const markCarExit = (car: CarHistoryEntry) => {
    // Find the corresponding slot
    const slot = parkingStore.slots.find(s => 
      s.isOccupied && 
      s.carInfo?.licensePlate === car.licensePlate
    )
    
    if (slot) {
      parkingStore.carExit(slot.id)
    }
  }

  return {
    searchQuery,
    permitFilter,
    statusFilter,
    currentPage,
    itemsPerPage,
    carHistory,
    filteredCarHistory,
    paginatedCarHistory,
    totalPages,
    formatTime,
    formatDate,
    getDuration,
    markCarExit,
    isPermitValid
  }
} 