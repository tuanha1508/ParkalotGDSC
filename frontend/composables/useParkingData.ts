import { ref } from 'vue'

export interface ParkingOption {
  value: string;
  label: string;
}

export interface ParkingLot {
  id: string;
  name: string;
  address: string;
  availableSpots: number;
  totalSpots: number;
  distanceInMiles: number;
  imageUrl?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export function useParkingData() {
  const vehicleTypes = ref<ParkingOption[]>([
    { value: 'S', label: 'S - Non-Resident Student' },
    { value: 'R', label: 'R - Resident Student' },
    { value: 'Y', label: 'Y - Park-n-Ride / Alumni' },
    { value: 'GZ', label: 'GZ - Gold Zone Staff' },
    { value: 'E', label: 'E - Staff' },
    { value: 'D', label: 'D - Daily/Visitor Parking' },
    { value: 'MOFFITT', label: 'AG33, HE, and AG42 - Moffitt Employee' },
  ])
  
  const durationOptions = ref<ParkingOption[]>([
    { value: 'short', label: 'Less than 1 hour' },
    { value: 'medium', label: '1-3 hours' },
    { value: 'long', label: 'More than 3 hours' },
  ])

  const selectedVehicleType = ref('')
  const selectedDuration = ref('')
  const destination = ref('')
  
  const getVehicleTypeLabel = (value: string): string => {
    const option = vehicleTypes.value.find(opt => opt.value === value)
    return option ? option.label : 'Select vehicle type...'
  }
  
  const getDurationLabel = (value: string): string => {
    const option = durationOptions.value.find(opt => opt.value === value)
    return option ? option.label : 'Select duration...'
  }

  // Sample parking lots data (in a real app, would come from API)
  const getParkingLots = async (location: string, vehicleType?: string, duration?: string): Promise<ParkingLot[]> => {
    console.log(`Getting parking lots near ${location} for ${vehicleType || 'any vehicle'} for ${duration || 'any duration'}`)
    
    // Simulating API call with mock data
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            name: 'Central Parking Complex',
            address: '123 Main St, Anytown',
            availableSpots: 45,
            totalSpots: 100,
            distanceInMiles: 0.5,
            imageUrl: 'https://images.unsplash.com/photo-1470224114660-3f6686c562eb',
            coordinates: { lat: 40.7128, lng: -74.0060 }
          },
          {
            id: '2',
            name: 'North Campus Garage',
            address: '456 College Ave, Anytown',
            availableSpots: 12,
            totalSpots: 120,
            distanceInMiles: 0.8,
            imageUrl: 'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98',
            coordinates: { lat: 40.7138, lng: -74.0065 }
          },
          {
            id: '3',
            name: 'Downtown Parking',
            address: '789 City Center, Anytown',
            availableSpots: 3,
            totalSpots: 75,
            distanceInMiles: 1.2,
            coordinates: { lat: 40.7148, lng: -74.0070 }
          },
          {
            id: '4',
            name: 'West Side Lot',
            address: '321 West Blvd, Anytown',
            availableSpots: 32,
            totalSpots: 50,
            distanceInMiles: 1.5,
            imageUrl: 'https://images.unsplash.com/photo-1621977717126-e29964a582e9',
            coordinates: { lat: 40.7158, lng: -74.0080 }
          },
          {
            id: '5',
            name: 'Riverside Parking',
            address: '555 River Rd, Anytown',
            availableSpots: 25,
            totalSpots: 60,
            distanceInMiles: 2.1,
            coordinates: { lat: 40.7168, lng: -74.0090 }
          }
        ])
      }, 500)
    })
  }

  // In a real app, you might fetch these from an API
  const loadParkingOptions = async (): Promise<{
    vehicleTypes: ParkingOption[];
    durationOptions: ParkingOption[];
  }> => {
    // Simulating API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          vehicleTypes: vehicleTypes.value,
          durationOptions: durationOptions.value
        })
      }, 100)
    })
  }
  
  return {
    vehicleTypes,
    durationOptions,
    selectedVehicleType,
    selectedDuration,
    destination,
    getVehicleTypeLabel,
    getDurationLabel,
    loadParkingOptions,
    getParkingLots
  }
} 