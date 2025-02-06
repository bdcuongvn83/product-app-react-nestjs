import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Redirect,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';

import { ProductDto } from 'src/product/product.dto';
import { RolesGuard } from 'src/RolesGuard';
import { Product } from 'src/entity/product.entity';
import { Operator } from './const';
import { ProductRequest } from 'src/Request/productRequest';
import { ZodValidationPipe } from 'src/zod-validation/zod-validation.pipe';
import { ResponseSuccessDto } from 'src/Response/ResponseSuccessDto';
import { ResponseResultListDto } from 'src/Response/ResponseResultListDto';
import { ResponseErrorDto } from 'src/Response/ResponseErrorDto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product')
@UseGuards(RolesGuard)
export class ProductController {
  constructor(private productService: ProductService) {}
  // @Get(':id')
  // findAll(@Param('id') id: string): string {
  //   // console.log("id:" + id);
  //   return `This action returns a #${id} cat`;
  // }

  // @Get('docs')
  // @Redirect('https://docs.nestjs.com', 302)
  //  getDocs(@Query('version') version) {
  //   console.log("version" + version);
  //   if (version && version === '5') {
  //     return { url: 'https://docs.nestjs.com/v5/' };
  //   }
  // }

  @Post()
  @HttpCode(201)
  //@UsePipes(new ZodValidationPipe(createProductSchema))
  //  @Roles(['admin'])
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() requestProduct: ProductRequest,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ResponseSuccessDto> {
    console.log(
      `productRequest:${JSON.stringify(JSON.stringify(requestProduct))}`,
    );

    console.log('File upload:', file);
    console.log('Product data:', requestProduct);

    const generatedId = await this.productService.insert(requestProduct, file);

    return new ResponseSuccessDto(201, 'Insert successfull', generatedId);
  }

  @Get('findall')
  async findAll(): Promise<ResponseResultListDto> {
    const result = await this.productService.findAll();
    console.log('result');
    console.log(result);
    return new ResponseResultListDto(result.length, result);
  }

  //   @Get(':id')
  //  // @UsePipes(new ZodValidationPipe())
  //   findProductById(@Param('id', new DefaultValuePipe('1'), ParseIntPipe) id: number){
  //     console.log("id:" + id);
  //     return `This action returns a #${id} cat`;
  //   }

  @Get('find/:id')
  async findProductBy(
    @Param('id', new DefaultValuePipe('1'), ParseIntPipe) id: number,
  ): Promise<Product | ResponseErrorDto> {
    console.log('id:' + id);
    const product: Product = await this.productService.findOne(id);
    //   const result = JSON.parse(JSON.stringify(product));
    if (product == null) {
      return new ResponseErrorDto(404, 'Data not found');
    }

    console.log(`product: ${JSON.stringify(product)}`);

    return product;
  }

  @Get('searchList')
  async searchList(
    @Query('categoryName') categoryName: string,
    @Query('productName') productName: string,
    @Query('price', new DefaultValuePipe(0), ParseIntPipe) price: number,
    @Query('operator', new DefaultValuePipe(0), ParseIntPipe) operator: number,
  ): Promise<ResponseResultListDto> {
    //  let price = 0;
    //console.log('categoryName:' + categoryName);
    //console.log('productName:' + productName);
    //const operatorEnum: Operator = operator as Operator;//cai nay cung dung
    const operatorEnum: Operator | undefined = Object.values(Operator).includes(
      operator,
    )
      ? (operator as Operator)
      : undefined;

    console.log('operatorEnum:', operatorEnum);
    const productLst = await this.productService.searchProduct(
      categoryName,
      productName,
      price,
      operatorEnum,
      undefined,
    );

    return new ResponseResultListDto(productLst.length, productLst);
    //return productLst;
  }

  @Put()
  @HttpCode(201)
  //@UsePipes(new ZodValidationPipe(updateProductSchema))
  @UsePipes(new ValidationPipe())
  async update(
    @Body() productRequest: ProductRequest,
  ): Promise<ResponseSuccessDto> {
    //   const result = JSON.parse(JSON.stringify(product));
    //copy data to entity
    console.log(
      `productRequest:${JSON.stringify(JSON.stringify(productRequest))}`,
    );

    const product = await this.productService.update(productRequest);
    console.log('update success product');

    return new ResponseSuccessDto(201, 'Update successfull', 1);
  }

  @Delete(':id')
  @HttpCode(201)
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseSuccessDto> {
    const result = await this.productService.delete(id);
    console.log('delete success product');

    return new ResponseSuccessDto(201, 'Remove successfull', result.affected);
  }
}
