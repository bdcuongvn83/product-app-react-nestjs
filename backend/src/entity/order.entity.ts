import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'totalDelivery' })
  totalDelivery: number;

  @Column({ type: 'datetime' })
  orderdate: Date;

  @Column('int')
  userId: number;

  @Column({ name: 'total' })
  total: number;

  @Column({ name: 'status' })
  status: number;
}
