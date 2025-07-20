import { CreateTattooArtistDTO } from '@domains/tattoo-artist/dtos/create-tattoo-artist.dto';
import { UpdateTattooArtistDTO } from '@domains/tattoo-artist/dtos/update.tattoo.artist';
import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';

export class TattooArtistDoc {
  static create = applyDecorators(
    ApiBody({ description: 'Dados de criação do tatuador', type: () => CreateTattooArtistDTO }),
    ApiResponse({ status: 200, description: 'Sucesso ao criar tatuador' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );

  static find = applyDecorators(
    ApiResponse({ status: 200, description: 'Success ao listar tatuadores' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );

  static download = applyDecorators(
    ApiParam({ name: 'typw', description: 'Tipo de arquivo que vai ser exportado' }),
    ApiResponse({ status: 200, description: 'Success ao exportar horários' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );

  static findOne = applyDecorators(
    ApiParam({ name: 'id', description: 'ID do tatuador' }),
    ApiResponse({ status: 200, description: 'Success ao listar tatuador' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );

  static update = applyDecorators(
    ApiParam({ name: 'id', description: 'ID do tatuador que vai ser atualizado' }),
    ApiBody({ description: 'Dados de atualização do tatuador', type: () => UpdateTattooArtistDTO }),
    ApiResponse({ status: 200, description: 'Success ao atualizar tatuador' }),
    ApiResponse({ status: 404, description: 'Tatuador não encontrada' }),
    ApiResponse({ status: 409, description: 'Apenas o próprio tatuador pode atualizar seus atributos' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );

  static delete = applyDecorators(
    ApiParam({ name: 'id', description: 'ID do tatuador' }),
    ApiResponse({ status: 200, description: 'Success ao atualizar tatuador' }),
    ApiResponse({ status: 404, description: 'Tatuador não encontrada' }),
    ApiResponse({ status: 500, description: 'Internal server error' }),
  );
}
