import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDTO } from 'src/common/classes/DTOs/auth/SignInDTO';
import { SignInResponseDTO } from 'src/common/classes/DTOs/auth/SignInResponseDTO';
import { UserRepository } from 'src/repositories/UserRepository';

@Injectable()
export class AuthService {
  static logger = new Logger('AuthService');

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn({ email, password: pass }: SignInDTO) {
    const user = await this.userRepository.findByEmail(email);
    if (user?.password !== pass) throw new UnauthorizedException('Password incorrect');

    const payload = { id: user.id, name: user.name };
    const token = await this.jwtService.signAsync(payload);
    return SignInResponseDTO.create(token);
  }
}
