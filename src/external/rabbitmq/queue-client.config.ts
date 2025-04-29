import { ClientProviderOptions, Transport } from '@nestjs/microservices';

export class QueueClientConfig {
  static config(queue: string, url: string): ClientProviderOptions {
    return {
      name: queue,
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
