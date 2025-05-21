import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entity/order.entity';
import { OrderItem } from 'src/entity/orderitem.entity';
import { OrderRequest } from 'src/Request/orderRequest';
import {
  DataSource,
  InsertResult,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { OrderDto } from './order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    private dataSource: DataSource,
  ) {}

  async insertOrder(orderRequest: OrderRequest): Promise<number> {
    // console.log('manager', this.dataSource.manager);
    return await this.dataSource.manager.transaction(async (manager) => {
      //begin transaction
      //inser order
      const order = new Order();
      order.totalDelivery = orderRequest.delivery;
      order.total = orderRequest.total;
      order.userId = 1; //TODO tam
      order.orderdate = new Date();
      order.status = 0; //new
      //const result: InsertResult = await this.orderRepository.insert(order);
      // console.log('manager.insert Order begin');
      const result: InsertResult = await manager.insert(Order, order);
      // console.log('manager.insert Order end');
      // Access the generated id from the raw property
      const orderId = result.identifiers[0]?.id;
      if (!orderId) {
        throw new Error('Failed to retrieve the inserted orderId');
      }

      // console.log('orderRequest.items length', orderRequest.items.length);

      //insert List orderitem
      for (const item of orderRequest.items) {
        const orderItem = new OrderItem();
        orderItem.orderId = orderId;
        orderItem.price = item.price;
        orderItem.quantity = item.quantity;
        orderItem.productId = item.productId;
        // console.log(' manager.insert( OrderItem begin');

        const itemResult: InsertResult = await manager.insert(
          OrderItem,
          orderItem,
        );
        // console.log('OrderItem inserted:', itemResult);
        const orderItemId = itemResult.identifiers[0]?.id;
        // console.log(' manager.insert( OrderItem end orderItemId:', orderItemId);
        if (!orderItemId) {
          throw new Error('Failed to retrieve the inserted orderItemId');
        }
      }

      return orderId;
    });

    //end trantransaction
  }

  async deleteOrder(orderId: number): Promise<number> {
    return await this.dataSource.manager.transaction(async (entityManager) => {
      // Use the 'orderId' from the function parameter
      // console.log('Order ID:', orderId);
      // Your logic here
      const orderItems = await entityManager.find(OrderItem, {
        where: { orderId: orderId },
      });
      for (const item of orderItems) {
        await entityManager.remove(OrderItem, item);
        // console.log('remove OrderItem');
      }

      const order = await entityManager.findOne(Order, {
        where: { id: orderId },
      });
      if (order != null) {
        await entityManager.remove(Order, order);

        return 1;
      }

      return 0;
    });
  }

  /**
   * search order list by userId
   *
   * @param userId
   * @returns
   */
  async searchOrdersByUserId(userId: number): Promise<Order[]> {
    const queryBuilder: SelectQueryBuilder<Order> = this.dataSource.manager
      .createQueryBuilder()

      .select(['order'])
      .from(Order, 'order')
      // .innerJoin('order', 'order', 'order.userId = user.id')
      .where('order.userid = :userId', {
        userId: `${userId}`,
      })
      .orderBy('order.id', 'ASC');

    // console.log(`Debug sql :  ${queryBuilder.getSql()}`);

    return queryBuilder.getMany();
  }

  /**
   * search order item list by orderId
   *
   * @param orderId
   * @returns
   */
  async searchOrderItems(orderId: number): Promise<OrderItem[]> {
    const queryBuilder: SelectQueryBuilder<OrderItem> = this.dataSource.manager
      .createQueryBuilder(OrderItem, 'item')
      .leftJoinAndSelect('item.product', 'product')
      //.select(['item'])
      // .from(OrderItem, 'item')
      // .innerJoin('order', 'order', 'order.userId = user.id')
      .where('item.orderId = :orderId', {
        orderId: `${orderId}`,
      })
      .orderBy('item.id', 'ASC');

    // console.log(`Debug sql :  ${queryBuilder.getSql()}`);

    return queryBuilder.getMany();
  }

  async findOne(id: number): Promise<Order | null> {
    return this.orderRepository.findOneBy({ id });
  }
}
