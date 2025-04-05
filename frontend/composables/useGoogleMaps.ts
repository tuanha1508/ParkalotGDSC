import { ref } from 'vue'

// Add type declaration for Google Maps API
declare global {
  interface Window {
    google: {
      maps: {
        DistanceMatrixService: new () => any;
        LatLng: new (lat: number, lng: number) => any;
        TravelMode: Record<string, any>;
        UnitSystem: {
          METRIC: number;
          IMPERIAL: number;
        };
        Geocoder: new () => any;
      }
    };
    initGoogleMapsCallback: () => void;
  }
}

// Interface for coordinates
interface Coordinates {
  lat: number;
  lng: number;
}

// Interface for distance response
interface DistanceResult {
  distance: {
    text: string;
    value: number; // meters
  };
  duration: {
    text: string;
    value: number; // seconds
  };
  status: string;
}

export function useGoogleMaps() {
  const isApiLoaded = ref(false);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_MAPS_API_KEY'; // Use environment variable
  
  // Initialize Google Maps API
  const initGoogleMapsApi = async (): Promise<boolean> => {
    // If already loaded, return true
    if (isApiLoaded.value || (window as any).google?.maps) {
      isApiLoaded.value = true;
      return true;
    }
    
    // Load the Google Maps API script
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry&callback=initGoogleMapsCallback`;
      script.async = true;
      script.defer = true;
      
      // Define callback for when API is loaded
      (window as any).initGoogleMapsCallback = () => {
        isApiLoaded.value = true;
        resolve(true);
      };
      
      // Handle script load error
      script.onerror = () => {
        console.error('Failed to load Google Maps API');
        resolve(false);
      };
      
      // Add script to document
      document.head.appendChild(script);
    });
  };
  
  // Calculate distance using Google Maps Distance Matrix API
  const calculateRouteDistance = async (
    origin: Coordinates,
    destination: Coordinates,
    mode: 'walking' | 'driving' | 'bicycling' | 'transit' = 'walking' // Default to walking for campus
  ): Promise<DistanceResult | null> => {
    try {
      const isLoaded = await initGoogleMapsApi();
      
      if (!isLoaded || !(window as any).google?.maps) {
        // Fallback to our simulated method if Google Maps fails to load
        console.warn('Using simulated distance calculation because Google Maps API is not available');
        return simulateDistanceMatrix(origin, destination, mode);
      }
      
      // Use the actual Google Maps API
      const service = new (window as any).google.maps.DistanceMatrixService();
      
      const result = await new Promise<google.maps.DistanceMatrixResponse>((resolve, reject) => {
        service.getDistanceMatrix({
          origins: [new (window as any).google.maps.LatLng(origin.lat, origin.lng)],
          destinations: [new (window as any).google.maps.LatLng(destination.lat, destination.lng)],
          travelMode: (window as any).google.maps.TravelMode[mode.toUpperCase()],
          unitSystem: (window as any).google.maps.UnitSystem.METRIC, // Use METRIC for kilometers
        }, (response: any, status: any) => {
          if (status === 'OK') {
            resolve(response);
          } else {
            reject(new Error(`Google Distance Matrix API request failed: ${status}`));
          }
        });
      });
      
      // Format the response
      if (result?.rows?.[0]?.elements?.[0]?.status === 'OK') {
        const element = result.rows[0].elements[0];
        return {
          distance: {
            text: element.distance.text, // Already in kilometers with the METRIC unit system
            value: element.distance.value // This is in meters
          },
          duration: {
            text: element.duration.text,
            value: element.duration.value
          },
          status: 'OK'
        };
      } else {
        // If the API fails, fall back to simulation
        console.warn('Distance Matrix API did not return a valid result, using simulation');
        return simulateDistanceMatrix(origin, destination, mode);
      }
    } catch (error) {
      console.error('Error calculating route distance:', error);
      // Fallback to simulation on error
      return simulateDistanceMatrix(origin, destination, mode);
    }
  };
  
  // Simulate distance matrix response for fallback
  const simulateDistanceMatrix = (
    origin: Coordinates,
    destination: Coordinates,
    mode: 'walking' | 'driving' | 'bicycling' | 'transit'
  ): DistanceResult => {
    // Calculate a simulated distance based on Haversine formula in kilometers
    const distanceInKm = calculateDistanceInKm(
      origin.lat, origin.lng, 
      destination.lat, destination.lng
    );
    
    // Walking routes are typically 20-40% longer than straight-line distance
    const routeFactor = mode === 'walking' ? 1.3 : 1.1;
    const routeDistanceInMeters = distanceInKm * 1000 * routeFactor;
    
    // Walking speed average: ~5 km/h = ~1.4 m/s
    // Driving speed average on campus: ~20 km/h = ~5.6 m/s
    const speedInMetersPerSecond = mode === 'walking' ? 1.4 : 5.6;
    const durationInSeconds = Math.round(routeDistanceInMeters / speedInMetersPerSecond);
    
    // Format the distance text in kilometers
    let distanceText: string;
    if (routeDistanceInMeters < 1000) {
      distanceText = `${Math.round(routeDistanceInMeters)} m`;
    } else {
      distanceText = `${(routeDistanceInMeters / 1000).toFixed(1)} km`;
    }
    
    // Format the duration text
    let durationText: string;
    if (durationInSeconds < 60) {
      durationText = `${durationInSeconds} secs`;
    } else if (durationInSeconds < 3600) {
      durationText = `${Math.floor(durationInSeconds / 60)} mins`;
    } else {
      const hours = Math.floor(durationInSeconds / 3600);
      const minutes = Math.floor((durationInSeconds % 3600) / 60);
      durationText = `${hours} hr ${minutes} mins`;
    }
    
    return {
      distance: {
        text: distanceText,
        value: Math.round(routeDistanceInMeters)
      },
      duration: {
        text: durationText,
        value: durationInSeconds
      },
      status: 'OK'
    };
  };
  
  // Calculate straight-line distance (Haversine formula) - result in MILES
  const calculateHaversineDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    // Convert latitude and longitude from degrees to radians
    const toRadians = (degrees: number) => degrees * Math.PI / 180;
    
    const rlat1 = toRadians(lat1);
    const rlng1 = toRadians(lng1);
    const rlat2 = toRadians(lat2);
    const rlng2 = toRadians(lng2);
    
    // Haversine formula
    const dLat = rlat2 - rlat1;
    const dLng = rlng2 - rlng1;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(rlat1) * Math.cos(rlat2) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    // Radius of Earth in miles
    const radius = 3959; 
    
    // Calculate the distance
    const distance = radius * c;
    
    // Return distance rounded to 1 decimal place
    return parseFloat(distance.toFixed(1));
  };
  
  // Calculate straight-line distance in KILOMETERS
  const calculateDistanceInKm = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const distanceInMiles = calculateHaversineDistance(lat1, lng1, lat2, lng2);
    // Convert miles to kilometers
    return parseFloat((distanceInMiles * 1.60934).toFixed(1));
  };
  
  // Geocode an address to get coordinates
  const geocodeAddress = async (address: string): Promise<Coordinates | null> => {
    try {
      const isLoaded = await initGoogleMapsApi();
      
      if (!isLoaded || !(window as any).google?.maps) {
        // Fallback to our simulated method if Google Maps fails to load
        return simulateGeocode(address);
      }
      
      // Use the Google Geocoding API
      const geocoder = new (window as any).google.maps.Geocoder();
      
      const result = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
        geocoder.geocode({ address }, (results: any, status: any) => {
          if (status === 'OK' && results && results.length > 0) {
            resolve(results);
          } else {
            reject(new Error(`Geocoding failed: ${status}`));
          }
        });
      });
      
      if (result && result.length > 0) {
        const location = result[0].geometry.location;
        return {
          lat: location.lat(),
          lng: location.lng()
        };
      } else {
        return simulateGeocode(address);
      }
    } catch (error) {
      console.error('Error geocoding address:', error);
      return simulateGeocode(address);
    }
  };
  
  // Simulate geocoding for fallback
  const simulateGeocode = (address: string): Coordinates => {
    // Simple mapping for well-known USF buildings
    const knownLocations: Record<string, Coordinates> = {
      'library': { lat: 28.060361, lng: -82.414250 },
      'edu': { lat: 28.060694, lng: -82.412000 },
      'msc': { lat: 28.064444, lng: -82.414583 },
      'engineering': { lat: 28.059500, lng: -82.414722 },
      'theatre': { lat: 28.064444, lng: -82.414583 },
      'rec': { lat: 28.060722, lng: -82.406278 },
      'business': { lat: 28.057861, lng: -82.410806 },
      'health': { lat: 28.066222, lng: -82.418167 },
    };
    
    // Check if the input address matches any known location
    const lowerAddress = address.toLowerCase();
    for (const [key, coords] of Object.entries(knownLocations)) {
      if (lowerAddress.includes(key)) {
        return coords;
      }
    }
    
    // Default to center of USF campus if no match
    return { lat: 28.062250, lng: -82.413056 };
  };
  
  return {
    initGoogleMapsApi,
    calculateRouteDistance,
    calculateHaversineDistance,
    calculateDistanceInKm,
    geocodeAddress,
    isApiLoaded
  };
} 