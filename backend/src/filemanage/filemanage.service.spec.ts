import { Test, TestingModule } from '@nestjs/testing';
import { FilemanageService } from './filemanage.service';

describe('FilemanageService', () => {
  let service: FilemanageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilemanageService],
    }).compile();

    service = module.get<FilemanageService>(FilemanageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
