import { ClientProviderOptions, MicroserviceOptions, Transport } from '@nestjs/microservices';

export class RabbitMQConfig {
  static readonly url = `amqp://${process.env.RMQ_USER}:${process.env.RMQ_PASSWORD}@${process.env.RMQ_HOST}:${process.env.RMQ_PORT}`;

  static consumersList = [process.env.RMQ_TATTOOS_QUEUE as string, process.env.RMQ_EMAILS_QUEUE as string];
  static clientsList = [process.env.RMQ_TATTOOS_QUEUE as string, process.env.RMQ_EMAILS_QUEUE as string];

  static registerClients() {
    return this.clientsList.map((client) => this.clients(client));
  }

  static connectConsumers(app: any) {
    this.consumersList.forEach((cons) => app.connectMicroservice(this.consumers(cons)));
  }

  static clients(queue: string): ClientProviderOptions {
    return {
      name: queue,
      transport: Transport.RMQ,
      options: {
        urls: [RabbitMQConfig.url],
        queue: queue,
        queueOptions: {
          durable: false,
        },
      },
    };
  }

  static consumers(queue: string): MicroserviceOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [RabbitMQConfig.url],
        queue: queue,
        queueOptions: {
          durable: false,
        },
      },
    };
  }
}
