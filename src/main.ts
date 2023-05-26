import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './core/filters/http-exception.filter';
import { AppLogger } from './core/logger/app-logger';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //create a global-scoped filter
  app.useGlobalFilters(new HttpExceptionFilter(new AppLogger()));

  const config = new DocumentBuilder()
    .setTitle('Regov MVP API')
    .setDescription('MVP for an event management review and rating app')
    .setVersion('1.0')
    .addServer('/api')
    .addBearerAuth()
    .addTag('Permission', 'Handling permissions functionality')
    .addTag('Role', 'Handling role functionality')
    .addTag('User', 'User Registration')
    .addTag('Auth', 'Handling authentication')
    .addTag('Community News', 'Handling community news functionality')
    .addTag('Event', 'Handling event functionality')
    .addTag('Event Review', 'Handling event review functionality')
    .addTag('Note', 'Handling note functionality')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.setGlobalPrefix('api');

  app.enableCors();
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);
}

bootstrap();
