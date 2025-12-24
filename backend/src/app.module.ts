import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DistanceModule } from './distance/distance.module';
import { ConfigModule } from '@nestjs/config'
import {HttpModule} from "@nestjs/axios";
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from './database/database.module';
import { DistanceService } from './distance/distance.service';
// import { ChatbotService } from './chatbot/chatbot.service';

@Module({
  imports: [HttpModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    DistanceModule,
    MongooseModule.forRoot(process.env.MONGODB_URI!, { dbName: 'ParkingDB' }),
    DatabaseModule,
    ],
  controllers: [AppController],
  providers: [AppService, DistanceService],
})
export class AppModule {}
