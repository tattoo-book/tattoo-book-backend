import { UserRepository } from '@core/repositories/user.repository';
import { UpdateUserDTO } from '@domains/users/dtos/update-user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(id: number, updateUserDto: UpdateUserDTO) {
    const user = await this.userRepository.findOneOrFail({ where: { id } });
    return await this.userRepository.save(this.userRepository.merge(user, updateUserDto));
  }
}
