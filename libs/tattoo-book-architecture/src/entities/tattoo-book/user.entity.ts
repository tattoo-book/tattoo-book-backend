import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StudiosEntity } from './studios.entitty';
import { TattooArtistsEntity } from './tattoo-artist.entity';
import { TattoosLikesEntity } from './tattoos-likes';

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

  @Column({ name: 'password' })
  password: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;

  @OneToOne(() => TattooArtistsEntity, (TattoArtist) => TattoArtist.user, {
    cascade: ['insert'],
  })
  tattooArtist: TattooArtistsEntity;

  @OneToMany(() => StudiosEntity, (Studios) => Studios.owner)
  studios: StudiosEntity[];

  @OneToMany(() => TattoosLikesEntity, (tattooLike) => tattooLike.user)
  likes: TattoosLikesEntity[];

  toModel<T extends Partial<UsersEntity>>() {
    return Object.assign(this, {
      password: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      deletedAt: undefined,
    });
  }

  setRoles(roles: number[]) {
    this.roles = roles;
  }
}
