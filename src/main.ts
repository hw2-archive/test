import { Logger } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { AppConfigService } from './app/config.service';
import { AllExceptionsFilter } from './app/exception.filter';
import { AppLogger } from './app/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(AppLogger));
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  const configService = app.get(AppConfigService);

  const docPath = 'api-docs';
  const port = configService.port;

  const config = new DocumentBuilder()
    .setTitle('Lepaya Backend Recruitment Test')
    .setDescription('Recruitment test for Lepaya backend team')
    .setVersion('1.0')
    .addTag('lepaya')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(docPath, app, document);

  await app.listen(port);

  Logger.log(`Application is running on: \x1b[34m http://localhost:${port}/`);
  Logger.log(
    `API Documentation available on: \x1b[34m http://localhost:${port}/${docPath}`,
  );
}

bootstrap();
