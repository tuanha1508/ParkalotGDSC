import { Controller, Get, Query } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'
import { firstValueFrom } from 'rxjs'
import {GoogleModule} from './google.module'
@Controller('distance')
export class GoogleRoutesController {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService  // Inject ConfigService
  ) {
  }
  // input: param destination that the user want to go to
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
  @Get()

  async getDistances(@Query('destination') destination: string) {
    const apiKey = this.configService.get<string>('GOOGLE_MAPS_API_KEY')

    if (!apiKey) {
      throw new Error('Google Maps API Key is missing!')
    }

    const url = 'https://maps.googleapis.com/maps/api/distancematrix/json'

    const parsedData = GoogleModule.parseJSON('src/park_data.json')

    const distances: any[] = []

    for (const parking of parsedData) {
      const org = parking.Address
      const parkingId = parking.ParkingID

      const params = {
        origins: org,
        destinations: destination,
        key: apiKey,
      }

      try {
        const response$ = this.httpService.get(url, {params})
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
    distances.sort((a, b) => a.distance.value - b.distance.value)
    return distances
  }
}