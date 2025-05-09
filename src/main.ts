import { NestFactory } from '@nestjs/core';
import { LoggingInterceptor } from '@tattoo-book-architecture/interceptors';
import { Swagger } from '@tattoo-book-architecture/swagger';
import 'module-alias/register';
import { AppModule } from './app.module';
import { RabbitMQConfig } from './external/rabbitmq/rabbitmq.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' });
  app.useGlobalInterceptors(new LoggingInterceptor());

  RabbitMQConfig.consumers(app);
  Swagger.configure(app);
  Swagger.setAlternativeRoutes(app);

  app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
