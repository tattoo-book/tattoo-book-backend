import { NestFactory } from '@nestjs/core';
import 'module-alias/register';
import { LoggingInterceptor, Swagger } from 'tattoo-book-architecture/libs/tattoo-book/src';
import { AppModule } from './app.module';
import { RabbitmqModule } from './external/rabbitmq/rabbitmq.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' });
  app.useGlobalInterceptors(new LoggingInterceptor());

  app.connectMicroservice(RabbitmqModule.connectTattooQueue());
  app.connectMicroservice(RabbitmqModule.connectEmailQueue());
  app.startAllMicroservices();

  Swagger.setup(app);
  Swagger.setAlternativeRoutes(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
