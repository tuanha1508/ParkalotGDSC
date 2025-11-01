import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from './database.service';
import { ParkingLot, DatabaseSchema } from './database.schema';

@Module({
  imports: [
    // Register the schema as a model in NestJS DI system
    MongooseModule.forFeature([{ name: ParkingLot.name, schema: DatabaseSchema }]),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService], // Export so other modules can use it
})
export class DatabaseModule {}