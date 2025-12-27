import { ref } from 'vue'
import type { ParkingLot } from './useParkingData'

export function useParkingSearch() {
  const parkingLots = ref<ParkingLot[]>([])
  const isLoading = ref(false)
  const hasError = ref(false)
  const errorMessage = ref('')

  const fetchParkingLots = async (
    destination: string,
    permit?: string,
    duration?: string
  ) => {
    isLoading.value = true
    hasError.value = false
    errorMessage.value = ''

    try {
      if (!destination || !permit) {
        parkingLots.value = []
        return
      }

      const query = new URLSearchParams({
        destination,
        permit
      })
      const res = await fetch(
        `http://localhost:4000/availableParking?${query.toString()}`
      )
      console.log(res)


      if (!res.ok) {
        throw new Error(`Backend error: ${res.status}`)
      }

      const data = await res.json()

      if (!Array.isArray(data)) {
        throw new Error('Invalid data format from backend')
      }

      parkingLots.value = data.map((item: any): ParkingLot => ({
        id: item.ParkingID,
        name: item.ParkingID,
        permitTypes: [],            // placeholder
        location: '',               // placeholder
        totalSpaces: 0,             // placeholder
        availableSpots: item.Available,
        address: '',                // placeholder
        coordinates: { lat: 0, lng: 0 }, // placeholder
        zipCode: '',                // placeholder
        imageUrl: undefined,
        distanceInKm: item.Distance.value / 1000,
        distanceInMiles: (item.Distance.value / 1000) * 0.621371,
        routeDistance: null,
        routeDuration: null,
        travelMode: undefined,
        floors: 0,                  // placeholder
      }))
      console.log(res)
    } catch (err) {
      console.error('Error fetching parking lots:', err)
      parkingLots.value = []
      hasError.value = true
      errorMessage.value =
        err instanceof Error ? err.message : 'Unknown error'
    } finally {
      isLoading.value = false
    }
  }

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