import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'categoryName' })
  categoryName: string;

  @UpdateDateColumn()
  updateDateTime: Date;
}
