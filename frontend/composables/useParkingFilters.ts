import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useParkingData } from './useParkingData'

export function useParkingFilters() {
  const route = useRoute()
  const router = useRouter()
  const parkingData = useParkingData()

  // Get query parameters
  const destination = ref(route.query.destination as string || '')
  const vehicleType = ref(route.query.vehicleType as string || '')
  const duration = ref(route.query.duration as string || '')

  // Computed properties for labels
  const vehicleTypeLabel = computed(() => {
    return parkingData.getVehicleTypeLabel(vehicleType.value)
  })

  const durationLabel = computed(() => {
    return parkingData.getDurationLabel(duration.value)
  })

  const hasFilters = computed(() => {
    return !!destination.value || !!vehicleType.value || !!duration.value
  })

  // Filter functions
  const clearVehicleType = () => {
    vehicleType.value = ''
    updateRouteQuery()
  }

  const clearDuration = () => {
    duration.value = ''
    updateRouteQuery()
  }

  const clearAllFilters = () => {
    vehicleType.value = ''
    duration.value = ''
    updateRouteQuery()
  }

  const updateRouteQuery = () => {
    const query: Record<string, string> = {}
    
    if (destination.value) query.destination = destination.value
    if (vehicleType.value) query.vehicleType = vehicleType.value
    if (duration.value) query.duration = duration.value
    
    router.replace({ query })
  }

  return {
    destination,
    vehicleType,
    duration,
    vehicleTypeLabel,
    durationLabel,
    hasFilters,
    clearVehicleType,
    clearDuration,
    clearAllFilters,
    updateRouteQuery
  }
} 