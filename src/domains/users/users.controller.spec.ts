import { BaseRepository } from '@architecture/repositories/base.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@users/repositories/user.repository';
import { UsersController } from '@users/user.controller';
import { UsersService } from '@users/users.service';
import { UsersEntity } from 'src/core/entities/user.entity';

describe('User Controller', () => {
  // create variables to userModule
  let usersController: UsersController;
  let usersService: UsersService;
  let userRepository: UserRepository;
  let baseRepository: BaseRepository<UsersEntity>;

  beforeEach(async () => {
    const userModule: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([UsersEntity])],
      controllers: [UsersController],
      providers: [UsersService, UserRepository],
    }).compile();

    usersController = userModule.get<UsersController>(UsersController);
    usersService = userModule.get<UsersService>(UsersService);
    userRepository = userModule.get<UserRepository>(UserRepository);
    baseRepository = userModule.get<BaseRepository<UsersEntity>>(BaseRepository);
  });

  it('Simple test', () => {
    expect('Hello wolrd').toEqual('Hello wolrd');
  });
});
