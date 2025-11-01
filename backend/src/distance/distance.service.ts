import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import {ParkingLot} from "../database/database.schema";

@Injectable()
export class DistanceService {

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  /**
   * Calculate distances from parking lots to a destination using Google Maps API
   * @param destination - Where the user wants to go
   * @param permit - User's permit type
   * @param parkingLots - Array of Parking objects
   * @returns Array of parking lot distances sorted closest to farthest
   */
  async get_distances(
    destination: string,
    permit: string,
    parkingLots: ParkingLot[]
  ): Promise<{ parkingLotId: string; distance: any }[]> {
    // Get the Google Maps API key
    const apiKey = this.configService.get<string>('GOOLGE_MAPS_API');
    if (!apiKey) {
      throw new Error('Google Maps API Key is missing!');
    }

    const url = 'https://maps.googleapis.com/maps/api/distancematrix/json';
    // 1. Create an array of promises for all valid parking lots
    const promises = parkingLots
      .filter(p => String(p.PermitTypes).includes(permit)) // only matching permit
      .map(parking => {
        const params = { origins: parking.Address, destinations: destination, key: apiKey };
        const request$ = this.httpService.get(url, { params });
        return firstValueFrom(request$) // returns a promise
          .then(response => ({
            parkingLotId: parking.ParkingID,
            distance: response.data?.rows?.[0]?.elements?.[0]?.distance,
          }))
          .catch(err => {
            console.error(`Error fetching distance for ${parking.ParkingID}:`, err.message);
            return null; // ignore failed requests
          });
      });

    // 2. Wait for all requests to complete in parallel
    const results = await Promise.all(promises);

    // 3. Filter out any nulls from failed requests
    const distances = results.filter(r => r !== null);

    // 4. Sort by distance
    distances.sort((a, b) => a.distance.value - b.distance.value);

    return distances;
  }
}