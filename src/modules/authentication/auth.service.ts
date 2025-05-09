import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignInDTO } from 'src/modules/authentication/dtos/SignInDTO';
import { SignInResponseDTO } from 'src/modules/authentication/dtos/SignInResponseDTO';
import { UserRepository } from 'src/shared/repositories/user.repository';

@Injectable()
export class AuthService {
  static readonly logger = new Logger('AuthService');

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn({ email, password: pass }: SignInDTO) {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (!user) throw new NotFoundException('Email não cadastrado.');
    const passwordIsCorrect = await bcrypt.compare(pass, user.password);
    if (!passwordIsCorrect) throw new UnauthorizedException('Senha incorreta.');

    const payload = { id: user.id, name: user.name };
    const token = this.jwtService.sign(payload);
    return SignInResponseDTO.create(token);
  }
}
