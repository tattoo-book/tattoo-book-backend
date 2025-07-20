import { applyDecorators } from '@nestjs/common';
import { ApiParam, ApiResponse } from '@nestjs/swagger';

export class StudiosDoc {
  static create = applyDecorators(
    ApiResponse({ status: 200, description: 'Sucesso ao criar estudio' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
  static findAll = applyDecorators(
    ApiResponse({ status: 200, description: 'Sucesso ao listar estudios' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );

  static findOne = applyDecorators(
    ApiParam({ name: 'id', description: 'ID do estudio' }),
    ApiResponse({ status: 200, description: 'Sucesso ao listar estudio' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );

  static update = applyDecorators(
    ApiParam({ name: 'id', description: 'ID do estudio' }),
    ApiResponse({ status: 200, description: 'Sucesso ao atualizar estudio' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );

  static delete = applyDecorators(
    ApiParam({ name: 'id', description: 'ID do estudio' }),
    ApiResponse({ status: 200, description: 'Sucesso ao deletar estudio' }),
    ApiResponse({ status: 409, description: 'Apenas o proprietário pode atualizar' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
}
