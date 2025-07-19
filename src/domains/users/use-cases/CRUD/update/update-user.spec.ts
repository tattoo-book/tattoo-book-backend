import { UserRepository } from '@core/repositories/user.repository';
import { mockRepository } from '@core/tests/mocks';
import { UpdateUserDTO } from '@domains/users/dtos/update-user.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserUseCase } from './update.use-case';

const mockUserRepository = { ...mockRepository };

describe(UpdateUserUseCase.name, () => {
  let useCase: UpdateUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateUserUseCase, { provide: UserRepository, useValue: mockUserRepository }],
    }).compile();

    useCase = module.get<UpdateUserUseCase>(UpdateUserUseCase);
    jest.clearAllMocks();
  });

  it('should be defined ', () => {
    expect(useCase).toBeDefined();
  });

  it('should be update user with success', async () => {
    // Mock inputs
    const id = 1;
    const updateUserDto: UpdateUserDTO = {
      name: 'teste',
    };

    // Mock repositories
    mockUserRepository.findOneOrFail.mockReturnValue({ id, ...updateUserDto });
    mockUserRepository.merge.mockReturnValue({ id, ...updateUserDto });

    // Execute tests
    await useCase.execute(id, updateUserDto);
    expect(mockUserRepository.findOneOrFail).toHaveBeenCalled();
    expect(mockUserRepository.findOneOrFail).toHaveBeenCalledWith({ where: { id } });
    expect(mockUserRepository.merge).toHaveBeenCalled();
    expect(mockUserRepository.merge).toHaveBeenCalledWith({ id, ...updateUserDto }, updateUserDto);
    expect(mockUserRepository.save).toHaveBeenCalledWith({ id, ...updateUserDto });
  });
});
