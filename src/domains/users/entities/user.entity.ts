import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { StudiosEntity } from '../../studios/entities/studios.entitty';
import { TattooArtistsEntity } from '../../tattoo-artist/entities/TattooArtistsEntity';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column('int', { array: true, default: () => 'ARRAY[2]', nullable: false })
  roles: number[];

  @Column('text')
  password: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;

  @OneToMany(() => TattooArtistsEntity, (TattoArtist) => TattoArtist.user)
  tattooArtist: TattooArtistsEntity[];

  @OneToMany(() => StudiosEntity, (Studios) => Studios.owner)
  studios: StudiosEntity[];

  setRoles(roles: number[]) {
    this.roles = roles;
  }
}
