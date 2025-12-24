import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ParkingLotDocument } from './database.schema'; // Assuming schema is in the same folder

@Injectable()
export class DatabaseService {
  /**
   * Constructor injects the ParkingLot Mongoose model
   * This replaces the need for manual MongoClient connections
   */
  constructor(
    @InjectModel(ParkingLotDocument.name) private parkingModel: Model<ParkingLotDocument>,
  ) {}
  // Get all parking lot in the database
  async get_all_parkings(): Promise<ParkingLotDocument[]> {
  try {
    // Return the array of ParkingLot documents
    return await this.parkingModel.find().exec(); // Empty find() returns all documents;
  } catch (error) {
    // Log any errors and throw a generic internal server error
    console.error('MongoDB error:', error);
    throw new InternalServerErrorException('Error fetching parking lots');
  }
}
async get_all_parkings_by_permit( permit:string ): Promise<ParkingLotDocument[]> {
    // matches exact permit, case-insensitive
    const regex = new RegExp(`\\b${permit}\\b`, 'i');
    try {
    return await this.parkingModel
      .find({ PermitTypes: regex })
      .exec();
  } catch (error) {
    console.error('MongoDB error:', error);
    throw new InternalServerErrorException('Error fetching parking lots');
  }
}
async get_all_parkings_by_permit_with_limit( permit: string, limit: number ): Promise<ParkingLotDocument[]> {
  try {
    const regex = new RegExp(`\\b${permit}\\b`, 'i'); // matches exact permit, case-insensitive
    return await this.parkingModel
      .find({ PermitTypes: regex })
      .limit(limit)
      .exec();
  } catch (error) {
    console.error('MongoDB error:', error);
    throw new InternalServerErrorException('Error fetching parking lots');
  }
}
  /**
   * Fetch a single parking lot by its ParkingID
   */
  async get_parking_by_id(parkingID: string): Promise<ParkingLotDocument | null> {
    try {
      return this.parkingModel.findOne({ ParkingID: parkingID }).exec();
    } catch (error) {
      console.error('MongoDB error:', error);
      throw new InternalServerErrorException('Error fetching parking lot by ID');
    }
  }

  /**
   * Update parking availability for a given ParkingID
   */
  async update_availability(parkingID: string, available: number): Promise<ParkingLotDocument | null> {
    try {
      return this.parkingModel.findOneAndUpdate(
        { ParkingID: parkingID },               // Query condition
        { Available: available, lastUpdated: new Date() }, // Update fields
        { new: true }                            // Return the updated document
      ).exec();
    } catch (error) {
      console.error('MongoDB error:', error);
      throw new InternalServerErrorException('Error updating parking availability');
    }
  }

  /**
   * Create a new ParkingLot document
   */
  async create_parking_lot(data: Partial<ParkingLotDocument>): Promise<ParkingLotDocument> {
    try {
      const newLot = new this.parkingModel(data); // Create new Mongoose document
      return newLot.save();                        // Save document to DB
    } catch (error) {
      console.error('MongoDB error:', error);
      throw new InternalServerErrorException('Error creating new parking lot');
    }
  }
}