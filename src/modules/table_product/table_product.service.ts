import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTableProductDto, AddProductsForTableDto } from './dto/create-table_product.dto';
import { UpdateTableProductDto } from './dto/update-table_product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TableProduct } from './table_product.entity';
import { Repository } from 'typeorm';
import { Product } from '../product/product.entity';
import { TABLE_STATUS } from 'src/common/constant';
import { Users } from '../users/users.entity';
import { Table } from '../table/table.entity';

@Injectable()
export class TableProductService {
  constructor(
    @InjectRepository(TableProduct)
    private tableProductRepository: Repository<TableProduct>,

    @InjectRepository(Table)
    private tableRepository: Repository<Table>,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}
  /**
   *create a new table product
   * @body createTableProductDto
   * return TableProduct
   */
  async create(createTableProductDto: CreateTableProductDto) {
    const user = await this.userRepository.findOneBy({
      username: 'admin',
    });
    if (!user) {
      throw new HttpException('username not found.', HttpStatus.BAD_REQUEST);
    }
    const newTable = await this.tableRepository.create({
      name: createTableProductDto.name,
      note: createTableProductDto.note,
      // status: TABLE_STATUS.SERVING,
      user: user,
    });
    await this.tableRepository.save(newTable);

    for (const createTableProductDtos of createTableProductDto.addProductDto) {
      const product = await this.productRepository.findOneBy({
        id: createTableProductDtos.product_id,
      });
      if (!product)
        throw new HttpException('product not found.', HttpStatus.BAD_REQUEST);
      if (
        createTableProductDtos.number ||
        createTableProductDtos.product_id ||
        createTableProductDtos.status == null
      )
        throw new HttpException('Invalid', HttpStatus.BAD_REQUEST);
      const newTableProduct = await this.tableProductRepository.create({
        number: createTableProductDtos.number,
        status: createTableProductDtos.status,
        table: newTable,
        product: product,
      });
      await this.tableProductRepository.save(newTableProduct);
    }

    return new HttpException(`successfully created.`, HttpStatus.OK);
  }

  async getByTableId(tableId: number) {
    const table = await this.tableRepository.findOne({
      relations: ['tableProducts'],
      where: {
        id: tableId,
      },
    });
    if (!table) {
      throw new HttpException('Table not found', HttpStatus.BAD_REQUEST);
    }
    return table.tableProducts;
  }

  // addProduct(add: AddProductsForTableDto[]) {
  //   for(const addProduct of add){
  //     const product = 
  //   }
  // }

  update(id: number, updateTableProductDto: UpdateTableProductDto) {
    return `This action updates a #${id} tableProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} tableProduct`;
  }
}
