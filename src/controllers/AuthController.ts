import { Body, Controller, Logger, Post, UsePipes } from '@nestjs/common';
import { JoiPipe } from 'nestjs-joi';
import { SignInDTO } from 'src/common/classes/DTOs/auth/SignInDTO';
import { ResponseDTO } from 'src/common/classes/DTOs/ResponseDTO';
import { ResponseErrorDTO } from 'src/common/classes/DTOs/ResponseErrorDTO';
import { ErrorHandler } from 'src/common/handlers/ErrorHandler';
import { AuthService } from 'src/services/AuthService';

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
      const errorDescription = ErrorHandler.execute(AuthController.logger, `Failed on sign in with email ${signInDto.email}`, error);
      return new ResponseErrorDTO(error.status, `Failed on sign in with email ${signInDto.email}`, errorDescription);
    }
  }
}
