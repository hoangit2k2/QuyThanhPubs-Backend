import { Test, TestingModule } from '@nestjs/testing';
import { TableProductService } from './table_product.service';

describe('TableProductService', () => {
  let service: TableProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TableProductService],
    }).compile();

    service = module.get<TableProductService>(TableProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
