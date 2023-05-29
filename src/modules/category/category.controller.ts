import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Category } from './category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('')
@ApiTags('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('admin/category')
  @ApiOperation({ summary: 'Create new Category' })
  @ApiCreatedResponse({
    description: 'Create new Category successfully.',
    type: Category,
  })
  @ApiBadRequestResponse({
    description: 'Category already exists',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get('admin/category/:id')
  @ApiOperation({ summary: 'Find Category By Id' })
  @ApiCreatedResponse({
    description: 'Get category by id successfully.',
    type: Category,
  })
  @ApiBadRequestResponse({
    description: 'Category not found',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  findCategoryById(@Param('id') id: number) {
    return this.categoryService.findById(id);
  }

  @Delete('admin/category/:id')
  @ApiOperation({ summary: 'Delete Category By Id ' })
  @ApiResponse({
    description: 'Delete Category by id successfully',
    status: 200,
  })
  @ApiBadRequestResponse({
    description: 'Category not found',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  deleteCategoryById(@Param('id') id: number) {
    return this.categoryService.deleteCategoryById(id);
  }

  @Get('admin/category')
  @ApiOperation({ summary: 'Get All Categories' })
  @ApiResponse({
    description: 'Get all categories sucessfully ',
    type: [Category],
    status: 200,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  getAll() {
    return this.categoryService.getAll();
  }

  @Put('admin/category/:id')
  @ApiOperation({ summary: 'Update category successfully' })
  @ApiResponse({
    description: 'Update category successfully',
    status: 200,
  })
  @ApiResponse({
    description: 'category not found',
    status: 400,
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UsePipes(new ValidationPipe({ transform: true }))
  updateCategoryById(
    @Param('id') id: number,
    @Body() updateCategory: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategoryById(id, updateCategory);
  }
}
