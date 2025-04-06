import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useParkingStore } from '~/stores/parking'
import { useParking } from '~/composables/useParking'
import { useParkingData, type ParkingLot } from '~/composables/useParkingData'

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
  const route = useRoute()
  const parkingData = useParkingData()
  
  const isRefreshing = ref(false)
  const isManualEntryModalOpen = ref(false)
  const selectedParkingLot = ref<ParkingLot | null>(null)
  
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
    return selectedParkingLot.value ? selectedParkingLot.value.totalSpaces : parkingStore.slots.length
  })
  
  const totalAvailableSlots = computed(() => {
    return selectedParkingLot.value ? selectedParkingLot.value.availableSpots : parkingStore.slots.filter(slot => !slot.isOccupied).length
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
  
  // Generate Google Maps URL for the selected parking lot
  const googleMapsUrl = computed(() => {
    if (!selectedParkingLot.value) return '#'
    
    // Encode the location or name for directions to the parking lot
    const destination = encodeURIComponent(selectedParkingLot.value.location || selectedParkingLot.value.name)
    // Use current location as the starting point and provide directions to the destination
    return `https://www.google.com/maps/dir/?api=1&origin=current+location&destination=${destination}&travelmode=driving`
  })
  
  // Load selected parking lot data from route query params
  const loadSelectedParkingLot = async () => {
    const lotId = route.query.selectedLot as string
    
    if (!lotId) return
    
    try {
      isRefreshing.value = true
      console.log('Loading selected parking lot data:', lotId)
      
      // Get destination from query params
      const destination = route.query.destination as string || ''
      const vehicleType = route.query.vehicleType as string || ''
      const duration = route.query.duration as string || ''
      
      // Fetch parking lots data
      const parkingLots = await parkingData.getParkingLots(destination, vehicleType, duration)
      
      // Find the selected lot
      const selectedLot = parkingLots.find(lot => lot.id === lotId)
      
      if (selectedLot) {
        console.log('Found selected parking lot:', selectedLot.name)
        selectedParkingLot.value = selectedLot
        
        // Update parking hours based on selected lot (simulated difference)
        parkingHours.value = {
          opening: selectedLot.id.startsWith('A') ? '6:00 AM' : '7:00 AM',
          closing: selectedLot.id.startsWith('B') ? '10:00 PM' : '11:00 PM',
          special: `Weekend Hours for ${selectedLot.name}:<br>8:00 AM - 8:00 PM`
        }
        
        // Update peak hours based on lot location (simulated difference)
        peakInfo.value = {
          peakHours: selectedLot.location.includes('North') 
            ? '7:30 AM - 9:30 AM, 4:30 PM - 6:30 PM' 
            : '8:00 AM - 10:00 AM, 4:00 PM - 6:00 PM',
          quietHours: selectedLot.location.includes('South')
            ? '10:00 AM - 1:00 PM, 7:00 PM - 9:00 PM'
            : '11:00 AM - 2:00 PM, 7:00 PM - 9:00 PM'
        }
      } else {
        console.warn('Selected parking lot not found:', lotId)
      }
    } catch (error) {
      console.error('Error loading selected parking lot:', error)
    } finally {
      isRefreshing.value = false
    }
  }
  
  // Initialize data
  const refreshData = async () => {
    isRefreshing.value = true
    
    try {
      console.log('Initializing parking data...')
      
      // Load selected parking lot first
      await loadSelectedParkingLot()
      
      // Initialize store data
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
    formatDateTime,
    selectedParkingLot,
    loadSelectedParkingLot,
    googleMapsUrl
  }
} 