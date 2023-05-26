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
  async create(createUsersDto: CreateUsersDto): Promise<CreateUsersDto> {
    const newUser = await this.userRepository.create(createUsersDto);
    return this.userRepository.save(newUser);
  }
}
