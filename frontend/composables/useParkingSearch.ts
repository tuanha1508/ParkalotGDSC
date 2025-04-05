import { ref } from 'vue'
import { useParkingData, type ParkingLot } from './useParkingData'

export function useParkingSearch() {
  const parkingData = useParkingData()
  const parkingLots = ref<ParkingLot[]>([])
  const isLoading = ref(false)
  const hasError = ref(false)
  const errorMessage = ref('')

  // Fetch parking lots based on filters
  const fetchParkingLots = async (destination: string, vehicleType?: string, duration?: string) => {
    // Reset state
    isLoading.value = true
    hasError.value = false
    errorMessage.value = ''
    
    try {
      console.log(`Fetching parking lots for: ${destination || "all"}, vehicle: ${vehicleType || "any"}, duration: ${duration || "any"}`)
      
      const results = await parkingData.getParkingLots(
        destination || "",
        vehicleType || undefined,
        duration || undefined
      )
      
      // Log the result count for debugging
      console.log(`Found ${results.length} parking lots`)
      
      // Verify the data structure
      if (results && Array.isArray(results)) {
        parkingLots.value = results
      } else {
        console.error('Invalid parking lot data format:', results)
        parkingLots.value = []
        hasError.value = true
        errorMessage.value = 'Invalid parking data format received'
      }
    } catch (error) {
      console.error('Error fetching parking lots:', error)
      parkingLots.value = []
      hasError.value = true
      errorMessage.value = error instanceof Error ? error.message : 'Unknown error occurred'
    } finally {
      isLoading.value = false
    }
  }

  // Clear search results
  const clearResults = () => {
    parkingLots.value = []
    hasError.value = false
    errorMessage.value = ''
  }

  return {
    parkingLots,
    isLoading,
    hasError,
    errorMessage,
    fetchParkingLots,
    clearResults
  }
} 