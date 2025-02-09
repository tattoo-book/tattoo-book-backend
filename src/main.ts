import { NestFactory } from '@nestjs/core';
import 'module-alias/register';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './architecture/interceptors/logging.interceptor';
import { Swagger } from './architecture/swagger/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalInterceptors(new LoggingInterceptor());
  Swagger.setup(app);
  Swagger.setAlternativeRoutes(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
