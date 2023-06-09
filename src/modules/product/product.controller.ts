import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';
import { AuthGuard } from '../auth/auth.guard';
@Controller('')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('admin/product/uploadimg')
  @ApiOperation({ summary: 'Upload image to cloudinary' })
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        price: {
          type: 'number',
        },
        categoryId: {
          type: 'number',
        },
        unit: {
          type: 'string',
        },
        quantity: {
          type: 'number',
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    type: Product,
    status: 200,
  })
  @ApiResponse({
    description: 'Category not found',
    status: 404,
  })
  @ApiResponse({
    description: 'file not invalid',
    status: 404,
  })
  @ApiForbiddenResponse({ description: 'forbidden' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
  ) {
    console.log(createProductDto);
    return this.productService.create(createProductDto, file);
  }

  @Get('admin/product')
  @ApiOperation({ summary: 'Get all product' })
  @ApiResponse({
    description: 'category not found',
    status: 404,
  })
  @ApiResponse({
    description: 'get product by id successfully',
    type: Product,
    status: 200,
  })
  @ApiForbiddenResponse({ description: 'forbidden' })
  async findAll(@Query('categoryId') categoryId: number) {
    return await this.productService.findByCategory(categoryId);
  }

  @Get('admin/product/name')
  @ApiOperation({ summary: 'Get all product' })
  @ApiResponse({
    description: 'category not found',
    status: 404,
  })
  @ApiResponse({
    description: 'get product by id successfully',
    type: Product,
    status: 200,
  })
  @ApiForbiddenResponse({ description: 'forbidden' })
  getByName(@Query('name') name: string) {
    return this.productService.findbyname(name);
  }
}
