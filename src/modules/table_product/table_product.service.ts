import { Injectable } from '@nestjs/common';
import { CreateTableProductDto } from './dto/create-table_product.dto';
import { UpdateTableProductDto } from './dto/update-table_product.dto';

@Injectable()
export class TableProductService {
  create(createTableProductDto: CreateTableProductDto) {
    return 'This action adds a new tableProduct';
  }

  findAll() {
    return `This action returns all tableProduct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tableProduct`;
  }

  update(id: number, updateTableProductDto: UpdateTableProductDto) {
    return `This action updates a #${id} tableProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} tableProduct`;
  }
}
