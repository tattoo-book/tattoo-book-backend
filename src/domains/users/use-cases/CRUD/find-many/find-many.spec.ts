import { UserRepository } from '@core/repositories/user.repository';
import { mockRepository } from '@core/tests/mocks';
import { Test, TestingModule } from '@nestjs/testing';
import { FindManyUsersUseCase } from './find-many-users.use-case';

const mockUserRepository = { ...mockRepository };

describe(FindManyUsersUseCase.name, () => {
  let useCase: FindManyUsersUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindManyUsersUseCase, { provide: UserRepository, useValue: mockUserRepository }],
    }).compile();

    useCase = module.get<FindManyUsersUseCase>(FindManyUsersUseCase);
    jest.clearAllMocks();
  });

  it('should be defined ', () => {
    expect(useCase).toBeDefined();
  });

  it('should find many users', async () => {
    // Mock DTOs
    const query = { limit: 10, offset: 0 };
    const users = [
      { id: 1, name: 'John Doe', toModel: () => ({ id: 1, name: 'John Doe' }) },
      { id: 2, name: 'Jane Doe', toModel: () => ({ id: 2, name: 'Jane Doe' }) },
    ];

    // Mock repositories
    mockUserRepository.findMany.mockResolvedValue(users);

    // Execute tests
    const result = await useCase.execute(query as any);
    expect(mockUserRepository.findMany).toHaveBeenCalledWith(query);
    expect(result).toEqual([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
    ]);
  });
});
