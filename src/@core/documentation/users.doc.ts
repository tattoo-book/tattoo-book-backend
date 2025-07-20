import { QueryParamsPaginated } from '@core/dtos/query-params-paginated';
import { CreateUserDTO } from '@domains/users/dtos/create-user.dto';
import { UpdateUserDTO } from '@domains/users/dtos/update-user.dto';
import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

export abstract class UsersDoc {
  static create = applyDecorators(
    ApiBody({ type: () => CreateUserDTO }),
    ApiOperation({ summary: 'Criação de usuário', description: 'Cria um novo usuário padrão no sistema' }),
    ApiResponse({ status: 200, description: 'Sucesso ao criar usuário' }),
    ApiResponse({ status: 409, description: 'Email já cadastrado' }),
    ApiResponse({ status: 500, description: 'Erro interno' }),
  );

  static findAll = applyDecorators(
    ApiBody({ type: () => QueryParamsPaginated }),
    ApiOperation({ summary: 'Listagem de usuários', description: 'Listagem de usuário, ordenação e seleção' }),
    ApiResponse({ status: 200, description: 'Sucesso ao listar usuários' }),
    ApiResponse({ status: 500, description: 'Erro interno' }),
  );

  static getInfoMe = applyDecorators(
    ApiOperation({ summary: 'Listagem de perfil', description: 'Lista informações de perfil do usuário' }),
    ApiResponse({ status: 200, description: 'Sucesso ao listar informações de perfil' }),
    ApiResponse({ status: 500, description: 'Erro interno' }),
  );

  static findOne = applyDecorators(
    ApiParam({ name: 'id', description: 'Id do usuário desejado', type: 'string' }),
    ApiOperation({ summary: 'Listagem de usuário', description: 'Lista usuário individualmente' }),
    ApiResponse({ status: 200, description: 'Sucesso ao buscar usuário' }),
    ApiResponse({ status: 500, description: 'Erro interno' }),
  );

  static update = applyDecorators(
    ApiBody({ description: 'Campos do usuário que serão modificados', type: UpdateUserDTO }),
    ApiOperation({ summary: 'Atualizar de usuário', description: 'Atualiza determinados campos de um usuário' }),
    ApiResponse({ status: 200, description: 'Sucesso ao atualizar usuário' }),
    ApiResponse({ status: 500, description: 'Erro interno' }),
  );

  static delete = applyDecorators(
    ApiParam({ name: 'id', description: 'Id do usuário que será deletado' }),
    ApiOperation({ summary: 'Deleta de usuário', description: 'Faz soft delete do usuário' }),
    ApiResponse({ status: 200, description: 'Sucesso ao deletar usuário' }),
    ApiResponse({ status: 500, description: 'Erro interno' }),
  );
}
