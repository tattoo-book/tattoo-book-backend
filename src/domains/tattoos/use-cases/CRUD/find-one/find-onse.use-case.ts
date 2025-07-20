import { TattoosRepository } from '@core/repositories/tattoos.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindOneTattooUseCase {
  constructor(private readonly tattooRepository: TattoosRepository) {}

  async execute(id: number) {
    return await this.tattooRepository.findOne({ where: { id } });
  }
}
