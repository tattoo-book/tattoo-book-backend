import { SchedulingDTO } from 'src/common/classes/DTOs/schedulings/SchedulingDTO';
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
import { TattoosEntity } from './TattoosEntity';
import { UsersEntity } from './UsersEntity';

@Entity('tattoo_artists')
export class TattooArtistsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ length: 100 })
  name: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
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
