import { ClientProviderOptions, Transport } from '@nestjs/microservices';

export class QueueClientConfig {
  static readonly queueClients = [process.env.RMQ_TATTOOS_QUEUE as string, process.env.RMQ_EMAILS_QUEUE as string];

  static default(queue: string, url: string): ClientProviderOptions {
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
