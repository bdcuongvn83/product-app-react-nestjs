import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, ValidateIf } from 'class-validator';
import { z } from 'zod';

export class ProductRequest {
  @ValidateIf((o) => o.id !== undefined) // Chỉ kiểm tra id nếu có
  @IsInt()
  id: number;

  @IsString()
  productName: string;

  @IsInt()
  @Type(() => Number)
  price: number;

  @IsInt()
  @Type(() => Number)
  categoryId: number;

  @IsString()
  @IsOptional()
  description: string;
}

export const createProductSchema = z
  .object({
    productName: z.string(),
    price: z.number(),
  })
  .required();

export const updateProductSchema = z
  .object({
    id: z.number(),
    productName: z.string(),
    price: z.number(),
  })
  .required();

export type CreateProductRequest = z.infer<typeof createProductSchema>;
export type UpdateProductRequest = z.infer<typeof updateProductSchema>;
