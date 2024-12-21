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


@Module({
  imports: [ProductModule,

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'company_db',
      entities: [Product],
      synchronize: true,
    }),
  ],
  controllers: [AppController  ],
  providers: [{provide: APP_PIPE,
    useClass: ValidationPipe,}
  ]
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
