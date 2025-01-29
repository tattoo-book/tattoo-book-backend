import { JWT } from '@architecture/decorators/jwt';
import { ResponseDTO } from '@architecture/dtos/ResponseDTO';
import { ExceptionDTO } from '@architecture/dtos/ResponseErrorDTO';
import { ErrorHandler } from '@architecture/handlers/error.handler';
import { Body, Controller, Logger, Post } from '@nestjs/common';
import { JoiPipe } from 'nestjs-joi';
import { AuthService } from 'src/domains/authentication/auth.service';
import { SignInDTO } from 'src/domains/authentication/dtos/SignInDTO';

@Controller('auth')
export class AuthController {
  static logger = new Logger('AuthController');
  constructor(private authService: AuthService) {}

  @JWT(false)
  @Post('sign-in')
  async signIn(@Body(JoiPipe) signInDto: SignInDTO) {
    try {
      const user = await this.authService.signIn(signInDto);
      return ResponseDTO.OK(`Success on sign in with email ${signInDto.email}`, user);
    } catch (error) {
      const desc = ErrorHandler.execute(AuthController.logger, `Failed on sign in with  ${signInDto.email}`, error);
      throw new ExceptionDTO(error.status, `Failed on sign in with email ${signInDto.email}`, desc);
    }
  }
}
