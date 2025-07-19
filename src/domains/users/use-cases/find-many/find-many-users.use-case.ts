import { UserRepository } from '@core/repositories/user.repository';
import { QueryParamsPaginated } from '@domains/users/dtos/list-user.dto';
import { Injectable } from '@nestjs/common';
import { UsersEntity } from '@tattoo-book-architecture/entities';

@Injectable()
export class FindManyUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(query: QueryParamsPaginated<UsersEntity>) {
    const users = await this.userRepository.findMany(query);
    return users.map((user) => user.toModel());
  }
}
