import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-accounr.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller()
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiBody({
    type: CreateUsersDto,
  })
  @Post('admin/users')
  @ApiOperation({ summary: 'Create new user' })
  @ApiCreatedResponse({
    description: 'Create new user successfully.',
    type: CreateUsersDto,
  })
  @ApiBadRequestResponse({
    description: 'user already exists',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createUsersDto: CreateUsersDto) {
    return this.usersService.create(createUsersDto);
  }

  @Delete('admin/users/:username')
  @ApiOperation({ summary: 'Delete users' })
  @ApiResponse({ status: 200, description: 'Delete users successfully.' })
  @ApiResponse({ status: 400, description: 'User not found.' })
  async delete(@Param('username') username: string) {
    return this.usersService.deleteByUsername(username);
  }
}
