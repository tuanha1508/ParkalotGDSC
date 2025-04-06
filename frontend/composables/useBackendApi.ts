import { ref } from 'vue'
import { useRuntimeConfig } from 'nuxt/app'
import type { PlacePrediction } from './useGooglePlaces'

// Interface for parking lot data from backend
export interface BackendParkingLot {
  ParkingID: string;
  Available: number;
  Distance: {
    text: string;
    value: number;
  };
}

// Interface for coordinates
export interface Coordinates {
  lat: number;
  lng: number;
}

// Interface for route result
export interface RouteResult {
  distance: {
    text: string;
    value: number;
  };
  duration: {
    text: string;
    value: number;
  };
  status: string;
}

// Interface for place details
export interface PlaceDetails {
  place_id: string;
  name: string;
  formatted_address: string;
  vicinity?: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    }
  };
  types: string[];
  business_status?: string;
  opening_hours?: {
    open_now?: boolean;
    periods?: Array<{
      open: { day: number; time: string };
      close: { day: number; time: string };
    }>;
  };
  photos?: Array<{
    photo_reference: string;
    height: number;
    width: number;
  }>;
  rating?: number;
}

export function useBackendApi() {
  const config = useRuntimeConfig()
  const isLoading = ref(false)
  const hasError = ref(false)
  const errorMessage = ref('')
  const backendUrl = config.public.backendUrl || 'http://localhost:3000'

  /**
   * Get available parking lots from the backend
   * @param destination - Destination address
   * @param permit - Vehicle permit type
   * @returns List of available parking lots with distance information
   */
  const getAvailableParking = async (destination: string, permit?: string): Promise<BackendParkingLot[]> => {
    isLoading.value = true
    hasError.value = false
    errorMessage.value = ''
    
    try {
      const params = new URLSearchParams()
      
      if (destination) {
        params.append('destination', destination)
      }
      
      if (permit) {
        params.append('permit', permit)
      }
      
      const queryString = params.toString()
      const url = `${backendUrl}/availableParking${queryString ? `?${queryString}` : ''}`
      
      console.log(`Fetching parking data from backend: ${url}`)
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`Backend API error: ${response.status} ${response.statusText}`)
      }
      
      const data = await response.json()
      
      // Validate the data structure
      if (!Array.isArray(data)) {
        console.error('Invalid data format received:', data)
        if (data && typeof data === 'object') {
          // If data is an object but not array, it might be a wrapped response
          if (Array.isArray(data.results)) {
            return data.results
          }
          // Check if it's an error response
          if (data.error) {
            throw new Error(`Backend error: ${data.error}`)
          }
        }
        throw new Error('Invalid data format received from backend')
      }
      
      return data
    } catch (error) {
      console.error('Error fetching parking data from backend:', error)
      hasError.value = true
      errorMessage.value = error instanceof Error ? error.message : 'Unknown error occurred'
      return []
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Get geocoding data (coordinates) for an address from the backend
   * @param address - The address to geocode
   * @returns Coordinates (lat/lng) if successful
   */
  const getGeocodingData = async (address: string): Promise<Coordinates | null> => {
    try {
      const url = `${backendUrl}/geocode?address=${encodeURIComponent(address)}`
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`Geocoding API error: ${response.status} ${response.statusText}`)
      }
      
      const data = await response.json()
      
      if (data && typeof data.lat === 'number' && typeof data.lng === 'number') {
        return {
          lat: data.lat,
          lng: data.lng
        }
      }
      
      return null
    } catch (error) {
      console.error('Error geocoding address through backend:', error)
      return null
    }
  }

  /**
   * Calculate route distance between two points using backend API
   * @param origin - Origin coordinates
   * @param destination - Destination coordinates
   * @param mode - Travel mode (walking, driving, bicycling, transit)
   * @returns Route information including distance and duration
   */
  const calculateRouteDistance = async (
    origin: Coordinates,
    destination: Coordinates,
    mode: 'walking' | 'driving' | 'bicycling' | 'transit' = 'driving'
  ): Promise<RouteResult | null> => {
    try {
      const params = new URLSearchParams({
        originLat: origin.lat.toString(),
        originLng: origin.lng.toString(),
        destLat: destination.lat.toString(),
        destLng: destination.lng.toString(),
        mode
      })

      const url = `${backendUrl}/route?${params.toString()}`
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`Route API error: ${response.status} ${response.statusText}`)
      }
      
      const data = await response.json()
      
      if (data && data.distance && data.duration) {
        return data
      }
      
      return null
    } catch (error) {
      console.error('Error calculating route through backend:', error)
      return null
    }
  }

  /**
   * Search for places matching the input query
   * @param input - User input for place search
   * @returns Array of place search results
   */
  const getPlacePredictions = async (input: string): Promise<PlacePrediction[]> => {
    try {
      const url = `${backendUrl}/places/autocomplete?input=${encodeURIComponent(input)}`
      console.log('Sending search request to:', url)
      
      // Set a timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      try {
        const response = await fetch(url, { 
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          console.error(`Places API HTTP error: ${response.status} ${response.statusText}`)
          throw new Error(`Places API error: ${response.status} ${response.statusText}`)
        }
        
        const data = await response.json()
        
        if (Array.isArray(data)) {
          console.log(`Received ${data.length} search results from backend`)
          return data
        } else if (data.statusCode && data.message) {
          // Handle error responses with statusCode/message format
          console.error('Backend error:', data.message)
          return []
        }
        
        console.warn('Unexpected response format from places API:', data)
        return []
      } catch (fetchError: unknown) {
        clearTimeout(timeoutId);
        if (fetchError instanceof Error && fetchError.name === 'AbortError') {
          console.error('Request timed out');
          throw new Error('Request timed out after 5 seconds');
        }
        throw fetchError;
      }
    } catch (error) {
      console.error('Error searching for places from backend:', error)
      // Don't throw the error, return empty array to prevent component crash
      return []
    }
  }

  /**
   * Get detailed information for a specific place
   * @param placeId - The Google Places place_id
   * @returns Detailed place information if successful
   */
  const getPlaceDetails = async (placeId: string): Promise<PlaceDetails | null> => {
    try {
      const url = `${backendUrl}/places/details?place_id=${encodeURIComponent(placeId)}`
      console.log('Fetching place details from:', url)
      
      // Set a timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      try {
        const response = await fetch(url, { 
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          console.error(`Place details API HTTP error: ${response.status} ${response.statusText}`)
          throw new Error(`Places API error: ${response.status} ${response.statusText}`)
        }
        
        const data = await response.json()
        
        if (data && data.place_id) {
          console.log('Successfully retrieved place details')
          return data
        } else if (data.statusCode && data.message) {
          // Handle error responses
          console.error('Backend error:', data.message)
          return null
        }
        
        console.warn('Unexpected response format from place details API:', data)
        return null
      } catch (fetchError: unknown) {
        clearTimeout(timeoutId);
        if (fetchError instanceof Error && fetchError.name === 'AbortError') {
          console.error('Request timed out');
          throw new Error('Request timed out after 5 seconds');
        }
        throw fetchError;
      }
    } catch (error) {
      console.error('Error getting place details from backend:', error)
      return null
    }
  }

  return {
    getAvailableParking,
    getGeocodingData,
    calculateRouteDistance,
    getPlacePredictions,
    getPlaceDetails,
    isLoading,
    hasError,
    errorMessage
  }
} 