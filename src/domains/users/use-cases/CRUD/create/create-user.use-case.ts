import { TattooArtistsRepository } from '@core/repositories/tattoo-artist.repository';
import { UserRepository } from '@core/repositories/user.repository';
import { CreateUserDTO } from '@domains/users/dtos/create-user.dto';
import { EmailQueue } from '@external/tattoo-book-emails/tattoo=book-emails.client';
import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tattooArtistRepository: TattooArtistsRepository,
    private readonly emailBroker: EmailQueue,
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
    const userCreated = await this.userRepository.save(user);
    this.emailBroker.send('wellcome', { message: `Bem vindo ao tattoo book ${userCreated.name}` });
    return userCreated;
  }
}
