import { SchedulingDTO } from 'src/architecture/dtos/schedulings/SchedulingDTO';
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
import { TattoosEntity } from '../../tattoos/entities/tattoos.entity';
import { UsersEntity } from '../../users/entities/user.entity';

@Entity('tattoo_artists')
export class TattooArtistsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ length: 100 })
  name: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', select: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true, select: false })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true, select: false })
  deletedAt: Date;

  @ManyToOne(() => UsersEntity, (user) => user.tattooArtist)
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @Column('jsonb', {
    nullable: true,
    default: () => '{"sunday": [], "monday": [], "tuesday": [], "wednesday": [], "thursday": [], "friday": [], "saturday": []}\'::jsonb',
  })
  schedulings: SchedulingDTO;

  @OneToMany(() => TattoosEntity, (job) => job.tattooArtist)
  jobs: TattoosEntity[];

  setSchedulings(schedulings: SchedulingDTO) {
    this.schedulings = schedulings;
  }
}
