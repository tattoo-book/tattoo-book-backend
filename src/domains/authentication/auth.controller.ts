import { JWT } from '@architecture/decorators/jwt';
import { ResponseDTO } from '@architecture/dtos/ResponseDTO';
import { ExceptionDTO } from '@architecture/dtos/ResponseErrorDTO';
import { ErrorHandler } from '@architecture/handlers/error.handler';
import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JoiPipe } from 'nestjs-joi';
import { AuthService } from 'src/domains/authentication/auth.service';
import { SignInDTO } from 'src/domains/authentication/dtos/SignInDTO';

@Controller('auth')
export class AuthController {
  static readonly logger = new Logger('AuthController');
  constructor(private readonly authService: AuthService) {}

  @JWT(false)
  @Post('sign-in')
  @ApiBody({ type: () => SignInDTO })
  @ApiOperation({ description: 'Autenticação do usuário' })
  @ApiResponse({ status: 200, description: 'Usuário autenticado com sucesso' })
  @ApiResponse({ status: 400, description: 'Email não cadastrado' })
  @ApiResponse({ status: 401, description: 'Credenciais incorretas' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
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
