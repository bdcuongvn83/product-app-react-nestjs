import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entity/product.entity';
import { FilemanageService } from 'src/filemanage/filemanage.service';
import { FilemanageModule } from 'src/filemanage/filemanage.module';
import { FileEntity } from 'src/entity/file.entity';
import { Category } from 'src/entity/category.entity';

@Module({
  imports: [
    FilemanageModule,
    TypeOrmModule.forFeature([Product, FileEntity, Category]),
  ],
  controllers: [ProductController],
  providers: [ProductService, FilemanageService],
  exports: [ProductService], // <-- Export ProductService to make it available in other modules
})
export class ProductModule {}
