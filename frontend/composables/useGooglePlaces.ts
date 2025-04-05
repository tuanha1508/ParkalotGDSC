import { ref, onMounted } from 'vue'
import { useRuntimeConfig } from 'nuxt/app'

// Add Google Maps types
declare global {
  interface Window {
    google: {
      maps: {
        places: {
          AutocompleteService: new () => any;
          AutocompleteSessionToken: new () => any;
          PlacesServiceStatus: {
            OK: string;
          };
        };
      };
    };
  }
}

export interface PlacePrediction {
  description: string;
  place_id: string;
  [key: string]: any;
}

export function useGooglePlaces() {
  const addressSuggestions = ref<PlacePrediction[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  
  let autocompleteService: any = null
  let sessionToken: any = null
  
  const initGooglePlaces = () => {
    return new Promise<void>((resolve, reject) => {
      if (window.google && window.google.maps && window.google.maps.places) {
        console.log('Google Maps API already loaded')
        autocompleteService = new window.google.maps.places.AutocompleteService()
        sessionToken = new window.google.maps.places.AutocompleteSessionToken()
        resolve()
        return
      }
      
      console.log('Loading Google Maps API')
      
      // Load Google Maps API
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${useRuntimeConfig().public.googleMapsApiKey}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = () => {
        console.log('Google Maps API script loaded successfully')
        autocompleteService = new window.google.maps.places.AutocompleteService()
        sessionToken = new window.google.maps.places.AutocompleteSessionToken()
        resolve()
      }
      script.onerror = (e) => {
        console.error('Error loading Google Maps API script:', e)
        error.value = 'Failed to load Google Maps API'
        reject(e)
      }
      
      document.head.appendChild(script)
    })
  }
  
  const getPlacePredictions = async (input: string): Promise<PlacePrediction[]> => {
    if (!input.trim()) {
      addressSuggestions.value = []
      return []
    }
    
    if (!autocompleteService) {
      try {
        await initGooglePlaces()
      } catch (e) {
        console.error('Failed to initialize autocomplete service', e)
        return []
      }
    }
    
    isLoading.value = true
    
    try {
      const request = {
        input,
        sessionToken,
      }
      
      return new Promise<PlacePrediction[]>((resolve) => {
        autocompleteService.getPlacePredictions(request, (predictions: PlacePrediction[], status: string) => {
          console.log('Place predictions status:', status)
          isLoading.value = false
          
          if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
            console.log('Received predictions:', predictions)
            addressSuggestions.value = predictions
            resolve(predictions)
          } else {
            console.warn('No predictions received or error status:', status)
            addressSuggestions.value = []
            resolve([])
          }
        })
      })
    } catch (e) {
      console.error('Error getting place predictions:', e)
      isLoading.value = false
      addressSuggestions.value = []
      return []
    }
  }
  
  onMounted(() => {
    // Preload Google Places API if needed
    if (process.client) {
      initGooglePlaces().catch(e => console.error(e))
    }
  })
  
  return {
    addressSuggestions,
    isLoading,
    error,
    getPlacePredictions,
    initGooglePlaces
  }
} 