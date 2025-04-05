import { ref, computed } from 'vue'
import { useParkingStore } from '~/stores/parking'
import { useParking } from '~/composables/useParking'

export interface Activity {
  timestamp: number;
  licensePlate: string;
  section: string;
  type: 'student' | 'staff' | 'visitor';
  action: 'entry' | 'exit';
}

export interface Section {
  label: string;
  value: string;
}

export interface ParkingHours {
  opening: string;
  closing: string;
  special: string;
}

export interface PeakInfo {
  peakHours: string;
  quietHours: string;
}

export const useParkingDashboard = () => {
  const parkingStore = useParkingStore()
  const { formatDateTime } = useParking()
  
  const isRefreshing = ref(false)
  const isManualEntryModalOpen = ref(false)
  
  const manualEntry = ref({
    licensePlate: '',
    type: 'student' as 'student' | 'staff' | 'visitor',
    section: ''
  })
  
  // Parking hours
  const parkingHours = ref<ParkingHours>({
    opening: '7:00 AM',
    closing: '11:00 PM',
    special: 'Weekends:<br>8:00 AM - 8:00 PM'
  })
  
  // Peak and quiet hours
  const peakInfo = ref<PeakInfo>({
    peakHours: '8:00 AM - 10:00 AM, 4:00 PM - 6:00 PM',
    quietHours: '11:00 AM - 2:00 PM, 7:00 PM - 9:00 PM'
  })
  
  // Recent activities (mock data initially)
  const recentActivities = ref<Activity[]>([
    {
      timestamp: new Date().getTime() - 1000 * 60 * 5, // 5 minutes ago
      licensePlate: 'ABC-123',
      section: 'A',
      type: 'student',
      action: 'entry'
    },
    {
      timestamp: new Date().getTime() - 1000 * 60 * 15, // 15 minutes ago
      licensePlate: 'XYZ-789',
      section: 'B',
      type: 'staff',
      action: 'entry'
    },
    {
      timestamp: new Date().getTime() - 1000 * 60 * 25, // 25 minutes ago
      licensePlate: 'DEF-456',
      section: 'C',
      type: 'visitor',
      action: 'exit'
    }
  ])
  
  // Calculate total slots and available slots
  const totalSlots = computed(() => {
    return parkingStore.slots.length
  })
  
  const totalAvailableSlots = computed(() => {
    return parkingStore.slots.filter(slot => !slot.isOccupied).length
  })
  
  const totalOccupiedSlots = computed(() => {
    return totalSlots.value - totalAvailableSlots.value
  })
  
  // Get available sections for dropdown
  const availableSections = computed(() => {
    const sections = Object.keys(parkingStore.sectionStats).map(section => ({
      label: `Section ${section}`,
      value: section
    }))
    
    return sections
  })
  
  // Initialize data
  const refreshData = async () => {
    isRefreshing.value = true
    
    try {
      console.log('Initializing parking data...')
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Reinitialize data
      parkingStore.initializeData()
      console.log(`Data initialized: ${parkingStore.slots.length} slots loaded`)
    } catch (error) {
      console.error('Failed to refresh data', error)
    } finally {
      isRefreshing.value = false
    }
  }
  
  const openManualEntryModal = () => {
    // Reset form data
    manualEntry.value = {
      licensePlate: '',
      type: 'student',
      section: Object.keys(parkingStore.sectionStats)[0] || ''
    }
    
    isManualEntryModalOpen.value = true
  }
  
  const handleManualEntry = (data: { licensePlate: string; type: 'student' | 'staff' | 'visitor'; section: string }) => {
    // Find an available slot in the selected section
    const availableSlots = parkingStore.slots.filter(
      slot => slot.section === data.section && !slot.isOccupied
    )
    
    if (availableSlots.length === 0) {
      // No available slots in this section
      alert(`No available slots in Section ${data.section}`)
      return false
    }
    
    // Use the first available slot
    const slot = availableSlots[0]
    
    // Record car entry
    parkingStore.carEntry(
      slot.id,
      data.licensePlate,
      data.type
    )
    
    // Add to recent activities
    recentActivities.value.unshift({
      timestamp: new Date().getTime(),
      licensePlate: data.licensePlate,
      section: data.section,
      type: data.type,
      action: 'entry'
    })
    
    return true
  }
  
  return {
    isRefreshing,
    isManualEntryModalOpen,
    setManualEntryModalOpen: (value: boolean) => isManualEntryModalOpen.value = value,
    manualEntry,
    parkingHours,
    peakInfo,
    recentActivities,
    totalSlots,
    totalAvailableSlots,
    totalOccupiedSlots,
    availableSections,
    refreshData,
    openManualEntryModal,
    handleManualEntry,
    formatDateTime
  }
} 