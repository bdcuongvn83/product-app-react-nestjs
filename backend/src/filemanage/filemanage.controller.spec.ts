import { Test, TestingModule } from '@nestjs/testing';
import { FilemanageController } from './filemanage.controller';

describe('FilemanageController', () => {
  let controller: FilemanageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilemanageController],
    }).compile();

    controller = module.get<FilemanageController>(FilemanageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
