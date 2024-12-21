import { Type } from 'class-transformer';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'productname' })
  productName: string;

  @Column({ nullable: true })
  description: string;

  @Column('int', { nullable: true })
  price: number;

  @UpdateDateColumn()
  updateDateTime: Date;
}
