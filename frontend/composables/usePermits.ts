import { ref, computed } from 'vue'
import { useParkingStore } from '../stores/parking'

export interface Permit {
  licensePlate: string
  type: string
  issueDate: string
  expiryDate: string
}

export const usePermits = (selectedLotId?: string) => {
  const parkingStore = useParkingStore()

  // Check if permit is valid
  const isPermitValid = (permit: Permit) => {
    const now = new Date()
    const expiryDate = new Date(permit.expiryDate)
    return expiryDate > now
  }

  // Generate permits for license plates from history
  const generatePermits = (count: number = 5): Permit[] => {
    // Extract unique license plates
    const uniqueLicensePlates = [...new Set(parkingStore.history.map(entry => entry.licensePlate))]
    
    // Create permit records for each unique license plate
    return uniqueLicensePlates.slice(0, count).map(licensePlate => {
      // Get a random permit type
      const permitTypesList = ['Standard', 'Premium', 'Visitor', 'Employee']
      const type = permitTypesList[Math.floor(Math.random() * permitTypesList.length)]
      
      // Generate random issue and expiry dates
      const now = new Date()
      const issueDate = new Date(now.getTime() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString() // Up to 60 days ago
      
      // 80% chance of valid permit, 20% chance of expired
      const isValid = Math.random() > 0.2
      const expiryDate = isValid 
        ? new Date(now.getTime() + Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString() // Up to a year in future
        : new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() // Up to 30 days ago
      
      return {
        licensePlate,
        type,
        issueDate,
        expiryDate
      }
    })
  }

  // Get recent permits
  const recentPermits = computed(() => {
    return generatePermits(5)
  })

  // Get permit status for a specific license plate
  const getPermitStatus = (licensePlate: string) => {
    const permit = recentPermits.value.find(p => p.licensePlate === licensePlate)
    return permit ? isPermitValid(permit) : Math.random() > 0.2 // 80% chance of valid permit
  }

  // Get permit type for a specific license plate
  const getPermitType = (licensePlate: string) => {
    const permit = recentPermits.value.find(p => p.licensePlate === licensePlate)
    if (permit) return permit.type
    
    // Default to a random permit type if not found
    const permitTypesList = ['Standard', 'Premium', 'Visitor', 'Employee']
    return permitTypesList[Math.floor(Math.random() * permitTypesList.length)]
  }
  
  // Count invalid permits today
  const invalidPermitsToday = computed(() => {
    return recentPermits.value.filter(permit => !isPermitValid(permit)).length
  })

  return {
    recentPermits,
    isPermitValid,
    getPermitStatus,
    getPermitType,
    invalidPermitsToday
  }
} 