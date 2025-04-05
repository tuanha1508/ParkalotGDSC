import { Module } from '@nestjs/common';
import { GoogleRoutesController } from './google-routes.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import * as fs from 'fs';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({ isGlobal: true }), // Load environment variables globally
  ],
  controllers: [GoogleRoutesController],
})
export class GoogleModule {
  static parseJSON(path: string) {
    try {
      const data = fs.readFileSync(path, 'utf8'); // ✅ fs used correctly here
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading or parsing park_data.json:', error);
      return []; // Fallback to empty array
    }
  }
}
