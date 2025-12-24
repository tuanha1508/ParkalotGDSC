import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * ParkingLot schema representing each parking lot document
 */
@Schema({ collection: 'parkingLots' }) // explicitly map to existing collection
export class ParkingLotDocument extends Document {
  @Prop({ required: true })
  ParkingID: string;

  @Prop()
  PermitTypes: string;

  @Prop()
  Location: string;

  @Prop()
  TotalSpaces: number;

  @Prop()
  Available: number;

  @Prop()
  Address: string;

  @Prop()
  ZipCode: string;

  @Prop()
  LastUpdated: Date;

  @Prop()
  Floors: number;

  @Prop({ default: Date.now })
  lastUpdated: Date;
}

export const DatabaseSchema = SchemaFactory.createForClass(ParkingLotDocument);