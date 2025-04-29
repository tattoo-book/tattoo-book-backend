import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { EmailQueue } from './email-client';
import { RabbitMQConfig } from './rabbitmq.config';

@Module({
  imports: [ConfigModule.forRoot(), ClientsModule.register(RabbitMQConfig.clients())],
  providers: [EmailQueue],
  exports: [EmailQueue],
})
export class RabbitMQModule {}
