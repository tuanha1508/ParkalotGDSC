import { InternalServerErrorException, Injectable } from '@nestjs/common';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService { // Ensure the class is exported
  constructor(
      private readonly configService: ConfigService  // Inject ConfigService
    ) {}
  private dbName = 'ParkingDB';
  private collectionName = 'parkingLots';

  // Ensure the connection method is part of the class and can be accessed when needed
  async connection() {
    const uri = this.configService.get<string>('MONGODB_URI');
    if (!uri){
       throw new Error('MongoDB key is missing!')
    }
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    try {
      await client.connect();
      await client.db("admin").command({ ping: 1 });
      return client;
    } catch (error) {
      console.dir(error);
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  // Ensure get_parkings is exported and part of the service
  async get_parkings(distances: any[])  {
    const client = await this.connection()
    try {
    const db = client.db(this.dbName)
    const collection = db.collection(this.collectionName)
    const results: any[] = []

    for (const distance of distances) {
      const parkingID = distance.parkingLotId
      const found = await collection.find({ ParkingID: parkingID }).toArray()
      results.push(...found)
    }

    return results // ✅ returning array
    } catch (error) {
      console.error('MongoDB error:', error);
      return {
        statusCode: 500,
        message: 'Error fetching parking availability',
      };
    } finally {
      await client.close();
    }
  }
}