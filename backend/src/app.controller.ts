import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { DistanceService } from './distance/distance.service';
import {ParkingLot} from "./database/database.schema";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly databaseService: DatabaseService,
    private readonly distanceService: DistanceService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
// input: param destination: where the user want to go to
  //        param permit: type of permit that the user have
  // return: example below
  // return type: JSON Object
  // Example
  // [
  //     {
  //         "ParkingID": "29B",
  //         "Available": 365,
  //         "Distance": {
  //             "text": "0.5 km",
  //             "value": 467
  //         }
  //     },
  //     {
  //         "ParkingID": "29A",
  //         "Available": 320,
  //         "Distance": {
  //             "text": "0.6 km",
  //             "value": 570
  //         }
  //     },
  //     {
  //         "ParkingID": "33T",
  //         "Available": 50,
  //         "Distance": {
  //             "text": "2.7 km",
  //             "value": 2660
  //         }
  //     }
  // ]
  @Get('/availableParking')
  async get_avail(
    @Query('destination') destination: string,
    @Query('permit') permit: string
  ) {
    try {
      // Maybe add a cache here
      // Get parking lots from DatabaseService (to get the updated count of available parking lots)
      const parkingLots = await this.databaseService.get_all_parkings_by_permit_with_limit(permit, 10);
      const distances = await this.distanceService.get_distances(destination, permit, parkingLots);
      // Check if parking lots data is in the correct format
      if (!Array.isArray(distances) || !Array.isArray(parkingLots)) {
        return {
          statusCode: 500,
          message: 'Parking lots data is not in the correct format',
        };
      }

      // Initialize an empty array to store the merged results
      const merged: { ParkingID: string; Available: number; Distance: any }[] = [];

      // Loop through each distance object
      for (let i = 0; i < distances.length; i++) {
        const d = distances[i];

        // Find the corresponding parking lot by ParkingID
        let lot: ParkingLot | undefined;
        for (let j = 0; j < parkingLots.length; j++) {
          if (parkingLots[j].ParkingID === d.parkingLotId) {
            lot = parkingLots[j];
            break; // Stop searching once found
          }
        }

        // Push merged object to the result array
        merged.push({
          ParkingID: d.parkingLotId,
          Available: lot?.Available ?? 0,
          Distance: d.distance,
        });
      }

      // Return the merged result
      return merged;

    } catch (error) {
      // Handle any errors that occur during the process
      console.error('Error fetching parking availability:', error);
      return {
        statusCode: 500,
        message: 'Something went wrong while fetching parking availability',
      };
    }
  }
}