import { INestApplication } from '@nestjs/common';
import { ClientProviderOptions, MicroserviceOptions } from '@nestjs/microservices';
import { KeyValue } from 'src/shared/types/key-value';
import { QueueClientConfig } from './queue-client.config';
import { QueueConfig } from './queue.config';

export class RabbitMQConfig {
  static readonly url = `amqp://${process.env.RMQ_USER}:${process.env.RMQ_PASSWORD}@${process.env.RMQ_HOST}:${process.env.RMQ_PORT}`;
  static readonly queues = [process.env.RMQ_TATTOOS_QUEUE as string, process.env.RMQ_EMAILS_QUEUE as string];
  static readonly queueClients = [process.env.RMQ_TATTOOS_QUEUE as string, process.env.RMQ_EMAILS_QUEUE as string];

  static consumersConfig: KeyValue<MicroserviceOptions> = {
    RMQ_TATTOOS_QUEUE: QueueConfig.default(process.env.RMQ_TATTOOS_QUEUE, this.url),
    RMQ_EMAILS_QUEUE: QueueConfig.default(process.env.RMQ_EMAILS_QUEUE, this.url),
  };

  static clientsConfig: KeyValue<ClientProviderOptions> = {
    RMQ_TATTOOS_QUEUE: QueueClientConfig.config(process.env.RMQ_TATTOOS_QUEUE, this.url),
    RMQ_EMAILS_QUEUE: QueueClientConfig.config(process.env.RMQ_EMAILS_QUEUE, this.url),
  };

  static consumers(app: INestApplication<any>) {
    this.queues.forEach((queue) => app.connectMicroservice(this.consumersConfig[queue]));
  }

  static clients() {
    console.log(this.queueClients);
    return this.queueClients.map((queue) => this.clientsConfig[queue]);
  }
}
