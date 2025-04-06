import { ref } from 'vue'
// Import the parking data directly as a fallback
import parkingDataJson from '../assets/parking-data.json'
import { useGoogleMaps } from './useGoogleMaps'

export interface ParkingOption {
  value: string;
  label: string;
}

export interface ParkingLot {
  id: string;
  name: string;
  permitTypes: string[];
  location: string;
  totalSpaces: number;
  availableSpots: number;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  zipCode: string;
  imageUrl?: string;
  distanceInKm: number;
  distanceInMiles: number; // Add this for UI compatibility
  routeDistance?: string | null;  // Distance via route (text format like "0.5 mi")
  routeDuration?: string | null;  // Time to walk/drive (text format like "8 mins")
  travelMode?: 'walking' | 'driving';
  floors: number;  // Number of floors in the parking structure
}

// Raw parking data from JSON structure
interface RawParkingData {
  ParkingID: string;
  PermitTypes: string;
  Location: string;
  TotalSpaces: number;
  Available: number;
  Address: string;
  ZipCode: string;
  Floors: number;
}

// User coordinates interface
interface UserCoordinates {
  lat: number;
  lng: number;
}

export function useParkingData() {
  const googleMaps = useGoogleMaps();
  
  // Vehicle type options based on permit types in the data
  const vehicleTypes = ref<ParkingOption[]>([
    { value: 'E', label: 'E - Staff' },
    { value: 'S', label: 'S - Non-Resident Student' },
    { value: 'R', label: 'R - Resident Student' },
    { value: 'D', label: 'D - Daily/Visitor Parking' },
    { value: 'GZ', label: 'GZ - Gold Zone Staff' },
    { value: 'HE', label: 'HE - Health Employee' },
    { value: 'Y', label: 'Y - Park-n-Ride / Alumni' }
  ])
  
  const durationOptions = ref<ParkingOption[]>([
    { value: 'short', label: 'Less than 1 hour' },
    { value: 'medium', label: '1-3 hours' },
    { value: 'long', label: 'More than 3 hours' },
  ])

  const selectedVehicleType = ref('')
  const selectedDuration = ref('')
  const destination = ref('')
  const userCoordinates = ref<UserCoordinates | null>(null)
  const selectedTravelMode = ref<'walking' | 'driving'>('walking')
  
  const getVehicleTypeLabel = (value: string): string => {
    const option = vehicleTypes.value.find(opt => opt.value === value)
    return option ? option.label : value || 'Any Vehicle'
  }
  
  const getDurationLabel = (value: string): string => {
    const option = durationOptions.value.find(opt => opt.value === value)
    return option ? option.label : 'Select duration...'
  }

  // Set travel mode
  const setTravelMode = (mode: 'walking' | 'driving') => {
    selectedTravelMode.value = mode;
  }

  // Store user's destination coordinates
  const setUserDestination = async (address: string) => {
    if (!address) {
      userCoordinates.value = null;
      return;
    }
    
    userCoordinates.value = await googleMaps.geocodeAddress(address);
    destination.value = address;
  };

  // Transform raw parking data to the format our app expects
  const transformParkingData = async (
    data: RawParkingData[], 
    userCoords: UserCoordinates | null
  ): Promise<ParkingLot[]> => {
    // First create basic parking lot objects with Haversine distance
    const parkingLots = data.map(item => {
      // Extract coordinates from the address string
      const coordParts = item.Address.split(',').map(part => parseFloat(part.trim()));
      const lat = coordParts[0] || 0;
      const lng = coordParts[1] || 0;
      
      // Get the total spaces (already a number in the updated interface)
      const totalSpaces = item.TotalSpaces;
      const availableSpots = Math.floor(Math.random() * (totalSpaces + 1));
      
      // Calculate straight-line distance if user coordinates are available (in KILOMETERS)
      let distanceInKm = 0;
      if (userCoords && userCoords.lat && userCoords.lng) {
        distanceInKm = googleMaps.calculateDistanceInKm(
          userCoords.lat, userCoords.lng, lat, lng
        );
      } else {
        // Random distance in kilometers
        distanceInKm = parseFloat((Math.random() * 5 + 0.1).toFixed(1));
      }
      
      // Convert km to miles for UI compatibility 
      const distanceInMiles = parseFloat((distanceInKm / 1.60934).toFixed(1));
      
      // Select a random image from a pool of parking images
      const imagePool = [
        'https://images.unsplash.com/photo-1470224114660-3f6686c562eb',
        'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98',
        'https://images.unsplash.com/photo-1621977717126-e29964a582e9',
        'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8',
        'https://images.unsplash.com/photo-1590674668150-c379be7ad7bf'
      ];
      const randomImageUrl = imagePool[Math.floor(Math.random() * imagePool.length)];
      
      // Split the permit types string into an array
      const permitTypes = item.PermitTypes.split(',').map(type => type.trim());
      
      // Create the lot object
      const lot: ParkingLot = {
        id: item.ParkingID,
        name: `Parking ${item.ParkingID}`,
        permitTypes,
        location: item.Location,
        totalSpaces,
        availableSpots,
        address: `USF Campus, Tampa, FL ${item.ZipCode}`,
        coordinates: { lat, lng },
        zipCode: item.ZipCode,
        imageUrl: randomImageUrl,
        distanceInKm,
        distanceInMiles,
        travelMode: selectedTravelMode.value,
        floors: item.Floors || 0
      };
      
      return lot;
    });
    
    // If we have user coordinates, calculate route distances for the closest 20 lots
    if (userCoords && userCoords.lat && userCoords.lng) {
      // Sort by straight-line distance first
      parkingLots.sort((a, b) => a.distanceInKm - b.distanceInKm);
      
      // Take the closest 20 lots to avoid too many API calls
      const closestLots = parkingLots.slice(0, 20);
      
      // Calculate route distances in parallel using Google Maps API
      const routePromises = closestLots.map(async (lot) => {
        try {
          const routeResult = await googleMaps.calculateRouteDistance(
            userCoords,
            lot.coordinates,
            selectedTravelMode.value
          );
          
          if (routeResult && routeResult.status === 'OK') {
            // Add route distance and duration to the lot
            lot.routeDistance = routeResult.distance.text;
            lot.routeDuration = routeResult.duration.text;
            
            // Convert meters to kilometers for sorting consistency
            const routeDistanceInKm = routeResult.distance.value / 1000;
            lot.distanceInKm = parseFloat(routeDistanceInKm.toFixed(1));
            // Update miles as well
            lot.distanceInMiles = parseFloat((lot.distanceInKm / 1.60934).toFixed(1));
          }
        } catch (error) {
          console.error(`Error calculating route for lot ${lot.id}:`, error);
          // Keep using the straight-line distance, don't modify the lot
        }
        return lot;
      });
      
      try {
        // Wait for all route calculations to complete
        await Promise.all(routePromises);
        
        // Re-sort ALL parking lots by distance
        // First update the distance for lots that didn't get route calculation
        parkingLots.forEach(lot => {
          // Find if this lot was in the closestLots and got updated
          const updatedLot = closestLots.find(closeLot => closeLot.id === lot.id);
          if (updatedLot && updatedLot.routeDistance) {
            // Copy the updated distance values
            lot.distanceInKm = updatedLot.distanceInKm;
            lot.distanceInMiles = updatedLot.distanceInMiles;
            lot.routeDistance = updatedLot.routeDistance;
            lot.routeDuration = updatedLot.routeDuration;
          }
        });
        
        // Now sort all lots by distance
        parkingLots.sort((a, b) => a.distanceInKm - b.distanceInKm);
        
        console.log("Sorted parking lots by distance:", 
          parkingLots.slice(0, 5).map(lot => 
            `${lot.id}: ${lot.distanceInKm}km ${lot.routeDistance || 'no route'}`
          )
        );
      } catch (error) {
        console.error('Error calculating routes:', error);
        // If route calculations fail, we still have the straight-line distances
      }
    }
    
    return parkingLots;
  };

  // Get parking lots data
  const getParkingLots = async (location: string, vehicleType?: string, duration?: string): Promise<ParkingLot[]> => {
    console.log(`Getting parking lots near ${location} for ${vehicleType || 'any vehicle'} for ${duration || 'any duration'}`);
    console.log(`Travel mode: ${selectedTravelMode.value}`);
    
    try {
      // Set user destination coordinates if location is provided
      if (location && location !== destination.value) {
        await setUserDestination(location);
      }
      
      // Try to load parking data from JSON file
      let rawParkingData: RawParkingData[] = [];
      
      try {
        // Use the imported JSON data directly to avoid routing issues
        rawParkingData = parkingDataJson as RawParkingData[];
        
        if (!rawParkingData || !Array.isArray(rawParkingData) || rawParkingData.length === 0) {
          console.error('Parking data not found or invalid format');
          return [];
        }
      } catch (error) {
        console.error('Error loading parking data:', error);
        return [];
      }
      
      // Transform raw data to our app's format with route distances
      let parkingLots = await transformParkingData(rawParkingData, userCoordinates.value);
      
      // Filter by vehicle type (permit type) if provided
      if (vehicleType) {
        parkingLots = parkingLots.filter(lot => 
          lot.permitTypes.some(type => type.toLowerCase() === vehicleType.toLowerCase())
        );
      }
      
      return parkingLots;
    } catch (error) {
      console.error('Error loading parking data:', error);
      return [];
    }
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
    userCoordinates,
    selectedTravelMode, 
    getVehicleTypeLabel,
    getDurationLabel,
    setUserDestination,
    setTravelMode,
    loadParkingOptions,
    getParkingLots
  }
} 