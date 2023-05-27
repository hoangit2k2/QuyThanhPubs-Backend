import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-accounr.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiBody({
    type: CreateUsersDto,
  })
  @Post('admin/users')
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createUsersDto: CreateUsersDto) {
    return this.usersService.create(createUsersDto);
  }
}
