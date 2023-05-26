import { Test, TestingModule } from '@nestjs/testing';
import { TableProductController } from './table_product.controller';
import { TableProductService } from './table_product.service';

describe('TableProductController', () => {
  let controller: TableProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TableProductController],
      providers: [TableProductService],
    }).compile();

    controller = module.get<TableProductController>(TableProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
