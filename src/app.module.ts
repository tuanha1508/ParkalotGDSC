import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DistanceModule } from './distance/distance.module';
import { ConfigModule } from '@nestjs/config'
import {HttpModule} from "@nestjs/axios";
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';
import { DistanceService } from './distance/distance.service';

@Module({
  imports: [HttpModule, ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }), DistanceModule],
  controllers: [AppController],
  providers: [AppService, DatabaseService, DistanceService],
})
export class AppModule {}
