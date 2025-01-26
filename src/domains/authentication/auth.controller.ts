import { Body, Controller, Logger, Post, UsePipes } from '@nestjs/common';
import { JoiPipe } from 'nestjs-joi';
import { ResponseDTO } from 'src/architecture/dtos/ResponseDTO';
import { ResponseErrorDTO } from 'src/architecture/dtos/ResponseErrorDTO';
import { ErrorHandler } from 'src/architecture/handlers/error.handler';
import { AuthService } from 'src/domains/authentication/auth.service';
import { SignInDTO } from 'src/domains/authentication/dtos/SignInDTO';

@Controller('auth')
export class AuthController {
  static logger = new Logger('AuthController');
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  @UsePipes(new JoiPipe())
  async signIn(@Body() signInDto: SignInDTO) {
    try {
      const user = await this.authService.signIn(signInDto);
      return ResponseDTO.OK(`Success on sign in with email ${signInDto.email}`, user);
    } catch (error) {
      console.log(error);
      const errorDescription = ErrorHandler.execute(AuthController.logger, `Failed on sign in with email ${signInDto.email}`, error);
      throw new ResponseErrorDTO(error.status, `Failed on sign in with email ${signInDto.email}`, errorDescription);
    }
  }
}
