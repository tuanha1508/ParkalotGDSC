import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { DistanceService } from './distance.service';
import * as fs from 'fs';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({ isGlobal: true }), // Load environment variables globally
  ],
  providers: [DistanceService],
})
export class DistanceModule {}
