import { Injectable } from '@nestjs/common';
import { EmailQueue } from 'src/external/rabbitmq/email-client';
import { UsersEntity } from 'src/shared/entities/user.entity';

@Injectable()
export class SendWellComeEmailUseCase {
  constructor(private readonly emailBroker: EmailQueue) {}

  public execute(user: UsersEntity): void {
    this.emailBroker.send('wellcome', { message: `Bem vindo ao tattoo book ${user.name}` });
  }
}
