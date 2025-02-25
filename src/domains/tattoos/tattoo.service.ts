import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { TattooArtistsRepository } from '@tattoo-artist/repositories/tattoo-artist.repository';
import { ListTattoosDTO } from '@tattoos/dtos/list-tattoo.dto';
import { UpdateTatttooDTO } from '@tattoos/dtos/update-tattoo.dto';
import { TattooLikeRepository } from 'src/core/repositories/tattoo-likes.repository';
import { TattoosRepository } from 'src/core/repositories/tattoos.repository';
import EmailPublisher from '../email/EmailPublisher';
import { EmailSubscribe } from '../email/EmailSubscribe';

@Injectable()
export class TattooService {
  private subscriber: EmailSubscribe;

  constructor(
    private readonly tattooRepository: TattoosRepository,
    private tattooLikeRepository: TattooLikeRepository,
    private tattooArtist: TattooArtistsRepository,
  ) {
    this.subscriber = new EmailSubscribe();
    EmailPublisher.Subscribe(this.subscriber);
  }

  async create(createTattooDTO: any, userId: number) {
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

    const userSaved = await this.tattooRepository.save(tattooEntity);
    EmailPublisher.Notify(this.subscriber.id, `Tatuador ${tattooArtist.name} acabou de adicionar uma tatuagem`);
    return userSaved;
  }

  async find(query: ListTattoosDTO, userId: number) {
    const tattoos = await this.tattooRepository.findMany(query);

    if (query.includes && query.includes.includes('likes')) {
      const userLikes = await this.tattooLikeRepository.find({ where: { userId } });
      const likedTattooIds = userLikes.map((like) => like.tattooId);
      return tattoos.map((tattoo) => ({ ...tattoo, liked: likedTattooIds.includes(tattoo.id), likes: undefined }));
    }
    return tattoos;
  }

  async like(tattooId: number, userId: number) {
    const tattooLike = await this.tattooLikeRepository.findOneBy({ tattooId, userId });
    if (tattooLike) {
      throw new InternalServerErrorException('Você já curtiu essa tatuagem');
    }
    const tattooLikeEntity = this.tattooLikeRepository.create({ tattooId, userId });
    return await this.tattooLikeRepository.save(tattooLikeEntity);
  }

  async unlike(tattooId: number, userId: number) {
    const tattooLike = await this.tattooLikeRepository.findOneBy({ tattooId, userId });
    if (!tattooLike) {
      throw new InternalServerErrorException('Você ainda não curtiu essa tatuagem');
    }
    return await this.tattooLikeRepository.remove(tattooLike);
  }

  async findOneWithLikes(tattooArtistId: number, userId: number) {
    const tattoos = await this.tattooRepository.find({ relations: { likes: true }, where: { tattooArtistId } });

    // Busca os likes do usuário para as tatuagens
    const userLikes = await this.tattooLikeRepository.find({ where: { userId } });
    const likedTattooIds = userLikes.map((like) => like.tattooId);

    // Adiciona a coluna liked a cada tatuagem
    return tattoos.map((tattoo) => ({
      ...tattoo,
      liked: likedTattooIds.includes(tattoo.id),
    }));
  }

  async findOne(id: number) {
    return await this.tattooRepository.findOne({ where: { id } });
  }

  async update(id: number, userId: number, updateTattooDTO: UpdateTatttooDTO) {
    const tattoo = await this.tattooRepository.findOneBy({ id });
    if (!tattoo) throw new NotFoundException(`Tattoo with id ${id} not found`);

    const tattooArtist = await this.tattooArtist.findOne({ where: { userId } });
    if (tattoo.tattooArtistId !== tattooArtist.id)
      throw new UnauthorizedException('Apenas o dono pode editar essa tatuagem');

    const tattooUpdated = this.tattooRepository.merge(tattoo, updateTattooDTO);
    const saved = await this.tattooRepository.save(tattooUpdated);
    EmailPublisher.Notify(this.subscriber.id, `Tatuador ${tattoo.tattooArtistId} acabou de atualizar uma tatuagem`);
    return saved;
  }

  async delete(id: number) {
    const tattoo = await this.tattooRepository.findOneBy({ id });
    if (!tattoo) throw new NotFoundException(`Tattoo with id ${id} not found`);
    return await this.tattooRepository.softRemove(tattoo);
  }
}
