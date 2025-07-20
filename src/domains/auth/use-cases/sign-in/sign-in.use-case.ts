import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/@core/repositories/user.repository';
import { SignInDTO } from '../../dtos/SignInDTO';
import { SignInResponseDTO } from '../../dtos/SignInResponseDTO';

@Injectable()
export class SignInUseCase {
  static readonly logger = new Logger('AuthService');

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute({ email, password: pass }: SignInDTO) {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (!user) throw new NotFoundException('Email não cadastrado.');
    const passwordIsCorrect = await bcrypt.compare(pass, user.password);
    if (!passwordIsCorrect) throw new UnauthorizedException('Senha incorreta.');

    const payload = { id: user.id, name: user.name };
    const token = this.jwtService.sign(payload);
    return SignInResponseDTO.create(token);
  }
}
