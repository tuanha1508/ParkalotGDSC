import { useParkingStore } from '../stores/parking'

export const useParking = () => {
  const parkingStore = useParkingStore()
  
  /**
   * Format a date string to a readable format
   */
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }
  
  /**
   * Calculate duration between two dates or from a start date to now
   */
  const calculateDuration = (startTimeString: string, endTimeString?: string) => {
    const startTime = new Date(startTimeString)
    const endTime = endTimeString ? new Date(endTimeString) : new Date()
    
    const diffMs = endTime.getTime() - startTime.getTime()
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    
    return `${diffHrs}h ${diffMins}m`
  }
  
  /**
   * Get a color based on vehicle type
   */
  const getVehicleTypeColor = (type: string) => {
    switch (type) {
      case 'student': return 'blue'
      case 'staff': return 'purple'
      case 'visitor': return 'orange'
      default: return 'gray'
    }
  }
  
  /**
   * Check if a specific parking slot is available
   */
  const isSlotAvailable = (slotId: string) => {
    const slot = parkingStore.slots.find(s => s.id === slotId)
    return slot ? !slot.isOccupied : false
  }
  
  /**
   * Filter parking history based on search criteria
   */
  const filterParkingHistory = (query: string, type: string, status: string) => {
    return parkingStore.history
      .filter(entry => {
        // Filter by search query
        if (query && !entry.licensePlate.toLowerCase().includes(query.toLowerCase())) {
          return false
        }
        
        // Filter by type
        if (type !== 'all' && entry.type !== type) {
          return false
        }
        
        // Filter by status
        if (status === 'current' && entry.exitTime) {
          return false
        }
        if (status === 'completed' && !entry.exitTime) {
          return false
        }
        
        return true
      })
      .sort((a, b) => new Date(b.entryTime).getTime() - new Date(a.entryTime).getTime())
  }
  
  /**
   * Get parking occupancy statistics for each section
   */
  const getSectionOccupancy = () => {
    return parkingStore.sectionStats
  }
  
  /**
   * Generate a valid license plate format
   */
  const generateLicensePlate = () => {
    return parkingStore.generateRandomLicensePlate()
  }
  
  /**
   * Validate license plate format (XX-000-XX)
   */
  const validateLicensePlate = (licensePlate: string) => {
    const regex = /^[A-Z]{2}-\d{3}-[A-Z]{2}$/
    return regex.test(licensePlate)
  }
  
  return {
    formatDateTime,
    calculateDuration,
    getVehicleTypeColor,
    isSlotAvailable,
    filterParkingHistory,
    getSectionOccupancy,
    generateLicensePlate,
    validateLicensePlate
  }
} 