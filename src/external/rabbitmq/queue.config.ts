import { MicroserviceOptions, Transport } from '@nestjs/microservices';

export class QueueConfig {
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
