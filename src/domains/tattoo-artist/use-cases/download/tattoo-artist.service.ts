import { TattooArtistsRepository } from '@core/repositories/tattoo-artist.repository';
import { HoursFileType, ScheduleDocument } from '@domains/tattoo-artist/document/horarios/horarios.document';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DownloadTattooArtistScheduleUseCase {
  constructor(private readonly tattooArtistsRepository: TattooArtistsRepository) {}

  async execute(type: HoursFileType) {
    const scheduling = await this.tattooArtistsRepository.findOne({ where: { id: 2 } });
    const document = ScheduleDocument.create(type, scheduling.schedulings);
    return document.build().export();
  }
}
