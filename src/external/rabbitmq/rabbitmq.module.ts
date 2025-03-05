import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientProviderOptions, MicroserviceOptions, Transport } from '@nestjs/microservices';

@Module({ imports: [ConfigModule.forRoot()] })
export class RabbitmqModule {
  private static readonly urlServer = [
    `amqp://${process.env.RMQ_USER}:${process.env.RMQ_PASSWORD}@${process.env.RMQ_HOST}:${process.env.RMQ_PORT}`,
  ];

  public static readonly clients = {
    tattoo: 'TATTOO_PRODUCER',
    email: 'EMAIL_PRODUCER',
  };
  public static readonly queues = {
    tattoos: 'tattoos',
    email: 'email',
  };

  public static registerTattooClient(): ClientProviderOptions {
    return {
      name: this.clients.tattoo,
      transport: Transport.RMQ,
      options: {
        urls: this.urlServer,
        queue: this.queues.tattoos,
        queueOptions: {
          durable: false,
        },
      },
    };
  }

  public static registerEmailClient(): ClientProviderOptions {
    return {
      name: this.clients.email,
      transport: Transport.RMQ,
      options: {
        urls: this.urlServer,
        queue: this.queues.email,
        queueOptions: {
          durable: false,
        },
      },
    };
  }

  public static connectTattooQueue(): MicroserviceOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: this.urlServer,
        queue: this.queues.tattoos,
        queueOptions: {
          durable: false,
        },
      },
    };
  }

  public static connectEmailQueue(): MicroserviceOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: this.urlServer,
        queue: this.queues.email,
        queueOptions: {
          durable: false,
        },
      },
    };
  }
}
