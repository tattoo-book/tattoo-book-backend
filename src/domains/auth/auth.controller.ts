import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JWT } from '@tattoo-book-architecture/decorators';
import { ResponseDTO } from '@tattoo-book-architecture/dtos';
import { JoiPipe } from 'nestjs-joi';
import { SignInDTO } from './dtos/SignInDTO';
import { SignInUseCase } from './use-cases/sign-in/sign-in.use-case';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: SignInUseCase) {}

  @JWT(false)
  @Post('sign-in')
  @ApiBody({ type: () => SignInDTO })
  @ApiOperation({ description: 'Autenticação do usuário' })
  @ApiResponse({ status: 200, description: 'Usuário autenticado com sucesso' })
  @ApiResponse({ status: 400, description: 'Email não cadastrado' })
  @ApiResponse({ status: 401, description: 'Credenciais incorretas' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async signIn(@Body(JoiPipe) signInDto: SignInDTO) {
    const user = await this.authService.execute(signInDto);
    return ResponseDTO.OK(`Success on sign in with email ${signInDto.email}`, user);
  }
}
