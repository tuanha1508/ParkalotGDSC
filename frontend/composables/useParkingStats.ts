import { computed } from 'vue'
import { useParkingStore } from '../stores/parking'
import { useCarHistory } from './useCarHistory'
import { usePermits } from './usePermits'
import { type ParkingLot } from './useParkingData'

export const useParkingStats = (selectedLot: ParkingLot | null = null) => {
  const parkingStore = useParkingStore()
  const { carHistory } = useCarHistory()
  const { invalidPermitsToday } = usePermits()

  // Calculate total spots
  const totalSpots = computed(() => {
    return selectedLot ? selectedLot.totalSpaces : parkingStore.totalSlots
  })

  // Calculate available spots
  const availableSpots = computed(() => {
    return selectedLot ? selectedLot.availableSpots : parkingStore.availableSlots
  })

  // Calculate occupancy percentage
  const availablePercentage = computed(() => {
    if (!totalSpots.value) return 0
    return (availableSpots.value / totalSpots.value) * 100
  })

  // Calculate currently parked vehicles
  const currentlyParked = computed(() => {
    return carHistory.value.filter(car => !car.exitTime).length
  })

  return {
    totalSpots,
    availableSpots,
    availablePercentage,
    currentlyParked,
    invalidPermitsToday
  }
} 