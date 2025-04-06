import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
  providers: [DatabaseService], // Make DatabaseService available for injection
})
export class DatabaseModule {}