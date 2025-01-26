import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TattooArtistsEntity } from '../../tattoo-artist/entities/TattooArtistsEntity';

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

  @ManyToOne(() => TattooArtistsEntity, (tattooArtist) => tattooArtist.jobs, { onDelete: 'CASCADE' })
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
