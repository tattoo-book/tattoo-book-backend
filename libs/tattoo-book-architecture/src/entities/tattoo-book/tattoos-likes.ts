import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TattoosEntity } from './tattoos.entity';
import { UsersEntity } from './user.entity';

@Entity('tattoos_likes')
export class TattoosLikesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'tattoo_id' })
  tattooId: number;

  @ManyToOne(() => TattoosEntity, (tattoo) => tattoo.likes)
  @JoinColumn({ name: 'tattoo_id' })
  tattoo: TattoosEntity;

  @ManyToOne(() => UsersEntity, (user) => user.likes)
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;
}
