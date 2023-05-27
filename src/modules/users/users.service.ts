import { CreateUsersDto } from './dto/create-accounr.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}
  /**
   * create a new user
   * @body {CreateUsersDto}
   * @returns {CreateUsersDto} total price
   */
  async create(createUsersDto: CreateUsersDto): Promise<CreateUsersDto> {
    const newUser = await this.userRepository.create(createUsersDto);
    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<Users[]> {
    const users = await this.userRepository.find();
    return users;
  }
}
