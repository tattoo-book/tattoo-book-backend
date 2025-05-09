import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDTO } from '@users/dtos/create-user.dto';

export function CreateUserDoc(...values: any[]) {
  return applyDecorators(
    ApiBody({ type: () => CreateUserDTO }),
    ApiOperation({ summary: 'Criação de usuário', description: 'Cria um novo usuario padrão no sistema' }),
    ApiResponse({ status: 200, description: 'Sucesso ao criar usuário' }),
    ApiResponse({ status: 409, description: 'Email já cadastrado' }),
    ApiResponse({ status: 500, description: 'Erro interno' }),
  );
}
