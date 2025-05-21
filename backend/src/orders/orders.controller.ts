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
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderRequest } from 'src/Request/orderRequest';
import { ProductRequest } from 'src/Request/productRequest';
import { ResponseSuccessDto } from 'src/Response/ResponseSuccessDto';
import { OrdersService } from './orders.service';
import { ResponseResultListDto } from 'src/Response/ResponseResultListDto';
import { Order } from 'src/entity/order.entity';
import { ResponseErrorDto } from 'src/Response/ResponseErrorDto';

@Controller('orders')
export class OrdersController {
  public constructor(private ordersService: OrdersService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  async create(@Body() request: OrderRequest): Promise<ResponseSuccessDto> {
    // console.log(`productRequest:${JSON.stringify(JSON.stringify(request))}`);

    const generatedId = await this.ordersService.insertOrder(request);

    return new ResponseSuccessDto(201, 'Insert successfull', generatedId);
  }

  async findOne(id: number): Promise<Order | null> {
    return this.ordersService.findOne(id);
  }

  @Get('searchOrderList')
  async searchOrderList(
    @Query('userId') userId: number,
  ): Promise<ResponseResultListDto> {
    // console.log('userId:' + userId);

    const orderLst = await this.ordersService.searchOrdersByUserId(userId);

    // console.log(`product: ${JSON.stringify(orderLst)}`);
    return new ResponseResultListDto(orderLst.length, orderLst);
  }

  @Get('searchOrderItemList')
  async searchOrderItemList(
    @Query('orderId') orderId: number,
  ): Promise<ResponseResultListDto> {
    // console.log('orderId:' + orderId);

    const orderItemLst = await this.ordersService.searchOrderItems(orderId);

    // console.log(`product: ${JSON.stringify(orderItemLst)}`);

    return new ResponseResultListDto(orderItemLst.length, orderItemLst);
  }

  @Get(':id')
  async findOrderBy(
    @Param('id', new DefaultValuePipe('1'), ParseIntPipe) id: number,
  ): Promise<Order | ResponseErrorDto> {
    // console.log('id:' + id);
    const order: Order = await this.ordersService.findOne(id);
    //   const result = JSON.parse(JSON.stringify(product));
    if (order == null) {
      return new ResponseErrorDto(404, 'Data not found');
    }

    // console.log(`product: ${JSON.stringify(order)}`);

    return order;
  }

  @Delete(':id')
  @HttpCode(201)
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseSuccessDto> {
    const result = await this.ordersService.deleteOrder(id);
    // console.log('delete success product');

    return new ResponseSuccessDto(201, 'Remove successfull', result);
  }
}
