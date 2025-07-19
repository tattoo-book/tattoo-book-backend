import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { TattooArtistsRepository } from 'src/@core/repositories/tattoo-artist.repository';
import { UserRepository } from 'src/@core/repositories/user.repository';
import { CreateUserDTO } from '../../dtos/create-user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tattooArtistRepository: TattooArtistsRepository,
  ) {}

  public async execute(createUserDto: CreateUserDTO) {
    const userExist = await this.userRepository.findOne({ where: { email: createUserDto.email } });
    if (userExist) throw new ConflictException('Email já cadastrado');

    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create(createUserDto);
    if (createUserDto.artist) {
      console.log(createUserDto);
      user.tattooArtist = this.tattooArtistRepository.create({ name: user.name });
    }
    return await this.userRepository.save(user);
  }
}
