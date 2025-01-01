import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('orderitem')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'quantity' })
  quantity: number;

  @Column()
  price: number;

  @Column({ name: 'orderid' })
  orderId: number;

  @Column({ name: 'productid' })
  productId: number;

  @ManyToOne(() => Product, { eager: true })
  @JoinColumn({ name: 'productid' }) // Tùy chọn: Tạo khóa ngoại rõ ràng
  product: Product;
}
