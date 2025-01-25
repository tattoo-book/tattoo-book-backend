import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TattooArtistsEntity } from '../../tattoo-artist/entities/TattooArtistsEntity';

@Entity('tattoos')
export class TattoosEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'tattoo_artist_id', type: 'int' })
  tattooArtistId: number;

  @Column({ name: 'image_name' })
  imageName: string;

  @Column({ name: 'image_extension' })
  imageExtension: string;

  @ManyToOne(() => TattooArtistsEntity, (tattooArtist) => tattooArtist.jobs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tattoo_artist_id' })
  tattooArtist: TattooArtistsEntity;

  @Column({ type: 'bytea' })
  image: Buffer;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;
}
