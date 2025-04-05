import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleModule } from './distance/google.module';
import {
  GoogleRoutesController
} from "./distance/google-routes.controller";
import { ConfigModule } from '@nestjs/config'
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [HttpModule, ConfigModule.forRoot({ isGlobal: true }), GoogleModule],
  controllers: [AppController, GoogleRoutesController],
  providers: [AppService],
})
export class AppModule {}
