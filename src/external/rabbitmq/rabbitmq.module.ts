import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { EmailQueue } from '../tattoo-book-emails/tattoo=book-emails.client';
import { RabbitMQConfig } from './rabbitmq.config';

@Module({
  imports: [ClientsModule.register(RabbitMQConfig.registerClients())],
  providers: [EmailQueue],
  exports: [EmailQueue],
})
export class RabbitMQModule {}
