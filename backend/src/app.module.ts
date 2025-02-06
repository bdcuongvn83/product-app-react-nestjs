import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { ProductModule } from './product/product.module';
import { APP_PIPE } from '@nestjs/core';
import { CustomeValidationPipe } from './custome-validation/custome-validation.pipe';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Product } from './entity/product.entity';
import { FilemanageModule } from './filemanage/filemanage.module';
import { FileEntity } from './entity/file.entity';
import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { OrdersModule } from './orders/orders.module';
import { Order } from './entity/order.entity';
import { OrderItem } from './entity/orderitem.entity';

import { WebhookController } from './webhook/webhook.controller';
import { Category } from './entity/category.entity';

@Module({
  imports: [
    ProductModule,
    OrdersModule,

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'company_db',
      entities: [Product, FileEntity, Order, OrderItem, Category],
      synchronize: true,
    }),

    FilemanageModule,

    OrdersModule,
  ],
  controllers: [AppController, WebhookController],
  providers: [{ provide: APP_PIPE, useClass: ValidationPipe }],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
