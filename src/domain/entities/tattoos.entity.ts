import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TattooArtistsEntity } from './tattoo-artist.entity';
import { TattoosLikesEntity } from './tattoos-likes';

@Entity('tattoos')
export class TattoosEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ name: 'tattoo_artist_id', type: 'int' })
  tattooArtistId: number;

  @Column({ name: 'image_name' })
  imageName: string;

  @Column({ name: 'image_extension' })
  imageExtension: string;

  @Column({ name: 'image_link' })
  imageLink: string;

  @Column({ name: 'search_values', type: 'text' })
  searchValues: string;

  @Column()
  popularity: number;

  @OneToMany(() => TattoosLikesEntity, (TattoosLikesEntity) => TattoosLikesEntity.tattoo)
  @JoinColumn({ name: 'id' })
  likes: TattoosLikesEntity[];

  @ManyToOne(() => TattooArtistsEntity, (tattooArtist) => tattooArtist.tattoos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tattoo_artist_id' })
  tattooArtist: TattooArtistsEntity;

  @Column({ type: 'bytea', select: false })
  image: Buffer;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', select: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true, select: false })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true, select: false })
  deletedAt: Date;
}
