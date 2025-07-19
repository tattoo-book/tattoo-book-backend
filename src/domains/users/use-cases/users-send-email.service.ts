import { Injectable } from '@nestjs/common';
import { UsersEntity } from '@tattoo-book-architecture/entities';
import { EmailQueue } from 'src/external/rabbitmq/email-client';

@Injectable()
export class SendWellComeEmailUseCase {
  constructor(private readonly emailBroker: EmailQueue) {}

  public execute(user: UsersEntity): void {
    this.emailBroker.send('wellcome', { message: `Bem vindo ao tattoo book ${user.name}` });
  }
}
