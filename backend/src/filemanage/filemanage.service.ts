import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from 'src/entity/file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilemanageService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

  async saveFile(file: Express.Multer.File): Promise<FileEntity> {
    const fileEntity = new FileEntity();
    fileEntity.originalName = file.originalname;
    fileEntity.buffer = file.buffer;

    return await this.fileRepository.save(fileEntity);
  }

  async getFile(id: number): Promise<FileEntity | null> {
    return await this.fileRepository.findOneBy({ id });
  }
}
