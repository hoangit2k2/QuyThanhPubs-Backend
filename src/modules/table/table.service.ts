import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Table } from './table.entity';
import { Users } from '../users/users.entity';
import { TABLE_STATUS } from 'src/common/constant';

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(Table)
    private tableRepository: Repository<Table>,

    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
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
    if (user == null) {
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
  async updateStatusTable(tableId: number, status: TABLE_STATUS): Promise<any> {
    const table = await this.tableRepository.findOneBy({ id: tableId });
    if (table === null)
      throw new HttpException('This table not found.', HttpStatus.BAD_REQUEST);
    if (status == TABLE_STATUS.SERVING) {
      if (table.status == TABLE_STATUS.SERVING) {
        throw new HttpException('This table serving.', HttpStatus.BAD_REQUEST);
      }
      return await this.tableRepository.update(
        {
          id: tableId,
        },
        {
          status: status,
        },
      );
    }
    return await this.tableRepository.update(
      {
        id: tableId,
      },
      {
        status: status,
      },
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} table`;
  }

  update(id: number, updateTableDto: UpdateTableDto) {
    return `This action updates a #${id} table`;
  }

  remove(id: number) {
    return `This action removes a #${id} table`;
  }
}
