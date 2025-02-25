import { SignInDTO } from '@authentication/dtos/SignInDTO';
import { SignInResponseDTO } from '@authentication/dtos/SignInResponseDTO';
import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '@users/repositories/user.repository';

@Injectable()
export class AuthService {
  static logger = new Logger('AuthService');

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn({ email, password: pass }: SignInDTO) {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (!user) throw new NotFoundException('Email não cadastrado.');
    // if (await bcrypt.compare(pass, user.password)) throw new UnauthorizedException('Senha incorreta.');
    if (pass != user.password) throw new UnauthorizedException('Senha incorreta.');

    const payload = { id: user.id, name: user.name };
    const token = this.jwtService.sign(payload);
    return SignInResponseDTO.create(token);
  }
}
