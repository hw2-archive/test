import { Module, ModuleMetadata } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CourseController } from 'src/lepaya/course/course.controller';
import { CourseService } from 'src/lepaya/course/course.service';
import { TrainerService } from 'src/lepaya/trainer/trainer.service';
import { LearnerService } from 'src/lepaya/learner/learner.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './app.config';
import * as Joi from 'joi';
import { AppConfigService } from './config.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventsHandler } from './events.handler';
import { AppLogger } from './logger.service';

export const AppModuleOptions: ModuleMetadata = {
  imports: [
    HttpModule,
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: ['.env', '.env.default'],
      cache: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        APP_PORT: Joi.number(),
        LEPAYA_API_BASE_URL: Joi.string().required().not(''),
      }),
      validationOptions: {
        allowUnknown: true,
      },
    }),
  ],
  controllers: [CourseController],
  providers: [
    AppLogger,
    CourseService,
    TrainerService,
    LearnerService,
    AppConfigService,
    EventsHandler,
  ],
  exports: [AppLogger],
};

@Module(AppModuleOptions)
export class AppModule {}
