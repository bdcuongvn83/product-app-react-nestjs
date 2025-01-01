import { IsInt, IsString } from 'class-validator';
import { OrderItem } from 'src/entity/orderitem.entity';
import { Int32 } from 'typeorm';
import { z } from 'zod';

export class OrderDto {
  @IsInt()
  id: number;

  @IsInt()
  delivery: number;

  items: OrderItem[];
}
