import { Module } from '@nestjs/common';
import { UsersController } from 'src/domains/users/user.controller';
import { TattooBookDatabaseModule } from 'src/external/database/database.module';
import { RabbitMQModule } from 'src/external/rabbitmq/rabbitmq.module';
import { CreateUserUseCase } from './use-cases/create/create-user.use-case';
import { SendWellComeEmailUseCase } from './use-cases/users-send-email.service';
import { UsersService } from './users.service';

@Module({
  imports: [TattooBookDatabaseModule, RabbitMQModule],
  controllers: [UsersController],
  providers: [UsersService, CreateUserUseCase, SendWellComeEmailUseCase],
})
export class UserModule {}
