import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTableProductDto } from './dto/create-table_product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TableProduct } from './table_product.entity';
import { Repository } from 'typeorm';
import { Product } from '../product/product.entity';
import { Users } from '../users/users.entity';
import { Table } from '../table/table.entity';
import { UpdateTableProductDto } from './dto/update-table_product.dto';
import { AddNewProductDto, AddProductDto } from './dto/add-product.dto';
import { ORDER_PRODUCT_STATUS } from 'src/common/constant';

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
      if (createTableProductDtos.status == null)
        throw new HttpException('Invalid number.', HttpStatus.BAD_REQUEST);
      if (createTableProductDtos.quantity == null)
        throw new HttpException('Invalid number.', HttpStatus.BAD_REQUEST);
      if (createTableProductDtos.product_id == null)
        throw new HttpException('Invalid product_id.', HttpStatus.BAD_REQUEST);
      const newTableProduct = await this.tableProductRepository.create({
        quantity: createTableProductDtos.quantity,
        status: createTableProductDtos.status,
        table: newTable,
        product: product,
      });
      await this.tableProductRepository.save(newTableProduct);
    }
    const table = await this.tableRepository.findOne({
      relations: ['tableProducts', 'tableProducts.product'],
      where: {
        id: newTable.id,
      },
    });
    return table;
  }

  async getByTableId(tableId: number) {
    const table = await this.tableProductRepository.findOne({
      relations: ['table', 'product'],
      where: {
        id: tableId,
      },
    });
    if (!table) {
      throw new HttpException('Table not found', HttpStatus.BAD_REQUEST);
    }
    return table;
  }

  /**
   *
   * @param id
   * @body updateTableProductDto
   * @param updateTableProductDto
   * @returns
   */
  async update(id: number, updateTableProductDto: UpdateTableProductDto) {
    const table_product = await this.tableProductRepository.findOneBy({
      id: id,
    });
    if (!table_product) {
      throw new HttpException(
        'Table product not found',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.tableProductRepository.update(
      {
        id: id,
      },
      {
        quantity: updateTableProductDto.quantity,
        status: updateTableProductDto.status,
      },
    );
    return new HttpException('Upload table successfully', HttpStatus.OK);
  }

  /**
   * Add product to table
   * @Param tableId
   * @Body add-productDto
   * return new table product
   */
  async addProductForTable(
    tableId: number,
    addNewProductDto: AddNewProductDto,
  ) {
    const table = await this.tableRepository.findOneBy({ id: tableId });
    const product = await this.productRepository.findOneBy({
      id: addNewProductDto.product_id,
    });
    if (!table) {
      throw new HttpException('Table not found.', HttpStatus.BAD_REQUEST);
    }
    if (!product) {
      throw new HttpException('Product not found.', HttpStatus.BAD_REQUEST);
    }
    const newTableProduct = await this.tableProductRepository.create({
      product: product,
      table: table,
      status: ORDER_PRODUCT_STATUS.NOT_YET_DELIVERED,
      quantity: addNewProductDto.quantity,
    });
    await this.tableProductRepository.save(newTableProduct);
    return newTableProduct;
  }

  /**
   * Delete Table Product
   * @param taleProductId
   * @return
   */
  async deleteTableProduct(tableProductId: number): Promise<any> {
    const tableProduct = await this.tableProductRepository.findOneBy({
      id: tableProductId,
    });
    if (!tableProduct) {
      throw new HttpException(
        'Table product not found.',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.tableProductRepository.delete({ id: tableProductId });
  }
}
