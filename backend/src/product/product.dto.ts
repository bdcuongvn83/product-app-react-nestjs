import { IsInt, IsString } from 'class-validator';
import { Int32 } from 'typeorm';
import { z } from 'zod';

export class ProductDto {

    @IsInt()
    id: number;

    @IsString()
    productName: string;

    @IsInt()
    price: number;

    @IsString()
    description: string;
}

