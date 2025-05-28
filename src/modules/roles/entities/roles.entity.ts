import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'roles' })
export class Roles {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'uuid', generated: 'uuid', unique: true })
  uuid: string;

  @Field()
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Field()
  @Column({ type: 'varchar', length: 20, default: 'Inactive' })
  status: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Field()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
