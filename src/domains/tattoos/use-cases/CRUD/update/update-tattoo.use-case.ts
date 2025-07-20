import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { TattooArtistsRepository } from 'src/@core/repositories/tattoo-artist.repository';
import { TattoosRepository } from 'src/@core/repositories/tattoos.repository';
import { UpdateTattooDTO } from 'src/domains/tattoos/dtos/update-tattoo.dto';

@Injectable()
export class UpdateTattooUseCase {
  constructor(
    private readonly tattooRepository: TattoosRepository,
    private readonly tattooArtist: TattooArtistsRepository,
  ) {}

  async execute(id: number, userId: number, updateTattooDTO: UpdateTattooDTO) {
    const tattoo = await this.tattooRepository.findOneBy({ id });
    if (!tattoo) throw new NotFoundException(`Tattoo with id ${id} not found`);

    const tattooArtist = await this.tattooArtist.findOne({ where: { userId } });
    if (tattoo.tattooArtistId !== tattooArtist.id)
      throw new ForbiddenException('Apenas o dono pode editar essa tatuagem');

    const tattooUpdated = this.tattooRepository.merge(tattoo, updateTattooDTO);
    return await this.tattooRepository.save(tattooUpdated);
  }
}
