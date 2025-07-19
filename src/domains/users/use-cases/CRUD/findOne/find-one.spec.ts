import { TattooLikeRepository } from '@core/repositories/tattoo-likes.repository';
import { TattoosRepository } from '@core/repositories/tattoos.repository';
import { UserRepository } from '@core/repositories/user.repository';
import { mockRepository } from '@core/tests/mocks';
import { Test, TestingModule } from '@nestjs/testing';
import { FindOneUserUseCase } from './find-one.use-case';

const mockUserRepository = { ...mockRepository };

const mockTattoosRepository = { ...mockRepository };

const mockTattooLikeRepository = { ...mockRepository };

describe(FindOneUserUseCase.name, () => {
  let useCase: FindOneUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindOneUserUseCase,
        { provide: UserRepository, useValue: mockUserRepository },
        { provide: TattoosRepository, useValue: mockTattoosRepository },
        { provide: TattooLikeRepository, useValue: mockTattooLikeRepository },
      ],
    }).compile();

    useCase = module.get<FindOneUserUseCase>(FindOneUserUseCase);
    jest.clearAllMocks();
  });

  it('should be defined ', () => {
    expect(useCase).toBeDefined();
  });

  it('should find a user by id', async () => {
    // Mock DTOs
    const userId = 1;
    const user = {
      id: userId,
      name: 'John Doe',
      toModel: () => ({
        id: userId,
        name: 'John Doe',
        tattooArtist: { tattoos: [{ id: 1, name: 'tattoo 1' }] },
      }),
    };
    const userLikes = [{ tattooId: 1 }];
    const tattoos = [{ id: 1, name: 'tattoo 1' }];

    // Mock repositories
    mockUserRepository.findOne.mockResolvedValue(user);
    mockTattooLikeRepository.find.mockResolvedValue(userLikes);
    mockTattoosRepository.find.mockResolvedValue(tattoos);

    // Execute tests
    const result = await useCase.execute(userId);
    expect(mockUserRepository.findOne).toHaveBeenCalledWith({
      relations: { tattooArtist: { tattoos: true } },
      where: { id: userId },
    });
    expect(result).toEqual({
      id: userId,
      name: 'John Doe',
      tattooArtist: { tattoos: [{ id: 1, name: 'tattoo 1', liked: false }] },
      tattoos: [{ id: 1, name: 'tattoo 1', liked: true }],
    });
  });

  it('should find a user by id without tattoo artist', async () => {
    // Mock DTOs
    const userId = 1;
    const user = {
      id: userId,
      name: 'John Doe',
      toModel: () => ({
        id: userId,
        name: 'John Doe',
        tattooArtist: null,
      }),
    };
    const userLikes = [{ tattooId: 1 }];
    const tattoos = [{ id: 1, name: 'tattoo 1' }];

    // Mock repositories
    mockUserRepository.findOne.mockResolvedValue(user);
    mockTattooLikeRepository.find.mockResolvedValue(userLikes);
    mockTattoosRepository.find.mockResolvedValue(tattoos);

    // Execute tests
    const result = await useCase.execute(userId);
    expect(mockUserRepository.findOne).toHaveBeenCalledWith({
      relations: { tattooArtist: { tattoos: true } },
      where: { id: userId },
    });
    expect(result).toEqual({
      id: userId,
      name: 'John Doe',
      tattooArtist: null,
      tattoos: [{ id: 1, name: 'tattoo 1', liked: true }],
    });
  });

  it('should find a user by id without liked tattoos', async () => {
    // Mock DTOs
    const userId = 1;
    const user = {
      id: userId,
      name: 'John Doe',
      toModel: () => ({
        id: userId,
        name: 'John Doe',
        tattooArtist: { tattoos: [{ id: 1, name: 'tattoo 1' }] },
      }),
    };
    const userLikes = [];
    const tattoos = [];

    // Mock repositories
    mockUserRepository.findOne.mockResolvedValue(user);
    mockTattooLikeRepository.find.mockResolvedValue(userLikes);
    mockTattoosRepository.find.mockResolvedValue(tattoos);

    // Execute tests
    const result = await useCase.execute(userId);
    expect(mockUserRepository.findOne).toHaveBeenCalledWith({
      relations: { tattooArtist: { tattoos: true } },
      where: { id: userId },
    });
    expect(result).toEqual({
      id: userId,
      name: 'John Doe',
      tattooArtist: { tattoos: [{ id: 1, name: 'tattoo 1', liked: false }] },
      tattoos: [],
    });
  });
});
