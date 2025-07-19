import { UserRepository } from '@core/repositories/user.repository';
import { mockRepository } from '@core/tests/mocks';
import { Test, TestingModule } from '@nestjs/testing';
import { DeleteUserUseCase } from './delete.use-case';

const mockUserRepository = { ...mockRepository };

describe(DeleteUserUseCase.name, () => {
  let useCase: DeleteUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteUserUseCase, { provide: UserRepository, useValue: mockUserRepository }],
    }).compile();

    useCase = module.get<DeleteUserUseCase>(DeleteUserUseCase);
    jest.clearAllMocks();
  });

  it('should be defined ', () => {
    expect(useCase).toBeDefined();
  });

  it('should delete a user', async () => {
    // Mock DTOs
    const userId = 1;
    const user = { id: userId, name: 'John Doe' };

    // Mock repositories
    mockUserRepository.findOneOrFail.mockResolvedValue(user);
    mockUserRepository.softRemove.mockResolvedValue(user);

    // Execute tests
    const result = await useCase.execute(userId);
    expect(mockUserRepository.findOneOrFail).toHaveBeenCalledWith({ where: { id: userId } });
    expect(mockUserRepository.softRemove).toHaveBeenCalledWith(user);
    expect(result).toEqual(user);
  });

  it('should throw an error if user not found', async () => {
    // Mock DTOs
    const userId = 1;

    // Mock repositories
    mockUserRepository.findOneOrFail.mockRejectedValue(new Error('User not found'));

    // Execute tests
    const err = await useCase.execute(userId).catch((err) => err);
    expect(mockUserRepository.findOneOrFail).toHaveBeenCalledWith({ where: { id: userId } });
    expect(mockUserRepository.softRemove).not.toHaveBeenCalled();
  });
});
