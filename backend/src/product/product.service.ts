import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entity/product.entity';

import {
  DataSource,
  DeleteResult,
  InsertResult,
  Int32,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { Operator } from './const';
import { ProductDto } from './product.dto';
import { ResponseSuccessDto } from 'src/Response/ResponseSuccessDto';
import { ProductRequest } from 'src/Request/productRequest';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private dataSource: DataSource,
  ) {}

  // private readonly products: Product[] = [
  //     {productName: "abc", price: 1000},
  //     {productName: "abc2", price: 2000}

  // ];

  async findOne(id: number): Promise<Product | null> {
    return this.productRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  /**
   * findAll
   * @returns
   */
  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  /**
   * search Product by name(search like), and price(by operator)
   * @param productname
   * @param price
   * @param operator (enum >,<,=,>=,<=)
   * @returns
   */
  async searchProduct(
    productname: string,
    price: number,
    operator: Operator,
  ): Promise<Product[]> {
    const queryBuilder: SelectQueryBuilder<Product> = this.dataSource.manager
      .createQueryBuilder()
      //.createQueryBuilder('user')
      .select(['product.id', 'product.name', 'product.price'])
      .from(Product, 'product')
      // .innerJoin('order', 'order', 'order.userId = user.id')
      .where('product.productname like :productname', {
        productname: `%${productname}%`,
      })
      // .andWhere('order.status = :status', { status: 'completed' })
      .orderBy('product.productname', 'ASC');

    console.log(`Debug sql :  ${queryBuilder.getSql()}`);

    return queryBuilder.getMany();
  }

  /**
   * update
   * @param product
   */
  async update(product: ProductRequest): Promise<Product> {
    const foundEntity = await this.findOne(product.id);

    if (!foundEntity) {
      throw new NotFoundException(`Product not found by Id ${product.id}`);
    }
    foundEntity.productName = product.productName;
    foundEntity.price = product.price;
    foundEntity.description = product.description;

    const updateEntity = await this.productRepository.save(foundEntity);

    // Log the result or perform additional checks
    console.log('Saved entity:', updateEntity);

    //return new ResponseSuccessDto(201, "Update successfull", 1);
    return updateEntity;
  }

  /**
   * insert new product
   * @param entity
   */
  async insert(productReq: ProductRequest): Promise<number> {
    const entity = new Product();
    entity.productName = productReq.productName;
    entity.price = productReq.price;
    entity.description = productReq.description;

    const result: InsertResult = await this.productRepository.insert(entity);
    // Access the generated id from the raw property
    const generatedId = result.identifiers[0]?.id;
    if (!generatedId) {
      throw new Error('Failed to retrieve the inserted ID');
    }
    return generatedId;
  }

  /**
   * delete
   * @param entity
   */
  async delete(productid: number): Promise<DeleteResult> {
    const foundItem: Product = await this.findOne(productid);
    if (!foundItem) {
      throw new NotFoundException(`Product not found by Id ${productid}`);
    }

    const result = await this.productRepository.delete(productid);
    return result;
  }
}
