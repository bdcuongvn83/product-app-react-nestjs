import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class OrderItemRequest {
  @IsInt()
  productId: number;

  @IsInt()
  @Type(() => Number)
  price: number;

  @IsInt()
  @Type(() => Number)
  quantity: number;
}
