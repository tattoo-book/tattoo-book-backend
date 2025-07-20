import { CreateTattooDTO } from '@domains/tattoos/dtos/create-tattoo.dto';
import { UpdateTattooDTO } from '@domains/tattoos/dtos/update-tattoo.dto';
import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';

export class TattooDoc {
  static create = applyDecorators(
    ApiBody({ type: () => CreateTattooDTO }),
    ApiResponse({ status: 200, description: 'Sucesso ao criar tatuagem' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );

  static find = applyDecorators(
    ApiResponse({ status: 200, description: 'Sucesso ao listar tatuagens' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );

  static findOne = applyDecorators(
    ApiResponse({ status: 200, description: 'Sucesso ao listar tatuagem' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
  static like = applyDecorators(
    ApiParam({ name: 'id', description: 'ID da tatuagem que vai ser curtida' }),
    ApiResponse({ status: 200, description: 'Sucesso ao curtir tatuagem' }),
    ApiResponse({ status: 409, description: 'Tatuagem já foi curtida pelo usuário' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
  static unlike = applyDecorators(
    ApiParam({ name: 'id', description: 'ID da tatuagem que vai ser descurtida' }),
    ApiResponse({ status: 200, description: 'Sucesso ao descurtir tatuagem' }),
    ApiResponse({ status: 409, description: 'Tatuagem já foi curtida pelo usuário' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
  static update = applyDecorators(
    ApiBody({ type: () => UpdateTattooDTO }),
    ApiResponse({ status: 200, description: 'Sucesso ao atualizar tatuagem' }),
    ApiResponse({ status: 409, description: 'Apenas o dono pode atualizar a tatuagem' }),
    ApiResponse({ status: 404, description: 'Tatuagem não encontrada' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );

  static delete = applyDecorators(
    ApiResponse({ status: 200, description: 'Sucesso ao deletar tatuagem' }),
    ApiResponse({ status: 409, description: 'Apenas o dono pode deletar a tatuagem' }),
    ApiResponse({ status: 404, description: 'Tatuagem não encontrada' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
}
