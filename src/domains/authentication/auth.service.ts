import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '@users/repositories/user.repository';
import { SignInDTO } from 'src/domains/authentication/dtos/SignInDTO';
import { SignInResponseDTO } from 'src/domains/authentication/dtos/SignInResponseDTO';

@Injectable()
export class AuthService {
  static logger = new Logger('AuthService');

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn({ email, password: pass }: SignInDTO) {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (!user) throw new NotFoundException('Email no registered');
    if (user.password !== pass) throw new UnauthorizedException('Password incorrect');

    const payload = { id: user.id, name: user.name };
    const token = this.jwtService.sign(payload);
    return SignInResponseDTO.create(token);
  }
}
