import { Module } from '@nestjs/common';
import { FilemanageService } from './filemanage.service';
import { FilemanageController } from './filemanage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from 'src/entity/file.entity';

@Module({
  providers: [FilemanageService],
  controllers: [FilemanageController],

  imports: [TypeOrmModule.forFeature([FileEntity])],
})
export class FilemanageModule {}
