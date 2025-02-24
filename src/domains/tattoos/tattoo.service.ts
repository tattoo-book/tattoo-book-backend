import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ListTattoosDTO } from '@tattoos/dtos/list-tattoo.dto';
import { UpdateTatttooDTO } from '@tattoos/dtos/update-tattoo.dto';
import { TattooLikeRepository } from 'src/core/repositories/tattoo-likes.repository';
import { TattoosRepository } from 'src/core/repositories/tattoos.repository';

@Injectable()
export class TattooService {
  constructor(
    private readonly tattooRepository: TattoosRepository,
    private tattooLikeRepository: TattooLikeRepository,
  ) {}

  async create(file: Express.Multer.File, tattooArtistId: number) {
    const imageExtension = file.mimetype.split('/')[1];
    const tattooEntity = this.tattooRepository.create({
      image: file.buffer,
      imageExtension,
      imageName: file.originalname,
      tattooArtistId,
    });

    return await this.tattooRepository.save(tattooEntity);
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
    if (tattoo.tattooArtistId !== userId) throw new UnauthorizedException('Apenas o dono pode editar essa tatuagem');

    const tattooUpdated = this.tattooRepository.merge(tattoo, updateTattooDTO);
    return await this.tattooRepository.save(tattooUpdated);
  }

  async delete(id: number) {
    const tattoo = await this.tattooRepository.findOneBy({ id });
    if (!tattoo) throw new NotFoundException(`Tattoo with id ${id} not found`);
    return await this.tattooRepository.softRemove(tattoo);
  }
}
