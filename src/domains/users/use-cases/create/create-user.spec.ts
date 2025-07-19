import { CreateUserDTO } from '@domains/users/dtos/create-user.dto';
import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TattooArtistsRepository } from '../../../../@core/repositories/tattoo-artist.repository';
import { UserRepository } from '../../../../@core/repositories/user.repository';
import { mockRepository } from '../../../../@core/tests/mocks';
import { CreateUserUseCase } from './create-user.use-case';

const mockUserRepository = { ...mockRepository };

const mockTattooArtistRepository = { ...mockRepository };

describe(CreateUserUseCase.name, () => {
  let useCase: CreateUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        { provide: UserRepository, useValue: mockUserRepository },
        { provide: TattooArtistsRepository, useValue: mockTattooArtistRepository },
      ],
    }).compile();

    useCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    jest.clearAllMocks();
  });

  it('should be defined ', () => {
    expect(useCase).toBeDefined();
  });

  it('should create user with success ', async () => {
    // Mocks DTOs
    const userDTO: CreateUserDTO = {
      name: 'Testerton',
      email: 'testerson@email.com',
      password: 'easypassword',
      artist: false,
    };

    // Mocks repositories
    mockUserRepository.create.mockReturnValue(userDTO);

    // Execute use case and realize tests
    await useCase.execute(userDTO);
    expect(mockUserRepository.create).toHaveBeenCalled();
    // expect(mockTattooArtistRepository.create).not.toHaveBeenCalled();
    expect(mockUserRepository.save).toHaveBeenCalled();
  });

  it('should create user artist with success ', async () => {
    // Mocks DTO
    const userDTO: CreateUserDTO = {
      name: 'Testerton',
      email: 'testerson@email.com',
      password: 'easypassword',
      artist: true,
    };

    // Execute use case and realize tests
    await useCase.execute(userDTO);
    expect(mockUserRepository.create).toHaveBeenCalled();
    expect(mockTattooArtistRepository.create).toHaveBeenCalled();
    expect(mockTattooArtistRepository.create).toHaveBeenCalledWith({ name: userDTO.name });
    expect(mockUserRepository.save).toHaveBeenCalled();
  });

  it('should throw conflict exception "Email já cadastrado" ', async () => {
    const userDTO: CreateUserDTO = {
      name: 'Testerton',
      email: 'testerson@email.com',
      password: 'easypassword',
      artist: true,
    };

    mockUserRepository.findOne.mockReturnValue(userDTO);
    const err = await useCase.execute(userDTO).catch((err) => err);
    expect(err).toBeInstanceOf(ConflictException);
    expect(err.message).toBe('Email já cadastrado');
  });
});
