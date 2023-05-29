import { CreateUsersDto } from './dto/create-accounr.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    const user = await this.userRepository.findOneBy({
      username: createUsersDto.username,
    });
    if (user != null) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const newUser = await this.userRepository.create(createUsersDto);
    return this.userRepository.save(newUser);
  }

  async deleteByUsername(username: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ username: username });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    await this.userRepository.softDelete({ username: username });
    return new HttpException(`User deleted successfully`, HttpStatus.OK);
  }
}
