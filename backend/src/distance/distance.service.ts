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
    const distances: { parkingLotId: string; distance: any }[] = [];

    // Loop through each parking lot
    for (const parking of parkingLots) {
      // Only consider lots matching the permit type
      if (permit === String(parking.PermitTypes)) {
        const params = {
          origins: parking.Address,
          destinations: destination, // Use destination, not ParkingID
          key: apiKey,
        };

        try {
          // Call Google Maps Distance Matrix API
          const response$ = this.httpService.get(url, { params });
          const response = await firstValueFrom(response$);

          // Extract distance from the response
          const distanceFromDestination = response.data?.rows?.[0]?.elements?.[0]?.distance;

          if (distanceFromDestination) {
            distances.push({
              parkingLotId: parking.ParkingID,
              distance: distanceFromDestination,
            });
          }
        } catch (error: any) {
          console.error(
            `Error fetching distance from parking lot ${parking.ParkingID}:`,
            error.message
          );
        }
      }
    }

    // Sort distances from closest to farthest
    distances.sort((a, b) => a.distance.value - b.distance.value);

    return distances;
  }
}