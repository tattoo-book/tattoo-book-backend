import { INestApplication } from '@nestjs/common';
import { QueueClientConfig } from './queue-client.config';
import { QueueConfig } from './queue.config';

export class RabbitMQConfig {
  static readonly url = `amqp://${process.env.RMQ_USER}:${process.env.RMQ_PASSWORD}@${process.env.RMQ_HOST}:${process.env.RMQ_PORT}`;

  static consumers(app: INestApplication<any>) {
    QueueConfig.queues.forEach((queue) => app.connectMicroservice(QueueConfig.default(queue, this.url)));
  }

  static clients() {
    return QueueClientConfig.queueClients.map((queue) => QueueClientConfig.default(queue, this.url));
  }
}
