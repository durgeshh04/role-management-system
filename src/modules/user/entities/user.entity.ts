import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Roles } from 'src/modules/roles/entities/roles.entity';
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

@ObjectType()
@Entity({ name: 'users' })
export class User {
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
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Field()
  @Column({ type: 'varchar', length: 15 })
  mobile: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  roleId: number;

  @Field(() => Roles, { nullable: true })
  @ManyToOne(() => Roles, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'roleId' })
  role?: Roles;

  @Field(() => [String], { nullable: true })
  @Column({ type: 'simple-array', nullable: true })
  photos: string[];

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
