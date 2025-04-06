import { Injectable, Query } from '@nestjs/common';
import { DistanceModule } from './distance.module';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import path from 'path';
import * as fs from 'fs'

// Export the coordinates interface
export interface Coordinates {
  lat: number;
  lng: number;
}

// Add new interface for route result
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

// Add interface for place prediction
export interface PlacePrediction {
  description: string;
  place_id: string;
}

// Add interface for place details
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

@Injectable()
export class DistanceService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService  // Inject ConfigService
  ) {
    // Check that the API key is available at startup
    const apiKey = this.configService.get<string>('GOOGLE_MAPS_API_KEY');
    if (!apiKey) {
      console.error('WARNING: Google Maps API Key is missing from environment variables!');
    } else {
      console.log('Google Maps API Key is configured properly');
    }
  }
  // input: param destination: where the user want to go to
  //        param permit: type of permit that the user have
  // return: distance from one parking lot
  // return type: JSON
  // Example
  // [{
  //       "parkingLotId": "28",
  //       "distance": {
  //           "text": "2.7 km",
  //           "value": 2675
  //       }
  //   },
  //   {
  //       "parkingLotId": "29A",
  //       "distance": {
  //           "text": "0.4 km",
  //           "value": 422
  //       }
  //   }]
  parseJSON(path: string) {
    try {
      const data = fs.readFileSync(path, 'utf8'); // ✅ fs used correctly here
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading or parsing park_data.json:', error);
      return []; // Fallback to empty array
    }
  }
  async get_distances(@Query('destination') destination: string,
                      @Query('permit') permit: string) {
    const apiKey = this.configService.get<string>('GOOGLE_MAPS_API_KEY')

    if (!apiKey) {
      throw new Error('Google Maps API Key is missing!')
    }

    const url = 'https://maps.googleapis.com/maps/api/distancematrix/json'
    const parsedData = this.parseJSON('src/park_data.json')
    const distances: any[] = []

    for (const parking of parsedData) {
      let permitType = parking.PermitTypes
      permitType = String(permitType)
      if (permit == permitType) {
        const org = parking.Address
        const parkingId = parking.ParkingID
        const params = {
          origins: org,
          destinations: destination,
          key: apiKey,
        }

        try {
          const response$ = this.httpService.get(url, { params })
          const response = await firstValueFrom(response$)

          const distanceData = response.data?.rows?.[0]?.elements?.[0]?.distance
          if (distanceData) {
            distances.push({
              parkingLotId: parkingId, // Use actual ParkingID
              distance: distanceData,
            })
          }
        } catch (error) {
          console.error(`Error fetching distance from parking lot ${parkingId}:`, error.message)
        }
      }
    }
    distances.sort((a, b) => a.distance.value - b.distance.value)
    return distances
  }

  /**
   * Geocode an address to get coordinates
   * @param address The address to geocode
   * @returns Coordinates (lat/lng) if successful, null otherwise
   */
  async geocodeAddress(address: string): Promise<Coordinates | null> {
    try {
      const apiKey = this.configService.get<string>('GOOGLE_MAPS_API_KEY');
      
      if (!apiKey) {
        throw new Error('Google Maps API Key is missing!');
      }
      
      const url = 'https://maps.googleapis.com/maps/api/geocode/json';
      const params = {
        address,
        key: apiKey,
      };
      
      const response$ = this.httpService.get(url, { params });
      const response = await firstValueFrom(response$);
      
      if (response.data?.status === 'OK' && response.data?.results?.length > 0) {
        const location = response.data.results[0].geometry.location;
        return {
          lat: location.lat,
          lng: location.lng,
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error geocoding address:', error);
      return null;
    }
  }

  /**
   * Calculate route distance between two points
   * @param origin Origin coordinates
   * @param destination Destination coordinates
   * @param mode Travel mode (walking, driving, bicycling, transit)
   * @returns Route information including distance and duration
   */
  async calculateRouteDistance(
    origin: Coordinates,
    destination: Coordinates,
    mode: 'walking' | 'driving' | 'bicycling' | 'transit' = 'driving'
  ): Promise<RouteResult | null> {
    try {
      const apiKey = this.configService.get<string>('GOOGLE_MAPS_API_KEY');
      
      if (!apiKey) {
        throw new Error('Google Maps API Key is missing!');
      }
      
      // Use Distance Matrix API for more accurate travel distance and time
      const url = 'https://maps.googleapis.com/maps/api/distancematrix/json';
      const params = {
        origins: `${origin.lat},${origin.lng}`,
        destinations: `${destination.lat},${destination.lng}`,
        mode: mode,
        key: apiKey,
        units: 'metric' // Use metric for consistent results
      };
      
      const response$ = this.httpService.get(url, { params });
      const response = await firstValueFrom(response$);
      
      if (response.data?.status === 'OK' && 
          response.data?.rows?.[0]?.elements?.[0]?.status === 'OK') {
        const element = response.data.rows[0].elements[0];
        
        return {
          distance: element.distance,
          duration: element.duration,
          status: 'OK'
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error calculating route distance:', error);
      return null;
    }
  }

  /**
   * Get place predictions using the Places Autocomplete API
   * Matches the frontend implementation's approach
   * @param input User input for place search
   * @returns Array of place predictions
   */
  async getPlacePredictions(input: string): Promise<PlacePrediction[]> {
    try {
      // Don't proceed if input is empty
      if (!input || !input.trim()) {
        return [];
      }
      
      const apiKey = this.configService.get<string>('GOOGLE_MAPS_API_KEY');
      
      if (!apiKey) {
        throw new Error('Google Maps API Key is missing!');
      }
      
      // Use only the Autocomplete API, mimicking the frontend implementation
      const url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
      const params = {
        input,
        key: apiKey,
        sessiontoken: Date.now().toString(), // Simulate session token for billing
        components: 'country:us', // Restrict to US
        location: '28.0587,-82.4139', // Tampa coordinates for bias
        radius: '50000', // 50km radius
        types: 'establishment' // Focus on establishments (buildings, businesses)
      };
      
      console.log('Calling Places Autocomplete API with input:', input);
      
      const response$ = this.httpService.get(url, { params });
      const response = await firstValueFrom(response$);
      
      if (response.data?.status === 'OK' && response.data?.predictions) {
        console.log(`Got ${response.data.predictions.length} predictions from Autocomplete API`);
        
        // Return predictions in the same format as the frontend
        return response.data.predictions.map(prediction => ({
          description: prediction.description,
          place_id: prediction.place_id
        }));
      } else {
        console.log('No predictions found or API error:', response.data?.status);
        return [];
      }
    } catch (error) {
      console.error('Error getting place predictions:', error);
      return [];
    }
  }

  /**
   * Get detailed information for a specific place
   * @param placeId The Google Places API place_id
   * @returns Detailed place information
   */
  async getPlaceDetails(placeId: string): Promise<PlaceDetails | null> {
    try {
      const apiKey = this.configService.get<string>('GOOGLE_MAPS_API_KEY');
      
      if (!apiKey) {
        throw new Error('Google Maps API Key is missing!');
      }
      
      // Use the proper Place Details API
      const url = 'https://maps.googleapis.com/maps/api/place/details/json';
      const params = {
        place_id: placeId,
        key: apiKey,
        fields: 'name,place_id,formatted_address,geometry,types,business_status,vicinity',
      };
      
      console.log('Fetching place details for ID:', placeId);
      
      const response$ = this.httpService.get(url, { params });
      const response = await firstValueFrom(response$);
      
      console.log('Place details API status:', response.data?.status);
      
      if (response.data?.status === 'OK' && response.data?.result) {
        console.log('Successfully retrieved place details');
        return response.data.result;
      } else if (response.data?.status !== 'OK') {
        console.error('Place details error:', response.data?.status, response.data?.error_message);
      }
      
      return null;
    } catch (error) {
      console.error('Error getting place details:', error);
      return null;
    }
  }
}
