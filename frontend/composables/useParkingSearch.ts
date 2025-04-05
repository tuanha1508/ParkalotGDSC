import { ref } from 'vue'
import { useParkingData, type ParkingLot } from './useParkingData'

export function useParkingSearch() {
  const parkingData = useParkingData()
  const parkingLots = ref<ParkingLot[]>([])
  const isLoading = ref(false)

  // Fetch parking lots based on filters
  const fetchParkingLots = async (destination: string, vehicleType?: string, duration?: string) => {
    if (!destination) {
      parkingLots.value = []
      return
    }
    
    isLoading.value = true
    
    try {
      parkingLots.value = await parkingData.getParkingLots(
        destination,
        vehicleType || undefined,
        duration || undefined
      )
    } catch (error) {
      console.error('Error fetching parking lots:', error)
      parkingLots.value = []
    } finally {
      isLoading.value = false
    }
  }

  return {
    parkingLots,
    isLoading,
    fetchParkingLots
  }
} 