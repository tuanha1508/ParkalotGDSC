import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

/**
 * Camera schema for individual camera entries
 */
@Schema({ collection: 'parkingLots' })
export class Camera {
  @Prop({ required: true })
  CameraIP: string;
}

export const CameraSchema = SchemaFactory.createForClass(Camera);

/**
 * ParkingLot schema representing each parking lot document
 */
@Schema()
export class ParkingLot extends Document {
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

  @Prop({ type: [CameraSchema] })
  Cameras: Camera[];

  @Prop({ default: Date.now })
  lastUpdated: Date;
}

export const DatabaseSchema = SchemaFactory.createForClass(ParkingLot);