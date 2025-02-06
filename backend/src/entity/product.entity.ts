import { Type } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Category } from './category.entity';

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

  @Column('int', { nullable: true })
  docId: number;

  @Column('int', { nullable: true })
  categoryId: number;

  @UpdateDateColumn()
  updateDateTime: Date;

  // Define relation with Category
  @ManyToOne(() => Category)
  @JoinColumn({ name: 'categoryId' })
  category: Category;
}
