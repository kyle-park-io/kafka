import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // connect kafka
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    name: configService.get<string>('name'),
    transport: configService.get<string>('transport'),
    options: configService.get<object>('options'),
  });
  await app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();
