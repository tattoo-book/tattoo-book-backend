import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RabbitmqModule } from 'src/external/rabbitmq/rabbitmq.module';
import { UsersEntity } from 'src/shared/entities/user.entity';

@Injectable()
export class SendWellcomeEmailUseCase {
  constructor(@Inject(RabbitmqModule.clients.email) private readonly emailBroker: ClientProxy) {}

  public execute(user: UsersEntity): void {
    this.emailBroker.send('wellcome', { message: `Bem vindo ao tattoo book ${user.name}` }).subscribe({
      complete: () => Logger.log('Success on send wellcome message'),
      error: (err) => Logger.error(`Failed on send wellcome message, error: ${err}`),
    });
  }
}
