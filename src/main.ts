import { NestFactory } from '@nestjs/core';
import { LoggingInterceptor } from '@tattoo-book-architecture/interceptors';
import { Swagger } from '@tattoo-book-architecture/swagger';
import 'module-alias/register';
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
