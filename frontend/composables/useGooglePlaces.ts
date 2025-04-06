import { ref, onMounted } from 'vue'
import { useRuntimeConfig } from 'nuxt/app'
import { useBackendApi } from './useBackendApi'

// Define PlacePrediction interface
export interface PlacePrediction {
  description: string;
  place_id: string;
  [key: string]: any;
}

export function useGooglePlaces() {
  const addressSuggestions = ref<PlacePrediction[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const backendApi = useBackendApi()
  
  /**
   * Get place predictions using the backend API
   * @param input User input for place search
   * @returns Array of place predictions
   */
  const getPlacePredictions = async (input: string): Promise<PlacePrediction[]> => {
    if (!input || !input.trim()) {
      addressSuggestions.value = []
      return []
    }
    
    isLoading.value = true
    error.value = null
    
    try {
      console.log('Searching for places with query:', input)
      
      const predictions = await backendApi.getPlacePredictions(input)
      
      console.log('Received predictions:', predictions)
      
      if (Array.isArray(predictions) && predictions.length > 0) {
        // Transform to match expected interface if needed
        addressSuggestions.value = predictions.map(prediction => ({
          description: prediction.description,
          place_id: prediction.place_id
        }))
        
        console.log('Processed predictions:', addressSuggestions.value)
        return addressSuggestions.value
      } else {
        console.log('No predictions found')
        addressSuggestions.value = []
        return []
      }
    } catch (e) {
      console.error('Error getting place predictions:', e)
      error.value = 'Failed to load place suggestions'
      addressSuggestions.value = []
      return []
    } finally {
      isLoading.value = false
    }
  }
  
  /**
   * Get detailed information about a selected place
   * @param placeId The Google Place ID to get details for
   */
  const getPlaceDetails = async (placeId: string) => {
    if (!placeId) {
      return null
    }

    try {
      isLoading.value = true
      error.value = null
      
      console.log('Getting details for place ID:', placeId)

      const details = await backendApi.getPlaceDetails(placeId)
      
      console.log('Received place details:', details)
      
      return details
    } catch (e) {
      console.error('Error getting place details:', e)
      error.value = 'Failed to load place details'
      return null
    } finally {
      isLoading.value = false
    }
  }
  
  return {
    predictions: addressSuggestions,
    isLoading,
    error,
    getPlacePredictions,
    getPlaceDetails
  }
} 