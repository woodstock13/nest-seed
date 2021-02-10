import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TalksModule} from "./domains/talks/talks.module";
import { APP_FILTER } from "@nestjs/core"
import { HttpExceptionFilter } from "./common/filters/httpException.filter"
import {SpeakersModule} from "./domains/speakers/speakers.module";

@Module({
  imports: [
    TalksModule,
    // SpeakersModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    },
  ],
})
export class AppModule {}
