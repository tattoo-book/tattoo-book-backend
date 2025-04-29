import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class EmailQueue {
  constructor(@Inject('RMQ_EMAILS_QUEUE') private readonly emailQueue: ClientProxy) {}

  send(pattern: string, data: any, subscribe?: { complete: () => void; error: (err: any) => void }) {
    this.emailQueue.send(pattern, data).subscribe(
      subscribe || {
        complete: () => Logger.log('Success on send well come message'),
        error: (err) => Logger.error(`Failed on send well come message, error: ${err}`),
      },
    );
  }
}
