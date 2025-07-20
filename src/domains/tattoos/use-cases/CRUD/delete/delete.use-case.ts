import { TattoosRepository } from '@core/repositories/tattoos.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class DeleteTattooUseCase {
  constructor(private readonly tattooRepository: TattoosRepository) {}

  async execute(id: number) {
    const tattoo = await this.tattooRepository.findOneBy({ id });
    if (!tattoo) throw new NotFoundException(`Tattoo with id ${id} not found`);
    return await this.tattooRepository.softRemove(tattoo);
  }
}
