import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const corsOriginAddress = configService.get<string[]>('cors.corsOrigin');

  const corsOrigin =
    corsOriginAddress?.map((origin) =>
      origin.startsWith('/') && origin.endsWith('/')
        ? new RegExp(origin.slice(1, -1))
        : origin,
    ) || true;

  app.enableCors({
    origin: corsOrigin,
    methods: configService.get('cors.corsMethods'),
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(configService.get('application.port'));
};

bootstrap();
