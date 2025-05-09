import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export class QueueConfig {
  static readonly queues = [process.env.RMQ_TATTOOS_QUEUE as string, process.env.RMQ_EMAILS_QUEUE as string];

  static default(queue: string, url: string): MicroserviceOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [url],
        queue: queue,
        queueOptions: {
          durable: false,
        },
      },
    };
  }
}
