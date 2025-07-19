import { Module } from '@nestjs/common';
import { UsersController } from 'src/domains/users/user.controller';
import { TattooBookDatabaseModule } from 'src/external/database/database.module';
import { RabbitMQModule } from 'src/external/rabbitmq/rabbitmq.module';
import { CreateUserUseCase } from './use-cases/create/create-user.use-case';
import { DeleteUserUseCase } from './use-cases/delete/delete.use-case';
import { FindManyUsersUseCase } from './use-cases/find-many/find-many-users.use-case';
import { FindOneUserUseCase } from './use-cases/findOne/find-one.use-case';
import { UpdateUserUseCase } from './use-cases/update/update.use-case';

@Module({
  imports: [TattooBookDatabaseModule, RabbitMQModule],
  controllers: [UsersController],
  providers: [CreateUserUseCase, UpdateUserUseCase, FindManyUsersUseCase, FindOneUserUseCase, DeleteUserUseCase],
})
export class UserModule {}
