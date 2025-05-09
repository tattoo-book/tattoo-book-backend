import { Module } from '@nestjs/common';
import { TattooBookDatabaseModule } from 'src/external/database/database.module';
import { RabbitMQModule } from 'src/external/rabbitmq/rabbitmq.module';
import { UsersController } from 'src/modules/users/user.controller';
import { SendWellComeEmailUseCase } from './use-cases/users-send-email.service';
import { UsersService } from './users.service';

@Module({
  imports: [TattooBookDatabaseModule, RabbitMQModule],
  controllers: [UsersController],
  providers: [UsersService, SendWellComeEmailUseCase],
})
export class UserModule {}
