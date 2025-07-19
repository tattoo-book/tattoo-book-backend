import { TattooBookDatabaseModule } from '@external/database/database.module';
import { RabbitMQModule } from '@external/rabbitmq/rabbitmq.module';
import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './use-cases/CRUD/create/create-user.use-case';
import { DeleteUserUseCase } from './use-cases/CRUD/delete/delete.use-case';
import { FindManyUsersUseCase } from './use-cases/CRUD/find-many/find-many-users.use-case';
import { FindOneUserUseCase } from './use-cases/CRUD/findOne/find-one.use-case';
import { UpdateUserUseCase } from './use-cases/CRUD/update/update.use-case';
import { UsersController } from './user.controller';

@Module({
  imports: [TattooBookDatabaseModule, RabbitMQModule],
  controllers: [UsersController],
  providers: [CreateUserUseCase, UpdateUserUseCase, FindManyUsersUseCase, FindOneUserUseCase, DeleteUserUseCase],
})
export class UserModule {}
