import { TattooArtistsRepository } from '@core/repositories/tattoo-artist.repository';
import { TattoosRepository } from '@core/repositories/tattoos.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateTattooUseCase {
  constructor(
    private readonly tattooRepository: TattoosRepository,
    private readonly tattooArtist: TattooArtistsRepository,
  ) {}

  async execute(createTattooDTO: any, userId: number) {
    const tattooArtist = await this.tattooArtist.findOne({ where: { userId } });
    const tattooEntity = this.tattooRepository.create({
      title: createTattooDTO.title,
      description: createTattooDTO.description,
      imageLink: createTattooDTO.imageLink,
      tattooArtistId: tattooArtist.id,
      image: createTattooDTO.imageLink,
      imageName: createTattooDTO.title,
      imageExtension: '.png',
      searchValues: createTattooDTO.description + createTattooDTO.title,
    });

    return await this.tattooRepository.save(tattooEntity);
  }
}
