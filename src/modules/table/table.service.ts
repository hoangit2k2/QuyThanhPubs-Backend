import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Table } from './table.entity';
import { Users } from '../users/users.entity';
import { ORDER_PRODUCT_STATUS, TABLE_STATUS } from 'src/common/constant';
import { UpdateTableDto } from './dto/update-table.dto';
import { TableProduct } from '../table_product/table_product.entity';

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(Table)
    private tableRepository: Repository<Table>,

    @InjectRepository(Users)
    private usersRepository: Repository<Users>,

    @InjectRepository(TableProduct)
    private tableProductRepository: Repository<TableProduct>,
  ) {}
  /**
   * create a new Table
   * @body {CreateTableDto}
   * @returns {CreateUsersDto} total price
   */
  async create(createTableDto: CreateTableDto): Promise<Table> {
    const user = await this.usersRepository.findOneBy({
      username: createTableDto.user,
    });
    if (!user) {
      throw new HttpException('Username not found.', HttpStatus.BAD_REQUEST);
    }
    const newTable = await this.tableRepository.create({
      name: createTableDto.name,
      note: createTableDto.note,
      user: user,
    });
    return this.tableRepository.save(newTable);
  }
  /**
   * delete a table by ID
   * @Param {TableID} id Tale
   * @returns {any}
   */
  async deleteTableById(tableId: number): Promise<any> {
    const table = await this.tableRepository.findOneBy({ id: tableId });
    if (table === null)
      throw new HttpException('This table not found.', HttpStatus.BAD_REQUEST);
    if (table.status === TABLE_STATUS.SERVING)
      throw new HttpException('This table not done.', HttpStatus.BAD_REQUEST);
    if (table.status === TABLE_STATUS.UNPAID)
      throw new HttpException('This table not PAID.', HttpStatus.BAD_REQUEST);
    return await this.tableRepository.softDelete({ id: tableId });
  }
  /**
   * update status a table
   * @Param {TableID} id Tale
   * @Param {status} id Tale
   * @returns {any}
   */
  async updateStatusTable(
    tableId: number,
    updateTableDto: UpdateTableDto,
  ): Promise<any> {
    const table = await this.tableRepository.findOneBy({ id: tableId });
    if (!table)
      throw new HttpException('This table not found.', HttpStatus.BAD_REQUEST);
    if (
      updateTableDto.status == TABLE_STATUS.PAID ||
      updateTableDto.status == TABLE_STATUS.UNPAID
    ) {
      const table = await this.tableRepository.findOne({
        relations: ['tableProducts'],
        where: {
          id: tableId,
        },
      });
      for (const tableProduct of table.tableProducts) {
        if (tableProduct.status == ORDER_PRODUCT_STATUS.NOT_YET_DELIVERED) {
          throw new HttpException('Table not finished', HttpStatus.BAD_REQUEST);
        }
      }
      console.log(table.tableProducts);
    }
    await this.tableRepository.update(
      {
        id: tableId,
      },
      {
        note: updateTableDto.note,
        status: updateTableDto.status,
        name: updateTableDto.name,
      },
    );
    return new HttpException(
      `Update Table Id ${tableId} successfully`,
      HttpStatus.OK,
    );
  }

  async findOne(id: number) {
    const table = await this.tableRepository.findOne({
      relations: ['tableProducts', 'tableProducts.product'],
      where: {
        id: id,
      },
    });
    if (table == null) {
      throw new HttpException('Table not found.', HttpStatus.BAD_REQUEST);
    }
    return table;
  }

  async findByStatus(status: TABLE_STATUS) {
    const table = await this.tableRepository
      .createQueryBuilder('table')
      .where('table.status = :status', {
        status: status,
      })
      .innerJoinAndSelect('table.tableProducts', 'tableProducts')
      .orderBy('table.createAt', 'DESC')
      .getMany();
    return table;
  }

  async findByName(name: string) {
    const table = await this.tableRepository.find({
      relations: ['tableProducts'],
      where: {
        name: ILike(`%${name}%`),
        status: TABLE_STATUS.SERVING,
      },
    });
    if (!table) {
      throw new HttpException('Khong co ban nay', HttpStatus.BAD_REQUEST);
    }
    return table;
  }
}
