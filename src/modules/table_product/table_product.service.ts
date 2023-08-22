import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTableProductDto } from './dto/create-table_product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TableProduct } from './table_product.entity';
import { Repository } from 'typeorm';
import { Product } from '../product/product.entity';
import { Users } from '../users/users.entity';
import { Table } from '../table/table.entity';
import { UpdateTableProductDto } from './dto/update-product.dto';

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
   * update Product in table
   * @body UpdateProductDto
   */
  async updateProductInTable(
    tableId: number,
    updateTableProductDto: UpdateTableProductDto,
  ) {
    const listProductNew = [];
    const listProductOld = [];
    const table = await this.tableRepository.findOneBy({
      id: tableId,
    });
    if (!table) {
      throw new HttpException(
        `Id bàn ${tableId} không tồn tại`,
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.tableRepository.save({
      id: tableId,
      name: updateTableProductDto.nameTable,
      phone: updateTableProductDto.phone,
    });
    for (const listProduct of updateTableProductDto.updateProductDto) {
      listProductNew.push(listProduct.product_id);
      const product = await this.productRepository.findOneBy({
        id: listProduct.product_id,
      });
      if (!product) {
        throw new HttpException(
          `Id sản phẩm ${listProduct.product_id} không tồn tại`,
          HttpStatus.BAD_REQUEST,
        );
      }
      const tableProduct = await this.tableProductRepository
        .createQueryBuilder('tableProduct')
        .innerJoin('tableProduct.table', 'table')
        .innerJoin('tableProduct.product', 'product')
        .where('product.id = :productId', {
          productId: listProduct.product_id,
        })
        .andWhere('table.id = :tableId', { tableId: tableId })
        .getOne();
      if (!tableProduct) {
        const tableProductNew = await this.tableProductRepository.create({
          product: product,
          table: table,
          quantity: listProduct.quantity,
          status: listProduct.status,
        });
        await this.tableProductRepository.save(tableProductNew);
      } else {
        await this.tableProductRepository.save({
          id: tableProduct.id,
          status: listProduct.status,
          quantity: listProduct.quantity,
        });
      }
    }
    const tableProductByIdTables = await this.tableProductRepository
      .createQueryBuilder('tableProduct')
      .innerJoin('tableProduct.table', 'table')
      .innerJoinAndSelect('tableProduct.product', 'product')
      .where('table.id = :tableId', { tableId: tableId })
      .getMany();
    for (const tableProductByIdTable of tableProductByIdTables) {
      listProductOld.push(tableProductByIdTable.product.id);
    }
    const productIdDeletes = listProductOld.filter(
      (num) => !listProductNew.includes(num),
    );

    this.deleteProductInTabel(productIdDeletes, tableId);
  }
  async deleteProductInTabel(productIdDeletes: any[], tableId) {
    for (const productIdDelete of productIdDeletes) {
      const tableProduct = await this.tableProductRepository
        .createQueryBuilder('tableProduct')
        .innerJoin('tableProduct.table', 'table')
        .innerJoin('tableProduct.product', 'product')
        .where('product.id = :productId', {
          productId: productIdDelete,
        })
        .andWhere('table.id = :tableId', { tableId: tableId })
        .getOne();
      await this.tableProductRepository.delete({ id: tableProduct.id });
    }
  }
}
