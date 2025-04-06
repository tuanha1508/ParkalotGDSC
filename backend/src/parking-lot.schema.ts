// src/parking-lot.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ParkingLotDocument = ParkingLot & Document;

@Schema()
export class ParkingLot {
  @Prop({ required: true })
  ParkingID: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  Location: string;

  @Prop({ required: true, default: 0 })
  TotalSpaces: number;

  @Prop({ required: true, default: 0 })
  Available: number;

  @Prop()
  lastUpdated: Date;
}

export const ParkingLotSchema = SchemaFactory.createForClass(ParkingLot);
