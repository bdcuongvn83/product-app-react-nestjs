import {
  IsArray,
  isArray,
  IsInt,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { OrderItemRequest } from './orderItemRequest';
import { Type } from 'class-transformer';

export class OrderRequest {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemRequest)
  items: OrderItemRequest[];

  @IsInt()
  @Type(() => Number)
  delivery: number;

  @IsInt()
  @Type(() => Number)
  total: number;

  @IsInt()
  @Type(() => Number) //status:0 new; 1: inprogress; 2 :finish
  @IsOptional()
  status: number;
}
