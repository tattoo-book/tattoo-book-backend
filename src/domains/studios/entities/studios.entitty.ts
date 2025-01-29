import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersEntity } from '../../users/entities/user.entity';

@Entity('studios')
export class StudiosEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  name: string;

  @Column({ name: 'owner_id' })
  ownerId: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;

  @ManyToOne(() => UsersEntity, (user) => user.studios)
  @JoinColumn({ name: 'owner_id' })
  owner: UsersEntity;

  toModel<T extends Partial<StudiosEntity>>() {
    return Object.assign(this, {
      createdAt: undefined,
      updatedAt: undefined,
      deletedAt: undefined,
    });
  }
}
