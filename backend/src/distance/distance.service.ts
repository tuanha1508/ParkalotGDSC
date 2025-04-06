import { Injectable, Query } from '@nestjs/common';
import { DistanceModule } from './distance.module';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import path from 'path';
import * as fs from 'fs'
@Injectable()
export class DistanceService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService  // Inject ConfigService
  ) {}
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

}
