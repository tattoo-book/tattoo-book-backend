import { Module } from '@nestjs/common';
import { UsersController } from 'src/domains/users/user.controller';
import { DatabaseModule } from 'src/external/database/database.module';
import { RabbitMQModule } from 'src/external/rabbitmq/rabbitmq.module';
import { SendWellComeEmailUseCase } from './use-cases/users-send-email.service';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule, RabbitMQModule],
  controllers: [UsersController],
  providers: [UsersService, SendWellComeEmailUseCase],
})
export class UserModule {}
